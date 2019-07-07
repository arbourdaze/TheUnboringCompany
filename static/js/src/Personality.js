'use strict';

class Personality extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.randomColor = new RandomColor();
    this.handleChange = this.handleChange.bind(this);
    this.labels = ["Very low", "Low", "Moderate", "High", "Very High"];
    this.options = [0, 0.25, 0.5, 0.75, 1];
  }
  
  createList() {
      let bigFive = [];
      let that = this;
      Object.keys(this.state).forEach(function(key) {
          bigFive.push(
            <div key={'personality-trait-' + key} className="page-content-box personality-trait">
                <h3>{key}:</h3>
                <Likert val={that.state[key]} updateForm={that.handleChange} labels={that.labels} options={that.options} name={key} />
            </div>
          );
          bigFive.push(<br key={'personality-trait-newline-' + key}/>);
      });
      return bigFive;
  }
  
  handleChange(key, value) {
      this.setState({ [key]: value }, function () {
          this.props.updateForm(this.state);
      });
  }

  render() {
    return (
        <div>
            <h2 className="question">How would you describe your personality?</h2>
            {this.createList()}
        </div>
    );
  }
}