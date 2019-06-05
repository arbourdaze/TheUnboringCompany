'use strict';

class Likert extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
      this.props.updateForm(event.target.value);
  }

  createRow() {
      let row = [];
      for (let i = 0; i < this.props.moodValues.length; i++) {
        row.push(<Radio key={i} name={this.props.name} val={this.props.moodValues[i]} />);  
      }
      return row;
  }
  
  createRowHeader() {
      let header = [];
      for (let i = 0; i < this.props.moodValues.length; i++) {
        header.push(<th key={i}>{this.createRowHeaderCell(i)}</th>);
      }
      return header;
  }
  
  createRowHeaderCell(i) {
    if (i == 0) {
        return this.props.low;
    }
    else if (i == Math.floor(this.props.moodValues.length / 2)) {
        return <span>Neutral</span>;
    }
    else if (i == this.props.moodValues.length - 1) {
        return this.props.high;
    }
  }

  render() {
    return (
        <div className="likert" name={this.props.name} onChange={this.handleChange}>
            <table>
                <tbody>
                    <tr>
                    {this.createRow()}
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                    {this.createRowHeader()}
                    </tr>
                </tbody>
            </table>
        </div>
    );
  }
}