export function TableSelect(props) {

  const msMultiSelect = (event) => {
    let action = 'invert'
    if (!event.target.classList.contains('invert')) {
      action = event.target.classList.contains('select') ? 'select' : 'unselect'
    }
    document.querySelectorAll('[name="table[]"] option').forEach(function(element) {
      if (action === 'invert') {
        element.selected = !element.selected
      } else {
        element.selected = (action === 'select');
      }
    });
  }

  return  (
    <>
      <select name="table[]" multiple className="sel" defaultValue={props.tables}>
        {Object.values(props.tables).map((table) =>
          <option key={table.toString()}>{table}</option>
        )}
      </select>   <br />
      <a href="#" onClick={msMultiSelect} className="hs select">все</a> &nbsp;
      <a href="#" onClick={msMultiSelect} className="hs unselect">очистить</a> &nbsp;
      <a href="#" onClick={msMultiSelect} className="hs invert">инверт</a>
    </>
  )
}


