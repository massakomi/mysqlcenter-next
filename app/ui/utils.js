import {Exception} from 'sass';

export function buildQueryString(params = {}) {
  let url = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value !== 'undefined' && value !== '') {
      url.set(key, value)
    }
  }
  return url.toString();
}

export function buildUrl(query) {
  return `http://msc/?ajax=1&${buildQueryString(query)}`;
}

export function buildOptions(post, opts = {}) {
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

export function onlyPageReturn(json) {
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