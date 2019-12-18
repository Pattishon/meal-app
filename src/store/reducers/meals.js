const defaultState = {
  meals: [],
  favourites: [],
  sidebar: true,
  chosenMeal: "",
  chosenMealOrder: -1
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_FAVOURITES":
      return { ...state, favourites: action.favourites };
    case "SET_MEALS":
      return { ...state, meals: action.meals };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebar: !state.sidebar };
    case "ADD_FAV":
      return { ...state, favourites: [...state.favourites, action.meal] };
    case "REMOVE_FAV":
      const filteredFavs = state.favourites.filter(
        fav => fav.idMeal !== action.meal.idMeal
      );
      return { ...state, favourites: filteredFavs };
    case "CHOOSE_MEAL":
      return { ...state, chosenMeal: action.meal };
    case "CHANGE_CHOSEN_MEAL_ORDER":
      return { ...state, chosenMealOrder: action.order };
    default:
      return state;
  }
};
