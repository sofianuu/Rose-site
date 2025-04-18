import { useState } from 'react';
import { X } from 'lucide-react';
import Select from 'react-select';
import SizesSection from './sections/SizesSection';
import ImageUploadSection from './sections/ImageUploadSection';

const AddProductModal = ({ 
  showModal, 
  setShowModal, 
  categories, 
  handleSubmit,
  activeView
}) => {
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: categories.length > 0 ? categories[0].name : '',
    status: 'Activ',
    images: [],
    sizes: {
      'XS': '',
      'S': '',
      'M': '',
      'L': '',
      'XL': '',
      'XXL': ''
    },
    stock: 0
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    status: 'Activ'
  });

  // Handle form submission
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (activeView === 'products') {
      handleSubmit('product', newItem);
    } else {
      handleSubmit('category', newCategory);
    }
    setShowModal(false);
  };

  // Handle size and stock changes
  const handleSizeStockChange = (size, stock) => {
    const newSizes = {
      ...newItem.sizes,
      [size]: stock
    };
    
    // Calculate total stock from all sizes
    const totalStock = Object.values(newSizes)
      .reduce((sum, value) => sum + (parseInt(value) || 0), 0);

    setNewItem(prev => ({
      ...prev,
      sizes: newSizes,
      stock: totalStock
    }));
  };

  // Handle image changes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem(prev => ({
          ...prev,
          images: [...prev.images, { file, preview: reader.result }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle removing an image
  const handleRemoveImage = (index) => {
    setNewItem(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg w-full max-w-md mx-4 shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">
            Adaugă {activeView === 'products' ? 'produs nou' : 'categorie nouă'}
          </h3>
          <button 
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <form id="addItemForm" onSubmit={handleSubmitForm} className="p-4 space-y-4 overflow-y-auto">
          {activeView === 'products' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nume Produs
                </label>
                <input
                  type="text"
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Introduceți numele produsului"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descriere
                </label>
                <textarea
                  required
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Introduceți descrierea produsului"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preț (RON)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categorie
                </label>
                <Select
                  value={{ value: newItem.category, label: newItem.category }}
                  onChange={(option) => setNewItem({...newItem, category: option.value})}
                  options={categories.map(cat => ({
                    value: cat.name,
                    label: cat.name
                  }))}
                  placeholder="Selectați categoria"
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

              <ImageUploadSection 
                images={newItem.images}
                handleImageChange={handleImageChange}
                handleRemoveImage={handleRemoveImage}
              />

              <SizesSection 
                sizes={newItem.sizes}
                stock={newItem.stock}
                handleSizeStockChange={handleSizeStockChange}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select
                  value={{ value: newItem.status, label: newItem.status }}
                  onChange={(option) => setNewItem({...newItem, status: option.value})}
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
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nume Categorie
                </label>
                <input
                  type="text"
                  required
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Introduceți numele categoriei"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <Select
                  value={{ value: newCategory.status, label: newCategory.status }}
                  onChange={(option) => setNewCategory({...newCategory, status: option.value})}
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
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Anulează
            </button>
            <button
              form="addItemForm"
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
            >
              {activeView === 'products' ? 'Adaugă produs' : 'Adaugă categorie'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;