import Image from 'next/image'
export function FooterMenu() {
  return (
    <div className="globalMenu">
      <a href="/msc_help"> <Image src="/images/help.gif" title="MySQL справка" width={20} height={20}  alt="=" /></a>
      <a href="/msc_configuration">Настройки</a>
    </div>
  )
}