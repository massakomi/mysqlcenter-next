'use client'
import {useParams, usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {customAction, invalidatePath} from "@/app/ui/actions";
import {setMessages} from "@/lib/features/messagesReducer";
import {useDispatch} from "react-redux";
import Help from '@/app/(pages)/export/Help';

export default function KeysInfo(props) {

  const pathname = usePathname();
  const params = useParams();
  const dispatch = useDispatch();
  const router = useRouter()

  const deleteKey = async (key, field, event) => {
    if (!confirm('Подтвердите...')) {
      return ;
    }
    let formData = new FormData()
    formData.set('db', params.db)
    formData.set('table', params.table)
    formData.set('key', key)
    formData.set('field', field)
    const json = await customAction('deleteKey', formData);
    dispatch(setMessages(json.messages))
    await invalidatePath(pathname)
    router.refresh()
  }

  return (
    <>

      <strong className='text-lg me-2'>Информация о ключах</strong>
      <Help title="Индексы - это сбалансированные деревья значений указанных в индексе полей и ссылки на физические записи в таблице. Индексы позволяют ускорить работу выполнения запросов в сотни раз и сразу находить нужные данные, вместо того, чтобы последовательно читать всю таблицу." /><br />

      <table className="contentTable">
        <thead>
        <tr>
          <th></th>
          <th><span title="Имя таблицы">Таблица</span></th>
          <th><span title="0 - уникальные значения, 1 - не уникальные">Не уникальное</span></th>
          <th><span title="Имя ключа">Ключ</span></th>
          <th><span title="Порядковый номер ключа, начиная с 1">Номер</span></th>
          <th><span title="Имя колонки (поля)">Колонка</span></th>
          <th><span title="Сортировка колонки в ключе. В MySQL, значение ‘A’ (по возрастанию) или NULL (без сортировки)">Сортировка</span></th>
          <th><span title="Приблизительное число уникальных значений в индексе. Это поле обновляется при запуске  ANALYZE TABLE или myisamchk -a. Cardinality расчитывается на основе цифровой статистики, поэтому его значение не обязательно будет точным даже для небольших таблиц. Чем выше cardinality, тем больше шансов, что MySQL будет применять индекс в операциях объединения (JOIN)">Cardinality</span></th>
          <th><span title="Количество индексированных символов, если колонка только частично индексирована, NULL если вся колонка индексирована">Sub_part</span></th>
          <th><span title="Как упакован ключ. NULL если не упакован. Хранение значений в сжатом (упакованном) виде используется, если в индексе присутствуют поля, у которых переменная длина">Packed</span></th>
          <th><span title="YES если колонка может содержать NULL. Если нет, то поле содержит NO после MySQL 5.0.3, и '' в предыдущих версиях">Null</span></th>
          <th><span title="Метод индексирования (BTREE - если длина полей индекса не превышает 10 байт, HASH - хранение значений как хэш кодов. Используется, если индекс составной, его длина больше одной восьмой от размера страницы БД или же больше, чем 256 байт, FULLTEXT, RTREE)">Тип индекса</span></th>
          <th><span title="">Комментарий</span></th>
          <th>Index_comment</th>
          <th>Visible</th>
          <th>Expression</th>
        </tr></thead>
        <tbody>
        {props.dataKeys.map((keyInfo) => {
          return (
            <tr key={keyInfo.Key_name + keyInfo.Seq_in_index}>
              <td><span onClick={deleteKey.bind(this, keyInfo.Key_name, keyInfo.Column_name)} role="button"><img src="/images/close.png" alt="" border="0" /></span></td>
              {Object.values(keyInfo).map((value, key) =>
                <td key={key + "index"}>{value}</td>
              )}
            </tr>
          )
        })}
        </tbody>
      </table>

      <Link href={`${pathname}/addkey`} className='block mt-2'>Добавить ключ</Link>
    </>
  )
}