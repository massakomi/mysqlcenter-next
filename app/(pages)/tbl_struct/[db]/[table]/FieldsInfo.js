'use client'
import Table from "@/app/ui/Table";

export default function FieldsInfo({info}) {

  const comments = {
    Engine: 'Тип хранилища',
    Version: 'Версия .frm файла таблицы',
    Row_format: 'Формат хранения строки (Fixed, Dynamic, Compressed, Redundant, Compact). Начиная с MySQL/InnoDB 5.0.3, InnoDB таблицы хранятся в форматах Redundant или Compact. До 5.0.3, InnoDB таблицы всегда были в формате Redundant',
    Rows: 'Количество рядов. Некоторые типы хранилищ, такие как MyISAM, отображают точное количество. Но в некоторых других, таких как InnoDB, это значение является приблизительным и может отличаться от действительного количество на 40-50%. В таких случаях лучше всего использовать запрос SELECT COUNT(*). Также это значение равно NULL для таблиц INFORMATION_SCHEMA базы данных',
    Avg_row_length: 'Средняя длина строки',
    Data_length: 'Размер файла данных таблицы',
    Max_data_length: 'Максимальный размер файла данных. Это общее количество байтов данных, которое может быть сохранено в таблице, given the data pointer size used.',
    Index_length: 'Размер индексного файла',
    Data_free: 'Размер занятого, но не использованного пространства',
    Auto_increment: 'Следующее значение поля Auto_increment',
    Update_time: 'Когда дата файл был обновлён. Для некоторых типов хранилищ, это значение NULL. Например, InnoDB хранит таблицы в собственном хранилище и время изменения файла данных не даст ничего',
    Check_time: 'Когда таблицы были проверены в последний раз. Не все типы хранилищ обновляют этот параметр, в этих случаях он всегда NULL',
    Collation: 'Кодировка и сравнение таблиц',
    Checksum: 'The live checksum value (if any).',
    Create_options: 'Дополнительные опции, заданные при создании таблицы через CREATE TABLE.',
    Comment: 'Комментарий, заданный при создании таблицы (либо информация о том, почему MySQL не может получить доступ к информации о таблице"'
  };

  let data = []
  for (let param of Object.keys(info)) {
    data.push({
      cells: {
        param: param,
        value: info[param]
      },
      title: comments[param]
    })
  }

  return (
    <>
      <Table data={data} />
    </>
  )
}