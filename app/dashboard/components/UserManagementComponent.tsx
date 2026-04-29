'use client';
import React, { useState, useEffect } from 'react';
interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Operator';
}
const defaultUsers: User[] = [
  { id: 1, name: 'John Smith', email: 'john.smith@thalassa.com', role: 'Admin' },
  { id: 2, name: 'Sarah Connor', email: 'sarah.connor@thalassa.com', role: 'Operator' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@thalassa.com', role: 'Operator' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@thalassa.com', role: 'Admin' },
  { id: 5, name: 'David Wilson', email: 'david.wilson@thalassa.com', role: 'Operator' },
];
export default function UserManagementComponent() {
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Operator' });
  useEffect(() => {
    try {
      const saved = localStorage.getItem('thalassaUsers');
      if (saved) {
        setUsers(JSON.parse(saved));
      } else {
        localStorage.setItem('thalassaUsers', JSON.stringify(defaultUsers));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  const saveUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    try {
      localStorage.setItem('thalassaUsers', JSON.stringify(newUsers));
    } catch (e) {}
  };
  const handleAddUser = () => {
    if (!formData.name || !formData.email) return;
    const newUser: User = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role as 'Admin' | 'Operator'
    };
    saveUsers([...users, newUser]);
    setShowAddModal(false);
    setFormData({ name: '', email: '', role: 'Operator' });
  };
  const handleEditUser = () => {
    if (!selectedUser || !formData.name || !formData.email) return;
    const updatedUsers = users.map(u => 
      u.id === selectedUser.id ? { ...u, name: formData.name, email: formData.email, role: formData.role as 'Admin' | 'Operator' } : u
    );
    saveUsers(updatedUsers);
    setShowEditModal(false);
  };
  const handleDeleteUser = () => {
    if (!selectedUser) return;
    saveUsers(users.filter(u => u.id !== selectedUser.id));
    setShowDeleteModal(false);
  };
  const openEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowEditModal(true);
  };
  const openDelete = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };
  const openPassword = (user: User) => {
    setSelectedUser(user);
    setShowPasswordModal(true);
  };
  const totalUsers = users.length;
  const admins = users.filter(u => u.role === 'Admin').length;
  const operators = users.filter(u => u.role === 'Operator').length;
  return (
    <div className="animate-fade-in text-white w-full font-sans">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.4)]">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-wide">User Management</h2>
            <p className="text-gray-400 text-sm mt-1">Manage system users and access levels</p>
          </div>
        </div>
        <button 
          onClick={() => { setFormData({ name: '', email: '', role: 'Operator' }); setShowAddModal(true); }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
        >
          <span className="text-xl leading-none mt-[-2px]">+</span> Add User
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#120e1c] border border-purple-500/20 rounded-2xl p-6 flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-400 mb-1">Total Users</div>
            <div className="text-3xl font-bold text-white">{totalUsers}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <div className="bg-[#120e1c] border border-purple-500/20 rounded-2xl p-6 flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-400 mb-1">Administrators</div>
            <div className="text-3xl font-bold text-purple-300">{admins}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
        <div className="bg-[#120e1c] border border-purple-500/20 rounded-2xl p-6 flex justify-between items-center">
          <div>
            <div className="text-xs text-gray-400 mb-1">Operators</div>
            <div className="text-3xl font-bold text-blue-300">{operators}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#0b0a0e] border border-gray-800/60 rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-800/60">
          <h3 className="text-xs font-bold tracking-widest text-purple-400 uppercase font-mono">System Users</h3>
          <span className="text-xs text-gray-500 font-mono">{totalUsers} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800/60 text-[10px] font-bold tracking-widest text-purple-400 uppercase font-mono bg-[#0d0a14]">
                <th className="p-5 font-medium">Name</th>
                <th className="p-5 font-medium">Email</th>
                <th className="p-5 font-medium">Role</th>
                <th className="p-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800/40 hover:bg-[#12101a] transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${user.role === 'Admin' ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-blue-500/20 border-blue-500/50 text-blue-300'}`}>
                        {user.role === 'Admin' ? (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                        )}
                      </div>
                      <span className="font-medium text-sm text-gray-200">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-gray-400">{user.email}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider font-mono border ${
                      user.role === 'Admin' 
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(user)} className="p-2 rounded-lg bg-[#121016] border border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button onClick={() => openDelete(user)} className="p-2 rounded-lg bg-[#121016] border border-gray-800 hover:border-red-500/50 hover:text-red-400 text-gray-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                      <button onClick={() => openPassword(user)} className="p-2 rounded-lg bg-[#121016] border border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b0a0e] border border-purple-500/30 rounded-2xl w-full max-w-md p-6 shadow-[0_0_40px_rgba(139,92,246,0.15)] relative font-mono">
            <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-xl font-bold text-purple-400 mb-6 tracking-wide">Add New User</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-400 tracking-widest mb-2 block uppercase">Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#121016] border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 tracking-widest mb-2 block uppercase">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#121016] border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 tracking-widest mb-2 block uppercase">Role</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[#121016] border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500 appearance-none">
                  <option value="Operator">Operator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 rounded-xl bg-[#2a2b36] hover:bg-[#363746] text-white font-medium text-sm transition-colors">
                Cancel
              </button>
              <button onClick={handleAddUser} className="flex-1 py-3 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium text-sm transition-colors shadow-[0_0_15px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2">
                <span className="text-lg leading-none mt-[-2px]">+</span> Add User
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b0a0e] border border-purple-500/30 rounded-2xl w-full max-w-md p-6 shadow-[0_0_40px_rgba(139,92,246,0.15)] relative font-mono">
            <button onClick={() => setShowEditModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-xl font-bold text-purple-400 mb-6 tracking-wide">Edit User</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-400 tracking-widest mb-2 block uppercase">Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#121016] border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 tracking-widest mb-2 block uppercase">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#121016] border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 tracking-widest mb-2 block uppercase">Role</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-[#121016] border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500 appearance-none">
                  <option value="Operator">Operator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowEditModal(false)} className="flex-1 py-3 rounded-xl bg-[#2a2b36] hover:bg-[#363746] text-white font-medium text-sm transition-colors">
                Cancel
              </button>
              <button onClick={handleEditUser} className="flex-1 py-3 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium text-sm transition-colors shadow-[0_0_15px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b0a0e] border border-red-500/30 rounded-2xl w-full max-w-md p-6 shadow-[0_0_40px_rgba(239,68,68,0.15)] relative font-mono">
            <button onClick={() => setShowDeleteModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-xl font-bold text-red-400 mb-4 tracking-wide">Confirm Delete</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 rounded-xl bg-[#2a2b36] hover:bg-[#363746] text-white font-medium text-sm transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteUser} className="flex-1 py-3 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-medium text-sm transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showPasswordModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b0a0e] border border-purple-500/30 rounded-2xl w-full max-w-md p-6 shadow-[0_0_40px_rgba(139,92,246,0.15)] relative font-mono">
            <button onClick={() => setShowPasswordModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-xl font-bold text-purple-400 mb-6 tracking-wide">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-400 tracking-widest mb-2 block uppercase">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#121016] border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 tracking-widest mb-2 block uppercase">Confirm Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#121016] border border-gray-800 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-purple-500" />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setShowPasswordModal(false)} className="flex-1 py-3 rounded-xl bg-[#2a2b36] hover:bg-[#363746] text-white font-medium text-sm transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowPasswordModal(false)} className="flex-1 py-3 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium text-sm transition-colors shadow-[0_0_15px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
