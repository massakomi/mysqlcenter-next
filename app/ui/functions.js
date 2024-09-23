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


export function formatSize (bytes) {
  if (bytes < Math.pow(1024, 1)) {
    return bytes + " b";
  } else if (bytes < Math.pow(1024, 2)) {
    return (bytes / Math.pow(1024, 1)).toFixed(2) + ' Kb';
  } else if (bytes < Math.pow(1024, 3)) {
    return (bytes / Math.pow(1024, 2)).toFixed(2) + ' Mb';
  } else if (bytes < Math.pow(1024, 4)) {
    return (bytes / Math.pow(1024, 3)).toFixed(2) + ' Gb';
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
  let items = []
  document.querySelectorAll('.cb:checked').forEach(function(element) {
    items.push(element.value)
  });
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
