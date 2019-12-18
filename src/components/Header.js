import React, { useState } from "react";
import { connect } from "react-redux";
import Favourites from "./Favorites";
import { Icon, InlineIcon } from "@iconify/react";
import heartOutline from "@iconify/icons-ant-design/heart-outline";
import menuOutline from "@iconify/icons-ant-design/menu-outline";
import { search, toggleSidebar } from "../store/actions/meals";

const Header = ({ favourites, search, toggleSidebar }) => {
  const [favOpen, setFavOpen] = useState(false);
  const [searchWord, setSearch] = useState("");

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  const handleFav = () => {
    if (favourites.length > 0) {
      setFavOpen(!favOpen);
    }
  };

  const handleSearch = e => {
    const value = e.target.value;
    setSearch(value);
    search(value);
  };

  return (
    <div className="header">
      <Icon icon={menuOutline} width="2rem" onClick={handleToggleSidebar} />
      <div className="header__right">
        <input
          type="text"
          placeholder="search"
          value={searchWord}
          onChange={handleSearch}
          className="header__search"
        />

        <div onClick={handleFav} className="header__favourites">
          <span
            className={`favourites__title favourites__title--lg ${favOpen &&
              "favourites__title--lgopen"}`}
          >
            favourites <InlineIcon icon={heartOutline} />
          </span>
          <span className="favourites__title favourites__title--sm">
            <Icon icon={heartOutline} />
          </span>
          {favOpen ? <Favourites /> : ""}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  favourites: state.favourites
});

const mapDispatchToProps = dispatch => ({
  search: word => dispatch(search(word)),
  toggleSidebar: () => dispatch(toggleSidebar())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
