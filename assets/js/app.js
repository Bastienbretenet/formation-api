import '../css/app.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import CustomersPages from './pages/CustomersPage';
import InvoicesPages from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/authAPI';
import AuthContext from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

AuthAPI.setup();


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated())
    const NavBarWithRouter = withRouter(Navbar);
    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <HashRouter>
                <NavBarWithRouter />
                <main className="container pt-5" >
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path="/invoices" component={InvoicesPages} />
                        <PrivateRoute path="/customers" component={CustomersPages} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    );
}

const rootElement = document.querySelector("#app");
ReactDOM.render( < App /> , rootElement);