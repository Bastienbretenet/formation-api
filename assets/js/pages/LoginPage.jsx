import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import AuthAPI from '../services/authAPI';

const LoginPage = ({onLogin, history}) => {

    const {setIsAuthenticated} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState("");

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace("/customers");
        }catch(error){
            console.log(error.response)
            setError("Aucun compte ne possède cette adresse ou les informations ne sont pas correctes.");
        }
    }

    return ( <>
        <h1>Connexion</h1>

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Adresse email</label>
                <input 
                    value={credentials.username}
                    onChange={handleChange}
                    type="email" 
                    placeholder="Email" 
                    name="username" 
                    id="username" 
                    className={"form-control" + (error && " is-invalid")}
                />
                {error && 
                    <p className="invalid-feedback">
                        {error}
                    </p>
                }
            </div>
            <div className="form-group">
                <label htmlFor="_password">Mot de passe</label>
                <input 
                    value={credentials.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    id="password"
                    className="form-control"/>
            </div>
            <div className="form-group">
                <button className="btn btn-success" type="submit">Connexion</button>
            </div>
        </form>

    </> );
}
 
export default LoginPage;