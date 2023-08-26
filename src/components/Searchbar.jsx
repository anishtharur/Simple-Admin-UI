import React, { useState } from "react";

/**
 * Component for rendering a search bar with debounced search functionality.
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.handleSearch - The function to handle the search action.
 */
function Searchbar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  let debounceTimeout;

  /**
   * Handle input change event and perform debounced search.
   * @param {Object} e - The input change event object.
   */
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      handleSearch(e.target.value);
    }, 300);
  };

  /**
   * Handle key press event, trigger search on Enter key press.
   * @param {Object} e - The key press event object.
   */
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      clearTimeout(debounceTimeout);
      handleSearch(searchTerm);
    }
  };

  return (
    <nav className="searchbar">
      <input
        type="text"
        placeholder=" Search by name, email or role..."
        className="search"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button
        className="btn btn-outline-secondary"
        onClick={() => handleSearch(searchTerm)}
      >
        Search
      </button>
    </nav>
  );
}

export default Searchbar;
