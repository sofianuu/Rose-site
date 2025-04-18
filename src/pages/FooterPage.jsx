import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Book, Shield, HelpCircle, Lock, Users, Baby, MoveLeft, MoveRight, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Componenta pentru conținutul secțiunii
const SectionContent = ({ title, children }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mt-10 mb-6 pb-3 border-b border-gray-200 tracking-tight">
        {title}
      </h2>
      {children}
    </div>
  );
};

// Componenta pentru subsecțiuni
const SubSection = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-medium mt-8 mb-3 text-gray-900 tracking-tight">
        {title}
      </h3>
      {children}
    </div>
  );
};

// Componenta pentru paragrafe
const Paragraph = ({ children }) => {
  return (
    <p className="mb-5 text-gray-700 leading-7 max-w-prose text-base">
      {children}
    </p>
  );
};

// Conținutul pentru fiecare pagină
const termsSections = [
  {
    title: "1. Introducere",
    content: [
      "Acești Termeni și Condiții guvernează utilizarea site-ului web Rose și serviciile oferite prin intermediul acestuia. Prin accesarea și utilizarea site-ului nostru, sunteți de acord cu acești termeni în totalitate. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați site-ul nostru."
    ]
  },
  {
    title: "2. Definiții",
    content: [
      "\"Site\" se referă la website-ul Rose, accesibil la adresa www.rose.ro",
      "\"Utilizator\" se referă la orice persoană care accesează și utilizează site-ul nostru.",
      "\"Cont\" se referă la înregistrarea electronică a datelor personale ale utilizatorului care îi permite acestuia să efectueze comenzi.",
      "\"Comandă\" înseamnă o solicitare efectuată de utilizator pentru achiziționarea unui produs sau serviciu oferit de Rose."
    ]
  },
  {
    title: "3. Înregistrarea Contului",
    content: [
      "Pentru a putea efectua comenzi pe site-ul nostru, trebuie să vă creați un cont. Sunteți responsabil pentru păstrarea confidențialității datelor de acces și pentru toate activitățile care au loc în contul dumneavoastră.",
      "Vă angajați să ne notificați imediat cu privire la orice utilizare neautorizată a contului dumneavoastră sau orice altă breșă de securitate."
    ]
  },
  {
    title: "4. Comandarea Produselor",
    content: [
      "Prin plasarea unei comenzi, oferiți o ofertă de cumpărare pentru produsele selectate. Comanda dumneavoastră reprezintă o ofertă către noi pentru a cumpăra un produs.",
      "Ne rezervăm dreptul de a refuza sau anula orice comandă, în orice moment, din motive care includ, dar nu se limitează la: disponibilitatea produsului, erori în descrierea sau prețul produsului, erori în comanda dumneavoastră sau alte motive."
    ]
  },
  {
    title: "5. Livrarea",
    content: [
      "Ne angajăm să livrăm produsele în conformitate cu opțiunile de livrare disponibile și selectate în momentul plasării comenzii.",
      "Termenele de livrare sunt estimative și pot varia în funcție de factori precum disponibilitatea produselor, locația de livrare, și alți factori."
    ]
  },
  {
    title: "6. Returnarea și Rambursarea",
    content: [
      "Produsele pot fi returnate în conformitate cu politica noastră de returnare, în termen de 30 de zile de la primirea produsului.",
      "Rambursările vor fi procesate în conformitate cu metoda de plată originală, în termen de 14 zile de la aprobarea returnării."
    ]
  }
];

const privacySections = [
  {
    title: "1. Introducere",
    content: [
      "Politica de confidențialitate descrie modul în care colectăm, folosim, procesăm și divulgăm informațiile dumneavoastră, inclusiv datele personale, în legătură cu accesarea și utilizarea site-ului Rose."
    ]
  },
  {
    title: "2. Informațiile pe care le colectăm",
    content: [
      "Colectăm informații pe care ni le furnizați direct, cum ar fi atunci când vă înregistrați un cont, efectuați o comandă, completați un formular sau comunicați cu noi.",
      "De asemenea, colectăm automat anumite informații despre utilizarea site-ului, cum ar fi adresa IP, tipul de browser, paginile vizitate și timpul petrecut pe site."
    ]
  },
  {
    title: "3. Cum folosim informațiile dumneavoastră",
    content: [
      "Folosim informațiile dumneavoastră pentru a vă oferi serviciile noastre, pentru a procesa comenzile, pentru a personaliza experiența dumneavoastră, pentru a comunica cu dumneavoastră, și pentru a îmbunătăți site-ul nostru.",
      "De asemenea, putem folosi informațiile dumneavoastră pentru a vă trimite comunicări de marketing despre produsele și serviciile noastre, dacă v-ați dat consimțământul pentru aceasta."
    ]
  },
  {
    title: "4. Divulgarea informațiilor",
    content: [
      "Nu vom divulga informațiile dumneavoastră personale terților, cu excepția situațiilor în care este necesar pentru a vă oferi serviciile noastre, cum ar fi procesatorilor de plăți sau companiilor de livrare.",
      "De asemenea, putem divulga informațiile dumneavoastră dacă suntem obligați prin lege sau dacă considerăm că este necesar pentru a ne proteja drepturile, proprietatea sau siguranța."
    ]
  },
  {
    title: "5. Drepturile dumneavoastră",
    content: [
      "Aveți dreptul de a accesa, corecta, șterge sau restricționa procesarea informațiilor dumneavoastră personale. De asemenea, aveți dreptul de a vă opune procesării și dreptul la portabilitatea datelor.",
      "Pentru a vă exercita aceste drepturi, vă rugăm să ne contactați la adresa de email datepersonale@rose.ro."
    ]
  }
];

const projectSections = [
  {
    title: "1. Introducere",
    content: [
      "Protecția Proiectului se referă la măsurile luate de Rose pentru a asigura că atât vânzătorii cât și cumpărătorii sunt protejați în timpul tranzacțiilor."
    ]
  },
  {
    title: "2. Protecția Cumpărătorului",
    content: [
      "Garanția Rose asigură că toate produsele cumpărate de pe site-ul nostru sunt conforme cu descrierea acestora. Dacă produsul primit nu corespunde descrierii sau este defect, cumpărătorul are dreptul la o rambursare completă sau la un produs de înlocuire.",
      "De asemenea, oferim protecție împotriva livrării nedorite, asigurându-ne că fiecare comandă este livrată în termen sau cumpărătorul primește o rambursare."
    ]
  },
  {
    title: "3. Protecția Vânzătorului",
    content: [
      "Pentru vânzătorii noștri parteneri, oferim protecție împotriva retururilor frauduloase și asigurăm că plățile sunt procesate prompt și sigur.",
      "Oferim de asemenea asistență în gestionarea reclamațiilor și disputelor, asigurând un proces echitabil pentru toți participanții."
    ]
  },
  {
    title: "4. Procesul de Dispută",
    content: [
      "În cazul unei dispute între cumpărător și vânzător, Rose va acționa ca mediator pentru a găsi o soluție echitabilă. Ambele părți vor avea oportunitatea de a prezenta dovezi și argumente.",
      "Decizia finală va fi luată pe baza politicilor noastre și a dovezilor prezentate, cu scopul de a asigura o rezoluție echitabilă."
    ]
  }
];

const faqSections = [
  {
    title: "1. Comenzi și Plăți",
    subsections: [
      {
        title: "Cum pot plasa o comandă?",
        content: [
          "Pentru a plasa o comandă, selectați produsele dorite, adăugați-le în coșul de cumpărături, apoi urmați pașii pentru finalizarea comenzii, inclusiv completarea informațiilor de livrare și plată."
        ]
      },
      {
        title: "Ce metode de plată acceptați?",
        content: [
          "Acceptăm plăți prin card de credit/debit (Visa, Mastercard), PayPal, transfer bancar și plata la livrare (ramburs)."
        ]
      }
    ]
  },
  {
    title: "2. Livrare",
    subsections: [
      {
        title: "Cât durează livrarea?",
        content: [
          "Timpul standard de livrare este de 2-4 zile lucrătoare pentru România și 5-10 zile lucrătoare pentru livrări internaționale, în funcție de locație."
        ]
      },
      {
        title: "Cum pot urmări comanda mea?",
        content: [
          "După procesarea comenzii, veți primi un email cu un link de urmărire care vă va permite să verificați statusul livrării în timp real."
        ]
      }
    ]
  },
  {
    title: "3. Returnări și Rambursări",
    subsections: [
      {
        title: "Care este politica de returnare?",
        content: [
          "Puteți returna produsele în termen de 30 de zile de la primire. Produsele trebuie să fie în starea originală, cu etichetele atașate și în ambalajul original."
        ]
      },
      {
        title: "Cât durează procesarea unei rambursări?",
        content: [
          "Rambursările sunt de obicei procesate în termen de 14 zile de la primirea și verificarea produselor returnate."
        ]
      }
    ]
  },
  {
    title: "4. Contul Meu",
    subsections: [
      {
        title: "Cum îmi pot crea un cont?",
        content: [
          "Puteți crea un cont făcând clic pe \"Înregistrare\" din colțul din dreapta sus al paginii și completând formularul cu informațiile necesare."
        ]
      },
      {
        title: "Am uitat parola. Ce pot face?",
        content: [
          "Faceți clic pe \"Am uitat parola\" pe pagina de autentificare și urmați instrucțiunile pentru a reseta parola."
        ]
      }
    ]
  }
];

// Conținutul pentru fiecare pagină
const pageContent = {
  terms: {
    title: 'Termeni și Condiții',
    icon: <Book className="w-8 h-8 text-gray-900" />,
    sections: termsSections
  },
  privacy: {
    title: 'Politica de Confidențialitate',
    icon: <Lock className="w-8 h-8 text-gray-900" />,
    sections: privacySections
  },
  project: {
    title: 'Protecția Proiectului',
    icon: <Shield className="w-8 h-8 text-gray-900" />,
    sections: projectSections
  },
  faq: {
    title: 'Întrebări Frecvente',
    icon: <HelpCircle className="w-8 h-8 text-gray-900" />,
    sections: faqSections
  }
};

// Componenta pentru breadcrumb
const Breadcrumb = ({ pageTitle }) => {
  return (
    <nav className="flex items-center text-sm mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li className="flex items-center">
          <Link to="/" className="text-gray-500 hover:text-gray-900 flex items-center">
            <Home size={14} className="mr-1" />
            <span>Acasă</span>
          </Link>
        </li>
        <li className="flex items-center">
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-800 font-medium">{pageTitle}</span>
        </li>
      </ol>
    </nav>
  );
};

// Componenta pentru navigarea între pagini
const PageNavigation = ({ currentPage }) => {
  const navigate = useNavigate();
  const pages = Object.keys(pageContent);
  const currentIndex = pages.indexOf(currentPage);
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;
  
  return (
    <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
      {prevPage ? (
        <button 
          onClick={() => navigate(`/footer/${prevPage}`)}
          className="flex items-center px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 group"
        >
          <MoveLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>{pageContent[prevPage].title}</span>
        </button>
      ) : <div />}
      
      {nextPage ? (
        <button 
          onClick={() => navigate(`/footer/${nextPage}`)}
          className="flex items-center px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-black transition-all duration-200 group"
        >
          <span>{pageContent[nextPage].title}</span>
          <MoveRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      ) : <div />}
    </div>
  );
};

// Componenta Sidebar pentru navigare rapidă
const Sidebar = ({ currentPage }) => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full lg:w-64 mb-8 lg:mb-0">
      <div className="sticky top-24">
        <h3 className="text-lg font-semibold mb-4">Navigare rapidă</h3>
        <ul className="space-y-1">
          {Object.entries(pageContent).map(([key, page]) => (
            <li key={key}>
              <button
                onClick={() => navigate(`/footer/${key}`)}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  currentPage === key 
                    ? 'bg-gray-100 text-black font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                } transition-all duration-200`}
              >
                <span className="mr-3">{React.cloneElement(page.icon, { size: 16 })}</span>
                <span>{page.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Componenta pentru afișarea conținutului paginii
const PageContent = ({ sections }) => {
  // Pentru paginile normale (terms, privacy, project)
  if (!sections[0].subsections) {
    return (
      <>
        {sections.map((section, index) => (
          <SectionContent key={index} title={section.title}>
            {section.content.map((paragraph, pIndex) => (
              <Paragraph key={pIndex}>{paragraph}</Paragraph>
            ))}
          </SectionContent>
        ))}
      </>
    );
  }
  
  // Pentru pagina FAQ cu subsecțiuni
  return (
    <>
      {sections.map((section, index) => (
        <SectionContent key={index} title={section.title}>
          {section.subsections.map((subsection, subIndex) => (
            <SubSection key={subIndex} title={subsection.title}>
              {subsection.content.map((paragraph, pIndex) => (
                <Paragraph key={pIndex}>{paragraph}</Paragraph>
              ))}
            </SubSection>
          ))}
        </SectionContent>
      ))}
    </>
  );
};

const FooterPage = () => {
  const { pageType } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  const page = pageContent[pageType] || {
    title: 'Pagină Nedisponibilă',
    icon: <HelpCircle className="w-8 h-8 text-gray-900" />,
    sections: [{
      title: 'Eroare',
      content: ['Ne pare rău, această pagină nu este disponibilă momentan.']
    }]
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Animation delay
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [pageType]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumb */}
        <Breadcrumb pageTitle={page.title} />
        
        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Sidebar pentru navigare */}
          <Sidebar currentPage={pageType} />
        
          <div className={`flex-1 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'} max-w-4xl`}>
            
            <div className="flex items-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{page.title}</h1>
            </div>
            
            {/* Card cu conținut */}
            <div className="bg-white border border-gray-100 p-8 md:p-10">
              <PageContent sections={page.sections} />
            </div>
            
            {/* Navigare între pagini */}
            <PageNavigation currentPage={pageType} />
            
            {/* Secțiune finală cu CTA */}
            <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-8 shadow-md">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Ai nevoie de mai multe informații?</h3>
                <p className="text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">Echipa noastră de suport este disponibilă pentru a răspunde la orice întrebare.</p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <button 
                    onClick={() => navigate('/footer/faq')}
                    className="px-8 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-900 hover:text-white hover:border hover:border-white transition-colors duration-200"
                  >
                    Vezi FAQ
                  </button>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:text-gray-900 transition-colors duration-200"
                  >
                    Contactează-ne
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterPage; 