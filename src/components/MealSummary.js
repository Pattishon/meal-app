import React, { useState } from "react";
import { connect } from "react-redux";
import { InlineIcon } from "@iconify/react";
import heartOutline from "@iconify/icons-ant-design/heart-outline";
import heartFill from "@iconify/icons-ant-design/heart-fill";
import {
  addFav,
  changeChosenMealOrder,
  chooseMeal,
  removeFav
} from "../store/actions/meals";

const MealSummary = ({
  addFav,
  changeChosenMealOrder,
  chooseMeal,
  chosenMeal,
  chosenMealOrder,
  favourites,
  index,
  meal,
  removeFav
}) => {
  //setting favourite icon
  const checkFav =
    favourites.findIndex(fav => fav.idMeal === meal.idMeal) !== -1;
  const [fav, setFav] = useState(checkFav);

  const handleClick = () => {
    if (meal.idMeal === chosenMeal.idMeal) {
      //allows to hide details
      chooseMeal("");
      changeChosenMealOrder(-1);
    } else {
      //shows details about a meal
      chooseMeal(meal);
      changeChosenMealOrder(index);
    }
  };

  const handleFavourite = (e, meal) => {
    e.stopPropagation();
    if (favourites.findIndex(fav => fav.idMeal === meal.idMeal) === -1) {
      addFav(meal);
      const updatedfavourites = JSON.stringify([...favourites, meal]);
      localStorage.setItem("favourites", updatedfavourites);
    } else {
      removeFav(meal);
      const filteredFavourites = JSON.stringify(
        favourites.filter(fav => fav.idMeal !== meal.idMeal)
      );
      localStorage.setItem("favourites", filteredFavourites);
    }
    setFav(!fav);
  };

  return (
    <div
      onClick={handleClick}
      style={{ order: index }}
      className={`meal-summary ${chosenMeal &&
        chosenMealOrder !== index &&
        "low-opacity"}`}
    >
      <div className="meal-summary__graphics">
        <img src={meal.strMealThumb} alt="" className="meal-summary__img" />
        <div
          onClick={e => handleFavourite(e, meal)}
          className="meal-summary__fav-icon"
        >
          {fav ? (
            <InlineIcon icon={heartFill} width="2rem" style={{ zIndex: "1" }} />
          ) : (
            <InlineIcon
              icon={heartOutline}
              width="2rem"
              style={{ zIndex: "1" }}
            />
          )}
        </div>
      </div>
      <p className="meal-summary__name">{meal.strMeal} </p>
    </div>
  );
};

const mapStateToProps = state => ({
  chosenMeal: state.chosenMeal,
  chosenMealOrder: state.chosenMealOrder,
  favourites: state.favourites,
  meals: state.meals
});

const mapDispatchToProps = dispatch => ({
  addFav: meal => dispatch(addFav(meal)),
  changeChosenMealOrder: order => dispatch(changeChosenMealOrder(order)),
  chooseMeal: meal => dispatch(chooseMeal(meal)),
  removeFav: meal => dispatch(removeFav(meal))
});

export default connect(mapStateToProps, mapDispatchToProps)(MealSummary);
