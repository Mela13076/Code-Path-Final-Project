// import { Link } from 'react-router-dom';
// import './navBar.css'
// import Logo from '../assets/logo.png'


// function Navigation(){
//     return(
//     <header className="header">
//         <img src={Logo} alt="logo"  height="70px" width="auto"/>
//         <nav>
//             <ul>
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/create">Create Archive</Link></li>
//                 <li><Link to="/gallery">Archive History</Link></li>
//             </ul>
//         </nav>
//     </header>
//     );
// }

// export default Navigation;


import { Link } from 'react-router-dom';
import './navBar.css'
import Logo from '../assets/logo.png'
import React, { useState } from 'react';


function Navigation(){

    const [isMenuOpen, setIsMenuOpen] = useState(false);
      
    const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
      };

    return(
    <header className="header">
        <div className="logo">
            <img src={Logo} alt="logo"  height="70px" width="auto"/>
        </div>
        
        <div className={`menu ${isMenuOpen ? 'open' : 'closed'}`}>
            <ul>
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/create" onClick={closeMenu}>Create Archive</Link></li>
                <li><Link to="/gallery" onClick={closeMenu}>Archive History</Link></li>
            </ul>
        </div>
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
    </header>
    );
}

export default Navigation;