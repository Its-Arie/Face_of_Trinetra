import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User, type VerificationResult } from '../types/auth';
import { mockUsers } from '../lib/mock-data/users';
import { verifyCloudAccount } from '../lib/verify-cloud';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isHydrating: boolean;
  pendingEmail: string | null;
  mockOTP: string | null;
  login: (email: string) => Promise<boolean>;
  signup: (name: string, email: string) => Promise<boolean>;
  verifyOTP: (code: string, type: 'login' | 'signup') => Promise<boolean>;
  resendOTP: () => void;
  connectProvider: (provider: 'aws' | 'azure' | 'gcp', accountId: string) => Promise<VerificationResult>;
  disconnectProvider: (provider: 'aws' | 'azure' | 'gcp') => void;
  logout: () => void;
  completeFirstLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [pendingName, setPendingName] = useState<string | null>(null);
  const [mockOTP, setMockOTP] = useState<string | null>(null);
  const [usersDb, setUsersDb] = useState<User[]>(mockUsers);

  const [isHydrating, setIsHydrating] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('trinetra_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    // Simulate slight delay for hydration to show AppLoader
    setTimeout(() => setIsHydrating(false), 800);
  }, []);

  // Save to local storage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('trinetra_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('trinetra_user');
    }
  }, [user]);

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setMockOTP(otp);
    return otp;
  };

  const login = async (email: string) => {
    const foundUser = usersDb.find(u => u.email === email);
    if (!foundUser) return false;
    
    setUser(foundUser);
    setIsAuthenticated(true);
    return true;
  };

  const signup = async (name: string, email: string) => {
    const foundUser = usersDb.find(u => u.email === email);
    if (foundUser) return false; // Email exists

    setPendingName(name);
    setPendingEmail(email);
    generateOTP();
    return true;
  };

  const verifyOTP = async (code: string, type: 'login' | 'signup') => {
    if (code !== mockOTP) return false;

    if (type === 'login') {
      const foundUser = usersDb.find(u => u.email === pendingEmail);
      if (foundUser) {
        setUser(foundUser);
        setIsAuthenticated(true);
      }
    } else if (type === 'signup') {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: pendingName || 'New User',
        email: pendingEmail!,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${pendingName || 'User'}`,
        createdAt: new Date().toISOString(),
        isFirstLogin: true,
        connectedProviders: { aws: null, azure: null, gcp: null }
      };
      setUsersDb([...usersDb, newUser]);
      setUser(newUser);
      setIsAuthenticated(true);
    }

    setPendingEmail(null);
    setPendingName(null);
    setMockOTP(null);
    return true;
  };

  const resendOTP = () => {
    generateOTP();
  };

  const connectProvider = async (provider: 'aws' | 'azure' | 'gcp', accountId: string) => {
    if (!user) return { success: false, error: 'not_found', message: 'Not logged in' } as VerificationResult;
    
    const result = verifyCloudAccount(provider, accountId, user.email);
    if (result.success && result.data) {
      const updatedUser = {
        ...user,
        connectedProviders: {
          ...user.connectedProviders,
          [provider]: {
            provider,
            accountId,
            accountName: result.data.accountName,
            username: result.data.username,
            region: result.data.region,
            resources: result.data.resources,
            connectedAt: new Date().toISOString(),
            status: 'active'
          }
        }
      };
      setUser(updatedUser);
      // Update in mock DB too
      setUsersDb(usersDb.map(u => u.id === user.id ? updatedUser : u));
    }
    return result;
  };

  const disconnectProvider = (provider: 'aws' | 'azure' | 'gcp') => {
    if (!user) return;
    const updatedUser = {
      ...user,
      connectedProviders: {
        ...user.connectedProviders,
        [provider]: null
      }
    };
    setUser(updatedUser);
    setUsersDb(usersDb.map(u => u.id === user.id ? updatedUser : u));
  };

  const completeFirstLogin = () => {
    if (!user) return;
    const updatedUser = { ...user, isFirstLogin: false };
    setUser(updatedUser);
    setUsersDb(usersDb.map(u => u.id === user.id ? updatedUser : u));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setPendingEmail(null);
    setMockOTP(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, isAuthenticated, isHydrating, pendingEmail, mockOTP, 
      login, signup, verifyOTP, resendOTP, connectProvider, disconnectProvider, completeFirstLogin, logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
