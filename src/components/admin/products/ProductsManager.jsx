import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import ProductsList from './ProductsList';
import CategoriesList from './CategoriesList';
import ViewToggle from './ViewToggle';
import ModalManager from '../modals/ModalManager';

const ProductsManager = ({ products, categories, onAddItem, onEditItem, onDeleteItem }) => {
  const [activeView, setActiveView] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Data state
  const [itemToEdit, setItemToEdit] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedProductName, setSelectedProductName] = useState('');
  const [deleteInfo, setDeleteInfo] = useState(null);

  // Search functionality
  const handleSearch = (items) => {
    if (!searchTerm.trim()) return items;
    
    return items.filter(item => 
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  // Action handlers
  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (item) => {
    // Create a copy of the item to avoid modifying the original
    const itemCopy = { ...item };
    
    // Initialize sizes if it's a product and doesn't have sizes
    if (activeView === 'products' && !itemCopy.sizes) {
      itemCopy.sizes = {
        'XS': '',
        'S': '',
        'M': '',
        'L': '',
        'XL': '',
        'XXL': ''
      };
    }
    
    setItemToEdit(itemCopy);
    setShowEditModal(true);
  };

  const handleDelete = (id, type) => {
    setDeleteInfo({ id, type });
    setShowDeleteModal(true);
  };

  const handleViewDescription = (product) => {
    setSelectedDescription(product.description);
    setSelectedProductName(product.name);
    setShowDescriptionModal(true);
  };

  // Form submission handlers
  const handleSubmitNewItem = (type, data) => {
    if (onAddItem) {
      onAddItem(type, data);
    }
  };

  const handleSubmitEdit = (updatedItem) => {
    if (onEditItem) {
      onEditItem(updatedItem);
    }
  };

  const handleConfirmDelete = (id, type) => {
    if (onDeleteItem) {
      onDeleteItem(id, type);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <ViewToggle 
          activeView={activeView}
          setActiveView={setActiveView}
        />
        
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={`Caută ${activeView === 'products' ? 'produse' : 'categorii'}...`}
              className="pl-10 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 justify-center"
          >
            <Plus size={18} className="mr-2" />
            Adaugă {activeView === 'products' ? 'produs' : 'categorie'}
          </button>
        </div>
      </div>

      {/* Content based on active view */}
      {activeView === 'products' ? (
        <ProductsList 
          products={handleSearch(products)}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleViewDescription={handleViewDescription}
        />
      ) : (
        <CategoriesList 
          categories={handleSearch(categories)}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      {/* Modal Manager */}
      <ModalManager
        activeView={activeView}
        categories={categories}
        modals={{
          showAddModal,
          showEditModal,
          showDescriptionModal,
          showDeleteModal
        }}
        itemToEdit={itemToEdit}
        setItemToEdit={setItemToEdit}
        selectedDescription={selectedDescription}
        selectedProductName={selectedProductName}
        deleteInfo={deleteInfo}
        handlers={{
          setShowAddModal,
          setShowEditModal,
          setShowDescriptionModal,
          setShowDeleteModal,
          handleSubmitNewItem,
          handleSubmitEdit,
          handleDelete: handleConfirmDelete
        }}
      />
    </div>
  );
};

export default ProductsManager;