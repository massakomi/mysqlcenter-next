'use client'

export const msDisplaySql = () => {
  console.log('showhide #sqlPopupQueryForm')
}

export const queryPopupBlock = () => {
  console.log('showhide #queryPopupBlock')
}


export function xajax(query)
{
  //let ajaxdebug = (typeof(debug) != 'undefined' && debug == '1');

  let options = {
    method: 'POST',
    body: new URLSearchParams('?'+query),
    headers: {'X-Requested-With': 'XMLHttpRequest'}
  }

  fetch('ajax.php', options)
    .then(response => {
      if (!response.ok) {
        console.error(response.status +' ' + response.statusText)
      } else {
        return response.text();
      }
    })
    .then(text => {
      if (text.indexOf('Parse error') !== -1) {
        console.error(text)
      } else {
        try {
          eval(text);
        } catch(e) {
          /*if (ajaxdebug) {
            console.error('JS код не выполнен: '+text);
          }*/
        }
      }
    })
    .catch((error) => {
      console.error(error)
    });
}

/**
 * Общий ajax запрос к серверу. Ответ помещается в "msAjaxQueryDiv".
 *
 * @param  mode string  Режим запроса
 * @param  query string  Строка запроса urldecoded
 * @return boolean false
 */
export function msQuery(mode, query='') {
  if (mode !== 'tableRename' && mode !== 'dbCreate'  && mode !== 'dbHide' && window.confirm('Подтвердите...') === false) {
    return false;
  }
  if (arguments.length === 0) {
    return false;
  }
  query = query.replace(/^\?/, '')

  // alert(query+'&'+'mode='+mode)
  xajax(query+'&'+'mode='+mode)

  return false;
}

/**
 * Групповые действия с чекбоксами
 */
export function chbx_action(form_name, action, mask=false) {

  var add = '';
  if (mask) {
    add = '[name="'+mask+'"]'
  }
  var chbxs = document.querySelectorAll('form[name="'+form_name+'"] input[type="checkbox"]'+add);
  for (var chx of chbxs) {
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

  let url = 'https://msc/?'+query+'&ajax=1'
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


export function showhide(id) {
  jQuery('#'+id).toggle()
}


/*
const login = (e) => {
  e.preventDefault();
  let form = e.target;

  const data = new URLSearchParams();
  for (const pair of new FormData(form)) {
    data.append(pair[0], pair[1]);
  }


  //setCookie('ppkcookie','testcookie',7);

  let url = 'http://msc/?ajax=1'
  let options = {}
  options.method = 'POST';
  options.body = data;
  options.credentials = 'include';
  fetch(url, options)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      if (json.cookies) {
        for (let name in json.cookies) {
          setCookie(name, json.cookies[name], 31)
        }
      }
    })

  // jQuery.post('http://msc/', jQuery(form).serialize(), function(data) {
  //   console.log(data)
  // });
}
*/