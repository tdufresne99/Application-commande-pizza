
const Panier = ({panier}) => {
    
    return(
        <ul>
            {panier.map((pizza,i) => {
                
                return(
                    <h3 key={i+pizza.nom}>{pizza.nom}   qt={pizza.qt}</h3>
                )
            })}
        </ul>
    );
};

export default Panier;