import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard,
  CheckCircle2,
  Download,
  QrCode,
  ShieldCheck,
  Building2,
  Droplet,
  Trash2,
  Zap,
  ArrowRight,
  X,
  Receipt,
  FileText,
} from 'lucide-react';
import { Bill } from '../types';

export const BillPaymentPage: React.FC = () => {
  const { bills, payBill } = useApp();
  const [activeTab, setActiveTab] = useState<'Due' | 'Paid'>('Due');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking'>('UPI');
  const [upiApp, setUpiApp] = useState('GPay');
  const [isPaySuccessModal, setIsPaySuccessModal] = useState<Bill | null>(null);

  const filteredBills = bills.filter((b) => b.status === activeTab);

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBill) return;

    const methodStr = paymentMethod === 'UPI' ? `UPI (${upiApp})` : paymentMethod;
    payBill(selectedBill.id, methodStr);

    const updated = {
      ...selectedBill,
      status: 'Paid' as const,
      paymentMethod: methodStr,
      receiptNo: `REC-2024-${Math.floor(10000 + Math.random() * 90000)}`,
      paidDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };

    setSelectedBill(null);
    setIsPaySuccessModal(updated);
  };

  const getIconForType = (type: Bill['type']) => {
    switch (type) {
      case 'Property Tax':
        return Building2;
      case 'Water Bill':
        return Droplet;
      case 'Sanitation Fee':
      case 'Waste Management':
        return Trash2;
      case 'Street Light Tax':
      case 'Electricity':
        return Zap;
      default:
        return FileText;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Municipal Bill Payment (Indian Rupees ₹)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pay property taxes, water utilities, and waste management charges securely via UPI or Cards.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button
            onClick={() => setActiveTab('Due')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'Due'
                ? 'bg-[#003d9b] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Due Bills
          </button>
          <button
            onClick={() => setActiveTab('Paid')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'Paid'
                ? 'bg-[#003d9b] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Payment Receipts
          </button>
        </div>
      </div>

      {/* Bill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBills.map((b) => {
          const IconComp = getIconForType(b.type);
          return (
            <div
              key={b.id}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between hover:border-[#003d9b] transition-all space-y-4"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 dark:bg-slate-700 text-[#003d9b] dark:text-blue-400 rounded-2xl">
                    <IconComp size={24} />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                      b.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                    }`}
                  >
                    {b.status === 'Paid' ? 'Paid' : `Due by ${b.dueDate}`}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{b.type}</h3>
                <p className="text-xs text-slate-500 font-medium">Account: {b.accountNo}</p>
                <p className="text-xs text-slate-400 mt-1">{b.period}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount</p>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    ₹{b.amount.toLocaleString('en-IN')}.00
                  </p>
                </div>

                {b.status === 'Due' ? (
                  <button
                    onClick={() => setSelectedBill(b)}
                    className="px-5 py-2.5 bg-[#003d9b] hover:bg-[#0052cc] text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <span>Pay Now</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPaySuccessModal(b)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                  >
                    <Receipt size={14} /> Receipt
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pay Now UPI/Card Modal */}
      {selectedBill && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Pay {selectedBill.type}
                </h3>
                <p className="text-xs text-slate-500">Account #{selectedBill.accountNo}</p>
              </div>
              <button
                onClick={() => setSelectedBill(null)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Total Display */}
            <div className="p-4 bg-blue-50 dark:bg-slate-800 rounded-2xl flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Total Payable Amount
              </span>
              <span className="text-2xl font-extrabold text-[#003d9b] dark:text-blue-400">
                ₹{selectedBill.amount.toLocaleString('en-IN')}.00
              </span>
            </div>

            <form onSubmit={handleConfirmPayment} className="space-y-4">
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select Payment Gateway
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#003d9b] bg-blue-50 text-[#003d9b]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    UPI (BHIM/GPay)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-[#003d9b] bg-blue-50 text-[#003d9b]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NetBanking')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === 'NetBanking'
                        ? 'border-[#003d9b] bg-blue-50 text-[#003d9b]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Net Banking
                  </button>
                </div>
              </div>

              {paymentMethod === 'UPI' && (
                <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Choose UPI Application
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                    {['GPay', 'PhonePe', 'Paytm'].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setUpiApp(app)}
                        className={`py-2 rounded-xl border ${
                          upiApp === app
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <QrCode size={32} className="text-[#003d9b]" />
                    <p className="text-[11px] text-slate-500">
                      Or scan QR code using your mobile banking app to authorize instant payment in ₹.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="space-y-3 text-xs">
                  <input
                    type="text"
                    placeholder="Card Number (4532 •••• •••• 9912)"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBill(null)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#003d9b] text-white rounded-xl text-xs font-extrabold hover:bg-[#0052cc]"
                >
                  Confirm Payment (₹{selectedBill.amount})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Success / Receipt Modal */}
      {isPaySuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck size={36} />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Payment Completed!
            </h3>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-left text-xs space-y-2 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400">Receipt No:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{isPaySuccessModal.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Utility Type:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{isPaySuccessModal.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="font-bold text-emerald-600">₹{isPaySuccessModal.amount.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Paid On:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{isPaySuccessModal.paidDate}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsPaySuccessModal(null)}
                className="flex-1 py-3 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Downloading Official Tax Receipt ${isPaySuccessModal.receiptNo}.pdf`);
                }}
                className="flex-1 py-3 bg-[#003d9b] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5"
              >
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
