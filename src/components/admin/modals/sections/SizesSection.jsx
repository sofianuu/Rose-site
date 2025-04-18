const SizesSection = ({ sizes, stock, handleSizeStockChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Stoc pe Mărimi
      </label>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(sizes).map(([size, sizeStock]) => (
          <div key={size} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <span className="text-sm font-medium w-12">{size}</span>
            <input
              type="number"
              min="0"
              value={sizeStock}
              onChange={(e) => handleSizeStockChange(size, e.target.value)}
              placeholder="Stoc"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm font-medium text-black">
          Stoc Total: {stock || 0} bucăți
        </p>
      </div>
    </div>
  );
};

export default SizesSection;