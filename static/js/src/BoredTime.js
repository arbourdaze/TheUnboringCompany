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
    this.randomColor = new RandomColor();
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
            <h2 className="question">How long will you be bored?</h2>
            <div className="answer">
                <div className="row">
                    <div className="col col-label">
                        <label htmlFor="bored-hours">Hours: </label>
                    </div>
                    <div className="col col-input">
                        <input type="number" className={"form-control " + this.randomColor.getColor()} name="bored-hours" value={this.state.hours} min="0" max="6" onChange={this.changeHours} />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-label">
                        <label htmlFor="bored-minutes">Minutes: </label>
                    </div>
                    <div className="col col-input">
                        <input type="number" className={"form-control " + this.randomColor.getColor()} name="bored-minutes" value={this.state.minutes} min="0" max="59" onChange={this.changeMinutes} />
                    </div>
                </div>
            </div>
        </div>
    );
  }
}