import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProductDetails = () => {
      const products = [
        {
          id: 1,
          title: "Rochie lungă cu imprimeu",
          price: 149.99,
          description: "O rochie elegantă, perfectă pentru ocazii speciale.",
          gender: "women",
          images: [
            "/src/assets/images/jacket_women.jpg",
            "/src/assets/images/grey_coat.jpg",
            "/src/assets/images/jacket_men.jpg",
          ],
          sizes: { S: true, M: true, L: false, XL: true },
        },
        {
          id: 2,
          title: "Palton elegant",
          price: 299.99,
          description: "Palton călduros și stylish pentru sezonul rece.",
          gender: "women",
          images: [
            "/src/assets/images/jacket_women.jpg",
            "/src/assets/images/grey_coat.jpg",
            "/src/assets/images/jacket_men.jpg",
          ],
          sizes: { XS: true, S: true, M: false, L: true, XL: false },
        },
        {
          id: 3,
          title: "Bluză din bumbac organic",
          price: 79.99,
          description: "Bluză confortabilă din bumbac organic.",
          gender: "women",
          images: [
            "/src/assets/images/jacket_women.jpg",
            "/src/assets/images/grey_coat.jpg",
            "/src/assets/images/jacket_men.jpg",
          ],
          sizes: { S: true, M: true, L: true, XL: false },
        },
        {
          id: 4,
          title: "Tricou casual",
          price: 59.99,
          description: "Un tricou simplu și confortabil pentru fiecare zi.",
          gender: "men",
          images: [
            "/src/assets/images/jacket_women.jpg",
            "/src/assets/images/grey_coat.jpg",
            "/src/assets/images/jacket_men.jpg",
          ],
          sizes: { S: false, M: true, L: true, XL: true },
        },
        {
          id: 5,
          title: "Pulover călduros",
          price: 119.99,
          description: "Pulover gros, perfect pentru iarnă.",
          gender: "men",
          images: [
            "/src/assets/images/jacket_women.jpg",
            "/src/assets/images/grey_coat.jpg",
            "/src/assets/images/jacket_men.jpg",
          ],
          sizes: { S: true, M: true, L: true, XL: false },
        },
        {
          id: 6,
          title: "Pantaloni",
          price: 249.99,
          description: "Geacă ușoară și rezistentă la vânt.",
          gender: "men",
          images: [
            "/src/assets/images/jacket_women.jpg",
            "/src/assets/images/grey_coat.jpg",
            "/src/assets/images/jacket_men.jpg",
          ],
          sizes: { S: false, M: false, L: true, XL: true },
        },
        {
          id: 7,
          title: "Bluză din bumbac organic",
          price: 79.99,
          description: "Bluză confortabilă din bumbac organic.",
          gender: "women",
          images: [
            "/src/assets/images/jacket_women.jpg",
            "/src/assets/images/grey_coat.jpg",
            "/src/assets/images/jacket_men.jpg",
          ],
          sizes: { S: true, M: true, L: true, XL: false },
        },
      ];

      const productDetails = products.find(
        (product) => product.id === parseInt(productId)
      );
      if (productDetails) {
        setProduct(productDetails);
        setMainImage(productDetails.images[0]);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleSizeSelection = (size) => {
    if (product.sizes[size]) {
      setSelectedSize(size);
    }
  };

  const handleBuy = () => {
    if (!selectedSize) {
      alert("Te rog să selectezi o mărime înainte de a cumpăra!");
    } else {
      alert(`Ai cumpărat produsul (${product.title}), mărimea ${selectedSize}!`);
    }
  };

  if (!product) {
    return <div className="text-center py-8">Produsul nu a fost găsit...</div>;
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
   
          <div className="md:w-1/2">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full object-cover "
            />
            <div className="flex mt-4 space-x-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`product-${index}`}
                  className={`w-60 h-60 object-cover  cursor-pointer border ${
                    mainImage === img ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Detalii produs */}
          <div className="md:w-1/2 md:ml-8 mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
              <button onClick={() => setIsFavorite(!isFavorite)}>
                <Heart
                  size={28}
                  className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}
                />
              </button>
            </div>
            <p className="text-xl font-semibold my-2">{product.price} Lei</p>
            <p className="text-sm text-gray-600">{product.description}</p>

            {/* Mărimi disponibile */}
            <div className="mt-4">
              <p className="font-semibold">Mărimi disponibile:</p>
              <div className="flex space-x-3 mt-2">
                {Object.entries(product.sizes).map(([size, available]) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md font-semibold ${
                      available
                        ? selectedSize === size
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                        : "line-through text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => handleSizeSelection(size)}
                    disabled={!available}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Butoane */}
            <div className="mt-6">
              <button
                className="bg-black text-white px-6 py-3 text-lg font-semibold hover:bg-gray-800 transition-colors"
                onClick={handleBuy}
              >
                CUMPĂRĂ ACUM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
