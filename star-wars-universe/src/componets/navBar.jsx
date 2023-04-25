import { Link } from 'react-router-dom';
import './navBar.css'
import Logo from '../assets/logo.png'


function Navigation(){
    return(
    <header className="header">
        <img src={Logo} alt="logo"  height="70px" width="auto"/>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Create Archive</Link></li>
                <li><Link to="/gallery">Archive History</Link></li>
            </ul>
        </nav>
    </header>
    );
}

export default Navigation;