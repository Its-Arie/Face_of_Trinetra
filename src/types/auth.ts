export interface CloudConnection {
  provider: 'aws' | 'azure' | 'gcp';
  accountId: string;
  accountName: string;
  username: string;
  region: string;
  resources: { vms: number; containers: number; roles: number };
  connectedAt: string;
  status: 'active' | 'error' | 'disconnected';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  connectedProviders: {
    aws: CloudConnection | null;
    azure: CloudConnection | null;
    gcp: CloudConnection | null;
  };
  createdAt: string;
  isFirstLogin: boolean;
}

export interface VerificationResult {
  success: boolean;
  error?: 'not_found' | 'email_mismatch' | 'format_error';
  message?: string;
  data?: {
    username: string;
    region: string;
    resources: { vms: number; containers: number; roles: number };
    accountName: string;
  };
}
