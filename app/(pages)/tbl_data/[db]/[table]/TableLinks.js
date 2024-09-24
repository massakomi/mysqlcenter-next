'use client'
import {Component} from "react";
import HtmlSelector from "@/app/(pages)/search/[db]/HtmlSelector";
import {useParams, useSearchParams} from "next/navigation";


export default function TableLinks(props) {

  const params = useParams();
  let searchParams = useSearchParams()

  const pagesObj = () => {
    let pagesNums = [30, 50, 100, 200, 300, 500, 1000, 'all']
    let pages = {}
    let u = new URL(location.href)
    for (let num of pagesNums) {
      u.searchParams.set('part', num)
      pages[u.href] = num
    }
    return pages;
  }

  let getPart = searchParams.get('part');
  let getGo = searchParams.get('go');
  //let getSql = new URL(location.href).searchParams.get('sql');
  //let getOrder = new URL(location.href).searchParams.get('order');
  let linksRange = props.linksRange;

  let count = props.count
  let part = props.part
  if (count <= part && !getPart) {
    return false;
  }

  let links = []
  let countPages = Math.ceil(count / part)
  let currentPage = Math.ceil(getGo / part)
  let beginPage = Math.max(0, currentPage - linksRange)
  let endPage = Math.min(countPages, currentPage + linksRange)

  for (let i = beginPage; i < endPage; i ++) {
    let url = new URL(location.href)
    url.searchParams.set('go', i * part)
    if (getGo == i * part) {
      links.push(<a key={i} href={url} className="cur">{i + 1}</a>)
    } else {
      links.push(<a key={i} href={url}>{i + 1}</a>)
    }
  }

  let data = pagesObj();

  let selected = false;
  if (getPart) {
    for (let key in data) {
      if (data[key] == getPart) {
        selected = key
      }
    }
  }

  return (
    <div className="contentPageLinks">
      {links}
      <HtmlSelector data={data} auto="true" className="miniSelector" value={selected} keyValues="true" />
    </div>
  );
}


