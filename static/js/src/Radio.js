'use strict';

class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.randomColor = new RandomColor();
  }

  render() {
    return (
        <div className="col col-likert-radio">
            <label className="radio-container">{this.props.label}
                <input type="checkbox" name={this.props.name} value={this.props.val} checked={this.props.ticked} />
                <span className={"radio-indicator " + this.randomColor.getColor()}></span>
            </label>
        </div>
    );
  }
}