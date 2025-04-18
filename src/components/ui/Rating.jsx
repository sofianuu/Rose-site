// src/components/ui/Rating.jsx
import { Star } from "lucide-react";

const Rating = ({ rating, reviewCount, size = 16 }) => {
  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={size} 
            className={i < Math.floor(rating) ? "fill-black text-black" : "text-gray-300"} 
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <p className="ml-2 text-sm text-gray-600">
          {rating} ({reviewCount} recenzii)
        </p>
      )}
    </div>
  );
};

export default Rating;