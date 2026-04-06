import { useState, useRef, useEffect } from 'react';
import { Mail, ArrowLeft, Loader2, FlaskConical } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import { toast } from 'sonner';
import { AuthBackground } from '../components/auth/auth-background';
import { StepIndicator } from '../components/auth/step-indicator';

export function VerifyOTP() {
  const [searchParams] = useSearchParams();
  const type = (searchParams.get('type') as 'login' | 'signup') || 'login';
  const { pendingEmail, mockOTP, verifyOTP, resendOTP } = useAuth();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!pendingEmail) {
      navigate('/login', { replace: true });
    }
  }, [pendingEmail, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
      toast.error('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    const success = await verifyOTP(code, type);
    if (success) {
      if (type === 'login') {
        toast.success('Welcome back!');
        // Auth context handles setting user. Navigation logic handled by App routing
        // but we can force redirect here
        navigate('/home'); 
      } else {
        toast.success('Email verified! Now connect your cloud providers.');
        navigate('/connect-cloud');
      }
    } else {
      toast.error('Invalid verification code. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 300);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    if (countdown > 0) return;
    resendOTP();
    setCountdown(30);
    toast.success('New verification code sent!');
  };

  const maskedEmail = pendingEmail ? `${pendingEmail.substring(0, 2)}****@${pendingEmail.split('@')[1]}` : '';

  const steps = type === 'signup' 
    ? [
        { label: 'Create Account', completed: true, current: false },
        { label: 'Verify Email', completed: false, current: true },
        { label: 'Connect Cloud', completed: false, current: false }
      ]
    : [
        { label: 'Sign In', completed: true, current: false },
        { label: 'Verify Email', completed: false, current: true }
      ];

  return (
    <AuthBackground>
      <div className={`w-full max-w-[400px] p-8 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl transition-transform ${shake ? 'animate-[shake_0.3s_ease]' : 'animate-in fade-in slide-in-from-bottom-5 duration-500'}`}>
        
        <StepIndicator steps={steps} />

        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-indigo-500/10 rounded-full mb-4">
            <Mail className="h-10 w-10 text-indigo-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Verify Your Email</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            We've sent a 6-digit verification code to<br/>
            <span className="font-medium text-slate-900 dark:text-white">{maskedEmail}</span>
          </p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              onPaste={handlePaste}
              disabled={isLoading}
              autoComplete={i === 0 ? "one-time-code" : "off"}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-2xl font-bold rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 dark:text-white"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={isLoading || otp.join('').length < 6}
          className="w-full h-11 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center mb-4"
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Verifying...</>
          ) : (
            'Verify Code'
          )}
        </button>

        <div className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
          Didn't receive the code?{' '}
          <button 
            onClick={handleResend} 
            disabled={countdown > 0}
            className={`font-medium ${countdown > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-indigo-500 hover:text-indigo-400 cursor-pointer transition-colors'}`}
          >
            {countdown > 0 ? `Resend Code (${countdown}s)` : 'Resend Code'}
          </button>
        </div>

        <div className="text-center">
          <Link to={type === 'signup' ? '/signup' : '/login'} className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to {type === 'signup' ? 'Sign Up' : 'Sign In'}
          </Link>
        </div>

        {/* DEMO OTP BANNER */}
        <div className="mt-8 rounded-lg border border-green-500/30 bg-green-500/10 p-3 flex items-start gap-3">
          <FlaskConical className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-green-500 uppercase tracking-wider mb-1">Demo Mode</div>
            <div className="text-sm text-slate-700 dark:text-slate-300">
              Your verification code is: <span className="font-mono text-lg font-bold text-green-600 dark:text-green-400 tracking-widest ml-1">{mockOTP}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              (In production, this would be sent via email)
            </div>
          </div>
        </div>

      </div>
    </AuthBackground>
  );
}
