'use client'

import {customAction} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useParams} from "next/navigation";

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


export async function apiQuery (query, options={}, form='') {

  options.body = new URLSearchParams();
  if (form) {
    for (const pair of new FormData(form)) {
      options.body.append(pair[0], pair[1]);
    }
  }
  let cookies = getAllCookies();
  if (cookies) {
    for (let name in cookies) {
      options.body.append('cookies['+name+']', cookies[name])
    }
  }

  let url = 'http://msc/?'+query+'&ajax=1'
  options.method = 'POST'
  //options.credentials = 'include';
  //options.mode = 'no-cors'
  /*options.headers = {
    //'Content-Type': 'application/json',
    //'Set-Cookie': 'PHPSESSID=0899f9686jum1qut3vju6ps7r3n5agnj; path=/'
  }*/
  const response = await fetch(url, options)
  const json = await response.json();

  if (json.cookies) {
    for (let name in json.cookies) {
      setCookie(name, json.cookies[name], 31)
    }
  }
  return json;
}


export function setCookie(name,value,days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export function getAllCookies() {
  return document.cookie.split(';').reduce((cookies, cookie) => {
    const [ name, value ] = cookie.split('=').map(c => c.trim());
    cookies[name] = value;
    return cookies;
  }, {});
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
  let page = pathname.substring(1, separator > 0 ? separator : pathname.length)
  return page;
}



/**
 * Общий код для подготовки параметров множественных действий над таблицами и базами
 */
export function prepareAction (action, url, event, name) {
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