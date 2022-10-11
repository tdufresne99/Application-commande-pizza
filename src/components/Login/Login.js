import { useState } from "react";
import '../Login/Login.css';


const Login = ({saveUser, codeErreur}) => {
    
    const [nomUser, setNomUser] = useState('')
    
    const peutSave = () => {
        const peutSave = (nomUser === '');
        return peutSave;
    };

    const savegarderUser = (nomUser) => {
        saveUser(nomUser);
        setNomUser('');
    }

    return (
        <div className="login">
            <h2>Authentification</h2>
            <h3>Entrez votre nom</h3>
            <input className='inputLogin' type="text" value={nomUser} onChange={(e) => setNomUser(e.target.value)} placeholder="Votre nom..."/>
            <button className='saveLoginBtn' disabled={peutSave()} onClick={() => savegarderUser(nomUser)}>Sauvegarder</button>
            { codeErreur ? ( <h4>Le nom d'utilisateur ne doit pas contenir des charactères spéciaux, des espaces ou des numéros.</h4> ) : null }
        </div>
    );
};

export default Login;