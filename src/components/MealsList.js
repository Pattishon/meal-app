import React from "react";
import { connect } from "react-redux";
import MealDetails from "./MealDetails";
import MealSummary from "./MealSummary";

const MealsList = ({ chosenMeal, chosenMealOrder, meals }) => {
  return (
    <div className="meals-list">
      {meals.length > 0 ? (
        meals.map((meal, index) => (
          <MealSummary key={meal.idMeal} meal={meal} index={index} />
        ))
      ) : (
        <p className="main__info">No meals match chosen criteria</p>
      )}
      {chosenMeal && (
        <MealDetails
          meal={chosenMeal}
          order={3 * Math.floor(chosenMealOrder / 3) + 2}
          sm={false}
        />
      )}
      {chosenMeal && (
        <MealDetails meal={chosenMeal} order={chosenMealOrder} sm />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  chosenMeal: state.chosenMeal,
  chosenMealOrder: state.chosenMealOrder,
  meals: state.meals
});

export default connect(mapStateToProps, null)(MealsList);
