import Logo from "./Logo";
import Nav from "./Nav";

const Navbar = () =>{
    return(
        <header className="bg-white sticky top-0 z-[20] mx-auto flex w-full items-center justify-between  pr-10 pb-10 pl-10 ">
           <Logo />
           <Nav />
        </header>
    );
};

export default Navbar;