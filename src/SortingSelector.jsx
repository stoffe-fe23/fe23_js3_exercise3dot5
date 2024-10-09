
function SortingSelector({ sortTodosBy, onChangeSort }) {
    return (
        <select id="sort-by" onChange={onChangeSort} value={`${sortTodosBy.type}-${sortTodosBy.direction}`}>
            <option value="order-asc">Ordning (stigande)</option>
            <option value="order-desc">Ordning (fallande)</option>
            <option value="title-asc">Titel (stigande)</option>
            <option value="title-desc">Titel (fallande)</option>
            <option value="date-asc">Datum (stigande)</option>
            <option value="date-desc">Datum (fallande)</option>
        </select>
    );
}

export default SortingSelector;