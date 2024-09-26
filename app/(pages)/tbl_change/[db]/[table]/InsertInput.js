'use client';
export default function InsertInput({i, j, value, diffLength, type, change}) {

  let length = null
  let a = type.match(/\(([0-9]+)\)/)
  if (a && a[1]) {
    length = parseInt(a[1])
  }
  if (length === 1) {
    //return '<input name="row['.$i.'][]" type="checkbox" value="1" />';
  }

  if (type.match(/enum/i)) {
    /*
      preg_match_all('~(\'|")(.*)(\'|")~iU', $type, $items);
      if (isset($items[2])) {
        array_unshift($items[2], '');
        foreach ($items[2] as $k => $v) {
          $items[2][$k] = preg_replace('~\s+~i', ' ', $v);
        }
        $value = preg_replace('~\s+~i', ' ', $value);
        $attr = str_replace('onkeyup', 'onchange', $attr);
        return plDrawSelector(
            $items[2],
            ' name="row['.$i.']['.$j.']"'.$attr,
            array_search($value, $items[2]),
            '',
            false
        );
      }
      */
    return 'todo'
  }

  if (type.match(/(text|blob)/i)) {
    let rows = 10
    if (value != null && value.length > 0) {
      rows = Math.round(value.length / 60)
      if (rows < 10) {
        rows = 10
      }
    }
    return <textarea name={`row[${j}][${i}]`} cols="70" rows={rows} onChange={change} value={value}></textarea>
  }

  let size = 80
  if (diffLength) {
    if (length <= 15) {
      size = length
    } else if (length < 30) {
      size = Math.round(length / 1.2)
    } else {
      size = Math.round(length / 3)
    }
  } else {
    if (length <= 15) {
      size = 15
    } else if (length < 128) {
      size = 50
    } else {
      size = 80
    }
  }
  if (type === 'datetime') {
    size = 30
  }
  if (type === 'timestamp' && value != null) {
    size = 50
  }

  return <input name={`row[${j}][${i}]`} type="text" size={size} value={value} onChange={change} className="si" />
}