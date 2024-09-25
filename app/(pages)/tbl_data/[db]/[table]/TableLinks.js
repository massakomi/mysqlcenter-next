'use client'

import HtmlSelector from "@/app/(pages)/search/[db]/HtmlSelector";
import { usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";


export default function TableLinks(props) {

  let searchParams = useSearchParams()
  let pathname = usePathname()

  const changeUrl = (params) => {
    let queryString = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(params)) {
      if (typeof value !== 'undefined' && value !== '') {
        queryString.set(key, value)
      }
    }
    return pathname + '?' + queryString.toString()
  }

  const getOnPageOptions = () => {
    let pagesNums = [30, 50, 100, 200, 300, 500, 1000, 'all']
    let pages = {}
    for (let num of pagesNums) {
      pages[changeUrl({part: num})] = num
    }
    return pages;
  }

  const selectedKey = () => {
    let selected = false;
    if (getPart) {
      for (let key in onPageOptions) {
        if (onPageOptions[key] === getPart) {
          selected = key
        }
      }
    }
    return selected;
  }

  const getPagesLinks = () => {
    let links = []
    let countPages = Math.ceil(count / part)
    let currentPage = Math.ceil(getGo / part)
    console.log(countPages, currentPage)
    let beginPage = Math.max(0, currentPage - linksRange)
    let endPage = Math.min(countPages, currentPage + linksRange)
    for (let i = beginPage; i < endPage; i ++) {
      let url = changeUrl({go: i * part})
      if (getGo === i * part) {
        links.push(<Link key={i} href={url} className="cur">{i + 1}</Link>)
      } else {
        links.push(<Link key={i} href={url}>{i + 1}</Link>)
      }
    }
    if (links.length === 1) {
      return [];
    }
    return links;
  }

  let getPart = parseInt(searchParams.get('part') || 100);
  let getGo = parseInt(searchParams.get('go') || 0);
  //let getSql = new URL(location.href).searchParams.get('sql');
  //let getOrder = new URL(location.href).searchParams.get('order');
  let linksRange = props.linksRange;

  let count = props.count
  let part = props.part
  if (count <= part && !getPart) {
    return false;
  }

  let onPageOptions = getOnPageOptions();
  let pagesLinks = getPagesLinks()

  return (
    <div className="contentPageLinks">
      {pagesLinks}
      {pagesLinks.length ? <HtmlSelector data={onPageOptions} auto="true" className="miniSelector" value={selectedKey()} keyValues="true"/> : null}
    </div>
  );
}


