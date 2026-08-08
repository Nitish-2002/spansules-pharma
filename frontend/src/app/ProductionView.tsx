'use strict';

import React from 'react';
import { Translation } from './i18n';
import { Plus } from 'lucide-react';

interface ProductionViewProps {
  t: (key: keyof Translation) => string;
  batches: any[];
  medicines: any[];
  newBatch: any;
  setNewBatch: (data: any) => void;
  handleCreateBatch: (e: React.FormEvent) => void;
  handleUpdateStep: (stepId: string, status: string) => void;
  handleCompleteBatch: (batchId: string) => void;
}

export default function ProductionView({
  t,
  batches,
  medicines,
  newBatch,
  setNewBatch,
  handleCreateBatch,
  handleUpdateStep,
  handleCompleteBatch,
}: ProductionViewProps) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form to Start Batch */}
        <div className="glass-card p-6 rounded-3xl h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-600" />
            {t('startNewBatch')}
          </h3>
          <form onSubmit={handleCreateBatch} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('batchNumber')}</label>
              <input 
                type="text" required placeholder="BAT-909"
                value={newBatch.batchNumber} 
                onChange={e => setNewBatch({...newBatch, batchNumber: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('targetMedicine')}</label>
              <select 
                value={newBatch.medicineId} 
                onChange={e => setNewBatch({...newBatch, medicineId: e.target.value})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white cursor-pointer"
              >
                <option value="">{t('selectItem')}</option>
                {medicines.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{t('targetQuantity')}</label>
              <input 
                type="number" required placeholder="100"
                value={newBatch.quantity} 
                onChange={e => setNewBatch({...newBatch, quantity: parseFloat(e.target.value)})} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600 text-sm bg-white/50" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3.5 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg mt-2 cursor-pointer"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              {t('initializeBatchProcess')}
            </button>
          </form>
        </div>

        {/* Batch Progress Board */}
        <div className="lg:col-span-2 space-y-6">
          {batches.map((batch) => (
            <div key={batch.id} className="glass-card p-6 rounded-3xl space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100/80 pb-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-800">{t('batchNumber')}: {batch.batchNumber}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{t('medicine')}: {batch.medicine?.name} | {t('targetQuantity')}: {batch.quantity}</p>
                </div>
                <div>
                  {batch.status === 'IN_PROCESS' ? (
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">
                      IN PROCESS
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100" style={{ color: 'var(--primary-color)', backgroundColor: 'var(--secondary-color)', borderColor: 'rgba(15, 81, 50, 0.1)' }}>
                      COMPLETED
                    </span>
                  )}
                </div>
              </div>

              {/* Process Steps */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {batch.inProcessSteps?.map((step: any, idx: number) => (
                  <div key={step.id} className="text-center relative border border-gray-100/50 p-3 rounded-2xl bg-white/30 backdrop-blur-sm">
                    <div className="text-[10px] uppercase font-bold text-gray-400 mb-3 tracking-wide">{step.stepName}</div>
                    <button 
                      onClick={() => {
                        if (batch.status === 'IN_PROCESS') {
                          const nextStatus = step.status === 'PENDING' ? 'ACTIVE' : step.status === 'ACTIVE' ? 'COMPLETED' : 'PENDING';
                          handleUpdateStep(step.id, nextStatus);
                        }
                      }}
                      className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center font-bold text-xs shadow-md border transition-all cursor-pointer ${
                        step.status === 'COMPLETED' 
                          ? 'bg-emerald-800 text-white border-emerald-900 scale-105' 
                          : step.status === 'ACTIVE' 
                          ? 'bg-yellow-400 text-white border-yellow-500 animate-pulse scale-105 shadow-yellow-200'
                          : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200/50'
                      }`}
                      style={{ 
                        backgroundColor: step.status === 'COMPLETED' ? 'var(--primary-color)' : undefined,
                        borderColor: step.status === 'COMPLETED' ? 'var(--primary-color)' : undefined
                      }}
                    >
                      {idx + 1}
                    </button>
                    <div className="text-[9px] font-bold text-gray-500 mt-2.5 uppercase tracking-wider">{step.status}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              {batch.status === 'IN_PROCESS' && (
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => handleCompleteBatch(batch.id)}
                    className="px-5 py-2.5 text-white text-xs font-bold rounded-xl transition-all shadow hover:shadow-lg cursor-pointer"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                  >
                    {t('markBatchCompleted')}
                  </button>
                </div>
              )}
            </div>
          ))}
          {batches.length === 0 && (
            <div className="glass-card p-12 rounded-3xl text-center text-gray-400 font-medium">
              {t('noActiveBatches')}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
