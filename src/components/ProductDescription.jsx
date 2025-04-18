// src/components/ProductPage/ProductDescription.jsx

const ProductDescription = ({ description, details, isDesktop = false }) => {
    return (
      <div className={isDesktop ? "mb-6" : "mt-4"}>
        {isDesktop ? (
          /* Layout desktop */
          <>
            <h2 className="font-bold text-lg mb-2">Descriere</h2>
            <p className="text-sm mb-3">{description}</p>
            
            <ul className="list-disc pl-5 text-sm space-y-1">
              {details.split('\n').map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </>
        ) : (
          /* Layout mobile */
          <p className="text-gray-700">{description}</p>
        )}
      </div>
    );
  };
  
  export default ProductDescription;