'use client'

import {Component} from "react";
import Selector from "./Selector";

export default class DateSelector extends Component {

  constructor(props) {
    super();
    let date = new Date()
    this.state = {day: date.getDate(), month: date.getMonth(), year: date.getFullYear()}
  }

  render() {

    Date.prototype.daysInMonth = function() {
      return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
    };

    let date = new Date(this.state.year, this.state.month, this.state.day)

    let months = ['января', 'февраля', 'марта', 'апреля', 'май', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

    return (
      <span className="dateSelector">
        <Selector name="ds_day" from="1" to={date.daysInMonth()} value={this.state.day} />
        <Selector name="ds_month" data={months} value={this.state.month} />
        <Selector name="ds_year" from="2000" to={date.getFullYear()} value={this.state.year} />
        <Selector name="ds_hour" from="0" to="23" />
        <span>:</span>
        <Selector name="ds_minut" from="0" to="59" />
        <span>:</span>
        <Selector name="ds_second" from="0" to="59" />
      </span>
    );
  }
}