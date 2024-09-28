'use server'

// Запросы на страницы
import {revalidatePath} from "next/cache";
import {buildOptions, buildUrl, onlyPageReturn} from '@/app/ui/utils';

export async function tblList(db, mode) {
  return await query({s: 'tbl_list', db, mode});
}
export async function tblStruct(get) {
  get.s = 'tbl_struct'
  return await query(get);
}
export async function tblAdd(get, post) {
  get.s = 'tbl_add'
  return await query(get, post);
}
export async function tblChange(get, post) {
  get.s = 'tbl_change'
  return await query(get, post);
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
  return await query(get, post);
}
export async function searchPage(get, post = false) {
  get.s = 'search'
  return await query(get, post);
}
export async function configPage(mode, post = false) {
  return await query({s: 'msc_configuration', mode}, post);
}
export async function sqlPage(post = false) {
  return await query({s: 'sql'}, post);
}
export async function exportPage(db, table, post = false) {
  return await query({s: 'export', db, table}, post);
}
export async function exportSpPage(db, post = false) {
  return await query({s: 'exportSp', db}, post, { cache: 'no-store' });
}
export async function dbList(mode = '') {
  return await query({s: 'db_list', mode}, false);
}
export async function tblCompare(get) {
  get.s = 'tbl_compare'
  return await query(get, false, { cache: 'no-store' });
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
export async function invalidatePath(path){
  revalidatePath(path)
}

async function query(query, post=false, opts = {}) {
  let data = await fetch(buildUrl(query), buildOptions(post, opts))
  console.log('fetch', buildUrl(query), post || '')
  let json = {}, text = '';
  if (data.headers.get('content-type') === 'application/json') {
    try {
      json = await data.json()
      //console.log('fetch return:', json)
    } catch (e) {
      let msg = 'fetch json error: ' + e.name + ":" + e.message; //  + "\n" + e.stack
      console.error(msg);
      throw Error(msg)
    }
  } else {
    text = await data.text();
    throw Error(text)
  }
  if (json.hasOwnProperty('page')) {
    return onlyPageReturn(json);
  }
  //console.error('RETURN ALL')
  return json;
}
