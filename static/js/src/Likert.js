'use strict';

class Likert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        choice: null
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
      this.setState({ choice: event.target.value }, function () {
          this.props.updateForm(this.state.choice);
      });
  }

  createRow() {
      let row = [];
      for (let i = 0; i < this.props.options.length; i++) {
        row.push(
            <Radio
                key={this.props.category + "-likert-radio" + i}
                name={"like-" + this.props.category}
                val={this.props.options[i]}
                ticked={this.props.score == this.props.options[i]}
            />
        );  
      }
      return row;
  }
  
  render() {
    return (
        <div class="page-content-box likert" onChange={this.handleChange}>
            <div className="row">
                {this.createRow()}
            </div>
        </div>
    );
  }
}