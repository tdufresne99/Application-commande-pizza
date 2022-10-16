import UneCommande from "../UneCommande/UneCommande";
import './LesCommandes.css'


const LesCommandes = ({lesCommandes}) => {
    
    return (
        <div className="lesCommandes">
            <h2 className="titreCommandes">Les Commandes</h2>
            {console.log(lesCommandes)}
            {lesCommandes.map((uneCommande,i)=>{
                return (
                    <div key={i} className='uneCommande'>
                        <h3>Commande#{i+1}</h3>
                        <ul>
                            <UneCommande uneCommande={uneCommande}/>
                        </ul>
                        <p className="sousTotalCommandes">Sous-total: {uneCommande.prix.toFixed(2)}$</p>
                    </div>
                );
            })}
        </div>
        // <h2>Sous Total: {uneCommande.prix}$</h2>
    );
};

export default LesCommandes;