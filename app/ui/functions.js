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

  let { data, error, isLoading } = useSWR(url, fetcher)

  if (typeof data === 'undefined') {
    data = {}
  }
  if (data.hasOwnProperty('page')) {
    data = onlyPageReturn(data);
  }
  return {props: data, error, isLoading}
}




