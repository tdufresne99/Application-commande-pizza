import UneCommande from "../UneCommande/UneCommande";


const LesCommandes = ({lesCommandes}) => {
    
    return (
        <>
            <h2>Les Commandes</h2>
            {console.log(lesCommandes)}
            {lesCommandes.map((uneCommande,i)=>{
                return (
                    <div key={i}>
                        <UneCommande uneCommande={uneCommande}/>  
                        <h3>{uneCommande.prix}</h3>
                    </div>
                );
            })}
        </>
        // <h2>Sous Total: {uneCommande.prix}$</h2>
    );
};

export default LesCommandes;