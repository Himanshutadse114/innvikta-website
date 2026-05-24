"use client";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

import { markdownify } from "@lib/utils/textConverter";

const Challenges = ({ challenges }) => {
  return (
    <section className="section bg-body py-24 border-b border-border">
      <div className="container">
        <div className="row items-center">
          <div className="col-12 lg:col-5 mb-16 lg:mb-0 px-6 md:px-12 lg:px-16">
            <h2 className="mb-8 text-3xl md:text-4xl font-bold leading-tight">
              {challenges.title}
            </h2>
            <div className="text-lg md:text-xl leading-relaxed font-medium">
              {markdownify(challenges.stats_summary, "div", "challenges-stats")}
            </div>
            <style jsx global>{`
              .challenges-stats .text-primary {
                font-weight: 800;
              }
            `}</style>
          </div>
          <div className="col-12 lg:col-7 px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {challenges.cards?.map((card, index) => (
                <div key={index} className="group h-[450px] [perspective:1000px]">
                  <div className="relative h-full w-full rounded-2xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                    {/* Front */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#FFFBF7] border border-orange-100 p-6 flex flex-col [backface-visibility:hidden] shadow-sm overflow-hidden">
                      {/* Top Row */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Problem 0{index + 1}</span>
                          <div className="w-8 h-[2px] bg-orange-200 mt-1"></div>
                        </div>
                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 shadow-inner">
                          <FeatherIcon icon={index === 0 ? "users" : index === 1 ? "shield" : "activity"} size={18} />
                        </div>
                      </div>

                      {/* Heading */}
                      <h3 className="text-2xl font-bold text-slate-800 leading-tight mb-2">{card.title}</h3>
                      
                      {/* Mock UI Section */}
                      <div className="mt-4 mb-4 relative bg-white/60 rounded-xl border border-orange-50 p-4 shadow-sm flex flex-col justify-center min-h-[180px]">
                        {index === 0 && (
                          <div className="space-y-3">
                            <div className="flex justify-between items-end">
                              <div>
                                <span className="text-[10px] text-slate-400 font-bold block">Course Completion</span>
                                <span className="text-2xl font-bold text-orange-500">18%</span>
                              </div>
                              <span className="text-[10px] text-orange-500 font-bold">↓ 62% from avg</span>
                            </div>
                            <div className="h-20 w-full bg-gradient-to-t from-orange-50 to-transparent relative overflow-hidden rounded-lg">
                              <svg viewBox="0 0 100 40" className="w-full h-full preserve-aspect-ratio-none">
                                <path d="M0 10 Q 25 15, 50 25 T 100 35 L 100 40 L 0 40 Z" fill="rgba(254, 96, 25, 0.1)" />
                                <path d="M0 10 Q 25 15, 50 25 T 100 35" fill="none" stroke="#f15a24" strokeWidth="2" />
                              </svg>
                            </div>
                          </div>
                        )}
                        {index === 1 && (
                          <div className="space-y-2">
                             <div className="flex items-center gap-3">
                               <div className="w-12 h-12 rounded-full border-4 border-orange-100 border-t-orange-500 flex items-center justify-center">
                                 <span className="text-xs font-bold">64%</span>
                               </div>
                               <div className="flex-grow space-y-1">
                                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                   <div className="h-full w-[64%] bg-orange-500"></div>
                                 </div>
                                 <span className="text-[8px] text-slate-400 font-bold uppercase">Compliance Score</span>
                               </div>
                             </div>
                             <div className="grid grid-cols-2 gap-1 mt-2">
                               {['ISO 27001', 'SOC 2', 'GDPR', 'HIPAA'].map(tag => (
                                 <div key={tag} className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[8px] font-bold text-slate-500 flex items-center gap-1">
                                   <div className="w-1 h-1 rounded-full bg-orange-400"></div> {tag}
                                 </div>
                               ))}
                             </div>
                          </div>
                        )}
                        {index === 2 && (
                          <div className="space-y-2">
                            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 relative">
                               <div className="flex items-center gap-2 mb-2">
                                 <div className="w-4 h-4 bg-orange-500 rounded text-white flex items-center justify-center"><FeatherIcon icon="star" size={8} /></div>
                                 <span className="text-[8px] font-bold">Your Progress</span>
                               </div>
                               <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                 <div className="h-full w-[78%] bg-orange-500"></div>
                               </div>
                               <span className="absolute right-2 top-2 text-[8px] font-bold text-orange-500">78%</span>
                            </div>
                            <div className="flex gap-1 justify-center mt-2">
                              {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded bg-orange-50 border border-orange-100"></div>)}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer Info */}
                      <div className="mt-auto pt-4 border-t border-orange-50 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                           <FeatherIcon icon={index === 0 ? "trending-down" : index === 1 ? "file-text" : "zap"} size={14} />
                        </div>
                        <p className="text-[10px] leading-tight font-medium text-slate-600">
                          {index === 0 ? "Only 18% of employees complete traditional training." : 
                           index === 1 ? "Security awareness is now required across frameworks." : 
                           "Outdated training fails to create measurable behavioral change."}
                        </p>
                      </div>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 h-full w-full rounded-2xl bg-primary px-8 flex items-center justify-center text-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-xl">
                      <p className="text-sm md:text-base font-medium leading-relaxed">
                        {card.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenges;
