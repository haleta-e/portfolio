import React from 'react';
import { X } from 'lucide-react';

interface CertificateModalProps {
  imageSrc: string | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ imageSrc, onClose }) => {
  if (!imageSrc) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-2"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white p-2 rounded-full border border-slate-700 z-10 transition-colors"
          aria-label="Close Preview"
        >
          <X size={20} />
        </button>

        <div className="flex items-center justify-center max-h-[85vh] overflow-hidden rounded-xl bg-black">
          <img
            src={imageSrc}
            alt="Certificate Preview"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'image/project.jpg';
            }}
            className="max-h-[80vh] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};
