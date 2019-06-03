'use strict';

class BoredTime extends Input {
  constructor(props) {
    super(props);
  }

  render() {
    let time = this.props.time;
    return (
        <div onChange={this.handleChange}>
            <h3>"How long will you be bored?"</h3>
            <input type="time" name="bored-time" value={time} />
        </div>
    );
  }
}