import { X } from 'lucide-react';

const DescriptionModal = ({ 
  showModal, 
  closeModal, 
  productName, 
  description 
}) => {
  if (!showModal) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg w-full max-w-md mx-4 shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">{productName}</h3>
          <button 
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;