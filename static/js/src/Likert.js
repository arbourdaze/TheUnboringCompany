'use strict';

class Likert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        val: this.props.val
    };
    this.options = this.props.options;
    this.labels = this.props.labels;
    this.handleChange = this.handleChange.bind(this);
    this.createRow = this.createRow.bind(this);
  }
  
  handleChange(value, checked) {
      if (checked) {
          this.state.val = value;
      }
      this.props.updateForm(this.props.name, this.state.val);
  }

  createRow() {
      let row = [];
      for (let i = 0; i < this.options.length; i++) {
        row.push(
            <Radio
                key={"like-" + this.props.name + i}
                name={"like-" + this.props.name}
                label={this.labels[i]}
                val={this.options[i]}
                checked={this.state.val === this.options[i]}
                updateForm={this.handleChange}
            />
        );
      }
      return row;
  }
  
  render() {
    return (
        <div className="likert">
            <div className="row">
                {this.createRow()}
            </div>
        </div>
    );
  }
}