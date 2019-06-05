'use strict';

class Radio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <td className="radio">
            <input name={this.props.name} type="radio" value={this.props.val} />
        </td>
    );
  }
}