import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { HashRouter, Switch, Route } from "react-router-dom";
import CustomersPages from './pages/CustomersPage';
import InvoicesPages from './pages/InvoicesPage';

console.log('Hello Wolrd');

const App = () => {
    return (
        <HashRouter>
            <Navbar />
            <main className="container pt-5" >
                <Switch>
                    <Route path="/invoices" component={InvoicesPages} />
                    <Route path="/customers" component={CustomersPages} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>
        </HashRouter>
    );
}

const rootElement = document.querySelector("#app");
ReactDOM.render( < App /> , rootElement);