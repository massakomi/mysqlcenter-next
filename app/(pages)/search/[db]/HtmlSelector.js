'use client'
import {Component} from "react";

export default class HtmlSelector extends Component {

  constructor(props) {
    super(props);
  }

  onChange = (e) => {
    if (this.props.auto) {
      let value = e.target.options[e.target.selectedIndex].value
      if (value) {
        window.location = value
      }
    }
  }

  render() {

    let opts = [], i = 0
    for (let key in this.props.data) {
      let title = this.props.data[key]
      let value = title
      if (this.props.keyValues) {
        value = key;
      }
      opts.push(<option value={value} key={i++}>{title}</option>)
    }

    return (
      <select onChange={this.props.onChange ? this.props.onChange : this.onChange.bind(this)}
        name={this.props.name}
        multiple={this.props.multiple}
        defaultValue={this.props.value}
        className={this.props.className}>{opts}
      </select>
    );
  }
}


