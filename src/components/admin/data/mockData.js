const mockData = {
    products: [
      { 
        id: 1, 
        name: 'Rochie de vară', 
        description: 'Rochie elegantă de vară, perfectă pentru zilele călduroase. Material ușor și confortabil, design modern.',
        price: 299.99, 
        stock: 15, 
        category: 'Femei', 
        status: 'Activ' 
      },
      { 
        id: 2, 
        name: 'Bluză elegantă', 
        description: 'Bluză elegantă din material premium, potrivită pentru ocazii speciale. Design modern cu detalii rafinate.',
        price: 199.99, 
        stock: 8, 
        category: 'Femei', 
        status: 'Activ' 
      },
      { 
        id: 3, 
        name: 'Pantaloni jeans', 
        description: 'Pantaloni jeans de calitate superioară, cu croială modernă. Confortabili și rezistenți, perfecți pentru uz zilnic.',
        price: 249.99, 
        stock: 12, 
        category: 'Bărbați', 
        status: 'Activ' 
      },
      { 
        id: 4, 
        name: 'Tricou basic', 
        description: 'Tricou basic din bumbac 100%, perfect pentru orice ocazie. Disponibil în mai multe culori.',
        price: 99.99, 
        stock: 20, 
        category: 'Bărbați', 
        status: 'Activ' 
      },
      { 
        id: 5, 
        name: 'Rochie pentru copii', 
        description: 'Rochie adorabilă pentru fetițe, confecționată din materiale de calitate. Model vesel și colorat.',
        price: 149.99, 
        stock: 10, 
        category: 'Copii', 
        status: 'Activ' 
      }
    ],
    orders: [
      { id: 'ORD-001', customer: 'Maria Popescu', total: 549.98, status: 'În procesare', date: '2024-03-15' },
      { id: 'ORD-002', customer: 'Ion Ionescu', total: 299.99, status: 'Livrat', date: '2024-03-14' },
      { id: 'ORD-003', customer: 'Ana Dumitrescu', total: 449.98, status: 'În livrare', date: '2024-03-13' },
      { id: 'ORD-004', customer: 'George Popa', total: 199.99, status: 'Anulat', date: '2024-03-12' },
      { id: 'ORD-005', customer: 'Elena Ionescu', total: 899.97, status: 'Livrat', date: '2024-03-11' },
      { id: 'ORD-006', customer: 'Mihai Popescu', total: 349.98, status: 'Livrat', date: '2024-03-10' },
      { id: 'ORD-007', customer: 'Andreea Dumitrescu', total: 249.99, status: 'Livrat', date: '2024-03-09' },
      { id: 'ORD-008', customer: 'Alexandru Popa', total: 599.98, status: 'Livrat', date: '2024-03-08' },
      { id: 'ORD-009', customer: 'Cristina Ionescu', total: 399.99, status: 'Livrat', date: '2024-03-07' },
      { id: 'ORD-010', customer: 'Bogdan Popescu', total: 749.97, status: 'Livrat', date: '2024-03-06' },
      { id: 'ORD-011', customer: 'Diana Dumitrescu', total: 199.99, status: 'Livrat', date: '2024-03-05' },
      { id: 'ORD-012', customer: 'Florin Popa', total: 449.98, status: 'Livrat', date: '2024-03-04' },
      { id: 'ORD-013', customer: 'Gabriela Ionescu', total: 299.99, status: 'Livrat', date: '2024-03-03' },
      { id: 'ORD-014', customer: 'Horia Popescu', total: 599.98, status: 'Livrat', date: '2024-03-02' },
      { id: 'ORD-015', customer: 'Ioana Dumitrescu', total: 349.98, status: 'Livrat', date: '2024-03-01' }
    ],
    users: [
      { id: 1, name: 'Maria Popescu', email: 'maria@example.com', role: 'Client', status: 'Activ' },
      { id: 2, name: 'Ion Ionescu', email: 'ion@example.com', role: 'Client', status: 'Activ' },
      { id: 3, name: 'Ana Dumitrescu', email: 'ana@example.com', role: 'Client', status: 'Inactiv' },
      { id: 4, name: 'George Popa', email: 'george@example.com', role: 'Client', status: 'Activ' }
    ],
    categories: [
      { id: 1, name: 'Femei', productCount: 25, status: 'Activ' },
      { id: 2, name: 'Bărbați', productCount: 18, status: 'Activ' },
      { id: 3, name: 'Copii', productCount: 12, status: 'Activ' },
      { id: 4, name: 'Accesorii', productCount: 8, status: 'Activ' }
    ],
    favorites: [
      { id: 1, product: 'Rochie de vară', user: 'Maria Popescu', date: '2024-03-15' },
      { id: 2, product: 'Bluză elegantă', user: 'Ana Dumitrescu', date: '2024-03-14' },
      { id: 3, product: 'Pantaloni jeans', user: 'Ion Ionescu', date: '2024-03-13' }
    ]
  };
  
  export default mockData;