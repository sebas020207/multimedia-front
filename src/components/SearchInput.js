import React from "react";
import '../assets/css/search_input.css';

const SearchInput = (props) => {
  return (
    <div className="search-input">
      <i className="fas fa-search"></i>
      <input
        type="text"
        name={props.name || 'Sin name'}
        placeholder={props.placeholder || "Sin placeholder"}
        onChange={props.onChange}
      />
    </div>
  );
};

export default SearchInput;
