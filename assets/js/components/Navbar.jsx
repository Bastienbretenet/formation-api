import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthAPI from '../services/authAPI';

const Navbar = ({history}) => {

    const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        history.push('/login')
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
                SymReact
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Clients</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {(!isAuthenticated && (
                        <>
                            <li className="nav-item mx-2">
                                <NavLink className="btn btn-primary" to="/register">Inscription</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="btn btn-success" to="/login">Connexion</NavLink>
                            </li>
                        </>
                    )) || (
                        <li className="nav-item mx-2">
                            <button 
                                onClick={handleLogout}
                                className="btn btn-danger"
                            >
                                    Déconnexion
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;