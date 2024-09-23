'use server'

// Запросы на страницы
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
export async function searchPage() {
  return await query('search');
}
export async function dbList() {
  return await query('db_list', false, { cache: 'no-store' });
}

// Действия в ActionProcessor
// чтобы попало в ActionProcessor, нужен $queryMode (GET['action'] или POST['action'])
export async function dbCreate(formData) {
  return await query('action=dbCreate', formData);
}
export async function dbDelete(db){
  return await query('action=dbDelete', `db=${db}&id=db${db}`);
}
export async function dbAllAction(db, action){
  return await query('action=dbAllAction', `db=${db}&act=${action}`);
}
export async function dbHide (db, action) {
  alert('hide')
  //msQuery('dbHide', `db=${db}&id=db${db}&action=${action}`)
}

export async function tblTruncate(db, table){
  return await query('action=tableTruncate', `db=${db}&table=${table}`);
}
export async function tblDelete(db, table){
  return await query('action=tableDelete', `db=${db}&table=${table}`);
}
export async function tblRename(db, table, newName){
  return await query('action=tableRename', `db=${db}&table=${table}&newName=${newName}`);
}

export async function userAdd(formData){
  return await query('action=userAdd', formData);
}
export async function customAction(action, formData){
  return await query(`action=${action}`, formData);
}



async function msQuery(mode, query='') {
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
}

async function query(query, post, opts = {}) {
  let data = await fetch(url(query), options(post, opts))
  let json = await data.json()
  console.log('fetch', url(query), post)
  console.log('fetch return:', json)
  if (json.hasOwnProperty('page')) {
    return json.page;
  }
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
    if (!data instanceof FormData) {
      data = new URLSearchParams(data);
    }
  } else {
    data = new URLSearchParams(data);
  }
  return data;
}