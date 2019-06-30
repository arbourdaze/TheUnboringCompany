'use strict';

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.randomColor = new RandomColor();
    this.addChoice = this.addChoice.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createChecklist = this.createChecklist.bind(this);
    this.changeLike = this.changeLike.bind(this);
    this.labels = ["Yes", "Maybe", "No"];
  }

  addChoice(choice) {
      let newChoices = this.state.choices;
      newChoices.add(choice);
      this.setState({ choices: newChoices }, function () {
          this.props.updateForm(this.state);
      });
  }
  
  removeChoice(choice) {
      let newChoices = this.state.choices;
      newChoices.delete(choice);
      this.setState({ choices: newChoices }, function() {
          this.props.updateForm(this.state);
      });
  }
  
  handleChange(value, checked) {
      if (checked) {
          this.addChoice(value);
      } else {
          this.removeChoice(value);
      }
  }
  
  createChecklist() {
      let checklist = [];
      let that = this;
      let i = 0;
      this.state.options.forEach(function(opt) {
          checklist.push(
            <CheckInput
                name={that.state.name}
                number={i}
                opt={opt}
                checked={that.state.choices.has(opt)}
                updateForm={that.handleChange}
            />
          );
      });
      return checklist;
  }
  
  changeLike(key, value) {
      this.setState({ like: value }, function () {
          if (this.state.like == "No") {
            this.setState({ choices: new Set() });
          }
          this.props.updateForm(this.state);
      });
  }

  render() {
    return (
        <div>
            <h2 className="question">Do you like {this.state.name.toLowerCase()}?</h2>
            <Likert score={this.state.like} updateForm={this.changeLike} labels={this.labels} options={this.labels} category={this.state.name} />
            <br/>
            {(this.state.like == "Yes" || this.state.like == "Maybe") && 
                <div className="page-content-box">
                    <h2 className="question">What kind of {this.state.name.toLowerCase()} do you like?</h2>
                    {this.createChecklist()}
                </div>
            }
        </div>
    );
  }
}