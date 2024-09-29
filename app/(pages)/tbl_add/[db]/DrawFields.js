'use client'

export default function DrawFields(props) {

  const aiClick = (index) => {
    document.getElementById(`default${index}`).value = ''
  }

  const clearKeys = (index)  => {
    document.getElementById('key1'+index).checked = false;
    document.getElementById('key2'+index).checked = false;
    document.getElementById('key3'+index).checked = false;
    return false;
  }

  let POST = props.post || {};
  let keys = props.keys;
  let array = props.array;

  // получение массива из post
  if (array.length === 0) {
    return <>Поле не существует</>
    //getArrayFromPost(); ??? что это
  }

  // получение массива "предыдущих полей" полей
  let fields = ['FIRST']
  let previousFields = {}
  let prev = '';
  props.fields.forEach(function(field) {
    previousFields[field] = prev
    prev = field
    fields.push(field)
  })

  const trs = array.map((fieldInfo, index) => {

    let NAME='', TYPE='', LENGTH='', DEFAULT='', ISNULL='', AUT='', extra='';
    let isUnsignedZero=false, isUnsigned=false;
    let PRI='', UNI='', MUL='', uniName='', mulName='';

    if (typeof fieldInfo == 'object') {
      let a = fieldInfo.Type.match(/\((.*)\)/)
      if (a) {
        LENGTH = a[1]
      }
      isUnsignedZero = fieldInfo.Type.match(/unsigned zerofill/i) !== null;
      isUnsigned = fieldInfo.Type.match(/unsigned/i) !== null;
      NAME = fieldInfo.Field;
      TYPE = fieldInfo.Type.replace(/\((.*)\).*/i, '').toUpperCase();
      DEFAULT = fieldInfo.Default;
      ISNULL = fieldInfo.Null === true || fieldInfo.Null === "YES";
      AUT = fieldInfo.Extra !== ""
      extra = (
        <>
          <select name="after[]" defaultValue={previousFields[fieldInfo.Field]}>
            {fields.map((v) =>
              <option key={v}>{v}</option>
            )}
          </select>
          <input type="hidden" name="afterold[]" defaultValue={previousFields[fieldInfo.Field] || 'FIRST'} />
        </>
      )
      //console.log(NAME)
      if (keys[NAME]) {
        Object.keys(keys[NAME]).forEach(function(keyName) {
          let key = keys[NAME][keyName];
          PRI = key === "PRI" || POST.primaryKey === NAME
          if (key === "UNI" || POST.uni && POST.uni[NAME]) {
            UNI = true
            uniName = keyName
          }
          if (key === "MUL" || POST.mul && POST.mul[NAME]) {
            MUL = true
            mulName = keyName
          }
        });
      }

    } else if (POST.afterOption) {
      let checked = ''
      if (POST.afterOption === 'end') {
        checked = fields[fields.length - 1]
      } else if (POST.afterOption === 'field') {
        checked = POST.afterField
      }
      extra = (
        <>
          <select name={`after[${index}]`} defaultValue={checked}>
            {fields.map((v) =>
              <option key={v}>{v}</option>
            )}
          </select>
          <input type="hidden" name={`afterold[${index}]`} defaultValue={checked} />
        </>
      )
    }

    let j = NAME === '' ? index : NAME;

    let attr = isUnsigned ? 'UNSIGNED' : (isUnsignedZero ? 'UNSIGNED ZEROFILL' : '');

    return (
      <tr key={index} id={`tableFormEditTr${index}`}>
        <td>
          <input name="name[]" tabIndex="1" id={`name${index}`} type="text" defaultValue={NAME} size="15" />
          <input type="hidden" name="oldname[]" defaultValue={NAME} />
        </td>
        <td>
          <ColumnTypeSelect selected={TYPE} id={`typeSelectorId${index}`} />
        </td>
        <td><input name="length[]" tabIndex="3" id={`length${index}`} type="text" defaultValue={LENGTH} size="30" /></td>
        <td><input name={`isNull[${index}]`} tabIndex="4" id={`isNull${index}`} type="checkbox" value="1" defaultChecked={ISNULL} /></td>
        <td><input name="default[]" tabIndex="5" id={`default${index}`} type="text" size="10" defaultValue={DEFAULT} /></td>
        <td><input name={`auto[${index}]`} tabIndex="6" id={`auto${index}`} onClick={aiClick.bind(this, index)} type="checkbox" value="1" defaultChecked={AUT}  /></td>
        <td><input name="primaryKey" tabIndex="7" id={`key1${index}`} type="radio" defaultValue={j} defaultChecked={PRI} /></td>
        <td><input name={`uni[${j}]`} tabIndex="8" id={`key2${index}`} type="checkbox" defaultValue={uniName} defaultChecked={UNI} /></td>
        <td><input name={`mul[${j}]`} tabIndex="9" id={`key3${index}`} type="checkbox" defaultValue={mulName} defaultChecked={MUL}  /></td>
        <td><a href="#" onClick={clearKeys.bind(this, index)}>clear</a></td>
        <td><input name={`fulltext[${index}]`} tabIndex="11" id={`fulltext${index}`} type="checkbox" value="1" /></td>
        <td>
          <select name="attr[]" tabIndex="12" id={`attr${index}`} className='w-16' defaultValue={attr}>
            <option value="">-</option>
            <option>UNSIGNED</option>
            <option>UNSIGNED ZEROFILL</option>
          </select>
        </td>
        <td>{extra}</td>
      </tr>
    )
  });

  return (
    <TableHead>
      {trs}
    </TableHead>
  );
}



function ColumnTypeSelect({selected, id}) {

  // В зависимости от выбранного типа поля можно что-то изменить в других полях строки
  const typeChange = (event) => {
    let curType = event.target.value;
    if (curType === 'SERIAL') {
      let autoinc = event.target.closest('tr').querySelector('[name^="auto"]');
      autoinc.setAttribute('checked', true);
      autoinc.setAttribute('disabled', true);
      let nulled = event.target.closest('tr').querySelector('[name^="isNull"]');
      nulled.setAttribute('disabled', true);
    }
    if (curType === 'ENUM' || curType === 'SET') {
      let value = event.target.closest('tr').querySelector('[name="length[]"]');
      value.value = "'','',''";
    }
  }

  // создание селектора типов данных
  let columnTypes = [
    'VARCHAR', 'TINYINT', 'TEXT', 'DATE', 'JSON',
    'SMALLINT', 'MEDIUMINT', 'INT', 'BIGINT',
    'FLOAT', 'DOUBLE', 'DECIMAL',
    'DATETIME', 'TIMESTAMP', 'TIME', 'YEAR',
    'CHAR', 'TINYBLOB', 'TINYTEXT', 'BLOB', 'MEDIUMBLOB', 'MEDIUMTEXT', 'LONGBLOB', 'LONGTEXT',
    'ENUM', 'SET', 'BOOLEAN', 'SERIAL'
  ];

  return <select name="ftype[]" tabIndex="2" id={id} defaultValue={selected} onChange={typeChange}>
          {columnTypes.map((v) =>
            <option key={v}>{v}</option>
          )}
        </select>
}

function getArrayFromPost() {
  alert("TODO")
  Object.keys(POST.name).forEach(function(key) {
    //let name = POST.name[key]
  })
  /*
          $array = array();
          foreach ($_POST['name'] as $key => $name) {
              if (empty($name)) {
                  continue;
              }
              $object = new A;
              $object->Field   = $name;
              $object->Type    = strtolower($_POST['ftype'][$key]);
              if ($_POST['length'][$key] > 0) {
                  $object->Type .= '('. $_POST['length'][$key].')';
              }
              if ($_POST['attr'][$key] == 'UNSIGNED ZEROFILL') {
                  $object->Type .= ' UNSIGNED ZEROFILL';
              } else if ($_POST['attr'][$key] == 'UNSIGNED') {
                  $object->Type .= ' UNSIGNED';
              }
              $object->Null    = isset($_POST['isNull'][$key]) ? 'YES' : '';
              if (isset($_POST['uni'][$key])) {
                  $object->Key = 'UNI';
              }
              if (isset($_POST['mul'][$key])) {
                  $object->Key = 'MUL';
              }
              $object->Key = $_POST['primaryKey'] == $name ? 'PRI' : '';
              $object->Default = $_POST['default'][$key];
              $object->Extra = '';
              if (isset($_POST['auto'][$key])) {
                  $object->Extra   = 'AUTO_INCREMENT';
              }
              $array []= $object;
          }
  * */
}

function TableHead(props) {
  return (
    <table cellPadding="4" id="tableFormEdit">
      <thead>
      <tr>
        <th>Поле</th>
        <th>Тип</th>
        <th>Длина/значения</th>
        <th>Ноль</th>
        <th>По умолчанию</th>
        <th><span title="Автоинкремент">Au</span></th>
        <th><span title="Primary key">PR</span></th>
        <th><span title="Unique">UN</span></th>
        <th><span title="Index">IND</span></th>
        <th>-</th>
        <th><span title="Fulltext">FU</span></th>
        <th>Атрибуты</th>
        <th>После...</th>
      </tr></thead>
      <tbody>
      {props.children}
      </tbody>
    </table>
  );
}