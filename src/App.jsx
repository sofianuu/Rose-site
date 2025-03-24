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
import Women from './components/Women';
import Men from  './components/Men';
import Kids from './components/Kids';


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
            <Route path="/women" element={<Women/>}/>
            <Route path="/men" element={<Men/>}/>
            <Route path="/kids" element={<Kids/>}/>
           


          </Routes>
        </main>
        <Footer />
      </div>
        
  )
}

export default App
