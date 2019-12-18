import React from "react";
import { connect } from "react-redux";
import { InlineIcon } from "@iconify/react";
import closeOutline from "@iconify/icons-ant-design/close-outline";
import { setMeals } from "../store/actions/meals";

const Sidebar = ({ meals, setMeals, sidebar }) => {
  //helper fn
  const onlyUnique = (value, index, self) => self.indexOf(value) === index;
  const sortAlphabetically = array => {
    return array.sort((a, b) => {
      if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
      } else if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  //setting cotegories, areas and tags arrays
  const categories = sortAlphabetically(
    meals.map(meal => meal.strCategory).filter(onlyUnique)
  );
  const areas = sortAlphabetically(
    meals.map(meal => meal.strArea).filter(onlyUnique)
  );
  let tags = [];
  meals.forEach(meal => {
    if (meal.strTags) {
      tags = tags.concat(meal.strTags.split(","));
    }
  });
  tags = sortAlphabetically(tags.filter(onlyUnique));

  const handleFilter = (filterType, filterValue) => {
    const filteredMeals = meals.filter(meal => {
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
    setMeals(filteredMeals);
  };
  return (
    <div className={`sidebar ${sidebar && "sidebar--hidden"}`}>
      <div>
        <h2 className="sidebar__title">Category</h2>
        <div className="sidebar__field">
          {meals
            ? categories.map(category => (
                <div key={category} className="sidebar__chip">
                  <InlineIcon
                    onClick={() => handleFilter("strCategory", category)}
                    icon={closeOutline}
                    className="sidebar__filter-icon"
                  />
                  <span className="sidebar__name">{category} </span>
                </div>
              ))
            : ""}
        </div>
      </div>
      <div>
        <h2 className="sidebar__title">Area</h2>
        <div className="sidebar__field">
          {meals
            ? areas.map(area => (
                <div key={area} className="sidebar__chip">
                  <InlineIcon
                    onClick={() => handleFilter("strArea", area)}
                    icon={closeOutline}
                    className="sidebar__filter-icon"
                  />
                  {area}
                </div>
              ))
            : ""}
        </div>
      </div>
      <div>
        <h2 className="sidebar__title">Tags</h2>
        <div className="sidebar__field">
          {meals
            ? tags.map(tag => (
                <div key={tag} className="sidebar__chip">
                  <InlineIcon
                    onClick={() => handleFilter("strTags", tag)}
                    icon={closeOutline}
                    className="sidebar__filter-icon"
                  />
                  {tag}
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  meals: state.meals,
  sidebar: state.sidebar
});

const mapDispatchToProps = dispatch => ({
  setMeals: meals => dispatch(setMeals(meals))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
