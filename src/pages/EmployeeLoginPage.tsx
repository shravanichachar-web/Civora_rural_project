import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, UserCheck, Lock, AlertCircle, ArrowRight, Building2, Briefcase } from 'lucide-react';

export const EmployeeLoginPage: React.FC = () => {
  const { employeeLogin, t } = useApp();
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState('EMP001');
  const [password, setPassword] = useState('emp123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = employeeLogin(employeeId, password);
    if (res.success) {
      navigate('/employee/dashboard');
    } else {
      setError(res.error || 'Authentication failed');
    }
  };

  const handleQuickDemo = (empId: string) => {
    setEmployeeId(empId);
    setPassword('emp123');
    const res = employeeLogin(empId, 'emp123');
    if (res.success) {
      navigate('/employee/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-[#003d9b] to-indigo-900 text-white p-6 text-center relative">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
            <Briefcase className="w-7 h-7 text-amber-400" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">KMC Field Staff Portal</h2>
          <p className="text-xs text-blue-100/80 mt-1">Kolhapur Municipal Corporation Staff & Field Engineers</p>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Employee ID or Mobile Number
            </label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="e.g. EMP001 or 9822100001"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#003d9b]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Access Password / PIN
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#003d9b]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#003d9b] hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
          >
            <span>Employee Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Demo Staff Login Shortcuts */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Quick Demo Staff Logins:
            </span>
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemo('EMP001')}
                className="w-full text-left p-2 rounded-lg bg-slate-100 dark:bg-slate-700/60 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-100">Suresh More</span>
                  <span className="text-[10px] text-slate-500 block">Water Works Supervisor (EMP001)</span>
                </div>
                <span className="text-[10px] font-bold text-[#003d9b] dark:text-blue-400">Login &rarr;</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('EMP002')}
                className="w-full text-left p-2 rounded-lg bg-slate-100 dark:bg-slate-700/60 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-100">Ganesh Shinde</span>
                  <span className="text-[10px] text-slate-500 block">Sanitation Inspector (EMP002)</span>
                </div>
                <span className="text-[10px] font-bold text-[#003d9b] dark:text-blue-400">Login &rarr;</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
