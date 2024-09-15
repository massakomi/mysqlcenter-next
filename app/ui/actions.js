'use server'

export async function serverStatus() {
  let data = await fetch('http://msc/?s=server_status&ajax=1')
  data = await data.json()
  return data;
}

export async function dbList() {
  let data = await fetch('http://msc/?s=db_list&ajax=1')
  data = await data.json()
  return data;
}