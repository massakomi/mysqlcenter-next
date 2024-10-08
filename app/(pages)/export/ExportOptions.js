'use client'
import HtmlSelector from '@/app/(pages)/search/[db]/HtmlSelector'
import Help from '@/app/(pages)/export/Help'

export default function ExportOptions(props) {
  return (
    <div>
      <div className="cols">
        <div>
          <label>
            <input type="checkbox" value="1" name="export_struct" defaultChecked={props.structChecked} /> Структура
          </label>

          <label className="ml-6 block" title="Укажите эту опцию, если вы хотите заменить таблицу (команда DROP TABLE)">
            <input type="checkbox" className="mr-1" value="1" name="addDrop" />
            Добавить удаление таблицы
          </label>

          <label className="ml-6 block" title="Будут преобразованы команды: CREATE TABLE IF NOT EXISTS... и при удалении таблиц DROP TABLE IF EXISTS ...">
            <input type="checkbox" className="mr-1" value="1" name="addIfNot" />
            Добавить IF NOT EXISTS
          </label>

          <label className="ml-6 block" title="К каждой таблице будет добавлено AUTO_INCREMENT=текущее значение">
            <input type="checkbox" className="mr-1" value="1" name="addAuto" />
            Добавить значение AUTO_INCREMENT
          </label>

          <label className="ml-6 block" title="Оставьте эту опцию, чтобы быть уверенным, что всё пройдет гладко">
            <input type="checkbox" className="mr-1" value="1" name="addKav" defaultChecked />
            Обратные `кавычки` в названиях таблиц и полей
          </label>

          <label className="ml-6 block" title="Шапка к дампу с информацией о версиях ПО, а также заголовки таблиц">
            <input type="checkbox" value="1" className="mr-1" name="addComment" defaultChecked />
            Добавлять комментарии
          </label>
        </div>
        <div>
          <label className="block">
            <input type="checkbox" value="1" name="export_data" defaultChecked /> Данные
          </label>
          <label className="ml-6 block">
            <input type="checkbox" value="1" name="insFull" defaultChecked /> Указать все поля{' '}
            <Help title="В запросе будут перечислены все поля INSERT INTO table (fields...) VALUES (...), иначе перечисление полей пропускается. Используейте эту опцию, если вы не уверены, что порядок полей сохранится." />
          </label>
          <label className="ml-6 block">
            <input type="checkbox" value="1" className="mr-1" name="insExpand" />
            Одним запросом <Help title="Все вставки будут осуществлены одним запросом вида INSERT INTO table VALUES (set1..), (set2...), (set3...) etc" />
          </label>
          <label className="ml-6 block">
            <input type="checkbox" value="1" className="mr-1" name="insZapazd" />
            DELAYED{' '}
            <Help
              title="DELAYED. Сервер сначала отправит запрос в буфер и если таблица используется, то вставку рядов приостановится. Когда таблица освободится, сервер начнёт выполнять запрос и вставлять строки, периодически проверяя, появились ли новые запросы к таблице. Если да, то вставка рядов будет снова приостановлена до того момента, как таблица снова освободится.
--- Эта опция полезна, когда немедленное обновление таблицы не требуется (например, при логах), а также если осуществляется множество запросов на вставку. Это даёт существенный прирост производительности при вставках и не задерживает обычную выборку. В то же время такие запросы медленнее обычных и вы должны быть уверенными, что они вам нужны."
            />
          </label>
          <label className="ml-6 block">
            <input type="checkbox" value="1" className="mr-1" name="insIgnor" />
            IGNORE{' '}
            <Help title="IGNORE. Ошибки, которые происходят при выполнении INSERT запроса игнорируются, то есть статус сообщения об ошибке меняется с ERROR на WARNING. С IGNORE, неправильные значения исправляются до ближайших валидных значений и вставляются, warning`и появляются, но выражение выполняется. Кроме этого в выражениях вида INSERT IGNORE INTO sdf (a,b) VALUES (6,6), (2,2), (7,7) будут вставлены все значения за исключением дублирующих. При отсутствии опции IGNORE будут вставлены все значения ДО дублирующих и выскочит ошибка." />
          </label>
          Тип экспорта
          <select name="export_option" className="ms-1">
            <option>INSERT</option>
            <option>UPDATE</option>
            <option title="REPLACE работает точно так же, как INSERT, за исключением тех случаев, когда старая строка в таблице имеет те же значения, что и новая строка для полей с индексами PRIMARY KEY или UNIQUE. В этом случае старый ряд будет удалён перед вставкой нового ряда. REPLACE это собственное расширение MySQL. Он либо вставляет, либо удаляет и вставляет. Заметьте, что если таблица не имеет ключей PRIMARY KEY либо UNIQUE, то использование REPLACE не даст ничего. В этом случае он становится аналогичным INSERT">
              REPLACE
            </option>
          </select>
          {props.fields && (
            <>
              <div> Выбрать поля для экспорта:</div>
              <HtmlSelector data={props.fields} name="fields[]" multiple value={props.fields} />
            </>
          )}
        </div>
      </div>

      <label className="mr-2">
        <input name="export_to" type="radio" value="1" /> в архив
      </label>
      <label>
        <input name="export_to" type="radio" value="2" defaultChecked /> в текст
      </label>
    </div>
  )
}
