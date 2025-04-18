
const ViewToggle = ({ activeView, setActiveView }) => {
  return (
    <div className="flex gap-2 w-full sm:w-auto">
      <button
        onClick={() => setActiveView('products')}
        className={`px-4 py-2 rounded-lg flex-1 sm:flex-none ${
          activeView === 'products'
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        Produse
      </button>
      <button
        onClick={() => setActiveView('categories')}
        className={`px-4 py-2 rounded-lg flex-1 sm:flex-none ${
          activeView === 'categories'
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        Categorii
      </button>
    </div>
  );
};

export default ViewToggle;