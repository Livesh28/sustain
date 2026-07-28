import React, { useState } from 'react';
import { Product, AuditLog, AIModelConfig, ProductCategory } from '../types';
import { Settings, Plus, Trash2, Edit3, ShieldAlert, Cpu, RefreshCw, FileText, CheckCircle2, Sliders, Database, Download } from 'lucide-react';

interface Props {
  products: Product[];
  auditLogs: AuditLog[];
  modelConfig: AIModelConfig;
  onAddProduct: (newProd: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateModelConfig: (cfg: Partial<AIModelConfig>) => void;
}

export const AdminPortalView: React.FC<Props> = ({
  products,
  auditLogs,
  modelConfig,
  onAddProduct,
  onDeleteProduct,
  onUpdateModelConfig
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'ai_weights' | 'audit'>('products');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isReindexing, setIsReindexing] = useState(false);

  // Form State for Add Product
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Kitchen & Dining');
  const [price, setPrice] = useState('899');
  const [description, setDescription] = useState('');
  const [durabilityYears, setDurabilityYears] = useState('2');
  const [repairabilityIndex, setRepairabilityIndex] = useState('10');

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddProduct({
      title,
      brand: brand || 'Eco Innovators',
      category,
      price: Number(price),
      description: description || 'High efficiency sustainable product built with low-carbon lifecycle materials.',
      durabilityYears: Number(durabilityYears),
      repairabilityIndex: Number(repairabilityIndex)
    });

    // Reset form
    setTitle('');
    setBrand('');
    setShowAddModal(false);
  };

  const handleReindexVectorDB = () => {
    setIsReindexing(true);
    setTimeout(() => {
      setIsReindexing(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-[32px] border border-[#E1D7C6] p-6 shadow-xs space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E1D7C6] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#F1F1E6] text-[#5F7161] rounded-2xl border border-[#E1D7C6]">
            <Settings className="w-6 h-6 text-[#5F7161]" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#2C3333]">
              Platform Admin & AI Model Management
            </h2>
            <p className="text-xs text-[#5F7161] italic mt-0.5">
              Manage product catalog, tune recommendation weights, re-index vector space & audit logs
            </p>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex bg-[#F5F2ED] border border-[#E1D7C6] p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'products' ? 'bg-[#5F7161] text-white shadow-xs' : 'text-[#2C3333] hover:text-[#5F7161]'}`}
          >
            Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('ai_weights')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'ai_weights' ? 'bg-[#5F7161] text-white shadow-xs' : 'text-[#2C3333] hover:text-[#5F7161]'}`}
          >
            AI Weights
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'audit' ? 'bg-[#5F7161] text-white shadow-xs' : 'text-[#2C3333] hover:text-[#5F7161]'}`}
          >
            Audit Logs
          </button>
        </div>
      </div>

      {/* TAB 1: Product Management */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8D9971]">
              Active Products Directory
            </h3>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#5F7161] hover:bg-[#6D8B74] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#EFEAD8]" /> Add Product
            </button>
          </div>

          <div className="overflow-x-auto border border-[#E1D7C6] rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F5F2ED] border-b border-[#E1D7C6] font-bold uppercase tracking-wider text-[#8D9971]">
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Eco Score</th>
                  <th className="p-3">Carbon CO₂e</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1D7C6]/60 text-[#2C3333]">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-[#F5F2ED]/60">
                    <td className="p-3 flex items-center gap-2.5">
                      <img src={p.imageUrl} alt="thumb" className="w-9 h-9 rounded-xl object-cover border border-[#E1D7C6]" />
                      <div>
                        <div className="font-serif font-bold text-sm text-[#2C3333]">{p.title}</div>
                        <div className="text-[10px] text-[#8D9971]">{p.brand}</div>
                      </div>
                    </td>
                    <td className="p-3 text-[#2C3333]">{p.category}</td>
                    <td className="p-3 font-serif font-bold text-[#2C3333] text-sm">{p.currency || '₹'}{p.price.toLocaleString('en-IN')}</td>
                    <td className="p-3">
                      <span className="font-bold text-[#5F7161] bg-[#F1F1E6] px-2.5 py-1 rounded-full border border-[#E1D7C6]">
                        {p.sustainabilityScore.overall}/100 ({p.sustainabilityScore.grade})
                      </span>
                    </td>
                    <td className="p-3 text-[#5F7161] font-semibold">{p.carbonFootprint.totalCO2eKg} kg</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: AI Model Weights Tuning */}
      {activeTab === 'ai_weights' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-[#2C3333] text-white p-5 rounded-[24px] border border-[#E1D7C6]/30">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-[#D4A373]" />
              <div>
                <h4 className="font-serif font-bold text-base text-white">FAISS Vector Search & Neural Model Hyperparameters</h4>
                <p className="text-xs text-gray-300 italic">Adjust weight coefficients for hybrid recommendation engine</p>
              </div>
            </div>

            <button
              onClick={handleReindexVectorDB}
              disabled={isReindexing}
              className="bg-[#5F7161] hover:bg-[#6D8B74] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <Database className={`w-4 h-4 text-[#EFEAD8] ${isReindexing ? 'animate-spin' : ''}`} />
              {isReindexing ? 'Re-indexing FAISS...' : 'Re-index Embeddings'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F5F2ED] p-6 rounded-[24px] border border-[#E1D7C6]">
            {/* Slider 1 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#2C3333]">
                <span>Sustainability Score Weight</span>
                <span className="text-[#5F7161] font-serif text-sm">{Math.round(modelConfig.sustainabilityScoreWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={modelConfig.sustainabilityScoreWeight}
                onChange={(e) => onUpdateModelConfig({ sustainabilityScoreWeight: Number(e.target.value) })}
                className="w-full accent-[#5F7161]"
              />
            </div>

            {/* Slider 2 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#2C3333]">
                <span>Product Similarity Semantic Weight</span>
                <span className="text-[#5F7161] font-serif text-sm">{Math.round(modelConfig.productSimilarityWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={modelConfig.productSimilarityWeight}
                onChange={(e) => onUpdateModelConfig({ productSimilarityWeight: Number(e.target.value) })}
                className="w-full accent-[#5F7161]"
              />
            </div>

            {/* Slider 3 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#2C3333]">
                <span>Carbon Emissions Penalty Factor</span>
                <span className="text-[#D4A373] font-serif text-sm">{modelConfig.carbonPenaltyFactor}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={modelConfig.carbonPenaltyFactor}
                onChange={(e) => onUpdateModelConfig({ carbonPenaltyFactor: Number(e.target.value) })}
                className="w-full accent-[#5F7161]"
              />
            </div>

            {/* Slider 4 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#2C3333]">
                <span>Review Sentiment NLP Weight</span>
                <span className="text-[#5F7161] font-serif text-sm">{Math.round(modelConfig.reviewSentimentWeight * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.5"
                step="0.05"
                value={modelConfig.reviewSentimentWeight}
                onChange={(e) => onUpdateModelConfig({ reviewSentimentWeight: Number(e.target.value) })}
                className="w-full accent-[#5F7161]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8D9971]">
              System Audit & Operations Log
            </h3>
            <button
              onClick={() => {
                const csvHeader = 'ID,Timestamp,User,Role,Action,Module,Status,Details\n';
                const csvRows = auditLogs.map(l => `"${l.id}","${l.timestamp}","${l.user}","${l.role}","${l.action}","${l.module}","${l.status}","${l.details.replace(/"/g, '""')}"`).join('\n');
                const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `audit-logs-${new Date().toISOString().substring(0, 10)}.csv`;
                a.click();
              }}
              className="px-3 py-1 bg-[#F5F2ED] hover:bg-[#E1D7C6] border border-[#E1D7C6] text-[#2C3333] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#5F7161]" />
              Export Audit CSV
            </button>
          </div>

          <div className="space-y-2">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3.5 bg-[#F5F2ED] rounded-2xl border border-[#E1D7C6] flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#2C3333]">{log.action}</span>
                    <span className="text-[10px] bg-[#EFEAD8] text-[#2C3333] border border-[#E1D7C6] px-2 py-0.5 rounded-lg font-mono">{log.module}</span>
                  </div>
                  <p className="text-[#5F7161] mt-1">{log.details}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-gray-500 block">{log.timestamp}</span>
                  <span className="text-[10px] text-[#5F7161] font-bold">{log.user} ({log.role})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C3333]/70 backdrop-blur-xs">
          <div className="bg-[#F5F2ED] border border-[#E1D7C6] rounded-[32px] p-8 w-full max-w-lg shadow-2xl space-y-5">
            <h3 className="text-2xl font-serif font-bold text-[#2C3333]">
              Register New Sustainable Product
            </h3>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#2C3333] font-bold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. BioTray Sugarcane Meal Set"
                  className="w-full p-3 rounded-xl border border-[#E1D7C6] bg-white text-[#2C3333] focus:ring-2 focus:ring-[#5F7161] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#2C3333] font-bold mb-1">Brand</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    placeholder="e.g. EcoEarth India"
                    className="w-full p-3 rounded-xl border border-[#E1D7C6] bg-white text-[#2C3333] focus:ring-2 focus:ring-[#5F7161] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[#2C3333] font-bold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as ProductCategory)}
                    className="w-full p-3 rounded-xl border border-[#E1D7C6] bg-white text-[#2C3333] focus:ring-2 focus:ring-[#5F7161] outline-hidden"
                  >
                    <option value="Kitchen & Dining">Kitchen & Dining</option>
                    <option value="Packaging">Packaging</option>
                    <option value="Grocery & Daily Essentials">Grocery & Daily Essentials</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Home & Cleaning">Home & Cleaning</option>
                    <option value="Office & Stationery">Office & Stationery</option>
                    <option value="Fashion & Accessories">Fashion & Accessories</option>
                    <option value="Gardening">Gardening</option>
                    <option value="Household Products">Household Products</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#2C3333] font-bold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E1D7C6] bg-white text-[#2C3333] focus:ring-2 focus:ring-[#5F7161] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[#2C3333] font-bold mb-1">Durability (Yrs)</label>
                  <input
                    type="number"
                    value={durabilityYears}
                    onChange={e => setDurabilityYears(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E1D7C6] bg-white text-[#2C3333] focus:ring-2 focus:ring-[#5F7161] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[#2C3333] font-bold mb-1">Repair Index (1-10)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={repairabilityIndex}
                    onChange={e => setRepairabilityIndex(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E1D7C6] bg-white text-[#2C3333] focus:ring-2 focus:ring-[#5F7161] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#2C3333] font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E1D7C6] bg-white text-[#2C3333] focus:ring-2 focus:ring-[#5F7161] outline-hidden"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#E1D7C6] text-[#2C3333] font-bold hover:bg-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#5F7161] hover:bg-[#6D8B74] text-white font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
