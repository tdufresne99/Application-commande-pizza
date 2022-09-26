import { useState } from "react";


const Login = ({saveUser}) => {
    
    const [nomUser, setNomUser] = useState('')
    
    const peutSave = () => {
        const peutSave = (nomUser === '');
        return peutSave;
    };

    return (
        <>
            <h2>Authentification</h2>
            <h3>Entrez votre nom</h3>
            <input className='inputLogin' type="text" value={nomUser} onChange={(e) => setNomUser(e.target.value)} placeholder="Votre nom..."/>
            <button className='saveLoginBtn' disabled={peutSave()} onClick={() => saveUser(nomUser)}>Sauvegarder</button>
        </>
    );
};

export default Login;