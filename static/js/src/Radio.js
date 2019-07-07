'use strict';

class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        checked: this.props.checked
    };
    this.randomColor = new RandomColor();
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
      this.state.checked = event.target.checked;
      this.props.updateForm(this.props.val, this.state.checked);
  }

  render() {
    return (
        <div className="col col-likert-radio">
            <label className="radio-container">{this.props.label}
                <input type="radio" name={this.props.name} value={this.props.val} checked={this.state.checked} onChange={this.handleChange} />
                <span className={"radio-indicator " + this.randomColor.getColor()}></span>
            </label>
        </div>
    );
  }
}