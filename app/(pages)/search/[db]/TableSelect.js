import {msMultiSelect} from "@/app/ui/functions";

export function TableSelect(props) {
  return  (
    <>
      <select name="table[]" multiple className="sel" defaultValue={props.tables}>
        {Object.values(props.tables).map((table) =>
          <option key={table.toString()}>{table}</option>
        )}
      </select>   <br />
      <a href="#" onClick={msMultiSelect.bind(this, 'table[]')} className="hs select">все</a> &nbsp;
      <a href="#" onClick={msMultiSelect.bind(this, 'table[]')} className="hs unselect">очистить</a> &nbsp;
      <a href="#" onClick={msMultiSelect.bind(this, 'table[]')} className="hs invert">инверт</a>
    </>
  )
}


