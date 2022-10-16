import { useNavigate } from 'react-router-dom';
import './Panier.css';

const Panier = ({panier, sousTotal, viderPanier, passerCommande}) => {
    const commande = panier;
    const navigate = useNavigate();
    const onClickHandler = () => {
        passerCommande(commande)
        viderPanier();
        navigate('/commandes');
    }
    return(
        <div className="panier">
            <h2>Panier</h2>
            <ul className='panierItems'>
                {panier.map((pizza,i) => {
                    return(
                        <li key={i+pizza.nom}>{pizza.nom} x {pizza.qt} = {pizza.prix.toFixed(2)*pizza.qt}$</li>
                    )
                })}
            </ul>
            <h3 className='panierSousTotal'>Sous-total = {sousTotal.toFixed(2)}$</h3>
            <button disabled={(!panier[0])} className='passerCommande' onClick={onClickHandler}>Passer une commande</button>
            <button className='viderPanier' onClick={viderPanier}>Vider le panier</button>
        </div>
    );
};

export default Panier;