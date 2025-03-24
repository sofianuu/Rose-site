import { Link } from "react-router-dom"; 
import logoImage from "../assets/images/logo.png"; 
import PropTypes from "prop-types";

const Logo = ({closeMenu }) => {
    return(
        <Link to="/" onClick={closeMenu }>
            <img className="w-45 h-35" alt="logo" src={logoImage}/>
        </Link> 
    );
};

Logo.propTypes = {
    closeMenu: PropTypes.func
};

export default Logo;