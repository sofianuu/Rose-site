export const kidsData = {
 childCategories : [
    { 
      id: 1, 
          gender: 'FETE', 
          image: '/src/assets/images/kids/girls_category_page.jpg', 
          link: '/kids/girls',
        
        },
        { 
          id: 2, 
          gender: 'BĂIEȚI', 
          image: '/src/assets/images/kids/boys_category_page.jpg', 
          link: '/kids/boys',
         
        }
      ],
  products: [
    {
      id: 1,
      name: "Tricou cu Dinozaur",
      description: "Tricou din bumbac organic cu print de dinozaur, perfect pentru copii activi.",
      price: 89.99,
      category: "Tricouri",
      ageGroup: "3-6 ani",
      gender: "Unisex",
      sizes: {
        "3-4 ani": 10,
        "5-6 ani": 15,
        "7-8 ani": 8
      },
      colors: ["Albastru", "Verde"],
      images: [
        "/src/assets/images/girl.jpg",
        "/src/assets/images/girl.jpg"
      ],
      isNew: true,
      isSale: false,
      rating: 4.8,
      reviews: 24
    },
    {
      id: 2,
      name: "Pantaloni Sport",
      description: "Pantaloni confortabili pentru activități sportive, cu elastic la talie.",
      price: 129.99,
      category: "Pantaloni",
      ageGroup: "7-10 ani",
      gender: "Băieți",
      sizes: {
        "7-8 ani": 12,
        "9-10 ani": 15,
        "11-12 ani": 10
      },
      colors: ["Negru", "Gri"],
      images: [
        "/src/assets/images/girl.jpg",
        "/src/assets/images/girl.jpg"
      ],
      isNew: false,
      isSale: true,
      salePrice: 99.99,
      rating: 4.5,
      reviews: 18
    },
    {
      id: 3,
      name: "Rochie cu Flori",
      description: "Rochie de vară cu model floral, perfectă pentru ocazii speciale.",
      price: 159.99,
      category: "Rochii",
      ageGroup: "5-8 ani",
      gender: "Fete",
      sizes: {
        "5-6 ani": 8,
        "7-8 ani": 12,
        "9-10 ani": 10
      },
      colors: ["Roz", "Alb"],
      images: [
        "/src/assets/images/girl.jpg",
        "/src/assets/images/girl.jpg"
      ],
      isNew: true,
      isSale: false,
      rating: 4.9,
      reviews: 32
    },
    {
      id: 4,
      name: "Bluză cu Capușon",
      description: "Bluză confortabilă cu capușon, ideală pentru zilele mai reci.",
      price: 139.99,
      category: "Bluze",
      ageGroup: "4-7 ani",
      gender: "Unisex",
      sizes: {
        "4-5 ani": 10,
        "6-7 ani": 15,
        "8-9 ani": 12
      },
      colors: ["Gri", "Albastru"],
      images: [
        "/src/assets/images/girl.jpg",
        "/src/assets/images/girl.jpg"
      ],
      isNew: false,
      isSale: true,
      salePrice: 109.99,
      rating: 4.7,
      reviews: 28
    },
    {
      id: 5,
      name: "Pantaloni Scurti",
      description: "Pantaloni scurți din material respirabil, perfecti pentru activități în aer liber.",
      price: 79.99,
      category: "Pantaloni",
      ageGroup: "6-9 ani",
      gender: "Băieți",
      sizes: {
        "6-7 ani": 15,
        "8-9 ani": 12,
        "10-11 ani": 10
      },
      colors: ["Albastru", "Verde"],
      images: [
        "/src/assets/images/girl.jpg",
        "/src/assets/images/girl.jpg"
      ],
      isNew: true,
      isSale: false,
      rating: 4.6,
      reviews: 15
    }
  ],
  categories: [
    {
      id: 1,
      name: "Tricouri",
      image: "/src/assets/images/girl.jpg"
    },
    {
      id: 2,
      name: "Pantaloni",
      image: "/src/assets/images/girl.jpg"
    },
    {
      id: 3,
      name: "Rochii",
      image: "/src/assets/images/girl.jpg"
    },
    {
      id: 4,
      name: "Bluze",
      image: "/src/assets/images/girl.jpg"
    },
    {
      id: 5,
      name: "Accesorii",
      image: "/src/assets/images/girl.jpg"
    }
  ],
  filters: {
    ageGroups: [
      "Nou-născuți",
      "Bebeluși 1-5 ani",
      "Copii 5-13 ani"
    ],
    genders: [
      "Băieți",
      "Fete",
      "Unisex"
    ],
    sizes: [
      "0-3 luni",
      "3-6 luni",
      "6-12 luni",
      "1-2 ani",
      "2-3 ani",
      "3-4 ani",
      "4-5 ani",
      "5-6 ani",
      "6-7 ani",
      "7-8 ani",
      "8-9 ani",
      "9-10 ani",
      "10-11 ani",
      "11-12 ani",
      "12-13 ani",
      "13-14 ani"
    ],
    colors: [
      "Alb",
      "Negru",
      "Gri",
      "Albastru",
      "Verde",
      "Roz",
      "Roșu",
      "Galben",
      "Maro",
      "Bej"
    ],
    priceRanges: [
      { min: 0, max: 50 },
      { min: 50, max: 100 },
      { min: 100, max: 150 },
      { min: 150, max: 200 },
      { min: 200, max: 1000 }
    ]
  },
  featuredProducts: [
    {
      id: 1,
      name: "Rochie de bumbac",
      price: 59.99,
      image: "/src/assets/images/kids/rochie_bumbac.jpg",
      isNew: true,
      sizes: {
        "5-6 ani": 8,
        "7-8 ani": 12,
        "9-10 ani": 10
      },
    },
    {
      id: 2,
      name: "Set de 2 maiouri de bumbac cu bretele ",
      price: 49.99,
      image: "/src/assets/images/kids/set_maiouri.jpg",
      isSale: true,
      sizes: {
        "5-6 ani": 8,
        "7-8 ani": 12,
        "9-10 ani": 10
      },
    },
    {
      id: 3,
      name: "Tricou cu imprimeu",
      price: 19.99,
      image: "/src/assets/images/kids/tricou_imprimeu.jpg",
      isSale: true,
      sizes: {
        "5-6 ani": 8,
        "7-8 ani": 12,
        "9-10 ani": 10
      },
    },
    {
      id: 4,
      name: "Rochie de bumbac",
      price: 59.99,
      image: "/src/assets/images/kids/rochie_bumbac.jpg",
      isNew: true,
      sizes: {
        "5-6 ani": 8,
        "7-8 ani": 12,
        "9-10 ani": 10
      },
    },
    {
      id: 5,
      name: "Set de 2 maiouri de bumbac cu bretele ",
      price: 49.99,
      image: "/src/assets/images/kids/set_maiouri.jpg",
      isSale: true,
      sizes: {
        "5-6 ani": 8,
        "7-8 ani": 12,
        "9-10 ani": 10
      },
    },
    {
      id: 6,
      name: "Tricou cu imprimeu",
      price: 19.99,
      image: "/src/assets/images/kids/tricou_imprimeu.jpg",
      isSale: true,
      sizes: {
        "5-6 ani": 8,
        "7-8 ani": 12,
        "9-10 ani": 10
      },
    },
    {
      id: 7,
      name: "Rochie de bumbac",
      price: 59.99,
      image: "/src/assets/images/kids/rochie_bumbac.jpg",
      isNew: true,
      sizes: {
        "5-6 ani": 8,
        "7-8 ani": 12,
        "9-10 ani": 10
      },
    },
    {
      id: 8,
      name: "Set de 2 maiouri de bumbac cu bretele ",
      price: 49.99,
      image: "/src/assets/images/kids/set_maiouri.jpg",
      isSale: true,
      sizes: {
        "5-6 ani": 8,
        "7-8 ani": 12,
        "9-10 ani": 10
      },
    },
    {
      id: 9,
      name: "Tricou cu imprimeu",
      price: 19.99,
      image: "/src/assets/images/kids/tricou_imprimeu.jpg",
      isSale: true,
      sizes: {
        "5-6 ani": 8,
        "7-8 ani": 12,
        "9-10 ani": 10
      },
    }
  ]
};
