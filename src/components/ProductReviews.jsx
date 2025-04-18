import { useState, useEffect } from 'react';
import { Star, X, Upload, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPromptModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Autentificare necesară</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="text-center py-4">
          <div className="mb-4 flex justify-center">
            <LogIn size={48} className="text-gray-400" />
          </div>
          <p className="mb-6">
            Pentru a adăuga o recenzie, trebuie să fiți conectat la contul dumneavoastră.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/login" 
              className="px-4 py-2 bg-black text-white text-center rounded-md hover:bg-gray-800"
            >
              Conectare
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 border border-gray-300 text-center rounded-md text-gray-700 hover:bg-gray-50"
            >
              Înregistrare
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewModal = ({ onClose, onSubmit, productId, userData, product }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (rating === 0) newErrors.rating = 'Vă rugăm să selectați un rating';
    if (!title.trim()) newErrors.title = 'Titlul este obligatoriu';
    if (!comment.trim()) newErrors.comment = 'Comentariul este obligatoriu';
    if (!selectedSize) newErrors.size = 'Vă rugăm să selectați mărimea';
    if (!selectedColor) newErrors.color = 'Vă rugăm să selectați culoarea';
    if (!name.trim()) newErrors.name = 'Numele este obligatoriu';
    if (!email.trim()) newErrors.email = 'Emailul este obligatoriu';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Emailul nu este valid';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const reviewData = {
        productId,
        rating,
        title,
        comment,
        name,
        email,
        size: selectedSize,
        color: selectedColor,
        images: images.map(img => img.dataUrl),
        date: new Date().toISOString(),
      };
      
      onSubmit(reviewData);
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({ submit: 'A apărut o eroare. Vă rugăm să încercați din nou.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Limit to 3 images
    if (images.length + files.length > 3) {
      setErrors({ ...errors, images: 'Puteți încărca maxim 3 imagini' });
      return;
    }
    
    // Read and prepare images
    const newImages = [];
    
    files.forEach(file => {
      if (!file.type.match('image.*')) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push({
          file,
          dataUrl: e.target.result,
          name: file.name
        });
        
        if (newImages.length === files.length) {
          setImages([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-light">ADAUGĂ O RECENZIE</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating *</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="focus:outline-none"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={24}
                    fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
                    className={(hoverRating || rating) >= star ? 'text-black' : 'text-gray-300'}
                  />
                </button>
              ))}
            </div>
            {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
          </div>
          
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="review-title" className="block text-sm font-medium mb-2">Titlu *</label>
            <input
              type="text"
              id="review-title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Calitate excelentă"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          
          {/* Comment */}
          <div className="mb-4">
            <label htmlFor="review-comment" className="block text-sm font-medium mb-2">Comentariu *</label>
            <textarea
              id="review-comment"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black min-h-[100px]"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Împărtășește experiența ta cu acest produs..."
            />
            {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
          </div>
          
          {/* Size Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Mărime *</label>
            <div className="grid grid-cols-5 gap-2">
              {product && Object.entries(product.sizes).map(([size, _]) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-1 border w-full font-medium text-sm transition-colors ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-gray-800"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size}</p>}
          </div>
          
          {/* Color Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Culoare *</label>
            <div className="flex flex-wrap gap-2">
              {product && product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`border ${
                    selectedColor === color.name
                      ? "border-black"
                      : "border-gray-300"
                  } transition-all w-16 h-16 overflow-hidden`}
                >
                  <div className="w-full h-full relative">
                    {color.name !== "Negru" && color.name !== "Alb" ? (
                      <div 
                        className="w-full h-full"
                        style={{ backgroundColor: color.code }}
                      ></div>
                    ) : (
                      <div 
                        className="w-full h-full border"
                        style={{ backgroundColor: color.code }}
                      ></div>
                    )}
                    {selectedColor === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-white"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
          </div>
          
          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Adaugă fotografii (opțional)</label>
            <div className="flex flex-wrap items-center gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative w-20 h-20 border rounded overflow-hidden group">
                  <img src={img.dataUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              ))}
              
              {images.length < 3 && (
                <label className="w-20 h-20 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                  <Upload size={18} className="text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">Adaugă</span>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Puteți încărca până la 3 imagini (max 5MB fiecare)</p>
            {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
          </div>
          
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="review-name" className="block text-sm font-medium mb-2">Nume *</label>
              <input
                type="text"
                id="review-name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="review-email" className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                id="review-email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!!userData?.email}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
          
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4">
              {errors.submit}
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Anulează
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Se trimite...
                </>
              ) : (
                'Trimite recenzia'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductReviews = ({ rating, reviewCount, product }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 5,
      title: "Calitate excelentă",
      comment: "Produsul este exact cum mă așteptam. Materialul este de calitate superioară și confecția este impecabilă. Recomand!",
      images: ["/src/assets/images/jacket_women.jpg"],
      name: "Maria D.",
      isVerified: true,
      date: "12 ian 2023",
      helpfulCount: 8
    },
    {
      id: 2,
      rating: 4,
      title: "Bun, dar cu mici probleme",
      comment: "Produsul arată bine și se potrivește conform mărimii, dar am observat că unul dintre cusături nu e perfectă. În rest sunt mulțumită de achiziție.",
      images: [],
      name: "Andrei M.",
      isVerified: true,
      date: "3 dec 2022",
      helpfulCount: 3
    }
  ]);

  // Check if user is logged in
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    setIsLoggedIn(isAuth);
    
    if (isAuth) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setUserData(user);
    }
  }, []);

  const handleAddReviewClick = () => {
    if (isLoggedIn) {
      setShowReviewModal(true);
    } else {
      setShowLoginPrompt(true);
    }
  };

  const handleAddReview = (newReview) => {
    const formattedReview = {
      id: reviews.length + 1,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      size: newReview.size,
      color: newReview.color,
      images: newReview.images,
      name: newReview.name,
      isVerified: true,
      date: new Date().toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'short', 
        year: 'numeric'
      }),
      helpfulCount: 0
    };
    
    setReviews([formattedReview, ...reviews]);
  };

  return (
    <div className="py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-light">Recenzii ({reviews.length})</h2>
          <button 
            className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
            onClick={handleAddReviewClick}
          >
            ADAUGĂ O RECENZIE
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Sumar recenzii */}
          <div className="md:w-1/3">
            <div className="flex items-center mb-4">
              <span className="text-3xl font-medium mr-2">{rating.toFixed(1)}</span>
              <div>
                <div className="flex mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(rating)
                          ? "text-black"
                          : star <= rating
                          ? "text-gray-700"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">Din {reviews.length} recenzii</span>
              </div>
            </div>
            
            {/* Distribuție rating */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((num) => {
                // Calculăm procentajul real din recenzii
                const reviewsWithRating = reviews.filter(r => r.rating === num).length;
                const percentage = reviews.length > 0 
                  ? Math.round((reviewsWithRating / reviews.length) * 100) 
                  : 0;
                  
                return (
                  <div key={num} className="flex items-center text-sm">
                    <span className="w-2">{num}</span>
                    <svg
                      className="w-4 h-4 text-black mx-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-black rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-500 w-8">{percentage}%</span>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Recenzii */}
          <div className="md:w-2/3">
            
            {/* Lista de recenzii */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= review.rating ? "text-black" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="font-medium">{review.title}</p>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  {/* Display size and color if available */}
                  {(review.size || review.color) && (
                    <div className="flex gap-3 text-xs text-gray-600 mb-2">
                      {review.size && <span>Mărime: <strong>{review.size}</strong></span>}
                      {review.color && <span>Culoare: <strong>{review.color}</strong></span>}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mb-3">
                    {review.comment}
                  </p>
                  {review.images && review.images.length > 0 && (
                    <div className="flex space-x-2 mb-3">
                      {review.images.map((img, idx) => (
                        <div key={idx} className="w-16 h-16 rounded bg-gray-100 overflow-hidden">
                          <img src={img} alt="Recenzie" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                 
                </div>
              ))}
              
              {reviews.length > 2 && (
                <button className="w-full border border-gray-300 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  VEZI TOATE RECENZIILE ({reviews.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Review Modal - only shown for logged in users */}
      {showReviewModal && isLoggedIn && (
        <ReviewModal
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleAddReview}
          productId="12345" // In a real app, this would be the actual product ID
          userData={userData}
          product={product}
        />
      )}
      
      {/* Login Prompt Modal - shown when non-logged in users try to add a review */}
      {showLoginPrompt && !isLoggedIn && (
        <LoginPromptModal
          onClose={() => setShowLoginPrompt(false)}
        />
      )}
    </div>
  );
};

export default ProductReviews; 