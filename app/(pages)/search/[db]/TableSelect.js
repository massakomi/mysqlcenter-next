import {msMultiSelect} from "@/app/ui/functions";

export function TableSelect(props) {
  return  (
    <>
      <select name="table[]" multiple className="sel" defaultValue={props.tables}>
        {Object.values(props.tables).map((table) =>
          <option key={table.toString()}>{table}</option>
        )}
      </select>   <br />
      <span role="button" onClick={msMultiSelect.bind(this, 'table[]')} className="hs select">все</span>
      <span role="button" onClick={msMultiSelect.bind(this, 'table[]')} className="hs unselect">очистить</span>
      <span role="button" onClick={msMultiSelect.bind(this, 'table[]')} className="hs invert">инверт</span>
    </>
  )
}


