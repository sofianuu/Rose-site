import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, calculateTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    county: '',
    postalCode: '',
    paymentMethod: 'ramburs',
    notes: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format card expiry date to automatically add slash
  const formatExpiryDate = (value) => {
    // Remove any non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Add slash after the month if we have 2+ digits
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    
    return cleaned;
  };

  // Format card number to add spaces after every 4 digits
  const formatCardNumber = (value) => {
    // Remove any non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Add spaces after every 4 digits
    const parts = [];
    for (let i = 0; i < cleaned.length; i += 4) {
      parts.push(cleaned.substring(i, i + 4));
    }
    
    return parts.join(' ');
  };

  // Capitalize first letter of each word for cardholder name
  const capitalizeNames = (value) => {
    // Split the string by spaces
    return value
      .split(' ')
      .map(word => {
        // Skip if word is empty
        if (word.length === 0) return '';
        // Capitalize first letter and make the rest lowercase
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  // Calculăm valorile pentru sumarul comenzii
  const subtotal = calculateTotal();
  const shipping = cartItems.length > 0 ? (subtotal >= 250 ? 0 : 15.99) : 0;
  const total = subtotal + shipping;

  // Handler pentru actualizarea datelor formularului
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for expiry date to format with slash
    if (name === 'expiryDate') {
      const formattedValue = formatExpiryDate(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } 
    // Special handling for card number to format with spaces
    else if (name === 'cardNumber') {
      const formattedValue = formatCardNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    }
    // Special handling for cardholder name to capitalize
    else if (name === 'cardName') {
      const formattedValue = capitalizeNames(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    }
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Eliminăm eroarea pentru câmpul completat
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Validarea formularului
  const validateForm = () => {
    const newErrors = {};

    // Validare câmpuri obligatorii
    if (!formData.firstName.trim()) newErrors.firstName = 'Prenumele este obligatoriu';
    if (!formData.lastName.trim()) newErrors.lastName = 'Numele este obligatoriu';
    if (!formData.email.trim()) newErrors.email = 'Emailul este obligatoriu';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Emailul nu este valid';
    if (!formData.phone.trim()) newErrors.phone = 'Telefonul este obligatoriu';
    else if (!/^07\d{8}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Telefonul nu este valid';
    if (!formData.address.trim()) newErrors.address = 'Adresa este obligatorie';
    if (!formData.city.trim()) newErrors.city = 'Orașul este obligatoriu';
    if (!formData.county.trim()) newErrors.county = 'Județul este obligatoriu';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Codul poștal este obligatoriu';

    // Validare câmpuri card dacă metoda de plată este card
    if (formData.paymentMethod === 'card') {
      if (!formData.cardName?.trim()) newErrors.cardName = 'Numele titularului este obligatoriu';
      if (!formData.cardNumber?.trim()) newErrors.cardNumber = 'Numărul cardului este obligatoriu';
      else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
        newErrors.cardNumber = 'Numărul cardului trebuie să conțină între 13 și 19 cifre';
      
      if (!formData.expiryDate?.trim()) newErrors.expiryDate = 'Data expirării este obligatorie';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate))
        newErrors.expiryDate = 'Formatul datei trebuie să fie MM/AA';
      
      if (!formData.cvv?.trim()) newErrors.cvv = 'Codul CVV/CVC este obligatoriu';
      else if (!/^\d{3,4}$/.test(formData.cvv))
        newErrors.cvv = 'Codul CVV/CVC trebuie să conțină 3 sau 4 cifre';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Funcție pentru trimiterea comenzii
  const placeOrder = async () => {
    if (!validateForm()) {
      // Dacă sunt erori, nu trimitem comanda și facem scroll sus pentru a arăta erorile
      window.scrollTo(0, 0);
      return;
    }

    setIsSubmitting(true);

    try {
      // În producție, aici ar fi un apel API pentru a trimite comanda către server
      // Simulăm un apel async pentru demonstrație
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generăm un număr de comandă fals pentru demo
      const fakeOrderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(fakeOrderNumber);
      
      // Resetăm coșul după trimiterea comenzii
      clearCart();
      
      // Afișăm confirmarea
      setOrderPlaced(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error placing order:', error);
      setErrors({ submit: 'A apărut o eroare la trimiterea comenzii. Vă rugăm să încercați din nou.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dacă nu sunt produse în coș, redirecționăm către pagina de coș
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-16">
          <h2 className="text-2xl font-light mb-3">Nu există produse în coș</h2>
          <p className="text-gray-500 mb-8">Pentru a finaliza o comandă, trebuie să adaugi produse în coș.</p>
          <Link to="/" className="inline-flex items-center bg-black text-white hover:bg-gray-800 px-6 py-3 font-medium transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            <span>Mergi la cumpărături</span>
          </Link>
        </div>
      </div>
    );
  }

  // Afișăm confirmarea comenzii dacă aceasta a fost plasată
  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold mb-4">Comandă plasată cu succes!</h1>
          <p className="text-gray-600 mb-6">
            Mulțumim pentru comanda ta! Am trimis un email la adresa {formData.email} cu detaliile comenzii.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-800 font-medium">Numărul comenzii: <span className="font-bold">{orderNumber}</span></p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Continuă cumpărăturile
            </Link>
            <Link 
              to="/Profile" 
              onClick={() => {
                try {
                  window.sessionStorage.setItem('profileTab', 'orders');
                  if (window.location.pathname.includes('/Profile')) {
                    window.dispatchEvent(new Event('profileTabChange'));
                  }
                } catch (error) {
                  console.error("Error setting orders tab:", error);
                }
              }}
               className="border border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors">
              Vezi comenzile mele
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-light text-center">Finalizare comandă</h1>
        <div className="w-20 h-0.5 bg-black mx-auto mt-2"></div>
      </div>

      {/* Pași checkout */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <span className="text-xs mt-1">Date livrare</span>
          </div>
          <div className={`flex-1 h-0.5 transition-colors ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <span className="text-xs mt-1">Plată</span>
          </div>
          <div className={`flex-1 h-0.5 transition-colors ${step >= 3 ? 'bg-black' : 'bg-gray-200'}`}></div>
          <div className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${step >= 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
              3
            </div>
            <span className="text-xs mt-1">Confirmare</span>
          </div>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        {/* Formular date livrare */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded border border-gray-100 p-6 mb-6">
            {/* Step 1: Date livrare */}
            {step === 1 && (
              <>
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h2 className="text-lg font-medium">Date de livrare</h2>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
                    {errors.submit}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="firstName">
                      Prenume *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="lastName">
                      Nume *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="phone">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md`}
                      placeholder="0712345678"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1" htmlFor="address">
                    Adresă completă *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md`}
                    placeholder="Strada, număr, bloc, scara, apartament, etc."
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="city">
                      Oraș *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="county">
                      Județ *
                    </label>
                    <input
                      type="text"
                      id="county"
                      name="county"
                      value={formData.county}
                      onChange={handleChange}
                      className={`w-full border ${errors.county ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md`}
                    />
                    {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="postalCode">
                      Cod poștal *
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} p-2 rounded-md`}
                    />
                    {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Link to="/cart" className="flex items-center text-gray-600 hover:text-black transition-colors">
                    <ArrowLeft size={16} className="mr-1" />
                    <span>Înapoi la coș</span>
                  </Link>
                  <button
                    onClick={() => setStep(2)}
                    className="bg-black text-white px-6 py-2 font-medium hover:bg-gray-800 transition-colors"
                  >
                    Continuă
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Metodă de plată */}
            {step === 2 && (
              <>
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h2 className="text-lg font-medium">Metodă de plată</h2>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="border rounded-md p-4 cursor-pointer transition-colors hover:border-black">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="ramburs"
                        checked={formData.paymentMethod === 'ramburs'}
                        onChange={handleChange}
                        className="mr-3 mt-1"
                      />
                      <div>
                        <p className="font-medium">Ramburs la livrare</p>
                        <p className="text-sm text-gray-500">Plătești când primești comanda</p>
                      </div>
                    </label>
                  </div>

                  <div className="border rounded-md p-4 cursor-pointer transition-colors hover:border-black">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="mr-3 mt-1"
                      />
                      <div>
                        <p className="font-medium">Card credit/debit</p>
                        <p className="text-sm text-gray-500">Plată online securizată</p>
                      </div>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="border rounded-md p-5 mb-8">
                    <h3 className="font-medium mb-4">Informații card</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="cardName">
                          Nume titular card *
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName || ''}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-2 rounded-md"
                          placeholder="Ex: Ion Popescu"
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">
                          Număr card *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber || ''}
                          onChange={handleChange}
                          className="w-full border border-gray-300 p-2 rounded-md"
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="expiryDate">
                            Data expirării *
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            placeholder="MM/AA"
                            maxLength="5"
                          />
                          {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="cvv">
                            CVV/CVC *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv || ''}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-md"
                            placeholder="123"
                            maxLength="4"
                          />
                          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm mt-2 text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Plata este securizată cu criptare SSL</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1" htmlFor="notes">
                    Note comandă (opțional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md min-h-[100px]"
                    placeholder="Instrucțiuni speciale pentru livrare, etc."
                  ></textarea>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center text-gray-600 hover:text-black transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    <span>Înapoi</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-black text-white px-6 py-2 font-medium hover:bg-gray-800 transition-colors"
                  >
                    Continuă
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Verificare și finalizare */}
            {step === 3 && (
              <>
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <h2 className="text-lg font-medium">Verifică și finalizează comanda</h2>
                </div>

                <div className="mb-8">
                  <h3 className="font-medium mb-3">Date personale</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="mb-1">{formData.firstName} {formData.lastName}</p>
                    <p className="mb-1">Email: {formData.email}</p>
                    <p>Telefon: {formData.phone}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-medium mb-3">Adresă de livrare</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="mb-1">{formData.address}</p>
                    <p>{formData.city}, {formData.county}, {formData.postalCode}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-medium mb-3">Metodă de plată</h3>
                  <div className="bg-gray-50 p-4 rounded-md flex items-center">
                    {formData.paymentMethod === 'ramburs' ? (
                      <>
                        <CreditCard className="text-gray-500 mr-2" size={18} />
                        <span>Ramburs la livrare</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="text-gray-500 mr-2" size={18} />
                        <span>Card credit/debit (•••• {formData.cardNumber?.slice(-4) || ''})</span>
                      </>
                    )}
                  </div>
                </div>

                {formData.notes && (
                  <div className="mb-8">
                    <h3 className="font-medium mb-3">Note comandă</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>{formData.notes}</p>
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="font-medium mb-3">Produse comandate</h3>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div 
                        key={`${item.id}-${item.size}-${item.color}`} 
                        className="flex items-center border-b border-gray-100 pb-4"
                      >
                        <div className="w-16 h-16 flex-shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4 flex-grow">
                          <p className="font-medium">{item.title}</p>
                          <div className="text-sm text-gray-500">
                            <p>Mărime: {item.size} | Culoare: {item.color}</p>
                            <p>Cantitate: {item.quantity} x {item.price.toFixed(2)} lei</p>
                          </div>
                        </div>
                        <div className="font-medium ml-4">
                          {(item.price * item.quantity).toFixed(2)} lei
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center text-gray-600 hover:text-black transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    <span>Înapoi</span>
                  </button>
                  <button
                    onClick={placeOrder}
                    disabled={isSubmitting}
                    className="bg-black text-white px-6 py-2 font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Se procesează...
                      </>
                    ) : (
                      'Plasează comanda'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sumar comandă */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded border border-gray-100 p-6 mb-6 sticky top-6">
            <h2 className="text-lg font-medium mb-6">Sumar comandă</h2>
            
            <div className="max-h-60 overflow-y-auto mb-6">
              {cartItems.map((item) => (
                <div 
                  key={`${item.id}-${item.size}-${item.color}`} 
                  className="flex items-center mb-4 border-b border-gray-100 pb-4 last:border-0"
                >
                  <div className="w-12 h-12 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-3 flex-grow">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">Cantitate: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium ml-3">
                    {(item.price * item.quantity).toFixed(2)} lei
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{subtotal.toFixed(2)} lei</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Livrare</span>
                {shipping === 0 ? (
                  <span className="text-green-600">Gratuit</span>
                ) : (
                  <span>{shipping.toFixed(2)} lei</span>
                )}
              </div>
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{total.toFixed(2)} lei</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">TVA inclus</p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <Truck size={18} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-600">
                  {shipping === 0 
                    ? 'Livrare gratuită' 
                    : 'Livrare gratuită pentru comenzi peste 250 lei'}
                </p>
              </div>
              <div className="flex items-start">
                <Home size={18} className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-600">
                  Livrare estimată în 2-4 zile lucrătoare
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 