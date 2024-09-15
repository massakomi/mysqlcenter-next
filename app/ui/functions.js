'use client'

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