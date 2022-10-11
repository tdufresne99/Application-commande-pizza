

const UneCommande = ({uneCommande}) => {
    
    return (
        <>
            {uneCommande.map((item,i) => {
                return(
                    <p key={item.nom+i}>{item.nom} x {item.qt}</p>
                );
            })}
        </>
    );
};

export default UneCommande;