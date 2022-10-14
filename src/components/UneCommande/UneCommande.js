

const UneCommande = ({uneCommande}) => {
    
    return (
        <>
            {uneCommande.map((item,i) => {
                return(
                    <li key={item.nom+i}>
                        <p>{item.nom} x {item.qt}</p>
                    </li>
                );
            })}
        </>
    );
};

export default UneCommande;