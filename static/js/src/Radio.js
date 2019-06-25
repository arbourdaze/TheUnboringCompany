'use strict';

class Radio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="col col-likert-radio radio">
            <input name={this.props.name} type="radio" value={this.props.val} checked={this.props.ticked} />
        </div>
    );
  }
}