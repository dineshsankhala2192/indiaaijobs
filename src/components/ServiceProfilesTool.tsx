import React, { useState } from 'react';
import { Shield, X, Briefcase, IndianRupee, Layers, Star, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SERVICES = [
  {
    id: 'ias',
    name: 'IAS (Indian Administrative Service)',
    fullName: 'भारतीय प्रशासनिक सेवा',
    workProfile: 'सरकारी नीतियों को लागू करना, जिले/राज्य का प्रशासन संभालना, और विकास कार्यों का सुपरविजन करना।',
    hierarchy: ['SDM (Sub Divisional Magistrate) / Joint Magistrate', 'DM (District Magistrate) / Collector', 'Divisional Commissioner', 'Secretary in State Govt', 'Chief Secretary', 'Cabinet Secretary (Highest)'],
    lifestyle: 'अत्यधिक सम्मान, सरकारी बंगला, वाहन (नीली बत्ती/VIP एस्कॉर्ट), सुरक्षा गार्ड। समाज में सबसे अधिक रुतबा और प्रभाव। कार्य का दबाव और जिम्मेदारियां भी सबसे अधिक।',
    salary: '₹56,100 (Entry level) से ₹2,50,000 (Cabinet Secretary) + भत्ते (TA, DA, HRA)',
  },
  {
    id: 'ips',
    name: 'IPS (Indian Police Service)',
    fullName: 'भारतीय पुलिस सेवा',
    workProfile: 'कानून और व्यवस्था बनाए रखना, अपराध नियंत्रण, और जिले के पुलिस बल का नेतृत्व करना। CBI, IB, RAW जैसी खुफिया एजेंसियों में भी नियुक्ति।',
    hierarchy: ['ASP (Assistant SP)', 'SP (Superintendent of Police) / DCP', 'SSP', 'DIG', 'IG', 'ADG', 'DGP (Director General of Police)'],
    lifestyle: 'वर्दी का विशेष रुतबा, पुलिस एस्कॉर्ट, सरकारी आवास और वाहन। बहुत अनुशासित लेकिन चुनौतीपूर्ण और 24x7 ड्यूटी वाला जीवन। फिटनेस पर विशेष ध्यान आवश्यक।',
    salary: '₹56,100 (Entry level) से ₹2,25,000 (DGP) + विशेष पुलिस भत्ते',
  },
  {
    id: 'ifs_foreign',
    name: 'IFS (Indian Foreign Service)',
    fullName: 'भारतीय विदेश सेवा',
    workProfile: 'विदेशों में भारत का कूटनीतिक प्रतिनिधित्व, विदेश नीति का निर्माण और क्रियान्वयन, भारतीय प्रवासियों की सहायता और व्यापारिक संबंधों का विकास।',
    hierarchy: ['Third Secretary (Trainee)', 'Second Secretary', 'First Secretary', 'Counsellor', 'Minister', 'Ambassador / High Commissioner'],
    lifestyle: 'विदेशों में हाई-प्रोफाइल जीवन, राजनयिक छूट (Diplomatic Immunity), उच्च स्तरीय शिक्षा और चिकित्सा सुविधाएँ, और अंतरराष्ट्रीय यात्राएँ। शांत और गरिमामय जीवनशैली।',
    salary: '₹56,100 से ₹2,50,000 (मूल वेतन) + भारी Foreign Allowance (विदेश भत्ते जो लाखों में हो सकते हैं)',
  },
  {
    id: 'ifs_forest',
    name: 'IFoS (Indian Forest Service)',
    fullName: 'भारतीय वन सेवा',
    workProfile: 'पर्यावरण संरक्षण, वन्यजीव प्रबंधन, राष्ट्रीय उद्यानों की देखरेख और वन संसाधनों का सतत प्रबंधन।',
    hierarchy: ['ACF (Assistant Conservator of Forests)', 'DCF (Deputy Conservator) / DFO', 'CF (Conservator of Forests)', 'CCF', 'APCCF', 'PCCF (Principal Chief Conservator)'],
    lifestyle: 'प्रकृति के करीब जीवन, शांत और प्रदूषण मुक्त वातावरण। वन विभाग के शानदार गेस्ट हाउस और वाहन। फील्ड कार्य अधिक होता है। पर्यावरण प्रेमियों के लिए सर्वश्रेष्ठ।',
    salary: '₹56,100 से ₹2,25,000 + वन संबंधी विशेष भत्ते',
  },
  {
    id: 'upsc_irs',
    name: 'IRS (Indian Revenue Service)',
    fullName: 'भारतीय राजस्व सेवा (IT & C&CE)',
    workProfile: 'आयकर (Income Tax) और कस्टम ड्यूटी एकत्र करना, कर चोरी रोकना, और वित्तीय अपराधों की जांच (ED आदि में नियुक्ति)।',
    hierarchy: ['Assistant Commissioner', 'Deputy Commissioner', 'Joint Commissioner', 'Additional Commissioner', 'Commissioner', 'Principal Chief Commissioner'],
    lifestyle: 'बहुत अच्छी मेट्रो सिटी पोस्टिंग, शांत कार्य जीवन संतुलन (Work-Life Balance), 9 से 5 की जॉब (ज्यादातर), और बेहतरीन बुनियादी ढांचा।',
    salary: '₹56,100 (Entry level) से ₹2,25,000 + बेहतरीन कार्यालय सुविधाएँ',
  },
  {
    id: 'ras',
    name: 'RAS (Rajasthan Administrative Service)',
    fullName: 'राजस्थान प्रशासनिक सेवा',
    workProfile: 'राज्य सरकार की नीतियों का क्रियान्वयन, उपखंड (Sub-division) स्तर पर प्रशासन, राजस्व कार्य और विकास योजनाओं का पर्यवेक्षण।',
    hierarchy: ['SDO/SDM / Assistant Collector', 'ADM (Additional District Magistrate)', 'Joint Secretary (State)', 'Special Secretary', 'Promoted to IAS'],
    lifestyle: 'राज्य स्तर पर उत्कृष्ट प्रतिष्ठा, अच्छी सुविधाएँ, सरकारी आवास और वाहन। स्थानीय स्तर पर मजबूत संपर्क और जनसेवा के सीधे अवसर।',
    salary: '₹56,100 (Level 14 - State Matrix) से लगभग ₹1,75,000 + राज्य भत्ते',
  }
];

export default function ServiceProfilesTool({ onClose }: { onClose: () => void }) {
  const [selectedId, setSelectedId] = useState(SERVICES[0].id);

  const active = SERVICES.find(s => s.id === selectedId) || SERVICES[0];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="bg-red-600 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <h2 className="font-bold">सिविल सेवा पोस्ट जानकारी (Service Profiles)</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar menu */}
          <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto custom-scrollbar p-3 space-y-1">
             {SERVICES.map(service => (
               <button
                 key={service.id}
                 onClick={() => setSelectedId(service.id)}
                 className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold text-sm flex items-center justify-between ${
                   selectedId === service.id 
                    ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 shadow-sm border border-red-200 dark:border-red-800' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                 }`}
               >
                 <span>{service.name}</span>
               </button>
             ))}
          </div>

          {/* Details view */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                 <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{active.name}</h3>
                    <p className="text-lg font-medium text-red-600 dark:text-red-400 flex items-center gap-2">
                       {active.fullName}
                    </p>
                 </div>

                 <div className="grid grid-cols-1 gap-8">
                    
                    {/* Work Profile */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400">
                        <Briefcase className="w-5 h-5" />
                        <h4 className="font-bold text-lg">कार्य प्रोफाइल (Work Profile)</h4>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                        {active.workProfile}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {/* Salary */}
                       <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                         <div className="flex items-center gap-2 mb-3 text-emerald-600 dark:text-emerald-400">
                           <IndianRupee className="w-5 h-5" />
                           <h4 className="font-bold text-lg">वेतन (Salary & Perks)</h4>
                         </div>
                         <p className="text-slate-700 dark:text-slate-300 font-medium text-sm md:text-base">
                           {active.salary}
                         </p>
                       </div>

                       {/* Lifestyle */}
                       <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                         <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400">
                           <Star className="w-5 h-5" />
                           <h4 className="font-bold text-lg">जीवन स्तर (Lifestyle)</h4>
                         </div>
                         <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                           {active.lifestyle}
                         </p>
                       </div>
                    </div>

                    {/* Hierarchy */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2 mb-5 text-blue-600 dark:text-blue-400">
                        <Layers className="w-5 h-5" />
                        <h4 className="font-bold text-lg">पदक्रमानुसार (Hierarchy / Promotion Flow)</h4>
                      </div>
                      <div className="relative">
                         <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900/50"></div>
                         <div className="space-y-4">
                            {active.hierarchy.map((step, idx) => (
                              <div key={idx} className="flex flex-col relative pl-10">
                                <div className="absolute left-2.5 top-1 w-3.5 h-3.5 bg-blue-500 rounded-full ring-4 ring-slate-50 dark:ring-slate-800"></div>
                                <span className="font-bold text-slate-800 dark:text-slate-200">{step}</span>
                                {idx === 0 && <span className="text-xs text-slate-500 font-medium">प्रारंभिक नियुक्ति (Entry Level)</span>}
                                {idx === active.hierarchy.length - 1 && <span className="text-xs text-slate-500 font-medium">सर्वोच्च पद (Highest Post)</span>}
                              </div>
                            ))}
                         </div>
                      </div>
                    </div>

                 </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
