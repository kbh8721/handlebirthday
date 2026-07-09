import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Key, Lock, ArrowLeft, Check, AlertCircle, Eye, EyeOff, Sparkles, ShieldAlert } from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
  isLoggedIn: boolean;
}

export function SettingsView({ onBack, isLoggedIn }: SettingsViewProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [authPassword, setAuthPassword] = useState('');
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPasswords, setShowNewPasswords] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [changeError, setChangeError] = useState('');

  const getStoredPassword = () => {
    return localStorage.getItem('birthday_tarot_password') || '1234';
  };

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = getStoredPassword();
    if (authPassword === stored) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('비밀번호가 일치하지 않습니다. 관리 권한이 거부되었습니다.');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = getStoredPassword();

    if (currentPassword !== stored) {
      setChangeError('현재 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!newPassword) {
      setChangeError('새 비밀번호를 입력해주세요.');
      return;
    }

    if (newPassword.length < 4) {
      setChangeError('비밀번호는 최소 4자리 이상이어야 안전합니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setChangeError('새 비밀번호와 비밀번호 확인이 서로 다릅니다.');
      return;
    }

    // Set password
    localStorage.setItem('birthday_tarot_password', newPassword);
    setSuccessMessage('비밀번호가 성공적으로 변경되었습니다!');
    setChangeError('');
    
    // Clear fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto px-6 py-8 flex flex-col min-h-[80vh] justify-center relative z-10"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-6 flex items-center gap-2 text-stone-500 hover:text-gold transition-colors text-sm font-light py-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>돌아가기</span>
      </button>

      {/* STEP 1: Verify Password to enter settings */}
      {!isAuthenticated ? (
        <div className="space-y-6 mt-10">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full border border-amber-400 bg-stone-900/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(217,119,6,0.2)]">
              <ShieldAlert className="w-8 h-8 text-gold animate-pulse" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-2">
              설정 로그인
            </h2>
            <p className="text-stone-500 text-sm font-light">
              설정 페이지에 진입하려면 먼저 비밀번호를 입력하여 본인임을 인증해 주세요.
            </p>
          </div>

          <form onSubmit={handleVerifyPassword} className="space-y-4">
            <div className="relative">
              <input
                type={showAuthPassword ? "text" : "password"}
                value={authPassword}
                onChange={(e) => {
                  setAuthPassword(e.target.value);
                  setAuthError('');
                }}
                placeholder="현재 비밀번호 입력"
                className="w-full bg-amber-50/60 border border-gold focus:border-gold-light focus:shadow-[0_0_12px_rgba(217,119,6,0.3)] outline-none rounded-2xl py-4 pl-6 pr-14 text-center text-lg tracking-widest text-stone-800 placeholder:text-stone-400 placeholder:tracking-normal transition-all shadow-inner"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowAuthPassword(!showAuthPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-gold transition-colors p-2"
              >
                {showAuthPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-red-500 text-xs text-center font-light bg-red-50/80 border border-red-200 py-2.5 px-4 rounded-xl"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-medium shadow-[0_4px_15px_rgba(217,119,6,0.2)] transition-all flex items-center justify-center gap-2"
            >
              <Key className="w-5 h-5" />
              <span>로그인하여 설정 진입</span>
            </button>
          </form>
        </div>
      ) : (
        /* STEP 2: Main settings UI to change password */
        <div className="space-y-6 mt-10">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full border border-amber-400 bg-amber-100 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(217,119,6,0.2)]">
              <Lock className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-800 mb-1">
              로그인 암호 설정
            </h2>
            <p className="text-stone-500 text-xs md:text-sm font-light">
              새로운 타로 세션 보호를 위해 보안 비밀번호를 설정할 수 있습니다.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-5 bg-amber-100/40 p-6 rounded-3xl border border-amber-200/50 shadow-md">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-600 block pl-1">현재 비밀번호</label>
              <input
                type={showNewPasswords ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setChangeError('');
                }}
                placeholder="현재 비밀번호 입력"
                className="w-full bg-white border border-amber-300 focus:border-gold outline-none rounded-xl py-3 px-4 text-stone-800 text-sm transition-all shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-600 block pl-1">새 비밀번호</label>
              <input
                type={showNewPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setChangeError('');
                }}
                placeholder="새 비밀번호 입력 (4자리 이상)"
                className="w-full bg-white border border-amber-300 focus:border-gold outline-none rounded-xl py-3 px-4 text-stone-800 text-sm transition-all shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-600 block pl-1">새 비밀번호 확인</label>
              <input
                type={showNewPasswords ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setChangeError('');
                }}
                placeholder="새 비밀번호 다시 입력"
                className="w-full bg-white border border-amber-300 focus:border-gold outline-none rounded-xl py-3 px-4 text-stone-800 text-sm transition-all shadow-inner"
              />
            </div>

            <div className="flex items-center justify-end pl-1">
              <button
                type="button"
                onClick={() => setShowNewPasswords(!showNewPasswords)}
                className="text-stone-500 hover:text-gold text-xs flex items-center gap-1.5 transition-colors"
              >
                {showNewPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showNewPasswords ? "비밀번호 숨기기" : "비밀번호 보이기"}</span>
              </button>
            </div>

            {changeError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 text-xs font-light bg-red-50/80 border border-red-200 p-3 rounded-xl"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{changeError}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-emerald-600 text-xs font-semibold bg-emerald-50 border border-emerald-200 p-3 rounded-xl"
              >
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-white font-medium text-sm transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>새로운 암호로 설정하기</span>
            </button>
          </form>

          <button
            onClick={onBack}
            className="w-full py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-600 text-sm font-medium transition-colors"
          >
            설정 종료 후 돌아가기
          </button>
        </div>
      )}
    </motion.div>
  );
}
