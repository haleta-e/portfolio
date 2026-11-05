import React from 'react';
import { Edit3, Trash2, Plus, Award, Maximize2, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Certificate } from '../types';

interface CertificatesProps {
  certificates: Certificate[];
  onOpenModal: (imageSrc: string) => void;
  onEditCertificate?: (cert: Certificate) => void;
  onDeleteCertificate?: (id: number) => void;
  onAddCertificate?: () => void;
}

export const Certificates: React.FC<CertificatesProps> = ({
  certificates,
  onOpenModal,
  onEditCertificate,
  onDeleteCertificate,
  onAddCertificate,
}) => {
  return (
    <section className="py-12 bg-[#FAF7F2] dark:bg-[#141210] text-[#1C1917] dark:text-[#F4EFEB] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E8E0D5] dark:border-[#38332E] pb-6">
          <div className="max-w-xl text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] tracking-wider uppercase mb-2">
              <span>CREDENTIAL CARDS</span>
              <span aria-hidden="true">·</span>
              <span>CERTIFICATIONS</span>
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-[#1C1917] dark:text-[#F4EFEB]">
              Verified Certifications
            </h3>
          </div>

          {onAddCertificate && (
            <button
              onClick={onAddCertificate}
              className="px-3.5 py-1.5 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] hover:text-white hover:bg-[#C85A32] dark:hover:bg-[#E07A5F] border border-[#C85A32] dark:border-[#E07A5F] rounded-xl transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
            >
              <Plus size={12} />
              <span>Add Credential Card</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className="group relative bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] rounded-2xl overflow-hidden playing-card playing-card-lift flex flex-col sm:flex-row"
            >
              {/* Image Preview Container */}
              <div
                onClick={() => onOpenModal(cert.image)}
                className="relative sm:w-1/2 h-44 sm:h-auto bg-[#F5EFE6] dark:bg-[#272320] cursor-pointer overflow-hidden group/img"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'image/cer-programing.png';
                  }}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#141210]/75 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-mono text-xs">
                  <Maximize2 size={14} /> Inspect Card
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-5 sm:w-1/2 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#C85A32] dark:text-[#E07A5F] uppercase">
                      {cert.organization}
                    </span>
                    <span className="text-xs font-mono text-[#6B6560] dark:text-[#9E968F]">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="font-display text-base font-medium text-[#1C1917] dark:text-[#F4EFEB] group-hover:text-[#C85A32] dark:group-hover:text-[#E07A5F] transition-colors">
                    {cert.title}
                  </h4>

                  <p className="text-[#6B6560] dark:text-[#9E968F] text-xs leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F0E9DF] dark:border-[#2A2622] flex items-center justify-between">
                  <button
                    onClick={() => onOpenModal(cert.image)}
                    className="text-xs font-semibold text-[#C85A32] dark:text-[#E07A5F] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Document</span>
                    <ArrowUpRight size={12} />
                  </button>

                  <div className="flex items-center gap-1">
                    {onEditCertificate && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditCertificate(cert);
                        }}
                        className="p-1 text-[#6B6560] hover:text-[#C85A32] cursor-pointer"
                        title="Edit Certificate"
                      >
                        <Edit3 size={12} />
                      </button>
                    )}
                    {onDeleteCertificate && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCertificate(cert.id);
                        }}
                        className="p-1 text-[#6B6560] hover:text-rose-600 cursor-pointer"
                        title="Delete Certificate"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
