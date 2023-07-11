const SearchItem = ({ text, setQuery }) => {
  return (
    <li>
      <span>{text}</span>
      <button
        onClick={(e) => {
          setQuery(text);
        }}
      >
        show
      </button>
    </li>
  );
};

export default SearchItem;
