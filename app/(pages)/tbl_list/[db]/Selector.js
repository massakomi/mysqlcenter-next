import {Component} from "react";

export default class Selector extends Component {

  render() {
    let options = []

    if (this.props.data) {
      options = this.props.data.map((value, i) =>
        <option key={i} value={i}>{value}</option>
      );
    } else {
      for (let i = this.props.from; i <= this.props.to; i ++) {
        options.push(
          <option key={i}>{i}</option>
        )
      }
    }

    return (
      <select name={this.props.name} defaultValue={this.props.value}>
        {options}
      </select>
    );
  }
}