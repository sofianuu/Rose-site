import { X, AlertTriangle } from 'lucide-react';

const ConfirmDeleteModal = ({ 
  showModal, 
  closeModal, 
  id, 
  type, 
  handleConfirm 
}) => {
  if (!showModal) return null;
  
  const onConfirm = () => {
    handleConfirm(id, type);
    closeModal();
  };
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Confirmare ștergere</h3>
          <button 
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center text-amber-600 mb-4">
            <AlertTriangle size={24} className="mr-3" />
            <span className="font-medium">Atenție</span>
          </div>
          
          <p className="text-gray-700">
            Ești sigur că vrei să ștergi {type.toLowerCase()} cu ID-ul {id}?
            <br />
            Această acțiune nu poate fi anulată.
          </p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Anulează
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Șterge
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;