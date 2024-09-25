'use server'

// Запросы на страницы
import {Exception} from "sass";

export async function tblList(db, mode) {
  return await query({s: 'tbl_list', db, mode});
}
export async function serverStatus() {
  return await query({s: 'server_status'});
}
export async function serverVariables() {
  return await query({s: 'server_variables'});
}
export async function serverInfo() {
  return await query({s: 'server_users'});
}
export async function tblDataPage(get, post = false) {
  get.s = 'tbl_data'
  return await query(get, post, { cache: 'no-store' });
}
export async function searchPage(get, post = false) {
  get.s = 'search'
  return await query(get, post);
}
export async function actionPage(get, post = false) {
  get.s = 'actions'
  return await query(get, post, { cache: 'no-store' });
}
export async function configPage(mode, post = false) {
  return await query({s: 'msc_configuration', mode}, post, { cache: 'no-store' });
}
export async function sqlPage(post = false) {
  return await query({s: 'sql'}, post, { cache: 'no-store' });
}
export async function exportPage(db, table, post = false) {
  return await query({s: 'export', db, table}, post, { cache: 'no-store' });
}
export async function exportSpPage(db, post = false) {
  return await query({s: 'exportSp', db}, post, { cache: 'no-store' });
}
export async function dbList(mode = '') {
  return await query({s: 'db_list', mode}, false, { cache: 'no-store' });
}
export async function dbComparePage(dbs) {
  return await query({s: 'db_compare'}, {dbs}, { cache: 'no-store' });
}
export async function getInit() {
  return await query({init: 1});
}

// Действия в ActionProcessor
// чтобы попало в ActionProcessor, нужен $queryMode (GET['action'] или POST['action'])
export async function customAction(action, formData){
  return await query({action}, formData);
}

async function query(query, post=false, opts = {}) {
  let data = await fetch(buildUrl(query), buildOptions(post, opts))
  console.log('fetch', buildUrl(query), post || '')
  let json = {};
  try {
    json = await data.json()
    //console.log('fetch return:', json)
  } catch (e) {
    console.error('fetch error: ' + e.name + ":" + e.message);
    //console.error('fetch error: ' + e.name + ":" + e.message + "\n" + e.stack);
    let data = await fetch(buildUrl(query), buildOptions(post, opts))
    let text = await data.text();
    console.log('fetch return text:', text)
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
  return `http://msc/?ajax=1&${buildQueryString(query)}`;
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

function buildQueryString(params = {}) {
  let url = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value !== 'undefined' && value !== '') {
      url.set(key, value)
    }
  }
  return url.toString();
}