import Image from 'next/image'
export function MenuFooter() {
  return (
    <span className="globalMenu">
      <a href="/msc_help"> <Image src="/images/help.gif" title="MySQL справка" width={20} height={20}  alt="=" style={{verticalAlign: 'middle'}} /></a>
      <a href="/msc_configuration">Настройки</a>
    </span>
  )
}