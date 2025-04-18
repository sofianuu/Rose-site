// src/components/ProductPage/index.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ChevronDown, ShoppingBag, Truck, RefreshCw } from "lucide-react";
import { useCart } from "../context/CartContext";

// Importăm toate componentele create
import Breadcrumbs from "../components/ui/Breadcrumbs";
import ProductImages from "../components/ProductImages";
import ProductInfo from "../components/ProductInfo";
import ProductOptions from "../components/ProductOptions";
import ProductActions from "../components/ProductActions";
import ProductDescription from "../components/ProductDescription";
import ProductAccordion from "../components/ProductAccordion";
import RelatedProducts from "../components/RelatedProducts";
import ProductReviews from "../components/ProductReviews";

// Componenta principală pentru pagina de produs
const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [showReturns, setShowReturns] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Folosim produse predefinite, similar cu codul original
    const fetchProductDetails = () => {
      const products = [
        // Produse pentru femei
        {
          id: 1,
          title: "Rochie lungă cu imprimeu floral",
          price: 149.99,
          oldPrice: 199.99,
          description: "O rochie elegantă, perfectă pentru ocazii speciale. Confecționată din material fluid și ușor, această rochie lungă îți va oferi un aspect sofisticat și confortabil.",
          details: "Material: 95% poliester, 5% elastan\nLungime: 140 cm\nModel: Regular fit\nSpălare: 30°C\nUscare: La umbră",
          gender: "women",
          category: "Rochii",
          colors: [
            { name: "Negru", code: "#000000", available: true },
            { name: "Roșu", code: "#ff0000", available: true },
            { name: "Albastru", code: "#0000ff", available: false }
          ],
          images: [
            "/src/assets/images/sacou/sacou1.jpg",
            "/src/assets/images/sacou/sacou2.jpg",
            "/src/assets/images/sacou/sacou3.jpg",
            "/src/assets/images/sacou/sacou4.jpg",
            "/src/assets/images/sacou/sacou5.jpg",
            "/src/assets/images/sacou/sacou6.jpg",
          ],
          sizes: { XS: false, S: true, M: true, L: false, XL: true },
          rating: 4.7,
          reviewCount: 24,
          inStock: true
        },
        {
          id: 2,
          title: "Palton elegant din lână",
          price: 299.99,
          oldPrice: null,
          description: "Palton călduros și stylish pentru sezonul rece.",
          details: "Material: 80% lână, 20% poliester\nLungime: 95 cm\nModel: Slim fit\nSpălare: Curățare chimică",
          gender: "women",
          category: "Jachete & Paltoane",
          colors: [
            { name: "Gri", code: "#808080", available: true },
            { name: "Bej", code: "#f5f5dc", available: true }
          ],
          images: [
            "/src/assets/images/palton1.jpg",
            "/src/assets/images/palton2.jpg",
            "/src/assets/images/palton3.jpg",
            "/src/assets/images/palton4.jpg",
            "/src/assets/images/palton5.jpg",
            "/src/assets/images/palton6.jpg",
          ],
          sizes: { XS: true, S: true, M: false, L: true, XL: false },
          rating: 4.9,
          reviewCount: 42,
          inStock: true
        },
        
        // Produse pentru bărbați
        {
          id: 18,
          title: "Rochie",
          price: 59.99,
          oldPrice: null,
          description: "Tricou confortabil, confecționat din bumbac organic de cea mai înaltă calitate. Perfect pentru ținute casual de zi cu zi.",
          details: "Material: 100% bumbac organic\nCroială: Regular fit\nSpălare: 40°C\nUscare: La temperatură scăzută",
          gender: "men",
          category: "Tricouri",
          colors: [
            { name: "Alb", code: "#ffffff", available: true },
            { name: "Negru", code: "#000000", available: true },
            { name: "Gri", code: "#808080", available: true }
          ],
          images: [
            "/src/assets/images/dress.jpg",
            "/src/assets/images/dress.jpg",
            "/src/assets/images/dress.jpg",
          ],
          sizes: { S: true, M: true, L: true, XL: true, XXL: true },
          rating: 4.5,
          reviewCount: 38,
          inStock: true
        },
        {
          id: 19,
          title: "Bluza cu fronșeuri",
          price: 349.99,
          oldPrice: 399.99,
          description: "Geacă din piele naturală, de calitate premium, cu un design clasic dar modern. Un articol esențial pentru orice garderobă masculină.",
          details: "Material: 100% piele naturală de vită\nCăptușeală: 100% poliester\nFermoar: Metalic de calitate premium\nBuzunare: 4 buzunare exterioare, 2 buzunare interioare",
          gender: "men",
          category: "Jachete",
          colors: [
            { name: "Negru", code: "#000000", available: true },
            { name: "Maro", code: "#8B4513", available: true }
          ],
          images: [
            "/src/assets/images/bluza_fronseuri.jpg",
            "/src/assets/images/bluza_fronseuri.jpg",
            "/src/assets/images/bluza_fronseuri.jpg",
          ],
          sizes: { S: false, M: true, L: true, XL: true, XXL: false },
          rating: 4.8,
          reviewCount: 56,
          inStock: true
        },
        
        // Produse pentru fete
        {
          id: 101,
          title: "Rochie cu imprimeu floral pentru fete",
          price: 89.99,
          oldPrice: null,
          description: "Rochie adorabilă cu imprimeu floral, perfectă pentru zilele de vară sau ocazii speciale. Confecționată din material moale și confortabil.",
          details: "Material: 100% bumbac\nModel: A-line\nGuler: Rotund\nMâneci: Scurte\nLungime: Deasupra genunchiului\nSpălare: 30°C",
          gender: "girls",
          category: "Rochii",
          colors: [
            { name: "Roz", code: "#FFC0CB", available: true },
            { name: "Albastru", code: "#ADD8E6", available: true },
            { name: "Galben", code: "#FFFF00", available: true }
          ],
          images: [
            "/src/assets/images/girl.jpg",
            "/src/assets/images/girl.jpg",
            "/src/assets/images/girl.jpg",
          ],
          sizes: { "2-3Y": true, "4-5Y": true, "6-7Y": true, "8-9Y": true },
          rating: 4.7,
          reviewCount: 32,
          inStock: true
        },
        {
          id: 102,
          title: "Bluză cu volănașe pentru fete",
          price: 59.99,
          oldPrice: 69.99,
          description: "Bluză drăguță cu detalii de volănașe, confecționată din material moale și confortabil. Perfectă pentru școală sau activități de zi cu zi.",
          details: "Material: 95% bumbac, 5% elastan\nGuler: Cu volănașe\nMâneci: Lungi\nÎnchidere: Nasturi în spate\nSpălare: 30°C",
          gender: "girls",
          category: "Topuri",
          colors: [
            { name: "Alb", code: "#FFFFFF", available: true },
            { name: "Roz", code: "#FFC0CB", available: true }
          ],
          images: [
            "/src/assets/images/girl.jpg",
            "/src/assets/images/girl.jpg",
            "/src/assets/images/girl.jpg",
          ],
          sizes: { "2-3Y": true, "4-5Y": true, "6-7Y": true, "8-9Y": false },
          rating: 4.6,
          reviewCount: 28,
          inStock: true
        },
        {
          id: 111,
          title: "Rochie elegantă pentru ocazii speciale",
          price: 119.99,
          oldPrice: null,
          description: "Rochie elegantă pentru ocazii speciale, cu detalii strălucitoare și fustă amplă. Perfectă pentru petreceri și evenimente festive.",
          details: "Material: 80% poliester, 20% bumbac\nLungime: Până la genunchi\nDecorațiuni: Paiete și dantelă\nSpălare: Spălare manuală recomandată",
          gender: "girls",
          category: "New Collection",
          colors: [
            { name: "Roz", code: "#FFC0CB", available: true },
            { name: "Roșu", code: "#FF0000", available: true },
            { name: "Mov", code: "#800080", available: true }
          ],
          images: [
            "/src/assets/images/girl.jpg",
            "/src/assets/images/girl.jpg",
            "/src/assets/images/girl.jpg",
          ],
          sizes: { "4-5Y": true, "6-7Y": true, "8-9Y": true, "10-11Y": true },
          rating: 4.9,
          reviewCount: 45,
          inStock: true
        },
        
        // Produse pentru băieți
        {
          id: 201,
          title: "Tricou cu print pentru băieți",
          price: 49.99,
          oldPrice: null,
          description: "Tricou confortabil cu print distractiv, perfect pentru ținute casual de zi cu zi. Confecționat din bumbac moale, prietenos cu pielea sensibilă.",
          details: "Material: 100% bumbac\nGuler: Rotund\nMâneci: Scurte\nSpălare: 40°C\nImprimeu: Print digital de înaltă calitate",
          gender: "boys",
          category: "Tricouri",
          colors: [
            { name: "Albastru", code: "#0000FF", available: true },
            { name: "Verde", code: "#008000", available: true },
            { name: "Gri", code: "#808080", available: true }
          ],
          images: [
            "/src/assets/images/boys.jpg",
            "/src/assets/images/boys.jpg",
            "/src/assets/images/boys.jpg",
          ],
          sizes: { "2-3Y": true, "4-5Y": true, "6-7Y": true, "8-9Y": true },
          rating: 4.6,
          reviewCount: 34,
          inStock: true
        },
        {
          id: 203,
          title: "Hanorac cu glugă pentru băieți",
          price: 99.99,
          oldPrice: 119.99,
          description: "Hanorac călduros cu glugă și buzunar marsupiu, confecționat din material moale și confortabil, perfect pentru zilele răcoroase.",
          details: "Material: 80% bumbac, 20% poliester\nBuzunare: Buzunar marsupiu în față\nÎnchidere: Fermoar\nGlugă: Ajustabilă cu șnur\nManșete și talie: Elastic",
          gender: "boys",
          category: "Hanorace",
          colors: [
            { name: "Gri", code: "#808080", available: true },
            { name: "Albastru", code: "#0000FF", available: true },
            { name: "Negru", code: "#000000", available: true }
          ],
          images: [
            "/src/assets/images/boys.jpg",
            "/src/assets/images/boys.jpg",
            "/src/assets/images/boys.jpg",
          ],
          sizes: { "3-4Y": true, "5-6Y": true, "7-8Y": true, "9-10Y": true },
          rating: 4.8,
          reviewCount: 42,
          inStock: true
        },
        {
          id: 211,
          title: "Geacă de iarnă pentru băieți",
          price: 149.99,
          oldPrice: 179.99,
          description: "Geacă de iarnă călduroasă cu glugă detașabilă, impermeabilă și căptușită, perfectă pentru zilele reci de iarnă.",
          details: "Material exterior: 100% poliester impermeabil\nCăptușeală: 100% poliester\nUmplutură: Puf sintetic\nGlugă: Detașabilă\nBuzunare: 2 buzunare cu fermoar",
          gender: "boys",
          category: "New Collection",
          colors: [
            { name: "Albastru", code: "#0000FF", available: true },
            { name: "Negru", code: "#000000", available: true },
            { name: "Verde", code: "#008000", available: true }
          ],
          images: [
            "/src/assets/images/boys.jpg",
            "/src/assets/images/boys.jpg",
            "/src/assets/images/boys.jpg",
          ],
          sizes: { "3-4Y": true, "5-6Y": true, "7-8Y": true, "9-10Y": true },
          rating: 4.9,
          reviewCount: 38,
          inStock: true
        }
      ];

      const productDetails = products.find(
        (product) => product.id === parseInt(productId)
      );
      
      if (productDetails) {
        setProduct(productDetails);
        setMainImage(productDetails.images[0]);
        
        // Selectăm prima culoare disponibilă (acum toate sunt disponibile)
        if (productDetails.colors.length > 0) {
          setSelectedColor(productDetails.colors[0].name);
        }
        
        // Generăm produse asociate din aceeași categorie și gen
        // Modificare: Includem mai multe produse (maxim 8 sau toate disponibile)
        let related = products
          .filter(p => p.id !== productDetails.id) // Doar produse diferite de cel curent
          .slice(0, 8); // Luăm maxim 8 produse
        
        // Dacă avem mai puțin de 4 produse, includem produse din alte categorii
        if (related.length < 4) {
          const otherProducts = products
            .filter(p => p.id !== productDetails.id && !related.some(r => r.id === p.id))
            .slice(0, 8 - related.length);
          related = [...related, ...otherProducts];
        }
        
        setRelatedProducts(related);
      }
    };

    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [productId]);

  // Eliminăm verificarea de disponibilitate pentru culoare
  const handleColorSelection = (colorName) => {
    setSelectedColor(colorName);
  };

  const handleSizeSelection = (size) => {
    const sizes = product.sizes;
    if (typeof sizes === 'object' && size in sizes && sizes[size]) {
      setSelectedSize(size);
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Te rugăm să selectezi o mărime înainte de a adăuga în coș!");
      return;
    }
    
    if (!selectedColor) {
      alert("Te rugăm să selectezi o culoare înainte de a adăuga în coș!");
      return;
    }
    
    // Verificăm disponibilitatea mărimii
    if (!product.sizes[selectedSize]) {
      alert("Mărimea selectată nu este disponibilă momentan!");
      return;
    }
    
    // Creăm obiectul produsului pentru adăugare în coș
    const productToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0], // Prima imagine
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    };
    
    // Adăugăm produsul în coș
    addToCart(productToAdd);
    
    // Arătăm o confirmare vizuală
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Modificarea funcțiilor de toggle pentru a asigura că doar o secțiune este deschisă la un moment dat
  const toggleDetails = (forceState) => {
    // Dacă primim o valoare explicită (true/false), o folosim
    if (typeof forceState === 'boolean') {
      setShowDetails(forceState);
      if (forceState === true) {
        setShowDelivery(false);
        setShowReturns(false);
      }
    } else {
      // Comportamentul toggle implicit - dacă este deschis îl închidem, altfel îl deschidem
      const newState = !showDetails;
      setShowDetails(newState);
      if (newState === true) {
        setShowDelivery(false);
        setShowReturns(false);
      }
    }
  };

  const toggleDelivery = (forceState) => {
    if (typeof forceState === 'boolean') {
      setShowDelivery(forceState);
      if (forceState === true) {
        setShowDetails(false);
        setShowReturns(false);
      }
    } else {
      const newState = !showDelivery;
      setShowDelivery(newState);
      if (newState === true) {
        setShowDetails(false);
        setShowReturns(false);
      }
    }
  };

  const toggleReturns = (forceState) => {
    if (typeof forceState === 'boolean') {
      setShowReturns(forceState);
      if (forceState === true) {
        setShowDetails(false);
        setShowDelivery(false);
      }
    } else {
      const newState = !showReturns;
      setShowReturns(newState);
      if (newState === true) {
        setShowDetails(false);
        setShowDelivery(false);
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-36 sm:w-48 h-6 sm:h-8 bg-gray-200 mb-3 sm:mb-4 rounded"></div>
          <div className="w-48 sm:w-64 h-3 sm:h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Pregătim datele pentru breadcrumbs
  const breadcrumbsItems = [
    { label: "Acasă", link: "/" },
    { label: product.gender === "women" ? "Femei" : "Bărbați", link: `/${product.gender}` },
    { label: product.category, link: `/${product.gender}/${product.category}` },
    { label: product.title }
  ];

  // Calculăm procentul de reducere pentru afișare
  const discount = product.oldPrice 
    ? Math.round((1 - product.price / product.oldPrice) * 100) 
    : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-3 sm:px-4 pb-8 sm:pb-12 md:pb-16">
        {/* Breadcrumbs - hidden on smallest mobile */}
        <div className="hidden sm:block">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>

        {/* Layout pentru desktop (lg+) - Imagini orizontale sus, detalii dedesubt */}
        <div className="hidden lg:block">
          {/* Secțiunea de imagini - full width */}
          <div className="w-full mb-8 lg:mb-10">
            <ProductImages 
              images={product.images} 
              productTitle={product.title} 
              discount={discount} 
            />
          </div>

          {/* Secțiunea de detalii - împărțită în două coloane */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Coloana stângă - Informații produs și Acordeon */}
            <div>
              <ProductInfo 
                product={product} 
                isFavorite={isFavorite} 
                onToggleFavorite={toggleFavorite}
                isDesktop={true} 
              />
              
              <div className="mt-6 lg:mt-8">
                <ProductAccordion
                  product={product}
                  showDetails={showDetails}
                  showDelivery={showDelivery}
                  showReturns={showReturns}
                  onToggleDetails={toggleDetails}
                  onToggleDelivery={toggleDelivery}
                  onToggleReturns={toggleReturns}
                  isDesktop={true}
                />
              </div>
            </div>
            
            {/* Coloana dreaptă - Selecții și Acțiuni */}
            <div>
              <ProductOptions
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                onColorSelect={handleColorSelection}
                onSizeSelect={handleSizeSelection}
              />
              
              <ProductActions
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                addedToCart={addedToCart}
                disabled={!selectedSize || !selectedColor || !product.inStock}
              />
              
              {/* Informații livrare și returnare */}
              <div className="mt-6 lg:mt-8 space-y-3 sm:space-y-4 border-t border-gray-100 pt-4 sm:pt-6">
                <div className="flex items-start space-x-3">
                  <Truck size={18} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Livrare gratuită</p>
                    <p className="text-xs text-gray-500">Pentru comenzi peste 250 Lei</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RefreshCw size={18} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">30 de zile drept de retur</p>
                    <p className="text-xs text-gray-500">Returnare ușoară și gratuită</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Layout pentru mobile și tablete (< lg) */}
        <div className="lg:hidden">
          {/* Galeria de imagini - asigurăm afișarea verticală pe mobile */}
          <div className="w-full">
            <ProductImages 
              images={product.images} 
              productTitle={product.title} 
              discount={discount} 
            />
          </div>

          <div className="mt-4 sm:mt-6 px-1 sm:px-2">
            {/* Informații produs */}
            <ProductInfo 
              product={product} 
              isFavorite={isFavorite} 
              onToggleFavorite={toggleFavorite}
              isDesktop={false} 
            />
            
            {/* Opțiuni produs - culori și mărimi */}
            <div className="mt-4 sm:mt-6">
              <ProductOptions
                product={product}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                onColorSelect={handleColorSelection}
                onSizeSelect={handleSizeSelection}
              />
            </div>
            
            {/* Acțiuni produs - cantitate și buton adaugă în coș */}
            <div className="mt-4 sm:mt-6">
              <ProductActions
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                addedToCart={addedToCart}
                disabled={!selectedSize || !selectedColor || !product.inStock}
              />
            </div>
            
            {/* Informații livrare și returnare */}
            <div className="mt-6 space-y-3 border-t border-gray-100 pt-4">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Truck size={16} className="text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-xs sm:text-sm">Livrare gratuită</p>
                  <p className="text-xs text-gray-500">Pentru comenzi peste 250 Lei</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <RefreshCw size={16} className="text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium text-xs sm:text-sm">30 de zile drept de retur</p>
                  <p className="text-xs text-gray-500">Returnare ușoară și gratuită</p>
                </div>
              </div>
            </div>
            
            {/* Acordeon pentru detalii, livrare și returnare */}
            <div className="mt-6">
              <ProductAccordion
                product={product}
                showDetails={showDetails}
                showDelivery={showDelivery}
                showReturns={showReturns}
                onToggleDetails={toggleDetails}
                onToggleDelivery={toggleDelivery}
                onToggleReturns={toggleReturns}
                isDesktop={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Produse similare */}
      <div className="bg-gray-50 py-6 sm:py-8 md:py-12">
        <RelatedProducts products={relatedProducts} />
      </div>
      
      {/* Recenzii */}
      <div className="py-6 sm:py-8 md:py-12">
        <ProductReviews 
          rating={product.rating} 
          reviewCount={product.reviewCount} 
          product={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;