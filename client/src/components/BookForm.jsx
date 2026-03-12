export default function BookForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEdit,
}) {
  const update = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={onSubmit} className="book-form">
      <div className="form-grid">
        <label>
          Title <span className="required">*</span>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => update('title', e.target.value)}
            required
            placeholder="Book title"
          />
        </label>
        <label>
          Author <span className="required">*</span>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => update('author', e.target.value)}
            required
            placeholder="Author name"
          />
        </label>
        <label>
          ISBN <span className="required">*</span>
          <input
            type="text"
            value={formData.isbn}
            onChange={(e) => update('isbn', e.target.value)}
            required
            placeholder="e.g. 978-0132350884"
            readOnly={isEdit}
            title={isEdit ? 'ISBN cannot be changed when editing' : ''}
          />
        </label>
        <label>
          Genre / Category <span className="required">*</span>
          <input
            type="text"
            value={formData.genre}
            onChange={(e) => update('genre', e.target.value)}
            required
            placeholder="e.g. Programming"
          />
        </label>
        <label>
          Publisher <span className="required">*</span>
          <input
            type="text"
            value={formData.publisher}
            onChange={(e) => update('publisher', e.target.value)}
            required
            placeholder="Publisher name"
          />
        </label>
        <label>
          Publication Year
          <input
            type="number"
            min="1000"
            max="2100"
            value={formData.publicationYear}
            onChange={(e) => update('publicationYear', e.target.value)}
            placeholder="e.g. 2008"
          />
        </label>
        <label>
          Total Copies <span className="required">*</span>
          <input
            type="number"
            min="1"
            value={formData.totalCopies}
            onChange={(e) => update('totalCopies', e.target.value)}
            required
            placeholder="1"
          />
        </label>
        <label>
          Shelf Location
          <input
            type="text"
            value={formData.shelfLocation}
            onChange={(e) => update('shelfLocation', e.target.value)}
            placeholder="e.g. A-12"
          />
        </label>
        <label>
          Book Type
          <select
            value={formData.bookType}
            onChange={(e) => update('bookType', e.target.value)}
          >
            <option value="Circulating">Circulating</option>
            <option value="Reference">Reference</option>
          </select>
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Update' : 'Add Book'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
