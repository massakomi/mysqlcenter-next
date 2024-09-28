'use client'

import useSWR from 'swr';
import {buildQueryString, buildUrl, onlyPageReturn} from '@/app/ui/utils';

/**
 * Групповые действия с чекбоксами
 */
export function chbx_action(action, mask=false) {
  let add = '';
  if (mask) {
    add = '[name="'+mask+'"]'
  }
  const chbxs = document.querySelectorAll('.contentTable input[type="checkbox"]'+add);
  for (const chx of chbxs) {
    if (action === 'invert') {
      chx.checked = !chx.checked;
    } else if (action === 'check') {
      chx.checked = true;
    } else if (action === 'uncheck') {
      chx.checked = false;
    }
  }
}

export function formatSize (bytes, digits = 2) {
  if (bytes < Math.pow(1024, 1)) {
    return bytes + " b";
  } else if (bytes < Math.pow(1024, 2)) {
    return (bytes / Math.pow(1024, 1)).toFixed(digits) + ' Kb';
  } else if (bytes < Math.pow(1024, 3)) {
    return (bytes / Math.pow(1024, 2)).toFixed(digits) + ' Mb';
  } else if (bytes < Math.pow(1024, 4)) {
    return (bytes / Math.pow(1024, 3)).toFixed(digits) + ' Gb';
  }
}

export function image(src) {
  return <img src={`/images/${src}`} alt="" />
}
export function getPageFromPathname(pathname) {
  let separator = pathname.indexOf('/', 1);
  return pathname.substring(1, separator > 0 ? separator : pathname.length);
}



/**
 * Общий код для подготовки параметров множественных действий над таблицами и базами
 */
export function prepareAction (action, event, name) {
  let items = checkedCheckboxes()
  if (!items.length) {
    return [];
  }
  if (action.match(/delete/i) || action.match(/truncate/i)) {
    if (!confirm('Подтвердите...')) {
      return [];
    }
  }
  if (action === 'auto') {
    action = event.target.options[e.target.selectedIndex].value
  }
  let formData = new FormData();
  for (let item of items) {
    formData.append(name, item)
  }
  return {action, formData};
}

export function checkedCheckboxes() {
  let items = []
  document.querySelectorAll('.cb:checked').forEach(function(element) {
    items.push(element.value)
  });
  return items;
}

export function clearChecked() {
  document.querySelectorAll(':checked').forEach(function(element) {
    element.setAttribute('checked', false)
  });
}

// 3 способа выделения options в мульти-селектах
export function msMultiSelect (name, event) {
  let action = 'invert'
  if (!event.target.classList.contains('invert')) {
    action = event.target.classList.contains('select') ? 'select' : 'unselect'
  }
  document.querySelectorAll(`[name="${name}"] option`).forEach(function(element) {
    if (action === 'invert') {
      element.selected = !element.selected
    } else {
      element.selected = (action === 'select');
    }
  });
}

export function htmlspecialchars(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

export function wordwrap (str, intWidth, strBreak, cut) {
  intWidth = arguments.length >= 2 ? +intWidth : 75
  strBreak = arguments.length >= 3 ? '' + strBreak : '\n'
  cut = arguments.length >= 4 ? !!cut : false
  let i, j, line
  str += ''
  if (intWidth < 1) {
    return str
  }
  const reLineBreaks = /\r\n|\n|\r/
  const reBeginningUntilFirstWhitespace = /^\S*/
  const reLastCharsWithOptionalTrailingWhitespace = /\S*(\s)?$/
  const lines = str.split(reLineBreaks)
  const l = lines.length
  let match
  for (i = 0; i < l; lines[i++] += line) {
    line = lines[i]
    lines[i] = ''
    while (line.length > intWidth) {
      const slice = line.slice(0, intWidth + 1)
      let ltrim = 0
      let rtrim = 0
      match = slice.match(reLastCharsWithOptionalTrailingWhitespace)
      if (match[1]) {
        j = intWidth
        ltrim = 1
      } else {
        j = slice.length - match[0].length
        if (j) {
          rtrim = 1
        }
        if (!j && cut && intWidth) {
          j = intWidth
        }
        if (!j) {
          const charsUntilNextWhitespace = (line.slice(intWidth).match(reBeginningUntilFirstWhitespace) || [''])[0]
          j = slice.length + charsUntilNextWhitespace.length
        }
      }
      lines[i] += line.slice(0, j - rtrim)
      line = line.slice(j + ltrim)
      lines[i] += line.length ? strBreak : ''
    }
  }
  return lines.join('\n')
}

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function querySwr(get = {}) {

  const url = buildUrl(get)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { data, error, isLoading } = useSWR(url, fetcher)

  if (typeof data === 'undefined') {
    data = {}
  }
  if (data.hasOwnProperty('page')) {
    data = onlyPageReturn(data);
  }
  return {props: data, error, isLoading}
}


/**
 * (для tbl_data и tbl_compare) Обрабатывает значения полей базы данных перед выводом их в виде таблицы.
 * Обработка заключается в: для текстовых - htmlspecialchars+обрезка, для даты - отображение в поле id=tblDataInfoId
 * для нулевых значений - значение возвращается оформленным курсивом.
 *
 * @package data view
 * @return string Обработанное значение
 * @param value
 * @param type
 * @param textCut
 * @param fullText
 */
export function processRowValue(value, type, textCut, fullText) {
  if (value === null) {
    value = <i>NULL</i>
  } else {
    // Тексты
    if (type.match(/(blob|text|char)/i)) {
      value = htmlspecialchars(value)
    }
    if (value.length > textCut) {
      if (!fullText) {
        value = value.substring(0, textCut)
      }
    }
    // дата
    if (type.match(/(int)/i) && value.length === 10 && $.isNumeric(value)) {
      //$e = ' onmouseover="get(\'tblDataInfoId\').innerHTML=\''.date(MS_DATE_FORMAT, $v).'\'" onmouseout="get(\'tblDataInfoId\').innerHTML=\'\'"';
      //$v = '<span className="dateString"'.$e.'>'.$v.'</span>';
    }
    if (value === '') {
      value = <i>empty</i>
    }
  }
  return value
}


/**
 * Специальная функция для изменения параметров скопированного ряда. Сначала копируется ряд.
 * Далее меняются индексы у аттрибутов name, если требуется. Ид и прочие аттрибуты не трогаются пока.
 */
export function addRowWithInputs(id) {
  let newTR = addRow(id);
  let inputs = newTR.getElementsByTagName('INPUT')
  for (let i = 0; i < inputs.length; i++) {
    let res = /([a-z]+)\[(\d+)\]/i.exec(inputs[i].name)
    if (res != null) {
      let nextName = res[1] + '['+ (Number(res[2]) + 1) +']';
      inputs[i].name = nextName;
    }
  }
}

/**
 * Копирует последний ряд таблицы вниз
 * @param  tableId string   id таблицы
 * @param from
 * @param after
 * @return object Вставленная строка
 */
export function addRow(tableId, from='last', after=true) {
  const table = document.getElementById(tableId);
  // сколько всего рядов
  const i = table.rows.length;
  // берём последний/первый ряд
  let tr    = table.rows[from == 'last' ? i - 1 : (from > i?i-1:from)];
  // назначаем ему ид
  tr.id = 'trAfterId' + i;
  // вставляем после/до него еще 1 строку
  if (!after) {
    insertBefore('trAfterId' + i, 'TR', 'trNewId' + i);
  } else {
    insertAfter('trAfterId' + i, 'TR', 'trNewId' + i);
  }
  // вот она!
  var tr2 = document.getElementById('trNewId' + i);
  // копируем ячейки из одной строки в другую
  for (var j = 0; j < tr.cells.length; j ++) {
    let td = document.createElement('TD')
    tr2.appendChild(td)
    td.innerHTML = tr.cells[j].innerHTML
  }
  return tr2;
}


/**
 * Вставляет элемент после другого элемента
 */
function insertAfter (sAfterId, sTag, sId){
  let objSibling = document.getElementById(sAfterId);
  let objElement = document.createElement(sTag);
  objElement.setAttribute('id',sId);
  objSibling.parentNode.insertBefore(objElement, objSibling.nextSibling);
}
function insertBefore (sAfterId, sTag, sId){
  let objSibling = document.getElementById(sAfterId);
  let objElement = document.createElement(sTag);
  objElement.setAttribute('id',sId);
  objSibling.parentNode.insertBefore(objElement, objSibling);
}

/**
 * Удаляет ряд таблицы с конца
 */
export function removeRow(tableId) {
  let r = document.getElementById(tableId).rows;
  if (r.length === 1) {
    return false;
  }
  remove(r[r.length - 1]);
}

/**
 * Удаляет элемент
 */
function remove(objElement)	{
  if (objElement && objElement.parentNode && objElement.parentNode.removeChild)	{
    objElement.parentNode.removeChild(objElement);
  }
}