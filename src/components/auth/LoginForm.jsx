'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import TextInput from '@/components/forms/TextInput';
import Button from '@/components/buttons/Button';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both Staff ID and Password.');
      return;
    }

    setLoading(true);

    // Validate login credentials (admin / Admin)
    setTimeout(() => {
      if (username.trim() === 'admin' && password === 'Admin') {
        // Save session state
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify({ name: 'Admin User', role: 'Administrator' }));
        }
        router.push('/dashboard');
      } else {
        setLoading(false);
        setError('Invalid Staff/Faculty ID or Password. (Use admin / Admin)');
      }
    }, 700);
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      {/* LEFT COLUMN: Hero Image with Custom Linear Gradient (40% Width) */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-10 xl:p-12 overflow-hidden select-none">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/login.png"
            alt="University Campus"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-1000 ease-out hover:scale-100"
          />
        </div>

        {/* Custom Linear Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(197.47deg, rgba(21, 93, 252, 0.126) 14%, rgba(34, 43, 63, 0.84) 63.45%)',
          }}
        />

        {/* Top Spacer / Brand Tag */}
        <div className="relative z-20" />

        {/* Bottom Hero Text Block */}
        <div className="relative z-20 text-white max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-200/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            EMPOWERING EDUCATION
          </span>

          <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight mt-5 leading-tight text-white drop-shadow-xs">
            Shaping the Future of Learning.
          </h1>

          <div className="w-12 h-1 bg-blue-400 rounded-full my-5 opacity-90" />

          <p className="text-xs text-slate-300 font-normal tracking-wider uppercase">
            © 2026 EDUVANTA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Login Form (60% Width) */}
      <div className="w-full lg:w-[55%] flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-md mx-auto flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Logo Header */}
          <div className="mb-8">
            <Image
              src="/logo.svg"
              alt="Eduvanta Logo"
              width={300}
              height={90}
              priority
              className="h-20 sm:h-24 w-auto object-contain max-w-[260px]"
            />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Welcome to Eduvanta
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Please enter your university credentials to access the portal.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3 animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Staff/Faculty ID Input */}
            <TextInput
              label="STAFF/FACULTY ID"
              placeholder="e.g. j.smith_2024"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Password Input with Eye Toggle */}
            <TextInput
              label="PASSWORD"
              labelRight={
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Please contact your IT administrator to reset your password.');
                  }}
                  className="text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Forgot Password?
                </a>
              }
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              rightIcon={
                showPassword ? (
                  <EyeOff className="w-5 h-5 text-slate-400 hover:text-slate-700" />
                ) : (
                  <Eye className="w-5 h-5 text-slate-400 hover:text-slate-700" />
                )
              }
              onRightIconClick={() => setShowPassword(!showPassword)}
            />

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 py-1 mb-4">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
              />
              <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer select-none">
                Remember this device
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={loading}
              className="py-3.5 text-base font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Log In to Portal
            </Button>
          </form>

          {/* Quick Helper Credentials Note */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Default Credentials: <span className="font-semibold text-slate-600">admin</span> /{' '}
              <span className="font-semibold text-slate-600">Admin</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
