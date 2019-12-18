import React from "react";
import { connect } from "react-redux";
import { search } from "../store/actions/meals";

const Favourites = ({ favourites, search }) => {
  const handleClick = fav => {
    search(fav);
  };
  return (
    <div className="favourites">
      {favourites
        ? favourites.map(fav => (
            <div
              key={fav.idMeal}
              onClick={() => handleClick(fav.strMeal)}
              className="favourites__fav"
            >
              <img
                src={fav.strMealThumb}
                alt=""
                className="favourites__fav-img"
              />
              <p className="favourites__fav-title">{fav.strMeal}</p>
            </div>
          ))
        : ""}
    </div>
  );
};

const mapStateToProps = state => ({
  favourites: state.favourites
});

const mapDispatchToProps = dispatch => ({
  search: word => dispatch(search(word))
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
