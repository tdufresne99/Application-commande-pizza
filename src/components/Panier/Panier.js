import './Panier.css';

const Panier = ({panier, sousTotal, viderPanier, passerCommande}) => {
    const commande = panier;
    return(
        <div className="panier">
            <h2>Panier</h2>
            <ul className='panierItems'>
                {panier.map((pizza,i) => {
                    return(
                        <li key={i+pizza.nom}>{pizza.nom} x {pizza.qt} = {pizza.prix*pizza.qt.toFixed(2)}$</li>
                    )
                })}
            </ul>
            <h3 className='panierSousTotal'>Sous-total = {sousTotal.toFixed(2)}$</h3>
            <button disabled={(!panier[0])} className='passerCommande' onClick={()=>passerCommande(commande)}>Passer une commande</button>
            <button className='viderPanier' onClick={viderPanier}>Vider le panier</button>
        </div>
    );
};

export default Panier;