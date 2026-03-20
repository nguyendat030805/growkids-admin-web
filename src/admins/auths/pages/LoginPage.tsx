import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast'; // 2. Import thư viện thông báo
import { IconInput } from '../components/IconInput';
import { useLogin } from '../hooks/uselogin';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, error } = useLogin();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    const data = await handleLogin(email, password);

    if (data) {
        const name = data.user?.fullName;
        toast.success(`Welcome back, ${name}!`);
            onLoginSuccess?.();
            setTimeout(() => {
                window.location.href = '/admin/dashboards';; 
            }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex bg-yellow-400 font-sans">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="hidden md:flex flex-1 flex-col items-center justify-center p-12 text-white">
        <div className="mb-8 animate-bounce">
          <span className="text-8xl">👶</span>
        </div>
        <h1 className="text-5xl font-black mb-4">Hi There!</h1>
        <p className="text-lg opacity-90 font-medium">Sign in to continue to GrowKids</p>
      </div>

      <div className="flex-1 bg-white md:rounded-l-[60px] shadow-2xl flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-black text-yellow-400 text-center mb-10">SIGN IN</h2>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <IconInput 
              icon={<Mail size={18} />} 
              placeholder="Your email" 
              value={email} 
              onChange={setEmail}
            />
            <IconInput 
              icon={<Lock size={18} />} 
              placeholder="Your password" 
              type="password" 
              value={password} 
              onChange={setPassword}
            />

            {/* Hiển thị lỗi từ server nếu có */}
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl text-center text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white h-14 rounded-full font-bold text-lg shadow-lg shadow-yellow-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                  WAITING...
                </span>
              ) : 'SIGN IN'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-400 italic">Or</span></div>
          </div>

          <button className="w-full border-2 border-gray-100 rounded-full py-3 flex items-center justify-center space-x-3 hover:bg-gray-50 transition-all h-14 active:scale-95">
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="google" />
            <span className="text-gray-600 font-semibold">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};