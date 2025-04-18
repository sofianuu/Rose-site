import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderDetail from './pages/OrderDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Kids, { KidsGenderPage } from './pages/Kids';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import GenderHome from './pages/GenderHome';
import FloatingLabelInput from './components/FloatingLabelInput';
import FooterPage from './pages/FooterPage';
import ScrollToTop from './components/ScrollToTop';
import Admin from './pages/Admin';
import Contact from './pages/Contact';

function App() {
  
  return (
      <div className='grid min-h-screen grid-rows-[auto_1fr_auto]'> 
       <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/orders/:orderId" element={<OrderDetail/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/kids" element={<Kids/>}/>
            <Route path="/kids/girls" element={<KidsGenderPage gender="girls" />} />
            <Route path="/kids/boys" element={<KidsGenderPage gender="boys" />} />
            <Route path="/women" element={<GenderHome gender="women" />} />
            <Route path="/men" element={<GenderHome gender="men" />} />
            <Route path="/kids/age/:category/:subcategory" element={<CategoryPage />} />
            <Route path="/kids/:gender/:category" element={<CategoryPage />} />
            <Route path="/:gender/:category" element={<CategoryPage />} />
            <Route path="/Category/:gender" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/floating-label-input" element={<FloatingLabelInput />} />
            <Route path="/footer/:pageType" element={<FooterPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
        
  )
}

export default App
