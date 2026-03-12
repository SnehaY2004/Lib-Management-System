export default function SearchBar({
  searchTitle,
  searchAuthor,
  onTitleChange,
  onAuthorChange,
  onSearch,
  onClear,
  searchMode,
}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Title"
        value={searchTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        className="search-input"
        aria-label="Search by title"
      />
      <input
        type="text"
        placeholder="Author"
        value={searchAuthor}
        onChange={(e) => onAuthorChange(e.target.value)}
        className="search-input"
        aria-label="Search by author"
      />
      <button type="button" className="btn btn-secondary" onClick={onSearch}>
        Search
      </button>
      {searchMode && (
        <button type="button" className="btn btn-secondary" onClick={onClear}>
          Clear
        </button>
      )}
    </div>
  );
}
