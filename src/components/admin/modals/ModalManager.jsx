import AddProductModal from './AddProductModal';
import EditModal from './EditModal';
import DescriptionModal from './DescriptionModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const ModalManager = ({
  activeView,
  categories,
  modals,
  itemToEdit,
  setItemToEdit,
  selectedDescription,
  selectedProductName,
  deleteInfo,
  handlers
}) => {
  const {
    setShowAddModal,
    setShowEditModal,
    setShowDescriptionModal,
    setShowDeleteModal,
    handleSubmitNewItem,
    handleSubmitEdit,
    handleDelete
  } = handlers;

  return (
    <>
      {/* Add Product/Category Modal */}
      <AddProductModal
        showModal={modals.showAddModal}
        setShowModal={setShowAddModal}
        categories={categories}
        handleSubmit={handleSubmitNewItem}
        activeView={activeView}
      />

      {/* Edit Modal */}
      <EditModal
        showModal={modals.showEditModal}
        closeModal={() => setShowEditModal(false)}
        itemToEdit={itemToEdit}
        setItemToEdit={setItemToEdit}
        handleSubmit={handleSubmitEdit}
        activeView={activeView}
        categories={categories}
      />

      {/* Description Modal */}
      <DescriptionModal
        showModal={modals.showDescriptionModal}
        closeModal={() => setShowDescriptionModal(false)}
        productName={selectedProductName}
        description={selectedDescription}
      />

      {/* Delete Confirmation Modal */}
      {deleteInfo && (
        <ConfirmDeleteModal
          showModal={modals.showDeleteModal}
          closeModal={() => setShowDeleteModal(false)}
          id={deleteInfo.id}
          type={deleteInfo.type}
          handleConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default ModalManager;