'use server'

// Запросы на страницы
import {Exception} from "sass";

export async function tblList(db, add='') {
  return await query(`s=tbl_list&db=${db}${add}`);
}
export async function serverStatus() {
  return await query('server_status');
}
export async function serverVariables() {
  return await query('server_variables');
}
export async function serverInfo() {
  return await query('server_users');
}
export async function searchPage(db, table, post = {}) {
  const queryString = buildQueryString('search', {db, table});
  return await query(queryString, post);
}
export async function actionPage(db, table, post = {}) {
  const queryString = buildQueryString('actions', {db, table});
  return await query(queryString, post, { cache: 'no-store' });
}
export async function configPage(mode = '', post = {}) {
  const queryString = buildQueryString('msc_configuration', {mode});
  return await query(queryString, post, { cache: 'no-store' });
}
export async function sqlPage(post = {}) {
  return await query('sql', post, { cache: 'no-store' });
}
export async function dbList(mode = '') {
  const queryString = buildQueryString('db_list', {mode});
  return await query(queryString, false, { cache: 'no-store' });
}

// Действия в ActionProcessor
// чтобы попало в ActionProcessor, нужен $queryMode (GET['action'] или POST['action'])
export async function customAction(action, formData){
  return await query(`action=${action}`, formData);
}



/*async function msQuery(mode, query='') {
  if (mode !== 'tableRename' && mode !== 'dbCreate'  && mode !== 'dbHide' && confirm('Подтвердите...') === false) {
    return false;
  }
  if (arguments.length === 0) {
    return false;
  }
  query = query.replace(/^\?/, '')
  query = query+'&'+'mode='+mode

  let options = {
    method: 'POST',
    body: new URLSearchParams('?'+query),
    headers: {'X-Requested-With': 'XMLHttpRequest'}
  }

  let data = await fetch('http://msc/ajax.php?ajax=1', options)
  return await data.json();
}*/

async function query(query, post, opts = {}) {

  let data = await fetch(url(query), options(post, opts))
  console.log('fetch', url(query), post)
  let json = {};
  try {
    json = await data.json()
    console.log('fetch return:', json)
  } catch (e) {
    console.error('fetch error: ' + e.name + ":" + e.message);
    //console.error('fetch error: ' + e.name + ":" + e.message + "\n" + e.stack);
    let data = await fetch(url(query), options(post, opts))
    let text = await data.text();
    console.log('fetch return text:', text)
  }
  if (json.hasOwnProperty('page')) {
    if (json.page instanceof Array) {
      throw new Exception('В json.page вернулся массив, а не объект!');
    }
    //console.error('RETURN ONLY PAGE')
    if (json.messages) {
      //console.error(' + MESSAGES')
      json.page.messages = json.messages;
    }
    return json.page;
  }
  //console.error('RETURN ALL')
  return json;
}

function url(query) {
  if (query.indexOf('=') < 0) {
    query = `s=${query}`
  }
  return `http://msc/?ajax=1&${query}`;
}

function options(post, opts = {}) {
  let options = opts
  if (post) {
    Object.assign(options, {
      method: 'POST',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      body: queryPostData(post)
    })
  }
  return options;
}

function queryPostData(data) {
  if (typeof data === 'object') {
    if (!(data instanceof FormData)) {
      data = new URLSearchParams(data);
    }
  } else {
    data = new URLSearchParams(data);
  }
  return data;
}

function buildQueryString(s, params = {}) {
  let url = new URLSearchParams();
  url.set('s', s)
  for (const [key, value] of Object.entries(params)) {
    if (typeof value !== 'undefined') {
      url.set(key, value)
    }
  }
  return url.toString();
}