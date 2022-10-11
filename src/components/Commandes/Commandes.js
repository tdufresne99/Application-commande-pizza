

const Commandes = ({lesCommandes}) => {
    
    return (
        <>
            <h2>Les Commandes</h2>
            {console.log(lesCommandes)}
            {lesCommandes.map((uneCommande,i)=>{
                return uneCommande.map((item, y)=>{
                    console.log(item);
                    return(
                        <h3 key={i+y}>{item.nom} x {item.qt}</h3>
                    );
                });
            })}
        </>
    );
};

export default Commandes;