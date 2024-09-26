'use client'

import Selector from "./Selector";

export default function DateSelector() {

  Date.prototype.daysInMonth = function() {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
  };

  let date = new Date()

  let months = ['января', 'февраля', 'марта', 'апреля', 'май', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

  return (
    <span className="dateSelector">
        <Selector name="ds_day" from="1" to={date.daysInMonth()} value={date.getDate()} />
        <Selector name="ds_month" data={months} value={date.getMonth()} />
        <Selector name="ds_year" from="2000" to={date.getFullYear()} value={date.getFullYear()} />
        <Selector name="ds_hour" from="0" to="23" />
        <span>:</span>
        <Selector name="ds_minut" from="0" to="59" />
        <span>:</span>
        <Selector name="ds_second" from="0" to="59" />
      </span>
  );
}
