import {useState} from 'react';
import UnIngredient from '../UnIngredient/UnIngredient';
import PizzaPersoNom from '../PizzaPersoNom/PizzaPersoNom';
import PatePizza from '../PatePizza/PatePizza';
import './PizzaPersoEdit.css';
import LesPizzasSaved from '../LesPizzasSaved/LesPizzasSaved';
import { useLocation, Navigate } from 'react-router-dom';


const PizzaPersoEdit = ({addPizza, nbPizzas}) => {
    const location = useLocation();
    const lesIngredientsInit = [
        {nom:"Fromage", img:"fromage", checked: false},
        {nom:"Tomates", img:"tomate", checked: false},
        {nom:"Piments Verts", img:"pimentVert", checked: false},
        {nom:"Piments Rouges", img:"pimentRouge", checked: false},
        {nom:"Piments Jaunes", img:"pimentJaune", checked: false},
        {nom:"Olives Vertes", img:"oliveVerte", checked: false},
        {nom:"Olives Noires", img:"oliveNoire", checked: false},
        {nom:"Oignons Rouges", img:"oignonRouge", checked: false},
        {nom:"Oignons Blancs", img:"oignonBlanc", checked: false},
        {nom:"Champignons", img:"champignon", checked: false},
        {nom:"Ananas", img:"ananas", checked: false},
    ];

    const [lesIngredients, setLesIngredients] = useState(lesIngredientsInit);

    // Vérifie si au moins un ingrédient est sélectionné.
    const verifierIngredientSelection = () => {
        let estSelect = false;
        lesIngredients.map(unIngredient => {
            if (unIngredient.checked){
                estSelect = true;
                return;
            }
        });
        return estSelect;
    };
     
    // Inerse la valeur de la propriété "checked" (bool) de l'ingredient passé en paramètre.
    const modifierCheckedIngredient = (ingredient) => {

        console.log("ingredient = " + ingredient.nom);
        const newState = lesIngredients.map(unIngredient => {
            if(unIngredient.nom === ingredient.nom) {
                return {...unIngredient, checked:(!unIngredient.checked)};
            }
            return unIngredient;
        });
        setLesIngredients(newState);
    };

    // Réinitialise tous les champs à leur valeur initiale.
    const resetPizza = () => {
        setLesIngredients(lesIngredientsInit);
    };

    // Enregistre une nouvelle pizza avec les propriétés selectionnées
    const enregistrerPizza = (titrePizza) => {
        let lesIngredientsPerso = [];
        let lesImgsPerso = [];
        
        lesIngredients.map(unIngredient => {
            if(unIngredient.checked) {
                lesIngredientsPerso = [...lesIngredientsPerso, unIngredient.nom];
                lesImgsPerso = [...lesImgsPerso, unIngredient.img];
            };
        });
        const newPizza = {nom:titrePizza, ingredients:lesIngredientsPerso, imgs:lesImgsPerso};
        console.log(newPizza);
        addPizza(newPizza);
    };
        
    return (
        <>
            {(location.pathname !== "/pizzas/creer") ? <Navigate to="/pizzas/0" replace/> : ''}
            <PizzaPersoNom reset={resetPizza} save={enregistrerPizza} estSelect={verifierIngredientSelection} nbPizzas={nbPizzas}/>
            <ul className='listeIngredients'>
                    {lesIngredients.map(function(unIngredient, i){
                        return (
                            <UnIngredient key={i} ingredient={unIngredient} checkFn={modifierCheckedIngredient}/>
                        );
                    })}
            </ul>
            <div className='pizzaEditImgs'>
                <PatePizza/>
                {lesIngredients.map(function(unIngredient, i){
                    return unIngredient.checked ? <img key={i} className='pizzaEditIngreImg' src={"/Img/pizza_"+ unIngredient.img +".png"}></img> : '';
                })}
            </div>
        </>
    );
};

export default PizzaPersoEdit;