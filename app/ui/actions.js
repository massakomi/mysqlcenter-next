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
export async function searchPage(db, table, post = false) {
  const queryString = buildQueryString('search', {db, table});
  return await query(queryString, post);
}
export async function actionPage(db, table, post = false) {
  const queryString = buildQueryString('actions', {db, table});
  return await query(queryString, post, { cache: 'no-store' });
}
export async function configPage(mode = '', post = false) {
  const queryString = buildQueryString('msc_configuration', {mode});
  return await query(queryString, post, { cache: 'no-store' });
}
export async function sqlPage(post = false) {
  return await query('sql', post, { cache: 'no-store' });
}
export async function exportPage(db, table, post = false) {
  const queryString = buildQueryString('export', {db, table});
  return await query(queryString, post, { cache: 'no-store' });
}
export async function exportSpPage(db, post = false) {
  const queryString = buildQueryString('exportSp', {db});
  return await query(queryString, post, { cache: 'no-store' });
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
  let data = await fetch(buildUrl(query), buildOptions(post, opts))
  //console.log('fetch', url(query), post)
  let json = {};
  try {
    json = await data.json()
    //console.log('fetch return:', json)
  } catch (e) {
    //console.error('fetch error: ' + e.name + ":" + e.message);
    //console.error('fetch error: ' + e.name + ":" + e.message + "\n" + e.stack);
    let data = await fetch(buildUrl(query), buildOptions(post, opts))
    let text = await data.text();
    //console.log('fetch return text:', text)
  }
  if (json.hasOwnProperty('page')) {
    return onlyPage(json);
  }
  //console.error('RETURN ALL')
  return json;
}

function onlyPage(json) {
  if (json.page instanceof Array) {
    if (json.page.length > 0) {
      throw new Exception('В json.page вернулся массив, а не объект!');
    } else {
      json.page = {}
    }
  }
  //console.error('RETURN ONLY PAGE')
  if (json.messages) {
    //console.error(' + MESSAGES')
    json.page.messages = json.messages;
  }
  return json.page;
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

function buildUrl(query) {
  if (query.indexOf('=') < 0) {
    query = `s=${query}`
  }
  return `http://msc/?ajax=1&${query}`;
}

function buildOptions(post, opts = {}) {
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