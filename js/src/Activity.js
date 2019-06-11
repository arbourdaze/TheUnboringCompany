'use strict';

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
    this.addChoice = this.addChoice.bind(this);
    this.removeChoice = this.removeChoice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createChecklist = this.createChecklist.bind(this);
    this.changeLike = this.changeLike.bind(this);
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
  
  handleChange(event) {
      if (event.target.checked) {
          this.addChoice(event.target.value);
      } else {
          this.removeChoice(event.target.value);
      }
  }
  
  createChecklist() {
      let checklist = [];
      let that = this;
      let i = 0;
      this.state.options.forEach(function(opt) {
        let line = <input key={that.state.name + "-checkbox" + i} type="checkbox" name={that.state.name} value={opt} checked={that.state.choices.has(opt)} onChange={that.handleChange} />;
        checklist.push(line);
        i++;
        checklist.push(<label key={that.state.name + "-label" + i}>{opt}</label>)
        checklist.push(<br key={that.state.name + "-newline" + i}/>);
        i++;
      });
      return checklist;
  }
  
  changeLike(value) {
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
            <h1>Do you like {this.state.name.toLowerCase()}?</h1>
            <Likert score={this.state.like} updateForm={this.changeLike} options={["Yes","Maybe","No"]} category={this.state.name} />
            <br/>
            {(this.state.like == "Yes" || this.state.like == "Maybe") && 
                <div>
                    <h1>What kind of {this.state.name.toLowerCase()} do you like?</h1>
                    {this.createChecklist()}
                </div>
            }
        </div>
    );
  }
}