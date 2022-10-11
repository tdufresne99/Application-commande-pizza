import Navigation from '../Navigation/Navigation';
import {Outlet, Navigate, useLocation} from 'react-router-dom';
import Titre from '../Titre/Titre';

const Layout = ({nbItems}) => {
    const location = useLocation();
    return (
        <div className="container-fluid">
            
            <Titre/>

            <Navigation links={[
                {name: 'Liste des Pizzas', url: '/pizzas'},
                {name: 'Créez votre Pizza', url: '/pizzas/creer'},
                {name: 'Commandes', url: '/commandes'},
            ]}/>
            <main>
                <Outlet/>
            </main>

        </div>
    );
};

export default Layout;