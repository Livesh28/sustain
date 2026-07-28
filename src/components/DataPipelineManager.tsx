import React, { useState } from 'react';
import { DataAdapter, PipelineSource } from '../types';
import { Database, RefreshCw, Upload, CheckCircle2, AlertCircle, Server, FileSpreadsheet, Code, Clock, Shield } from 'lucide-react';

interface Props {
  adapters: DataAdapter[];
  onTriggerSync: (adapterId: string) => void;
  onFileUpload: (fileName: string, itemsCount: number) => void;
}

export const DataPipelineManager: React.FC<Props> = ({ adapters, onTriggerSync, onFileUpload }) => {
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setCsvFileName(file.name);

    setTimeout(() => {
      onFileUpload(file.name, 25);
      setUploading(false);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-[32px] border border-[#E1D7C6] p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E1D7C6] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#F1F1E6] text-[#5F7161] rounded-2xl border border-[#E1D7C6]">
            <Database className="w-6 h-6 text-[#5F7161]" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#2C3333]">
              Product Data Pipeline Adapters
            </h2>
            <p className="text-xs text-[#5F7161] italic mt-0.5">
              Multi-source ingestion adapters for Amazon, Flipkart, Myntra, Ajio, Croma, CSV & REST APIs
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#5F7161] bg-[#F1F1E6] px-3.5 py-1.5 rounded-full border border-[#E1D7C6]">
          6 Active Connectors
        </span>
      </div>

      {/* Adapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adapters.map((adapter) => {
          const isSyncing = adapter.status === 'syncing';

          return (
            <div key={adapter.id} className="bg-[#F5F2ED] p-4.5 rounded-[24px] border border-[#E1D7C6] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#5F7161]" />
                  <span className="font-serif font-bold text-sm text-[#2C3333]">
                    {adapter.sourceName} Connector
                  </span>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  adapter.status === 'active' ? 'bg-[#8D9971] text-white' :
                  adapter.status === 'syncing' ? 'bg-[#D4A373] text-white animate-pulse' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  {adapter.status}
                </span>
              </div>

              <div className="text-xs text-[#2C3333] space-y-1">
                <div className="flex justify-between">
                  <span>Processed Items:</span>
                  <strong className="text-[#2C3333]">{adapter.itemsProcessed.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Last Sync:</span>
                  <span className="text-gray-500">{adapter.lastSyncTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Error Rate:</span>
                  <span className={adapter.errorCount > 0 ? 'text-[#D4A373] font-bold' : 'text-[#5F7161] font-semibold'}>
                    {adapter.errorCount} Errors
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E1D7C6] flex items-center justify-between">
                <span className="text-[10px] text-gray-400 truncate max-w-[150px]">
                  {adapter.endpointUrl || 'Local File Watcher'}
                </span>

                <button
                  onClick={() => onTriggerSync(adapter.id)}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#5F7161] hover:underline disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Run Sync'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSV / JSON Manual Import Box */}
      <div className="bg-[#2C3333] text-white rounded-[28px] p-6 border border-[#E1D7C6]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#5F7161] text-[#EFEAD8] rounded-xl border border-[#6D8B74]">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-white">Manual Data Ingestion (CSV / JSON)</h4>
            <p className="text-xs text-gray-300 italic">
              Upload product catalogues with material percentages and energy certifications for batch AI audit.
            </p>
          </div>
        </div>

        <label className="bg-[#5F7161] hover:bg-[#6D8B74] text-white font-bold text-xs py-3 px-5 rounded-xl cursor-pointer flex items-center gap-2 shadow-xs transition-colors shrink-0">
          <Upload className="w-4 h-4 text-[#EFEAD8]" />
          {uploading ? 'Processing CSV...' : 'Upload Product Catalog'}
          <input
            type="file"
            accept=".csv,.json"
            onChange={handleSimulatedFileUpload}
            className="sr-only"
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
};
