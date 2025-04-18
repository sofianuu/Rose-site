import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Filter, ArrowUpDown, Heart, X, Check, Plus, ChevronLeft, ChevronRight, StarIcon, Sliders, ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
// Mutăm datele în afara componentei pentru a evita re-crearea lor la fiecare render
const allItems = [
  // Produse pentru femei
  { id: 1, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/bluza_fronseuri.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 2, title: 'Bluză din bumbac organic', price: 79.99, category: 'Topuri & Tricouri', gender: 'women', image: '/src/assets/images/coats.jpg', colors: ['Alb', 'Bej'], sizes: ['XS', 'S', 'M'] },
  { id: 3, title: 'Pantaloni wide-leg', price: 129.99, category: 'Pantaloni', gender: 'women', image: '/src/assets/images/dress.jpg', colors: ['Negru', 'Maro'], sizes: ['S', 'M'] },
  { id: 4, title: 'Cămașă oversize', price: 99.99, oldPrice: 129.99, category: 'Bluze & Cămăși', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Alb', 'Bleu'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 5, title: 'Palton elegant', price: 299.99, category: 'Jachete & Paltoane', gender: 'women', image: '/src/assets/images/palton5.jpg', colors: ['Negru', 'Gri', 'Bej'], sizes: ['S', 'M', 'L'] },
  { id: 6, title: 'Fustă plisată midi', price: 159.99, category: 'New Collection', gender: 'women', image: '/src/assets/images/pantaloni.jpg', colors: ['Negru', 'Verde'], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 7, title: 'Pantaloni de stofă', price: 179.99, category: 'Pantaloni', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Gri'], sizes: ['S', 'M', 'L'] },
  { id: 8, title: 'Jeans skinny', price: 149.99, category: 'Pantaloni', gender: 'women', image:'/src/assets/images/jacket_women.jpg', colors: ['Albastru', 'Negru'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 9, title: 'Tricou basic', price: 59.99, category: 'Topuri & Tricouri', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Alb', 'Negru', 'Gri'], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 10, title: 'Fustă plisată midi', price: 159.99, category: 'New Collection', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Verde'], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 11, title: 'Rochie elegantă', price: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 12, title: 'Bluză cu volane', price: 89.99, category: 'Bluze & Cămăși', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Alb', 'Roz'], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 13, title: 'Palton de iarnă', price: 299.99, category: 'Jachete & Paltoane', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Gri'], sizes: ['S', 'M', 'L'] },
  { id: 14, title: 'Pantaloni office', price: 149.99, category: 'Pantaloni', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Gri', 'Bleumarin'], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 15, title: 'Rochie de vară', price: 129.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Alb', 'Albastru'], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 16, title: 'Cardigan tricotat', price: 159.99, category: 'Jachete & Paltoane', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Gri', 'Bej', 'Negru'], sizes: ['S', 'M', 'L'] },
  { id: 17, title: 'Bluză cu dantelă', price: 119.99, category: 'Bluze & Cămăși', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Alb', 'Negru'], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 18, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 19, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 20, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 21, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 22, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 23, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 24, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 25, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 26, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 27, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 28, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  { id: 29, title: 'Rochie lungă cu imprimeu', price: 149.99, oldPrice: 199.99, category: 'Rochii', gender: 'women', image: '/src/assets/images/jacket_women.jpg', colors: ['Negru', 'Roșu'], sizes: ['S', 'M', 'L'] },
  // Produse pentru bărbați
  { id: 30, title: 'Tricou casual', price: 59.99, category: 'Tricouri', gender: 'men', image: '/src/assets/images/jacheta_barbati.jpg', colors: ['Alb', 'Negru', 'Gri', 'Albastru'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 31, title: 'Blugi slim fit', price: 179.99, oldPrice: 199.99, category: 'Pantaloni', gender: 'men', image: '/src/assets/images/tricou_barbati.jpg', colors: ['Albastru închis', 'Albastru deschis', 'Negru'], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 32, title: 'Pulover de lână', price: 199.99, category: 'Pulovere', gender: 'men', image: '/src/assets/images/pulover_guler.jpg', colors: ['Gri', 'Bleumarin', 'Bordo'], sizes: ['M', 'L', 'XL'] },
  { id: 33, title: 'Cămașă clasică', price: 119.99, category: 'Cămăși', gender: 'men', image: '/src/assets/images/pulover_guler.jpg', colors: ['Alb', 'Bleu', 'Negru'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 34, title: 'Geacă de piele', price: 349.99, category: 'Jachete', gender: 'men', image: '/src/assets/images/pulover_guler.jpg', colors: ['Negru', 'Maro'], sizes: ['M', 'L', 'XL'] },
  { id: 35, title: 'Tricou cu imprimeu', price: 69.99, category: 'Tricouri', gender: 'men', image: '/src/assets/images/pulover_guler.jpg', colors: ['Alb', 'Negru'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 36, title: 'Jeans regular fit', price: 149.99, category: 'Pantaloni', gender: 'men', image: '/src/assets/images/pulover_guler.jpg', colors: ['Albastru', 'Negru'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 37, title: 'Cămașă denim', price: 129.99, category: 'Cămăși', gender: 'men', image: '/src/assets/images/pulover_guler.jpg', colors: ['Albastru', 'Negru'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 38, title: 'Tricou polo', price: 89.99, category: 'Tricouri', gender: 'men', image: '/src/assets/images/pulover_guler.jpg', colors: ['Alb', 'Negru', 'Albastru', 'Verde'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 39, title: 'Hanorac cu logo', price: 159.99, category: 'Pulovere', gender: 'men', image: '/src/assets/images/pulover_guler.jpg', colors: ['Gri', 'Negru', 'Albastru'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 40, title: 'Pantaloni chino', price: 129.99, category: 'Pantaloni', gender: 'men', image: '/src/assets/images/jacheta_barbati.jpg', colors: ['Bej', 'Negru', 'Albastru'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 41, title: 'Geacă de iarnă', price: 259.99, category: 'Jachete', gender: 'men', image: '/src/assets/images/jacheta_barbati.jpg', colors: ['Negru', 'Albastru', 'Verde'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 42, title: 'Tricou cu guler', price: 79.99, category: 'Tricouri', gender: 'men', image: '/src/assets/images/jacheta_barbati.jpg', colors: ['Alb', 'Albastru', 'Negru'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 43, title: 'Cămașă în carouri', price: 139.99, category: 'Cămăși', gender: 'men', image: '/src/assets/images/jacheta_barbati.jpg', colors: ['Roșu', 'Albastru', 'Verde'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 44, title: 'Pulover cu guler înalt', price: 189.99, category: 'Pulovere', gender: 'men', image: '/src/assets/images/jacheta_barbati.jpg', colors: ['Gri', 'Negru', 'Albastru'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 45, title: 'Geacă de primăvară', price: 199.99, category: 'Jachete', gender: 'men', image: '/src/assets/images/jacheta_barbati.jpg', colors: ['Negru', 'Albastru', 'Bej'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 46, title: 'Blugi straight fit', price: 159.99, category: 'Pantaloni', gender: 'men', image: '/src/assets/images/jacheta_barbati.jpg', colors: ['Albastru', 'Negru'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 47, title: 'Tricou cu buzunar', price: 69.99, category: 'Tricouri', gender: 'men', image: '/src/assets/images/jacheta_barbati.jpg', colors: ['Alb', 'Gri', 'Negru'], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 48, title: 'Cardigan', price: 179.99, category: 'Pulovere', gender: 'men', image: '/src/assets/images/jacheta_barbati.jpg', colors: ['Gri', 'Negru', 'Bleumarin'], sizes: ['S', 'M', 'L', 'XL'] },
  
  // Produse pentru fete
  { id: 101, title: 'Rochie cu imprimeu', price: 89.99, category: 'Rochii', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Roz', 'Albastru', 'Galben'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 102, title: 'Bluză cu volănașe', price: 59.99, category: 'Topuri', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Alb', 'Roz', 'Galben'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 103, title: 'Pantaloni colorați', price: 79.99, category: 'Pantaloni', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Roz', 'Verde', 'Galben'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 104, title: 'Jacheta ușoară', price: 109.99, category: 'Jachete', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Roz', 'Albastru', 'Galben'], sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'] },
  { id: 105, title: 'Fustă cu pliuri', price: 69.99, category: 'Fuste', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Roz', 'Albastru', 'Roșu'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 106, title: 'Rochie de vară', price: 79.99, category: 'Rochii', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Alb', 'Roz', 'Galben'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 107, title: 'Set tricou și pantaloni', price: 99.99, category: 'Seturi', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Roz', 'Albastru', 'Verde'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 108, title: 'Pulover cu model', price: 89.99, category: 'Pulovere', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Roz', 'Albastru', 'Galben'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'] },
  { id: 109, title: 'Blugi colorați', price: 79.99, category: 'Pantaloni', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Roz', 'Albastru', 'Galben'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 110, title: 'Cămașă cu imprimeu', price: 69.99, category: 'Topuri', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Alb', 'Roz', 'Galben'], sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'] },
  { id: 111, title: 'Rochie elegantă', price: 119.99, category: 'New Collection', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Roz', 'Roșu', 'Mov'], sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'] },
  { id: 112, title: 'Hanorac cu glugă', price: 89.99, category: 'Hanorace', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Roz', 'Albastru', 'Galben'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'] },
  { id: 113, title: 'Tricou cu paiete', price: 59.99, category: 'Topuri', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Roz', 'Argintiu', 'Auriu'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 114, title: 'Salopetă jeans', price: 99.99, category: 'New Collection', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Albastru', 'Roz'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 115, title: 'Geacă de iarnă', price: 139.99, category: 'Jachete', gender: 'girls', image: '/src/assets/images/girl.jpg', colors: ['Roz', 'Albastru', 'Roșu'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'] },
  
  // Produse pentru băieți
  { id: 201, title: 'Tricou cu print', price: 49.99, category: 'Tricouri', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Albastru', 'Verde', 'Gri'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 202, title: 'Pantaloni denim', price: 89.99, category: 'Pantaloni', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Albastru', 'Negru'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'] },
  { id: 203, title: 'Hanorac cu glugă', price: 99.99, category: 'Hanorace', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Gri', 'Albastru', 'Negru'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'] },
  { id: 204, title: 'Geacă sport', price: 129.99, category: 'Jachete', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Albastru', 'Negru', 'Verde'], sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'] },
  { id: 205, title: 'Cămașă cu carouri', price: 79.99, category: 'Cămăși', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Albastru', 'Roșu', 'Verde'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'] },
  { id: 206, title: 'Bermude denim', price: 69.99, category: 'Pantaloni', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Albastru', 'Negru'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 207, title: 'Tricou cu personaje', price: 59.99, category: 'Tricouri', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Roșu', 'Albastru', 'Verde'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 208, title: 'Set tricou și bermude', price: 109.99, category: 'Seturi', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Albastru', 'Verde', 'Negru'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'] },
  { id: 209, title: 'Pulover cu fermoar', price: 89.99, category: 'Pulovere', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Albastru', 'Gri', 'Verde'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'] },
  { id: 210, title: 'Pantaloni sport', price: 79.99, category: 'Pantaloni', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Negru', 'Albastru', 'Gri'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'] },
  { id: 211, title: 'Geacă de iarnă', price: 149.99, category: 'New Collection', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Albastru', 'Negru', 'Verde'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'] },
  { id: 212, title: 'Vestă matlasată', price: 99.99, category: 'Jachete', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Albastru', 'Negru', 'Verde'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'] },
  { id: 213, title: 'Blugi cu elastic', price: 79.99, category: 'Pantaloni', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Albastru', 'Negru'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'] },
  { id: 214, title: 'Tricou polo', price: 69.99, category: 'Tricouri', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Albastru', 'Roșu', 'Verde'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'] },
  { id: 215, title: 'Cămașă elegantă', price: 89.99, category: 'New Collection', gender: 'boys', image: '/src/assets/images/boys.jpg', colors: ['Alb', 'Albastru', 'Roz'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'] },

  // Produse pentru nou-născuți (0-12 luni)
  { id: 301, title: 'Body cu imprimeu', price: 39.99, category: 'Body', gender: 'newborn', image: '/src/assets/images/body/body1.jpg', colors: ['Alb', 'Bej', 'Roz'], sizes: ['0-3M', '3-6M', '6-9M', '9-12M'] },
  { id: 302, title: 'Salopetă din bumbac', price: 59.99, category: 'Salopete', gender: 'newborn', image: '/src/assets/images/body/body1.jpg', colors: ['Alb', 'Bej', 'Albastru'], sizes: ['0-3M', '3-6M', '6-9M', '9-12M'] },
  { id: 303, title: 'Set de 3 body-uri', price: 79.99, category: 'Seturi', gender: 'newborn', image: '/src/assets/images/body/body1.jpg', colors: ['Multicolor'], sizes: ['0-3M', '3-6M', '6-9M', '9-12M'] },
  { id: 304, title: 'Pantaloni cu botoșei', price: 49.99, category: 'Pantaloni', gender: 'newborn', image: '/src/assets/images/body/body1.jpg', colors: ['Gri', 'Bej', 'Roz'], sizes: ['0-3M', '3-6M', '6-9M', '9-12M'] },
  { id: 305, title: 'Căciulă și mănuși', price: 34.99, category: 'Accesorii', gender: 'newborn', image: '/src/assets/images/body/body1.jpg', colors: ['Alb', 'Roz', 'Albastru'], sizes: ['0-3M', '3-6M', '6-9M', '9-12M'] },
  { id: 306, title: 'Pătură moale', price: 69.99, category: 'Accesorii', gender: 'newborn', image: '/src/assets/images/body/body1.jpg', colors: ['Alb', 'Bej', 'Gri'], sizes: ['Universal'] },
  { id: 307, title: 'Combinezon de iarnă', price: 119.99, category: 'Combinezoane', gender: 'newborn', image: '/src/assets/images/body/body1.jpg', colors: ['Alb', 'Roz', 'Albastru'], sizes: ['0-3M', '3-6M', '6-9M', '9-12M'] },
  { id: 308, title: 'Șosete colorate (set de 5)', price: 29.99, category: 'Accesorii', gender: 'newborn', image: '/src/assets/images/body/body1.jpg', colors: ['Multicolor'], sizes: ['0-3M', '3-6M', '6-12M'] },
  
  // Produse pentru bebeluși (1-5 ani)
  { id: 401, title: 'Tricou cu imprimeu animale', price: 49.99, category: 'Tricouri', gender: 'toddler', image: '/src/assets/images/toddler.jpg', colors: ['Alb', 'Albastru', 'Verde'], sizes: ['1-2Y', '2-3Y', '3-4Y', '4-5Y'] },
  { id: 402, title: 'Pantaloni jogger', price: 69.99, category: 'Pantaloni', gender: 'toddler', image: '/src/assets/images/toddler.jpg', colors: ['Gri', 'Albastru', 'Negru'], sizes: ['1-2Y', '2-3Y', '3-4Y', '4-5Y'] },
  { id: 403, title: 'Rochie cu volane', price: 79.99, category: 'Rochii', gender: 'toddler', image: '/src/assets/images/toddler.jpg', colors: ['Roz', 'Galben', 'Alb'], sizes: ['1-2Y', '2-3Y', '3-4Y', '4-5Y'] },
  { id: 404, title: 'Salopetă jeans', price: 89.99, category: 'Salopete', gender: 'toddler', image: '/src/assets/images/toddler.jpg', colors: ['Albastru'], sizes: ['1-2Y', '2-3Y', '3-4Y', '4-5Y'] },
  { id: 405, title: 'Hanorac cu glugă', price: 79.99, category: 'Hanorace', gender: 'toddler', image: '/src/assets/images/toddler.jpg', colors: ['Albastru', 'Roz', 'Gri'], sizes: ['1-2Y', '2-3Y', '3-4Y', '4-5Y'] },
  { id: 406, title: 'Set tricou și pantaloni', price: 99.99, category: 'Seturi', gender: 'toddler', image: '/src/assets/images/toddler.jpg', colors: ['Albastru', 'Gri'], sizes: ['1-2Y', '2-3Y', '3-4Y', '4-5Y'] },
  { id: 407, title: 'Jachetă impermeabilă', price: 129.99, category: 'Jachete', gender: 'toddler', image: '/src/assets/images/toddler.jpg', colors: ['Roșu', 'Albastru', 'Galben'], sizes: ['1-2Y', '2-3Y', '3-4Y', '4-5Y'] },
  { id: 408, title: 'Pantofi sport', price: 109.99, category: 'Încălțăminte', gender: 'toddler', image: '/src/assets/images/toddler.jpg', colors: ['Alb', 'Albastru', 'Roz'], sizes: ['20', '21', '22', '23', '24', '25', '26'] },
  
  // Produse pentru copii (5-13 ani)
  { id: 501, title: 'Tricou sport', price: 59.99, category: 'Tricouri', gender: 'kids', image: '/src/assets/images/kids.jpg', colors: ['Negru', 'Albastru', 'Roșu'], sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y'] },
  { id: 502, title: 'Pantaloni școală', price: 89.99, category: 'Pantaloni', gender: 'kids', image: '/src/assets/images/kids.jpg', colors: ['Negru', 'Bleumarin'], sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y'] },
  { id: 503, title: 'Rochie festivă', price: 129.99, category: 'Rochii', gender: 'kids', image: '/src/assets/images/kids.jpg', colors: ['Bleumarin', 'Roșu', 'Negru'], sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y'] },
  { id: 504, title: 'Geacă de iarnă', price: 169.99, category: 'Jachete', gender: 'kids', image: '/src/assets/images/kids.jpg', colors: ['Negru', 'Albastru', 'Verde'], sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y'] },
  { id: 505, title: 'Blugi casual', price: 109.99, category: 'Pantaloni', gender: 'kids', image: '/src/assets/images/kids.jpg', colors: ['Albastru', 'Negru'], sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y'] },
  { id: 506, title: 'Cămașă uniformă', price: 79.99, category: 'Cămăși', gender: 'kids', image: '/src/assets/images/kids.jpg', colors: ['Alb', 'Albastru deschis'], sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y'] },
  { id: 507, title: 'Hanorac cu fermoar', price: 119.99, category: 'Hanorace', gender: 'kids', image: '/src/assets/images/kids.jpg', colors: ['Gri', 'Negru', 'Albastru'], sizes: ['5-6Y', '7-8Y', '9-10Y', '11-12Y'] },
  { id: 508, title: 'Pantofi casual', price: 149.99, category: 'Încălțăminte', gender: 'kids', image: '/src/assets/images/kids.jpg', colors: ['Negru', 'Maro'], sizes: ['32', '33', '34', '35', '36', '37', '38'] },
];

// Pregătim toate imaginile produselor pentru a evita re-crearea lor la fiecare render
const generateProductImages = () => {
  const images = {};
  allItems.forEach(item => {
    // Pentru fiecare produs, generăm 3 url-uri de imagini
    const baseImage = item.image;
    images[item.id] = [
      baseImage,
      baseImage.replace('.jpg', '_2.jpg'),
      baseImage.replace('.jpg', '_3.jpg')
    ];
  });
  return images;
};

// Pregătim indexul inițial pentru imaginile produselor
const generateInitialImageIndices = () => {
  const initialIndices = {};
  allItems.forEach(item => {
    initialIndices[item.id] = 0;
  });
  return initialIndices;
};

// Extragem toate culorile și mărimile disponibile
const availableColors = [...new Set(allItems.flatMap(item => item.colors))];
const availableSizes = [...new Set(allItems.flatMap(item => item.sizes))].sort((a, b) => {
  const sizeOrder = { 
                      // Mărimi pentru adulți
                      'XS': 1, 'S': 2, 'M': 3, 'L': 4, 'XL': 5, 'XXL': 6,
                      // Mărimi pentru nou-născuți  
                      '0-3M': 7, '3-6M': 8, '6-9M': 9, '9-12M': 10, 
                      // Mărimi pentru bebeluși și copii
                      '1-2Y': 11, '2-3Y': 12, '3-4Y': 13, '4-5Y': 14, '5-6Y': 15, '6-7Y': 16, 
                      '7-8Y': 17, '8-9Y': 18, '9-10Y': 19, '10-11Y': 20, '11-12Y': 21, '12-13Y': 22,
                      'Universal': 999
                    };
  return (sizeOrder[a] || 99) - (sizeOrder[b] || 99);
});

const CategoryPage = () => {
  const { gender, category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [productImages] = useState(generateProductImages());
  const [currentImageIndex, setCurrentImageIndex] = useState(generateInitialImageIndices());
  const [hoveredHeartId, setHoveredHeartId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 20;

  // Add detection for mobile view
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Check if the view is mobile on component mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Determinăm genul și categoria reale bazate pe rută
  const isKidsRoute = location.pathname.startsWith('/kids/');
  const isKidsAgeRoute = isKidsRoute && location.pathname.includes('/age/');
  const isCategoryRoute = location.pathname.startsWith('/Category/');
  
  // Procesăm parametrii de rută pentru categoriile de vârstă
  let actualGender, ageCategory, subcategory;
  let actualCategory = category;
  
  if (isKidsAgeRoute) {
    const ageIndex = parseInt(category) - 1;
    subcategory = useParams().subcategory || 'All';
    
    switch(ageIndex) {
      case 0:
        actualGender = 'newborn'; // Nou-născuți
        ageCategory = 'Nou-născuți';
        break;
      case 1:
        actualGender = 'toddler'; // Bebeluși 1-5 ani
        ageCategory = 'Bebeluși 1-5 ani';
        break;
      case 2:
        actualGender = 'kids'; // Copii 5-13 ani
        ageCategory = 'Copii 5-13 ani';
        break;
      default:
        // În caz de rută invalidă, folosim girls ca fallback
        actualGender = 'girls';
    }
  } else if (isCategoryRoute) {
    // When using the /Category/:gender route, show all products for that gender
    actualGender = gender;
    actualCategory = 'All';
  } else {
    actualGender = isKidsRoute ? (gender === 'girls' ? 'girls' : 'boys') : gender;
  }

  // Traduceri pentru titlurile de pagină
  const categoryTitleTranslations = {
    women: {
      'All': 'Toate produsele pentru femei',
      'New Collection': 'Colecție nouă pentru femei',
      'Rochii': 'Rochii',
      'Bluze & Cămăși': 'Bluze & Cămăși',
      'Topuri & Tricouri': 'Topuri & Tricouri',
      'Pantaloni': 'Pantaloni',
      'Fuste': 'Fuste',
      'Jachete & Paltoane': 'Jachete & Paltoane'
    },
    men: {
      'All': 'Toate produsele pentru bărbați',
      'New Collection': 'Colecție nouă pentru bărbați',
      'Tricouri': 'Tricouri',
      'Cămăși': 'Cămăși',
      'Pantaloni': 'Pantaloni',
      'Pulovere': 'Pulovere',
      'Jachete': 'Jachete'
    },
    girls: {
      'All': 'Toate produsele pentru fete',
      'New Collection': 'Colecție nouă pentru fete',
      'Rochii': 'Rochii',
      'Topuri': 'Topuri',
      'Pantaloni': 'Pantaloni',
      'Fuste': 'Fuste',
      'Jachete': 'Jachete',
      'Hanorace': 'Hanorace',
      'Pulovere': 'Pulovere',
      'Seturi': 'Seturi'
    },
    boys: {
      'All': 'Toate produsele pentru băieți',
      'New Collection': 'Colecție nouă pentru băieți',
      'Tricouri': 'Tricouri',
      'Cămăși': 'Cămăși',
      'Pantaloni': 'Pantaloni',
      'Hanorace': 'Hanorace',
      'Pulovere': 'Pulovere',
      'Jachete': 'Jachete',
      'Seturi': 'Seturi'
    },
    newborn: {
      'All': 'Toate produsele pentru nou-născuți',
      'Body': 'Body-uri pentru nou-născuți',
      'Salopete': 'Salopete pentru nou-născuți',
      'Seturi': 'Seturi pentru nou-născuți',
      'Pantaloni': 'Pantaloni pentru nou-născuți',
      'Accesorii': 'Accesorii pentru nou-născuți',
      'Combinezoane': 'Combinezoane pentru nou-născuți'
    },
    toddler: {
      'All': 'Toate produsele pentru bebeluși 1-5 ani',
      'Tricouri': 'Tricouri pentru bebeluși',
      'Pantaloni': 'Pantaloni pentru bebeluși',
      'Rochii': 'Rochii pentru bebeluși',
      'Salopete': 'Salopete pentru bebeluși',
      'Hanorace': 'Hanorace pentru bebeluși',
      'Seturi': 'Seturi pentru bebeluși',
      'Jachete': 'Jachete pentru bebeluși',
      'Încălțăminte': 'Încălțăminte pentru bebeluși'
    },
    kids: {
      'All': 'Toate produsele pentru copii 5-13 ani',
      'Tricouri': 'Tricouri pentru copii',
      'Pantaloni': 'Pantaloni pentru copii',
      'Rochii': 'Rochii pentru copii',
      'Jachete': 'Jachete pentru copii',
      'Cămăși': 'Cămăși pentru copii',
      'Hanorace': 'Hanorace pentru copii',
      'Încălțăminte': 'Încălțăminte pentru copii'
    }
  };

  // Filtrare produse
  useEffect(() => {
    // Reset filters when navigating between categories
    resetFilters();
    
    // Find products that match gender and category
    const categoryProducts = allItems.filter(item => {
      if (isKidsAgeRoute) {
        return item.gender === actualGender && (subcategory === 'All' || item.category === subcategory);
      } else {
        return item.gender === actualGender && (actualCategory === 'All' || item.category === actualCategory);
      }
    });
    
    setProducts(categoryProducts);
    setFilteredProducts(categoryProducts);
    setCurrentPage(1);
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [actualGender, actualCategory, isKidsAgeRoute, subcategory]);
  
  // Aplicare filtre și sortare
  useEffect(() => {
    let result = [...products];
    
    // Filtrare după preț
    result = result.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);
    
    // Filtrare după culori
    if (selectedColors.length > 0) {
      result = result.filter(item => 
        item.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Filtrare după mărimi
    if (selectedSizes.length > 0) {
      result = result.filter(item => 
        item.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Sortare
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'name-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredProducts(result);
  }, [products, priceRange, selectedColors, selectedSizes, sortOption]);

  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId];
      
      // Salvăm în localStorage direct în funcția de actualizare pentru a evita re-renderurile multiple
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 500]);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
  };

  const viewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Restaurare favorite din localStorage la încărcarea componentei
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const navigateImage = (productId, direction) => {
    setCurrentImageIndex(prev => {
      const currentIndex = prev[productId] || 0;
      const totalImages = productImages[productId]?.length || 1;
      
      let newIndex;
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % totalImages;
      } else {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
      }
      
      return { ...prev, [productId]: newIndex };
    });
  };

  // Calculează produsele pentru pagina curentă
  const paginatedProducts = () => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  };

  // Calculează numărul total de pagini
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Resetează pagina la 1 când se schimbă filtrele
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedColors, selectedSizes, priceRange, category, actualGender, sortOption]);

  // Funcție pentru a schimba pagina
  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Scroll la începutul listei de produse
    window.scrollTo({
      top: document.querySelector('.product-grid')?.offsetTop - 100 || 0,
      behavior: 'smooth'
    });
  };

  // Funcția de randare a paginării
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pageNumbers = [];
    const maxVisiblePages = 5; // Numărul de butoane de pagină vizibile
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Ajustează startPage dacă endPage a atins limita
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Prima pagină
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push('...');
    }
    
    // Paginile intermediare
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Ultima pagină
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    
    return (
      <div className="flex justify-center items-center py-8 space-x-1">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-md border ${
            currentPage === 1 
              ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
              : 'border-gray-300 hover:border-black text-gray-800 hover:text-black'
          }`}
          aria-label="Pagina anterioară"
        >
          <ChevronLeft size={20} />
        </button>
        
        {pageNumbers.map((page, index) => (
          <button
            key={`page-${index}`}
            onClick={() => typeof page === 'number' ? changePage(page) : null}
            disabled={page === '...'}
            className={`w-10 h-10 flex items-center justify-center rounded-md ${
              page === currentPage 
                ? 'bg-black text-white' 
                : page === '...' 
                  ? 'text-gray-500 cursor-default' 
                  : 'border border-gray-300 hover:border-black text-gray-800 hover:text-black'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-md border ${
            currentPage === totalPages 
              ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
              : 'border-gray-300 hover:border-black text-gray-800 hover:text-black'
          }`}
          aria-label="Pagina următoare"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 relative">
          <div className="flex items-center z-10">
            {isKidsAgeRoute ? (
              <Link 
                to="/kids" 
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Link>
            ) : (
              <Link 
                to={isKidsRoute ? `/kids/${gender}` : `/${gender}`} 
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Link>
            )}
          </div>
          
          <h1 className="text-center text-xl md:text-2xl font-light uppercase w-full absolute left-0 right-0 mx-auto">
            {isKidsAgeRoute && subcategory === 'All' 
              ? `${ageCategory}` 
              : isKidsAgeRoute
                ? categoryTitleTranslations[actualGender]?.[subcategory] 
                : categoryTitleTranslations[actualGender]?.[actualCategory] || 
                  (actualCategory === 'All' ? 
                    (actualGender === 'women' ? 'FEMEI' : 
                    actualGender === 'men' ? 'BĂRBAȚI' : 
                    actualGender === 'girls' ? 'FETE' : 
                    actualGender === 'boys' ? 'BĂIEȚI' :
                    actualGender === 'newborn' ? 'NOU-NĂSCUȚI' :
                    actualGender === 'toddler' ? 'BEBELUȘI' :
                    'COPII') : 
                    actualCategory.toUpperCase())}
          </h1>
          
          <div className="w-5 h-5 z-10">
            {/* Placeholder to balance the layout */}
          </div>
        </div>
        
        {/* Mobile filter toggle button - show only on small screens */}
        <div className="md:hidden mb-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-sm"
          >
            <Filter size={16} className="mr-2" />
            <span>{showFilters ? 'Ascunde filtrele' : 'Arată filtrele'}</span>
          </button>
        </div>
        
        {/* Desktop filters toggle - show only on larger screens */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-sm hover:text-gray-700"
            >
              <Filter size={18} />
              <span>Filtre</span>
              <ChevronDown size={16} className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {(selectedColors.length > 0 || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 500) && (
              <button 
                onClick={resetFilters}
                className="text-sm text-gray-500 hover:text-black underline"
              >
                Resetează filtrele
              </button>
            )}
          </div>
          <div className="relative">
            <SortDropdown 
              sortOption={sortOption} 
              setSortOption={setSortOption} 
            />
          </div>
        </div>
        
        {/* Mobile sort - show only on small screens */}
        <div className="md:hidden mb-6 pb-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {filteredProducts.length} produse
            </div>
            <div className="relative w-40">
              <SortDropdown 
                sortOption={sortOption} 
                setSortOption={setSortOption} 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Mobile filter panel - full screen overlay on mobile */}
          {showFilters && isMobileView && (
            <div className="fixed inset-0 bg-white z-50 overflow-auto p-4">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                <h2 className="text-lg font-medium">Filtrare</h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6 pb-20">
                {/* Filtru preț */}
                <div>
                  <h3 className="text-sm font-medium mb-3 uppercase tracking-wide">Preț</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{priceRange[0]} Lei</span>
                      <span className="text-sm font-medium">{priceRange[1]} Lei</span>
                    </div>
                    
                    <div className="space-y-6">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        className="w-full accent-black h-1"
                      />
                      <input
                        type="range"
                        min="0"
                        max="500"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        className="w-full accent-black h-1"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Filtru culori */}
                <div>
                  <h3 className="text-sm font-medium mb-3 uppercase tracking-wide">Culoare</h3>
                  <div className="flex flex-wrap gap-3">
                    {availableColors.map(color => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`px-4 py-2 text-sm border rounded-lg transition-all ${
                          selectedColors.includes(color)
                            ? 'border-black bg-black text-white shadow-sm'
                            : 'border-gray-300 hover:border-gray-500 bg-white'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Filtru mărimi */}
                <div>
                  <h3 className="text-sm font-medium mb-3 uppercase tracking-wide">Mărime</h3>
                  <div className="flex flex-wrap gap-3">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`w-12 h-12 text-sm border rounded-lg flex items-center justify-center transition-all ${
                          selectedSizes.includes(size)
                            ? 'border-black bg-black text-white shadow-sm'
                            : 'border-gray-300 hover:border-gray-500 bg-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sticky apply button */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      resetFilters();
                    }}
                    className="w-1/3 py-3 border border-gray-300 text-sm font-medium rounded-md"
                  >
                    Resetează
                  </button>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="w-2/3 py-3 bg-black text-white text-sm font-medium rounded-md"
                  >
                    Vezi {filteredProducts.length} produse
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop filter sidebar */}
          {showFilters && !isMobileView && (
            <div className="md:w-1/4 lg:w-1/5 pr-0 md:pr-6 mb-6 md:mb-0">
              <div className="bg-white border border-gray-100 rounded-md p-4 shadow-sm sticky top-4">
                <div className="space-y-6">
                  {/* Filtru preț */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 uppercase tracking-wide">Preț</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{priceRange[0]} Lei</span>
                        <span className="text-sm font-medium">{priceRange[1]} Lei</span>
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="range"
                          min="0"
                          max="500"
                          step="10"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(0, e.target.value)}
                          className="w-full accent-black"
                        />
                        <input
                          type="range"
                          min="0"
                          max="500"
                          step="10"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(1, e.target.value)}
                          className="w-full accent-black"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Filtru culori */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 uppercase tracking-wide">Culoare</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableColors.map(color => (
                        <button
                          key={color}
                          onClick={() => toggleColor(color)}
                          className={`px-3 py-1 text-xs border rounded-full transition-all ${
                            selectedColors.includes(color)
                              ? 'border-black bg-black text-white shadow-md'
                              : 'border-gray-300 hover:border-gray-500 bg-white'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Filtru mărimi */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 uppercase tracking-wide">Mărime</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map(size => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`w-9 h-9 text-xs border rounded-sm flex items-center justify-center transition-all ${
                            selectedSizes.includes(size)
                              ? 'border-black bg-black text-white shadow-md'
                              : 'border-gray-300 hover:border-gray-500 bg-white'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Filtru categorie */}
                  <div>
                    <h3 className="text-sm font-medium mb-3 uppercase tracking-wide">Categorie</h3>
                    <div className="space-y-2">
                      {(() => {
                        // Selectează categoriile relevante în funcție de gen
                        let availableCategories = [];
                        
                        if (actualGender === 'women') {
                          availableCategories = ['Rochii', 'Bluze & Cămăși', 'Topuri & Tricouri', 'Pantaloni', 'Jachete & Paltoane', 'Fuste', 'New Collection'];
                        } else if (actualGender === 'men') {
                          availableCategories = ['Tricouri', 'Cămăși', 'Pantaloni', 'Pulovere', 'Jachete', 'New Collection'];
                        } else if (actualGender === 'girls') {
                          availableCategories = ['Rochii', 'Topuri', 'Pantaloni', 'Fuste', 'Jachete', 'Hanorace', 'Pulovere', 'Seturi', 'New Collection'];
                        } else if (actualGender === 'boys') {
                          availableCategories = ['Tricouri', 'Cămăși', 'Pantaloni', 'Hanorace', 'Pulovere', 'Jachete', 'Seturi', 'New Collection'];
                        } else if (actualGender === 'newborn') {
                          availableCategories = ['Body', 'Salopete', 'Seturi', 'Pantaloni', 'Accesorii', 'Combinezoane'];
                        } else if (actualGender === 'toddler') {
                          availableCategories = ['Tricouri', 'Pantaloni', 'Rochii', 'Salopete', 'Hanorace', 'Seturi', 'Jachete', 'Încălțăminte'];
                        } else if (actualGender === 'kids') {
                          availableCategories = ['Tricouri', 'Pantaloni', 'Rochii', 'Jachete', 'Cămăși', 'Hanorace', 'Încălțăminte'];
                        }
                        
                        return availableCategories.map(cat => (
                          <div key={cat} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={`cat-${cat}`} 
                              className="w-4 h-4 rounded border-gray-300 text-black accent-black"
                              checked={isKidsAgeRoute 
                                ? cat.toLowerCase() === subcategory.toLowerCase()
                                : cat.toLowerCase() === actualCategory.toLowerCase()}
                              onChange={() => {
                                const encodedCat = cat.replace(/ & /g, '%20&%20').replace(/ /g, '%20');
                                let newPath;
                                if (isKidsAgeRoute) {
                                  // Pentru rutele de vârstă, construim calea corectă
                                  const ageIndex = parseInt(category);
                                  newPath = `/kids/age/${ageIndex}/${encodedCat}`;
                                } else if (isKidsRoute) {
                                  newPath = `/kids/${gender}/${encodedCat}`;
                                } else {
                                  newPath = `/${actualGender}/${encodedCat}`;
                                }
                                navigate(newPath);
                              }}
                            />
                            <label htmlFor={`cat-${cat}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                              {cat}
                            </label>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Lista de produse */}
          <div className={showFilters && !isMobileView ? "md:w-3/4 lg:w-4/5" : "w-full"}>
            {filteredProducts.length > 0 ? (
              <>
                <div className="product-grid">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {paginatedProducts().map((product) => (
                      <ProductCard 
                        key={product.id}
                        item={{
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          oldPrice: product.oldPrice,
                          image: productImages[product.id]?.[currentImageIndex[product.id] || 0] || product.image,
                          colors: product.colors,
                          sizes: actualGender === 'girls' || actualGender === 'boys' 
                            ? {
                                '2-3Y': product.sizes.includes('2-3Y'),
                                '3-4Y': product.sizes.includes('3-4Y'),
                                '4-5Y': product.sizes.includes('4-5Y'),
                                '5-6Y': product.sizes.includes('5-6Y'),
                                '6-7Y': product.sizes.includes('6-7Y'),
                                '7-8Y': product.sizes.includes('7-8Y'),
                                '8-9Y': product.sizes.includes('8-9Y'),
                                '9-10Y': product.sizes.includes('9-10Y'),
                                '10-11Y': product.sizes.includes('10-11Y')
                              }
                            : actualGender === 'newborn'
                              ? (product.sizes.includes('Universal') 
                                ? { 'Universal': true }
                                : {
                                    '0-3M': product.sizes.includes('0-3M'),
                                    '3-6M': product.sizes.includes('3-6M'),
                                    '6-9M': product.sizes.includes('6-9M'),
                                    '9-12M': product.sizes.includes('9-12M')
                                  })
                              : actualGender === 'toddler'
                                ? {
                                    '1-2Y': product.sizes.includes('1-2Y'),
                                    '2-3Y': product.sizes.includes('2-3Y'),
                                    '3-4Y': product.sizes.includes('3-4Y'),
                                    '4-5Y': product.sizes.includes('4-5Y')
                                  }
                                : actualGender === 'kids'
                                  ? {
                                      '5-6Y': product.sizes.includes('5-6Y'),
                                      '7-8Y': product.sizes.includes('7-8Y'),
                                      '9-10Y': product.sizes.includes('9-10Y'),
                                      '11-12Y': product.sizes.includes('11-12Y')
                                    }
                                  : {
                                      'XS': product.sizes.includes('XS'),
                                      'S': product.sizes.includes('S'),
                                      'M': product.sizes.includes('M'),
                                      'L': product.sizes.includes('L'),
                                      'XL': product.sizes.includes('XL')
                                    }
                        }}
                        isMobile={isMobileView}
                        onToggleFavorite={() => toggleFavorite(product.id)}
                        isFavorite={() => favorites.includes(product.id)}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Improved pagination for mobile */}
                <div className="flex justify-center pt-8 pb-4">
                  <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                    <button
                      onClick={() => changePage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded ${
                        currentPage === 1 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'border border-gray-300 hover:border-black text-gray-800 hover:text-black'
                      }`}
                      aria-label="Pagina anterioară"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    
                    {renderPagination()}
                    
                    <button
                      onClick={() => changePage(currentPage + 1)}
                      disabled={currentPage === Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
                      className={`flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded ${
                        currentPage === Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'border border-gray-300 hover:border-black text-gray-800 hover:text-black'
                      }`}
                      aria-label="Pagina următoare"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Nu s-au găsit produse pentru această categorie.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 py-2 px-4 border border-gray-300 rounded text-sm hover:bg-gray-50"
                >
                  Resetează filtrele
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;


