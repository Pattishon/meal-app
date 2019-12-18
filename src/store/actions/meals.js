export const startFetchData = () => {
  return dispatch => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Soup")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Unable to fetch meals");
        }
      })
      .then(data => {
        dispatch(fetchFavoutires());
        dispatch(setMeals(data.meals));
      });
  };
};
export const fetchFavoutires = () => {
  let favourites = [];
  if (localStorage.getItem("favourites")) {
    favourites = JSON.parse(localStorage.getItem("favourites"));
  }
  return {
    type: "FETCH_FAVOURITES",
    favourites
  };
};

export const setMeals = meals => {
  return {
    type: "SET_MEALS",
    meals
  };
};

export const addFav = meal => {
  return { type: "ADD_FAV", meal };
};
export const removeFav = meal => {
  return { type: "REMOVE_FAV", meal };
};

export const toggleSidebar = () => {
  return {
    type: "TOGGLE_SIDEBAR"
  };
};

export const search = word => {
  return dispatch => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Unable to fetch meals");
        }
      })
      .then(data => {
        console.log(data);

        if (data.meals) {
          dispatch(setMeals(data.meals));
        } else {
          dispatch(setMeals([]));
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
};

export const filter = (filterType, filterValue) => {
  const filteredMeals = this.state.meals.filter(meal => {
    if (!meal[filterType]) {
      return true;
    } else {
      if (filterType === "strCategory" || filterType === "strArea") {
        return meal[filterType] !== filterValue;
      } else if (filterType === "strTags") {
        const tagIndex = meal[filterType].indexOf(filterValue);
        if (tagIndex === -1) {
          return true;
        } else {
          return false;
        }
      }
    }
    return true;
  });
  return {
    type: "FILTER",
    meals: filteredMeals
  };
};

export const chooseMeal = meal => {
  return {
    type: "CHOOSE_MEAL",
    meal
  };
};
export const changeChosenMealOrder = order => {
  return {
    type: "CHANGE_CHOSEN_MEAL_ORDER",
    order
  };
};
