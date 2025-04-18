import { X } from 'lucide-react';
import Select from 'react-select';
import SizesSection from './sections/SizesSection';

const EditModal = ({
  showModal,
  closeModal,
  itemToEdit,
  setItemToEdit,
  handleSubmit,
  activeView,
  categories
}) => {
  if (!itemToEdit || !showModal) return null;

  // Handle size and stock changes
  const handleSizeStockChange = (size, stock) => {
    const newSizes = {
      ...itemToEdit.sizes,
      [size]: stock
    };
    
    // Calculate total stock from all sizes
    const totalStock = Object.values(newSizes)
      .reduce((sum, value) => sum + (parseInt(value) || 0), 0);

    setItemToEdit(prev => ({
      ...prev,
      sizes: newSizes,
      stock: totalStock
    }));
  };

  // Handle form submission
  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit(itemToEdit);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg w-full max-w-md mx-4 shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">
            Editează {activeView === 'products' ? 'Produs' : 'Categorie'}
          </h3>
          <button 
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form id="editItemForm" onSubmit={handleSubmitForm} className="p-4 space-y-4 overflow-y-auto">
          {activeView === 'products' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nume Produs
                </label>
                <input
                  type="text"
                  required
                  value={itemToEdit.name}
                  onChange={(e) => setItemToEdit({...itemToEdit, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descriere
                </label>
                <textarea
                  required
                  value={itemToEdit.description}
                  onChange={(e) => setItemToEdit({...itemToEdit, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preț
                </label>
                <input
                  type="number"
                  required
                  value={itemToEdit.price}
                  onChange={(e) => setItemToEdit({...itemToEdit, price: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categorie
                </label>
                <Select
                  value={{ value: itemToEdit.category, label: itemToEdit.category }}
                  onChange={(option) => setItemToEdit({...itemToEdit, category: option.value})}
                  options={categories.map(cat => ({
                    value: cat.name,
                    label: cat.name
                  }))}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: '0.5rem',
                      borderColor: '#E5E7EB',
                      '&:hover': {
                        borderColor: '#E5E7EB'
                      }
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? '#2563EB' : state.isFocused ? 'transparent' : 'white',
                      color: state.isSelected ? 'white' : '#1F2937',
                      '&:hover': {
                        backgroundColor: '#DBEAFE'
                      },
                      '&:active': {
                        backgroundColor: '#2563EB'
                      }
                    }),
                    menu: (base) => ({
                      ...base,
                      marginTop: '4px'
                    })
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select
                  value={{ value: itemToEdit.status, label: itemToEdit.status }}
                  onChange={(option) => setItemToEdit({...itemToEdit, status: option.value})}
                  options={[
                    { value: 'Activ', label: 'Activ' },
                    { value: 'Inactiv', label: 'Inactiv' }
                  ]}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: '0.5rem',
                      borderColor: '#E5E7EB',
                      '&:hover': {
                        borderColor: '#E5E7EB'
                      }
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? '#2563EB' : state.isFocused ? 'transparent' : 'white',
                      color: state.isSelected ? 'white' : '#1F2937',
                      '&:hover': {
                        backgroundColor: '#DBEAFE'
                      },
                      '&:active': {
                        backgroundColor: '#2563EB'
                      }
                    }),
                    menu: (base) => ({
                      ...base,
                      marginTop: '4px'
                    })
                  }}
                />
              </div>

              <SizesSection 
                sizes={itemToEdit.sizes || {}}
                stock={itemToEdit.stock || 0}
                handleSizeStockChange={handleSizeStockChange}
              />
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nume Categorie
                </label>
                <input
                  type="text"
                  required
                  value={itemToEdit.name}
                  onChange={(e) => setItemToEdit({...itemToEdit, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select
                  value={{ value: itemToEdit.status, label: itemToEdit.status }}
                  onChange={(option) => setItemToEdit({...itemToEdit, status: option.value})}
                  options={[
                    { value: 'Activ', label: 'Activ' },
                    { value: 'Inactiv', label: 'Inactiv' }
                  ]}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: '0.5rem',
                      borderColor: '#E5E7EB',
                      '&:hover': {
                        borderColor: '#E5E7EB'
                      }
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? '#2563EB' : state.isFocused ? 'transparent' : 'white',
                      color: state.isSelected ? 'white' : '#1F2937',
                      '&:hover': {
                        backgroundColor: '#DBEAFE'
                      },
                      '&:active': {
                        backgroundColor: '#2563EB'
                      }
                    }),
                    menu: (base) => ({
                      ...base,
                      marginTop: '4px'
                    })
                  }}
                />
              </div>
            </>
          )}
        </form>

        <div className="p-4 border-t mt-auto">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Anulează
            </button>
            <button
              form="editItemForm"
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
            >
              Salvează
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;