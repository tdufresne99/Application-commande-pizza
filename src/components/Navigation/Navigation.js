import { useState } from "react";
import {Link, useLocation} from 'react-router-dom';

const Navigation = (props) => {
    
    const location = useLocation();

    return (
        <nav>
            <ul className="nav nav-pills">
                {props.links.map((link) => {
                    if(location.pathname === link.url){
                        return <li key={link.name} className='active'><Link to={link.url}>{link.name}</Link></li>
                    } else {
                        return <li key={link.name}><Link to={link.url}>{link.name}</Link></li>
                    }
                })}
            </ul>
        </nav>
    );
};

export default Navigation;