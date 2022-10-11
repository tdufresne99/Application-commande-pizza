import { useState } from "react";

const Panier = ({panier, sousTotal, viderPanier, passerCommande}) => {
    const commande = panier;
    return(
        <>
            <ul>
                {panier.map((pizza,i) => {
                    return(
                        <h3 key={i+pizza.nom}>{pizza.nom}   qt={pizza.qt}</h3>
                    )
                })}
            </ul>
            <h3>Sous-Total = {sousTotal}$</h3>
            <button className='passerCommande' onClick={()=>passerCommande(commande)}>Passer une commande</button>
            <button className='viderPanier' onClick={viderPanier}>Vider le panier</button>
        </>
    );
};

export default Panier;