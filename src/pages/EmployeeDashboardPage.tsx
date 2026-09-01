import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  Camera,
  MapPin,
  MessageSquare,
  AlertCircle,
  Send,
  Navigation,
  UserCheck,
  Building2,
  LogOut,
  RefreshCw,
} from 'lucide-react';

export const EmployeeDashboardPage: React.FC = () => {
  const {
    employeeUser,
    employeeLogout,
    complaints,
    updateEmployeeWorkStatus,
    addComplaintComment,
  } = useApp();

  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [workStage, setWorkStage] = useState<'Work Accepted' | 'Work Started' | 'In Progress' | 'Completed' | 'Rejected'>('Work Started');
  const [remark, setRemark] = useState('');
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>({ lat: 16.7214, lng: 74.2488 });
  const [isCapturingGps, setIsCapturingGps] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Filter complaints assigned ONLY to this employee
  const myAssignedComplaints = complaints.filter((c) => {
    if (!employeeUser) return false;
    const isEmpIdMatch = c.assignedEmployeeId === employeeUser.id;
    const isNameMatch = c.assignedTo && c.assignedTo.toLowerCase().includes(employeeUser.name.toLowerCase().split(' ')[0]);
    return isEmpIdMatch || isNameMatch || c.assignedTo === employeeUser.name;
  });

  const activeTasks = myAssignedComplaints.filter((c) => c.status !== 'Resolved' && c.status !== 'Rejected');
  const completedTasks = myAssignedComplaints.filter((c) => c.status === 'Resolved');

  const activeComplaint = myAssignedComplaints.find((c) => c.id === selectedComplaintId) || myAssignedComplaints[0];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'before') setBeforePhoto(reader.result as string);
        if (type === 'after') setAfterPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptureGps = () => {
    setIsCapturingGps(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsCapturingGps(false);
        },
        () => {
          // Fallback to Kasba Bawada GPS coordinates
          setGpsLocation({ lat: 16.7214 + (Math.random() - 0.5) * 0.005, lng: 74.2488 + (Math.random() - 0.5) * 0.005 });
          setIsCapturingGps(false);
        }
      );
    } else {
      setGpsLocation({ lat: 16.7214, lng: 74.2488 });
      setIsCapturingGps(false);
    }
  };

  const handleSubmitWorkUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeComplaint) return;

    updateEmployeeWorkStatus(activeComplaint.id, {
      stage: workStage,
      remark: remark || `Progress updated to ${workStage}`,
      beforePhotoUrl: beforePhoto || undefined,
      afterPhotoUrl: afterPhoto || undefined,
      gpsLocation: gpsLocation || undefined,
    });

    setRemark('');
    setBeforePhoto(null);
    setAfterPhoto(null);
    alert(`Work progress updated to "${workStage}" for ticket #${activeComplaint.id}!`);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !activeComplaint) return;
    addComplaintComment(activeComplaint.id, commentText);
    setCommentText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Profile Header */}
      <div className="bg-gradient-to-r from-[#003d9b] via-blue-900 to-slate-900 text-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-white/30">
            {employeeUser?.name ? employeeUser.name.charAt(0) : 'E'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold text-xs">
                {employeeUser?.id || 'EMP001'}
              </span>
              <span className="text-xs text-blue-200">{employeeUser?.department || 'Water Works'}</span>
            </div>
            <h1 className="text-xl font-black text-white mt-0.5">{employeeUser?.name || 'Suresh More (Supervisor)'}</h1>
            <p className="text-xs text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Area Assigned: {employeeUser?.assignedArea || 'Kasba Bawada Main Road'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-right">
            <span className="text-[10px] text-blue-200 font-bold uppercase block">Rating / Performance</span>
            <span className="text-base font-extrabold text-amber-300">⭐ {employeeUser?.rating || 4.8} / 5.0</span>
          </div>
          <button
            onClick={employeeLogout}
            className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Summary KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Total Assigned</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white">{myAssignedComplaints.length}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Pending / Active Work</span>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{activeTasks.length}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Completed Work</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{completedTasks.length}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Location Status</span>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1">
            <Navigation className="w-3.5 h-3.5" /> GPS Active
          </span>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assigned Complaints List */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#003d9b]" />
              Assigned Tickets ({myAssignedComplaints.length})
            </h2>
          </div>

          {myAssignedComplaints.length === 0 ? (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-xs">
              No tickets assigned to you right now.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {myAssignedComplaints.map((item) => {
                const isSelected = activeComplaint?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedComplaintId(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-slate-700/80 border-[#003d9b] shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono font-bold text-[#003d9b] dark:text-blue-400">#{item.referenceNo}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          item.status === 'Resolved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-xs line-clamp-1">{item.category}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{item.location}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                      <span>Priority: <strong className="text-slate-700 dark:text-slate-300">{item.priority || 'Normal'}</strong></span>
                      <span>{item.submittedAt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Complaint Detail & Work Execution Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-6">
          {!activeComplaint ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              Select an assigned complaint to update progress.
            </div>
          ) : (
            <>
              {/* Ticket Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-[#003d9b] dark:text-blue-400 text-base">#{activeComplaint.referenceNo}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-300">
                      {activeComplaint.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">{activeComplaint.location}</h2>
                </div>

                <div className="text-xs font-semibold text-slate-500">
                  Ward: <strong className="text-slate-800 dark:text-slate-200">{activeComplaint.ward}</strong>
                </div>
              </div>

              {/* Description & Citizen Photo */}
              <div className="space-y-3">
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <strong>Description:</strong> {activeComplaint.description}
                </p>

                {activeComplaint.photoUrl && (
                  <div>
                    <span className="text-xs font-bold text-slate-500 block mb-1">Citizen Reported Photo:</span>
                    <img
                      src={activeComplaint.photoUrl}
                      alt="Complaint"
                      className="w-full max-h-48 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs"
                    />
                  </div>
                )}
              </div>

              {/* Work Execution Form */}
              <form onSubmit={handleSubmitWorkUpdate} className="bg-slate-50 dark:bg-slate-900/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Field Progress & Photo Evidence
                </h3>

                {/* Progress State Buttons */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Select Work Progress Stage:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Work Accepted', 'Work Started', 'In Progress', 'Completed', 'Rejected'] as const).map((stage) => (
                      <button
                        key={stage}
                        type="button"
                        onClick={() => setWorkStage(stage)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          workStage === stage
                            ? 'bg-[#003d9b] text-white border-[#003d9b] shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-blue-400'
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Before & After Photo Uploaders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Before Work Photo */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Before Work Photo
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3 text-center bg-white dark:bg-slate-800">
                      {beforePhoto || activeComplaint.beforePhotoUrl ? (
                        <div className="space-y-2">
                          <img
                            src={beforePhoto || activeComplaint.beforePhotoUrl}
                            alt="Before Work"
                            className="w-full h-28 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setBeforePhoto(null)}
                            className="text-[10px] text-red-500 font-bold hover:underline"
                          >
                            Remove / Change
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block py-2">
                          <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                          <span className="text-xs text-blue-600 font-bold">Upload Before Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, 'before')}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* After Work Photo */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      After Work Photo
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-3 text-center bg-white dark:bg-slate-800">
                      {afterPhoto || activeComplaint.afterPhotoUrl ? (
                        <div className="space-y-2">
                          <img
                            src={afterPhoto || activeComplaint.afterPhotoUrl}
                            alt="After Work"
                            className="w-full h-28 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setAfterPhoto(null)}
                            className="text-[10px] text-red-500 font-bold hover:underline"
                          >
                            Remove / Change
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block py-2">
                          <Camera className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                          <span className="text-xs text-emerald-600 font-bold">Upload After Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, 'after')}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* GPS Location Capture */}
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">Field GPS Location Tag</span>
                      <span className="text-[11px] text-slate-500">
                        {gpsLocation ? `Lat: ${gpsLocation.lat.toFixed(4)}, Lng: ${gpsLocation.lng.toFixed(4)}` : 'Location not fetched'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCaptureGps}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isCapturingGps ? 'animate-spin' : ''}`} /> Get GPS
                  </button>
                </div>

                {/* Work Remark Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Employee Remark / Work Log
                  </label>
                  <textarea
                    rows={2}
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Describe field actions taken, materials used, or issues encountered..."
                    className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#003d9b]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Save Field Progress Update
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
