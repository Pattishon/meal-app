import React from "react";

const MealDetails = ({ meal, order, sm }) => {
  const url = meal.strYoutube.split("=")[1];

  let ingredients = [];
  let measures = [];
  for (let property in meal) {
    if (property.includes("strIngredient") && meal[property] !== "") {
      ingredients.push(meal[property]);
    } else if (property.includes("strMeasure") && meal[property] !== " ") {
      measures.push(meal[property]);
    }
  }

  return (
    <div
      className={`meal-details ${sm ? "meal-details--sm" : "meal-details--lg"}`}
      style={{ order }}
    >
      <iframe
        title={meal.strMeal}
        className="meal-details__video"
        src={`https://www.youtube.com/embed/${url}`}
      ></iframe>
      <div className="meal-details__description">
        <h2 className="meal-details__title">Instruction</h2>
        <p className="meal-details__instructions">{meal.strInstructions}</p>

        <h2 className="meal-details__title">Ingreadients + measure</h2>

        {ingredients.map((ingredient, index) => (
          <p key={index} className="meal-details__ingredients">
            {ingredient} - {measures[index]}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MealDetails;
