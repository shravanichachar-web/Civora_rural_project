import React, { useRef } from 'react';
import { Complaint, Bill } from '../types';
import { X, Printer, Download, CheckCircle2, QrCode, Building2, ShieldCheck } from 'lucide-react';

interface ComplaintReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaint?: Complaint;
  bill?: Bill;
}

export const ComplaintReceiptModal: React.FC<ComplaintReceiptModalProps> = ({
  isOpen,
  onClose,
  complaint,
  bill,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isOpen || (!complaint && !bill)) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Header toolbar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm tracking-wide">Kolhapur Municipal Corporation</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print / PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div ref={receiptRef} className="p-8 text-slate-800 dark:text-slate-200 space-y-6">
          {/* Header Seal */}
          <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#003d9b] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
              KMC
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              कोल्हापूर महानगरपालिका, कोल्हापूर
            </h2>
            <p className="text-xs text-slate-5-00 dark:text-slate-400 font-medium">
              Kolhapur Municipal Corporation (Kasba Bawada Ward Office)
            </p>
            <p className="text-[11px] text-[#003d9b] dark:text-blue-400 font-bold mt-1">
              {complaint ? 'CIVIC GRIEVANCE ACKNOWLEDGEMENT RECEIPT' : 'OFFICIAL MUNICIPAL PAYMENT RECEIPT'}
            </p>
          </div>

          {/* Complaint Details */}
          {complaint && (
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 font-medium block">Reference Token</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">{complaint.referenceNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 font-medium block">Date & Time</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{complaint.submittedAt}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 font-medium block">Grievance Category</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{complaint.category}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 font-medium block">Current Status</span>
                  <span className="inline-block px-2 py-0.5 rounded-md font-bold text-[11px] bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    {complaint.status}
                  </span>
                </div>
              </div>

              <div className="text-xs space-y-2">
                <p><strong>Ward / Area:</strong> {complaint.ward} ({complaint.location})</p>
                <p><strong>Department Assigned:</strong> {complaint.department}</p>
                <p><strong>Officer In-Charge:</strong> {complaint.assignedTo || 'Under Dispatch'}</p>
                <p className="bg-blue-50 dark:bg-slate-800 p-3 rounded-lg border border-blue-100 dark:border-slate-700 italic">
                  &quot;{complaint.description}&quot;
                </p>
              </div>
            </div>
          )}

          {/* Bill Details */}
          {bill && (
            <div className="space-y-4">
              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium block">Receipt No.</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">{bill.receiptNo || 'REC-KMC-99212'}</span>
                </div>
                <div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium block">Payment Date</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{bill.paidDate || 'Today'}</span>
                </div>
                <div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium block">Bill Type</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{bill.type}</span>
                </div>
                <div>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium block">Amount Paid</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">₹{bill.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <p><strong>Account / Consumer No:</strong> {bill.accountNo}</p>
                <p><strong>Billing Period:</strong> {bill.period}</p>
                <p><strong>Payment Mode:</strong> {bill.paymentMethod || 'Online Banking'}</p>
              </div>
            </div>
          )}

          {/* QR Code and Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center">
                <QrCode className="w-12 h-12 text-slate-800 dark:text-slate-200" />
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Digitally Signed
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Scan QR to verify on KMC Portal</p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Authorized Signatory</div>
              <p className="font-extrabold text-slate-800 dark:text-slate-200 text-xs mt-3">Chief Officer, KMC</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
