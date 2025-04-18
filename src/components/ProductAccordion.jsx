// src/components/ProductPage/ProductAccordion.jsx
import { ChevronDown, ChevronUp, Truck, ShieldCheck, RotateCcw, FileText } from "lucide-react";

const AccordionItem = ({ 
  title, 
  isOpen, 
  onToggle, 
  children,  
}) => {
  return (
    <div className="border-b pb-4">
      <button 
        className="w-full flex justify-between items-center text-left"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <h3 >{title.toUpperCase()}</h3>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <div className="mt-3 whitespace-pre-line text-gray-700 text-sm">
          {children}
        </div>
      )}
    </div>
  );
};

const ProductAccordion = ({ 
  product, 
  showDetails, 
  showDelivery, 
  showReturns, 
  showMaterials = false,
  showCare = false,
  onToggleDetails, 
  onToggleDelivery, 
  onToggleReturns,
  onToggleMaterials = () => {},
  onToggleCare = () => {},
  isDesktop = false 
}) => {
  const accordionItems = isDesktop ? [
    {
      title: "Descriere produs",
      isOpen: showDetails,
      onToggle: onToggleDetails,
      icon: <FileText size={18} className="text-gray-700" />,
      content: (
        <div className="text-sm">
          <p className="mb-3">{product.description}</p>
          <p className="mb-3">Nr. articol: {product.articleNumber || "N/A"}</p>
         
        </div>
      )
    },
    {
      title: "Politica de expediere",
      isOpen: showDelivery,
      onToggle: onToggleDelivery,
      icon: <Truck size={18} className="text-gray-700" />,
      content: (
        <div className="text-sm">
          <p>Livrare gratuită pentru comenzi peste 200 Lei.</p>
          <p>Livrare în 2-4 zile lucrătoare.</p>
        </div>
      )
    },
    {
      title: "Politica de retur",
      isOpen: showReturns,
      onToggle: onToggleReturns,
      icon: <RotateCcw size={18} className="text-gray-700" />,
      content: (
        <div className="text-sm">
          <p>Returnare gratuită în termen de 30 de zile.</p>
          <p>Produsele trebuie să fie în starea inițială, cu etichetele atașate.</p>
        </div>
      )
    }
  ] : [
    {
      title: "Descriere produs",
      isOpen: showDetails,
      onToggle: onToggleDetails,
      icon: <FileText size={18} className="text-gray-700" />,
      content: (
        <>
          <p>{product.description}</p>
          <p className="mt-2">Nr. articol: {product.articleNumber || "N/A"}</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {product.details.split('\n').map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </>
      )
    },
    
    {
      title: "Livrare și plată",
      isOpen: showDelivery,
      onToggle: onToggleDelivery,
      icon: <Truck size={18} className="text-gray-700" />,
      content: (
        <div className="space-y-3">
          <div className="flex items-start">
            <Truck size={18} className="text-gray-700 mr-2 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Livrare gratuită pentru comenzi peste 200 Lei</p>
              <p className="text-gray-700">Livrare în 2-4 zile lucrătoare</p>
            </div>
          </div>
          <div className="flex items-start">
            <ShieldCheck size={18} className="text-gray-700 mr-2 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Plată securizată</p>
              <p className="text-gray-700">Card, ramburs, transfer bancar</p>
            </div>
          </div>
        </div>
        
      )
    },
    {
      title: "Returnare și schimb",
      isOpen: showReturns,
      onToggle: onToggleReturns,
      icon: <RotateCcw size={18} className="text-gray-700" />,
      content: (
        <div className="space-y-3">
          <div className="flex items-start">
            <RotateCcw size={18} className="text-gray-700 mr-2 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">30 de zile pentru returnare</p>
              <p className="text-gray-700">Ai la dispoziție 30 de zile pentru a returna produsul dacă nu ești mulțumit(ă).</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className={isDesktop ? "  divide-y divide-white" : "mt-8 space-y-4 border-t pt-6"}>
      {accordionItems.map((item, index) => (
        <AccordionItem 
          key={index}
          title={item.title}
          isOpen={item.isOpen}
          onToggle={item.onToggle}
          icon={item.icon}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default ProductAccordion;