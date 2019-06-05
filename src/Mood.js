'use strict';

class Mood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        openness: this.props.mood.openness,
        conscientiousness: this.props.mood.conscientiousness,
        extroversion: this.props.mood.extroversion,
        agreeableness: this.props.mood.agreeableness,
        neuroticism: this.props.mood.neuroticism
    };
    this.changeOpenness = this.changeOpenness.bind(this);
    this.changeConscientiousness = this.changeConscientiousness.bind(this);
    this.changeExtroversion = this.changeExtroversion.bind(this);
    this.changeAgreeableness = this.changeAgreeableness.bind(this);
    this.changeNeuroticism = this.changeNeuroticism.bind(this);
  }
  
  changeOpenness(value) {
      this.setState({ openness: value }, function () {
          this.props.updateForm(this.state);
      });
  }
  
  changeConscientiousness(value) {
      this.setState({ conscientiousness: value }, function () {
          this.props.updateForm(this.state);
      });
  }
  
  changeExtroversion(value) {
      this.setState({ extroversion: value }, function () {
          this.props.updateForm(this.state);
      });
  }
  
  changeAgreeableness(value) {
      this.setState({ agreeableness: value }, function () {
          this.props.updateForm(this.state);
      });
  }
  
  changeNeuroticism(value) {
      this.setState({ neuroticism: value }, function () {
          this.props.updateForm(this.state);
      });
  }

  render() {
    return (
        <div className="mood">
            <h1>How are you feeling right now?</h1>
            <Likert name="openness" low="Dumb" high="Smart" score={this.state.openness} updateForm={this.changeOpenness} moodValues={this.props.moodValues} />
            <Likert name="conscientiousness" low="Lazy" high="Overachieving" score={this.state.conscientiousness} updateForm={this.changeConscientiousness} moodValues={this.props.moodValues} />
            <Likert name="extroversion" low="Shy" high="Social" score={this.state.extroversion} updateForm={this.changeExtroversion} moodValues={this.props.moodValues} />
            <Likert name="agreeableness" low="Rude" high="Friendly" score={this.state.agreeableness} updateForm={this.changeAgreeableness} moodValues={this.props.moodValues} />
            <Likert name="neuroticism" low="Chill" high="Stressed" score={this.state.neuroticism} updateForm = {this.changeNeuroticism} moodValues={this.props.moodValues} />            
        </div>
    );
  }
}