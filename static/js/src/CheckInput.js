'use strict';

class CheckInput extends React.Component {
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
      this.props.updateForm(this.props.opt, this.state.checked);
  }
  
  render() {
      return (
        <div key={this.props.name + "-check-input" + this.props.number} className="row">
            <label className="checkbox-container">{this.props.opt}
                <input type="checkbox" name={this.props.name} value={this.props.opt} checked={this.state.checked} onChange={this.handleChange} />
                <span className={'checkmark ' + this.randomColor.getColor()}></span>
            </label>
        </div>
      );
  }
}