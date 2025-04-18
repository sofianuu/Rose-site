import { X } from 'lucide-react';

const ImageUploadSection = ({ images, handleImageChange, handleRemoveImage }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Imagini Produs
      </label>
      <div className="mt-1 flex flex-col gap-4">
        <div className="flex items-center justify-center w-full">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                Click pentru a adăuga imagini
              </p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </label>
        </div>
        
        {/* Image previews */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadSection;