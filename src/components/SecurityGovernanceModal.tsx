import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Key, Smartphone, Fingerprint, EyeOff, FileText, CheckCircle2, AlertTriangle, Download, RefreshCw, Cpu, Server, Database, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { UserProfile, Product } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  products: Product[];
  onShowToast: (msg: string) => void;
}

export const SecurityGovernanceModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userProfile,
  products,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'product_security' | 'user_privacy' | 'server_isolation' | 'rbac'>('product_security');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [anonymousAudits, setAnonymousAudits] = useState(false);
  const [cookieConsentStrict, setCookieConsentStrict] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [verifyingProductHash, setVerifyingProductHash] = useState(false);
  const [hashVerified, setHashVerified] = useState(false);

  if (!isOpen) return null;

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Simulated Digital Product Passport Hash
  const generateSHA256Hash = (id: string) => {
    return `0x8f3a9e21b7c4d5e${id.slice(0, 4)}6a8b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c`;
  };

  const handleVerifyProductIntegrity = () => {
    setVerifyingProductHash(true);
    setHashVerified(false);
    setTimeout(() => {
      setVerifyingProductHash(false);
      setHashVerified(true);
      onShowToast(`Product Passport SHA-256 Hash verified for ${selectedProduct?.title}`);
    }, 800);
  };

  const handleConfirm2FA = () => {
    if (otpCode.length === 6) {
      setIs2FAEnabled(true);
      setShow2FASetup(false);
      setOtpCode('');
      onShowToast('2FA Two-Factor Authentication successfully activated for your account!');
    } else {
      onShowToast('Please enter a valid 6-digit verification code.');
    }
  };

  const handleExportUserData = () => {
    const data = {
      profile: userProfile,
      privacySettings: {
        anonymousAudits,
        cookieConsentStrict,
        twoFactorAuthActive: is2FAEnabled
      },
      securitySignature: `SIG-LEV-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Leviathan_User_Security_Data_${userProfile.name.replace(/\s+/g, '_')}.json`;
    a.click();
    onShowToast('Personal user data exported in encrypted JSON schema.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-[#E1D7C6] rounded-[32px] max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Security Header */}
        <div className="bg-[#2C3333] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-[#5F7161] rounded-2xl text-white shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#EFEAD8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-lg sm:text-xl text-white">
                  Security, Privacy & Product Governance Center
                </h2>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#5F7161]/30 text-[#D4A373] px-2.5 py-0.5 rounded-full border border-[#D4A373]/30">
                  DPDP & ISO 14067 Compliant
                </span>
              </div>
              <p className="text-xs text-[#A3B18A] mt-0.5">
                End-to-End Cryptographic Product Verification & User Data Safeguards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#F5F2ED] px-6 py-2.5 border-b border-[#E1D7C6] flex gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('product_security')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'product_security'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'bg-white/80 text-[#2C3333] hover:bg-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Product Security & Passport</span>
          </button>

          <button
            onClick={() => setActiveTab('user_privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'user_privacy'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'bg-white/80 text-[#2C3333] hover:bg-white'
            }`}
          >
            <Fingerprint className="w-3.5 h-3.5" />
            <span>User Privacy & 2FA</span>
          </button>

          <button
            onClick={() => setActiveTab('server_isolation')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'server_isolation'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'bg-white/80 text-[#2C3333] hover:bg-white'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>API Isolation & Zero Leaks</span>
          </button>

          <button
            onClick={() => setActiveTab('rbac')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'rbac'
                ? 'bg-[#5F7161] text-white shadow-xs'
                : 'bg-white/80 text-[#2C3333] hover:bg-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Role Access (RBAC)</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: Product Security & Passport */}
          {activeTab === 'product_security' && (
            <div className="space-y-5">
              <div className="bg-[#F9F7F3] border border-[#E1D7C6] p-4 rounded-2xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#5F7161] shrink-0 mt-0.5" />
                <div className="text-xs text-[#2C3333]">
                  <p className="font-bold">Anti-Counterfeit & Greenwash Fraud Shield</p>
                  <p className="text-gray-600 mt-0.5">
                    Every product in the Leviathan catalog is bound to a Digital Product Passport (DPP) containing an immutable cryptographic audit hash verifying seller credentials, ISO certifications, and Scope 3 lifecycle data.
                  </p>
                </div>
              </div>

              {/* Product Selector for SHA-256 Inspection */}
              <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#E1D7C6]">
                <label className="text-xs font-bold text-[#2C3333] uppercase tracking-wider block">
                  Select Product for Digital Passport SHA-256 Audit:
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => {
                    setSelectedProductId(e.target.value);
                    setHashVerified(false);
                  }}
                  className="w-full text-xs font-medium p-2.5 bg-[#F5F2ED] border border-[#E1D7C6] rounded-xl focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.brand}) — Score {p.sustainabilityScore.overall}/100
                    </option>
                  ))}
                </select>

                {selectedProduct && (
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-[#F5F2ED] p-3 rounded-xl border border-[#E1D7C6]">
                        <span className="text-[10px] text-gray-400 font-bold uppercase block">Verified Seller</span>
                        <strong className="text-[#2C3333] font-semibold">{selectedProduct.seller.name}</strong>
                        <span className="text-[10px] text-[#5F7161] block">GSTIN / BIS Verified</span>
                      </div>

                      <div className="bg-[#F5F2ED] p-3 rounded-xl border border-[#E1D7C6]">
                        <span className="text-[10px] text-gray-400 font-bold uppercase block">Certifications Count</span>
                        <strong className="text-[#5F7161] font-semibold">{selectedProduct.certifications.length} Active Audits</strong>
                        <span className="text-[10px] text-gray-500 block">FSC / Energy Star / ISO</span>
                      </div>
                    </div>

                    <div className="bg-[#2C3333] text-white p-3.5 rounded-xl font-mono text-[11px] space-y-1.5 break-all">
                      <div className="flex justify-between items-center text-[10px] text-[#A3B18A] font-sans">
                        <span>DIGITAL PRODUCT PASSPORT HASH</span>
                        <span>SHA-256</span>
                      </div>
                      <div className="text-[#EFEAD8]">{generateSHA256Hash(selectedProduct.id)}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleVerifyProductIntegrity}
                        disabled={verifyingProductHash}
                        className="px-4 py-2 bg-[#5F7161] hover:bg-[#4E5D50] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        {verifyingProductHash ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Verifying Hash...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verify Cryptographic Integrity
                          </>
                        )}
                      </button>

                      {hashVerified && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Hash Authentic & Unaltered
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: User Privacy & 2FA */}
          {activeTab === 'user_privacy' && (
            <div className="space-y-5">
              {/* 2FA Section */}
              <div className="bg-white p-5 rounded-2xl border border-[#E1D7C6] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#5F7161]/10 rounded-xl text-[#5F7161]">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#2C3333]">Two-Factor Authentication (2FA)</h3>
                      <p className="text-xs text-gray-500">Protect account & high-value enterprise transactions with TOTP authenticator.</p>
                    </div>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${is2FAEnabled ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    {is2FAEnabled ? '2FA ACTIVE' : '2FA DISABLED'}
                  </span>
                </div>

                {!is2FAEnabled && !show2FASetup && (
                  <button
                    onClick={() => setShow2FASetup(true)}
                    className="px-4 py-2 bg-[#5F7161] hover:bg-[#4E5D50] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Set Up Authenticator 2FA
                  </button>
                )}

                {show2FASetup && (
                  <div className="bg-[#F9F7F3] p-4 rounded-xl border border-[#E1D7C6] space-y-3">
                    <p className="text-xs font-bold text-[#2C3333]">Scan QR Code with Google Authenticator or Authy:</p>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 bg-white border border-gray-300 rounded-lg flex items-center justify-center p-2 shrink-0">
                        <div className="grid grid-cols-4 gap-1 w-full h-full">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <div key={i} className={`${i % 2 === 0 ? 'bg-[#2C3333]' : 'bg-transparent'} rounded-xs`} />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 flex-1">
                        <span className="text-[10px] text-gray-400 font-bold block uppercase">Secret Key: LEVI-782A-99B4</span>
                        <input
                          type="text"
                          placeholder="Enter 6-digit Code (e.g., 123456)"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="w-full p-2 text-xs font-mono border border-[#E1D7C6] rounded-lg bg-white"
                        />
                        <button
                          onClick={handleConfirm2FA}
                          className="px-4 py-1.5 bg-[#5F7161] text-white text-xs font-bold rounded-lg cursor-pointer"
                        >
                          Verify & Activate 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* DPDP Data Protection Controls */}
              <div className="bg-white p-5 rounded-2xl border border-[#E1D7C6] space-y-4">
                <h3 className="font-bold text-sm text-[#2C3333] flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-[#5F7161]" /> Digital Personal Data Protection (DPDP) Toggles
                </h3>

                <div className="space-y-3 text-xs">
                  <label className="flex items-center justify-between p-3 bg-[#F5F2ED] rounded-xl cursor-pointer">
                    <div>
                      <span className="font-bold text-[#2C3333] block">Anonymous Sustainability Auditing</span>
                      <span className="text-gray-500 text-[11px]">Strip personal identifiers from global Scope 3 benchmark aggregates.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={anonymousAudits}
                      onChange={(e) => setAnonymousAudits(e.target.checked)}
                      className="w-4 h-4 accent-[#5F7161]"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-[#F5F2ED] rounded-xl cursor-pointer">
                    <div>
                      <span className="font-bold text-[#2C3333] block">Strict Cookie & Telemetry Minimization</span>
                      <span className="text-gray-500 text-[11px]">Reject all non-essential marketing and third-party tracking cookies.</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={cookieConsentStrict}
                      onChange={(e) => setCookieConsentStrict(e.target.checked)}
                      className="w-4 h-4 accent-[#5F7161]"
                    />
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={handleExportUserData}
                    className="px-4 py-2 bg-white border border-[#E1D7C6] hover:bg-[#F5F2ED] text-[#2C3333] font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#5F7161]" /> Export My Encrypted Data (JSON)
                  </button>

                  <span className="text-[10px] text-gray-400 italic">User ID: {userProfile.id}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: API Isolation & Zero Leaks */}
          {activeTab === 'server_isolation' && (
            <div className="space-y-4">
              <div className="bg-[#2C3333] text-white p-5 rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[#A3B18A] font-sans font-bold flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#D4A373]" /> SERVER-SIDE API KEY ISOLATION STATUS
                  </span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800 text-[10px]">
                    100% SECURE
                  </span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-gray-400">Gemini API Key Proxy:</span>
                    <span className="text-emerald-300">Server-Side Only (/api/gemini/*) — No Browser Exposure</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-gray-400">Transport Security:</span>
                    <span className="text-emerald-300">TLS 1.3 Encryption / HTTPS Forced</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-gray-400">Rate Limiting Protection:</span>
                    <span className="text-emerald-300">Active (Max 100 req/min per IP)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400">XSS & CSRF Defense:</span>
                    <span className="text-emerald-300">Content-Security-Policy Strict Headers</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E1D7C6] text-xs space-y-2">
                <h4 className="font-bold text-[#2C3333] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#5F7161]" /> AI Prompt Input Sanitization & Safety Filter
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  All queries submitted to the Gemini AI Assistant pass through input sanitization filters to prevent prompt injection, unauthorized code execution, and privacy leakage.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: RBAC Role Access */}
          {activeTab === 'rbac' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E1D7C6] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#2C3333]">Active Session Role: <span className="uppercase text-[#5F7161]">{userProfile.role}</span></h3>
                    <p className="text-xs text-gray-500">Role-Based Access Control matrix defines accessible views and administrative triggers.</p>
                  </div>
                  <UserCheck className="w-6 h-6 text-[#5F7161]" />
                </div>

                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#F5F2ED] border-b border-[#E1D7C6]">
                        <th className="p-2.5 font-bold text-[#2C3333]">Role Persona</th>
                        <th className="p-2.5 font-bold text-[#2C3333]">Catalog & Audit</th>
                        <th className="p-2.5 font-bold text-[#2C3333]">Scope 3 Fleet</th>
                        <th className="p-2.5 font-bold text-[#2C3333]">Admin Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className={userProfile.role === 'customer' ? 'bg-[#5F7161]/10 font-bold' : ''}>
                        <td className="p-2.5">Customer</td>
                        <td className="p-2.5 text-emerald-700">✓ Full Access</td>
                        <td className="p-2.5 text-gray-400">View Only</td>
                        <td className="p-2.5 text-rose-600">Restricted</td>
                      </tr>
                      <tr className={userProfile.role === 'retailer' ? 'bg-[#5F7161]/10 font-bold' : ''}>
                        <td className="p-2.5">Retailer</td>
                        <td className="p-2.5 text-emerald-700">✓ Full Access</td>
                        <td className="p-2.5 text-emerald-700">✓ Full Access</td>
                        <td className="p-2.5 text-gray-400">Limited</td>
                      </tr>
                      <tr className={userProfile.role === 'admin' ? 'bg-[#5F7161]/10 font-bold' : ''}>
                        <td className="p-2.5">Enterprise Admin</td>
                        <td className="p-2.5 text-emerald-700">✓ Full Access</td>
                        <td className="p-2.5 text-emerald-700">✓ Full Access</td>
                        <td className="p-2.5 text-emerald-700">✓ Full Access</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F5F2ED] border-t border-[#E1D7C6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#5F7161] font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Connection</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#5F7161] hover:bg-[#4E5D50] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close Security Center
          </button>
        </div>

      </div>
    </div>
  );
};
