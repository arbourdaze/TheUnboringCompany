'use strict';

class Activity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        like: this.props.like,
        types: this.props.types
    };
    this.addType = this.addType.bind(this);
    this.removeType = this.removeType.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createChecklist = this.createChecklist.bind(this);
    this.changeLike = this.changeLike.bind(this);
  }

  addType(type) {
      let newTypes = this.state.types;
      newTypes.add(type);
      this.setState({ types: newTypes }, function () {
          this.props.updateForm(this.state);
      });
  }
  
  removeType(type) {
      let newTypes = this.state.types;
      newTypes.remove(type);
      this.setState({ types: newTypes }, function() {
          this.props.updateForm(this.state);
      });
  }
  
  handleChange(event) {
      if (event.target.checked) {
          this.addType(event.target.value);
      } else {
          this.removeType(event.target.value);
      }
  }
  
  createChecklist() {
      let checklist = [];
      let that = this;
      let i = 0;
      this.props.options.forEach(function(opt) {
        let line = <input key={that.props.category + "-checkbox" + i} type="checkbox" name={that.props.category} value={opt} checked={that.state.types.has(opt)} onChange={that.handleChange} />;
        checklist.push(line);
        i++;
        checklist.push(<label key={that.props.category + "-label" + i}>{opt}</label>)
        checklist.push(<br key={that.props.category + "-newline" + i}/>);
        i++;
      });
      return checklist;
  }
  
  changeLike(value) {
      this.setState({ like: value }, function () {
          if (this.state.like == "No") {
            this.setState({ types: new Set() });
          }
          this.props.updateForm(this.state);
      });
  }

  render() {
    return (
        <div>
            <h1>Do you like {this.props.category}?</h1>
            <Likert score={this.state.like} updateForm={this.changeLike} options={["Yes","Maybe","No"]} category={this.props.category} />
            <br/>
            {(this.state.like == "Yes" || this.state.like == "Maybe") && 
                <div>
                    <h1>What kind of {this.props.category} do you like?</h1>
                    {this.createChecklist()}
                </div>
            }
        </div>
    );
  }
}