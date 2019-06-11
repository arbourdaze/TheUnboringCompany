'use strict';

class BoredTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        hours: this.props.time.hours,
        minutes: this.props.time.minutes
    };
    this.changeHours = this.changeHours.bind(this);
    this.changeMinutes = this.changeMinutes.bind(this);
  }
  
  changeHours(e) {
      this.setState({ hours: e.target.value }, function () {
          this.props.updateForm(this.state);
      });
  }
  
  changeMinutes(e) {
      this.setState({ minutes: e.target.value }, function () {
          this.props.updateForm(this.state);
      });
  }

  render() {
    return (
        <div>
            <h3>How long will you be bored?</h3>
            <label htmlFor="bored-hours">Hours: </label><input type="number" name="bored-hours" value={this.state.hours} min="0" max="6" onChange={this.changeHours} />
            <label htmlFor="bored-minutes">Minutes: </label><input type="number" name="bored-minutes" value={this.state.minutes} min="0" max="59" onChange={this.changeMinutes} />
        </div>
    );
  }
}