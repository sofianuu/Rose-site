import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Cart from "./components/Cart";
import Favorites from './components/Favorites';
import Login from './components/Login';
import Profile from './components/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import Kids from './components/Kids';
import CategoryPage from './components/CategoryPage';
import ProductPage from './components/ProductPage';
import GenderHome from './components/GenderHome';

function App() {
  
  return (
      <div className='grid min-h-screen grid-rows-[auto_1fr_auto]'> 
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/kids" element={<Kids/>}/>
            <Route path="/women" element={<GenderHome gender="women" />} />
            <Route path="/men" element={<GenderHome gender="men" />} />
            <Route path="/:gender/:category" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
           

          </Routes>
        </main>
        <Footer />
      </div>
        
  )
}

export default App
