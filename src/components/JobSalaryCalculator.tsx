import React, { useState } from 'react';
import { Calculator, X, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const payLevels = [
  { level: 1, basicPay: 18000 },
  { level: 2, basicPay: 19900 },
  { level: 3, basicPay: 21700 },
  { level: 4, basicPay: 25500 },
  { level: 5, basicPay: 29200 },
  { level: 6, basicPay: 35400 },
  { level: 7, basicPay: 44900 },
  { level: 8, basicPay: 47600 },
  { level: 9, basicPay: 53100 },
  { level: 10, basicPay: 56100 },
];

export default function JobSalaryCalculator({ onClose }: { onClose: () => void }) {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [cityTier, setCityTier] = useState<'X' | 'Y' | 'Z'>('X');
  const [daPercentage, setDaPercentage] = useState(50); // Current DA% approx

  const basePay = payLevels.find(l => l.level === selectedLevel)?.basicPay || 18000;
  
  // HRA Rates for 7th Pay Commission: X=30%, Y=20%, Z=10% (after 50% DA)
  const hraRate = cityTier === 'X' ? 0.30 : cityTier === 'Y' ? 0.20 : 0.10;
  
  const da = Math.round(basePay * (daPercentage / 100));
  const hra = Math.round(basePay * hraRate);
  const ta = cityTier === 'X' ? 3600 : 1800;
  const daOnTa = Math.round(ta * (daPercentage / 100));

  const grossSalary = basePay + da + hra + ta + daOnTa;
  const npsDeduction = Math.round((basePay + da) * 0.10);
  const cghsDeduction = selectedLevel >= 7 ? 650 : selectedLevel === 6 ? 450 : 250;
  const cgegisDeduction = selectedLevel >= 10 ? 120 : selectedLevel >= 6 ? 60 : 30;
  
  const totalDeductions = npsDeduction + cghsDeduction + cgegisDeduction;
  const inHandSalary = grossSalary - totalDeductions;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            <h2 className="font-bold">7th Pay Commission Calculator</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col md:flex-row gap-8 text-black">
          {/* Controls */}
          <div className="flex-1 space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Pay Matrix Level</label>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-emerald-500 bg-white"
              >
                {payLevels.map(pl => (
                  <option key={pl.level} value={pl.level}>Level {pl.level} (₹{pl.basicPay.toLocaleString()})</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">City Tier (HRA Classification)</label>
              <div className="grid grid-cols-3 gap-2">
                {(['X', 'Y', 'Z'] as const).map(tier => (
                  <button
                    key={tier}
                    onClick={() => setCityTier(tier)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-colors ${cityTier === tier ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    Tier {tier}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-500 mt-1">X: Metro, Y: Large City, Z: Other</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Dearness Allowance (DA %)</label>
              <input 
                type="number" 
                value={daPercentage}
                onChange={(e) => setDaPercentage(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 bg-gray-50 p-5 rounded-xl border border-gray-100 flex flex-col">
            <h3 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2 flex items-center justify-between">
              <span>Salary Breakdown</span>
              <span className="text-xs font-normal text-gray-500">Monthly</span>
            </h3>
            
            <div className="space-y-2 text-sm flex-1">
              <div className="flex justify-between text-gray-600"><span className="font-medium text-gray-900">Basic Pay</span> <span>₹{basePay.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-600"><span className="font-medium text-gray-900">Dearness Allowance (DA)</span> <span>₹{da.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-600"><span className="font-medium text-gray-900">House Rent (HRA)</span> <span>₹{hra.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-600"><span className="font-medium text-gray-900">Transport Allow. (TA)</span> <span>₹{ta.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-600"><span className="font-medium text-gray-900">DA on TA</span> <span>₹{daOnTa.toLocaleString()}</span></div>
              
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-gray-900">
                <span>Gross Salary</span> <span>₹{grossSalary.toLocaleString()}</span>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-gray-500 text-xs text-red-500/80"><span>NPS Deduction (10%)</span> <span>-₹{npsDeduction.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-500 text-xs text-red-500/80"><span>CGHS Deduction</span> <span>-₹{cghsDeduction.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-500 text-xs text-red-500/80"><span>CGEGIS Deduction</span> <span>-₹{cgegisDeduction.toLocaleString()}</span></div>
              </div>
            </div>

            <div className="mt-6 bg-emerald-600 text-white p-4 rounded-xl shadow-lg border border-emerald-500">
              <div className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1 text-center">Estimated In-Hand Salary</div>
              <div className="text-3xl font-black text-center flex items-center justify-center">
                <IndianRupee className="w-6 h-6 mr-1" strokeWidth={3} />
                {inHandSalary.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
