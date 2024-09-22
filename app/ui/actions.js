'use server'

export async function serverStatus() {
  return await query('server_status');
}

export async function serverVariables() {
  return await query('server_variables');
}

export async function serverInfo() {
  return await query('server_users');
}

export async function dbList() {
  return await query('db_list', false, { cache: 'no-store' });
}

export async function dbCreate(formData) {
  return await query('action=dbCreate', formData);
}

export async function dbDelete(db){
  return await query('action=dbDelete', `db=${db}&id=db${db}`);
}

export async function dbHide (db, action) {
  alert('hide')
  msQuery('dbHide', `db=${db}&id=db${db}&action=${action}`)
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