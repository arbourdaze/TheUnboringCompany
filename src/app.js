'use strict';

//npx babel --watch src --out-dir . --presets react-app/prod 

let debug = true;

let root = document.querySelector('#root');


class BoredForm extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            data: {
                time: {
                    hours: 0,
                    minutes: 0
                },
                mood: {
                    openness: null,
                    conscientiousness: null,
                    extroversion: null,
                    agreeableness: null,
                    neuroticism: null
                }
            },
            pageIndex: 0
        };
        this.changeTime = this.changeTime.bind(this);
        this.changeMood = this.changeMood.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.canGoNext = this.canGoNext.bind(this);
        this.canGoPrevious = this.canGoPrevious.bind(this);
        this.timeIsValid = this.timeIsValid.bind(this);
        this.moodIsValid = this.moodIsValid.bind(this);
        this.isValid = this.isValid.bind(this);
        let boredTime = <BoredTime time={this.state.data.time} updateForm={this.changeTime} />;
        this.moodValues = ["0", "0.25", "0.5", "0.75", "1"];
        let mood = <Mood mood={this.state.data.mood} updateForm={this.changeMood} moodValues={this.moodValues} />;
        this.pages = [boredTime, mood];
    }
    
    changeTime(value) {
      let newData = Object.assign({}, this.state.data, {time: value});
      this.setState({data: newData}, function () {
          if (debug) {
            console.log(this.state);
          }
      });
    }

    changeMood(value) {
        let newData = Object.assign({}, this.state.data, {mood: value});
        this.setState({data: newData}, function() {
            if (debug) {
                console.log(this.state);
            }
        });
    }
    
    nextPage() {
        if (this.canGoNext()) {
            this.setState({pageIndex: this.state.pageIndex + 1});
        }
    }

    previousPage() {
        if (this.canGoPrevious()) {
            this.setState({pageIndex: this.state.pageIndex - 1});
        }
    }
    
    canGoPrevious() {
        return this.state.pageIndex > 0;
    }
    
    canGoNext() {
        return this.state.pageIndex < this.pages.length - 1;
    }
    
    timeIsValid() {
        let time = this.state.data.time;
        return (time.hours > 0 || time.minutes > 0) &&
        (time.hours >= 0 && time.hours <= 12) &&
        (time.minutes >= 0 && time.minutes <= 59);
    }
    
    moodIsValid() {
        let mood = this.state.data.mood;
        return this.moodValues.includes(mood.openness) &&
        this.moodValues.includes(mood.conscientiousness) &&
        this.moodValues.includes(mood.extroversion) &&
        this.moodValues.includes(mood.agreeableness) &&
        this.moodValues.includes(mood.neuroticism);
    }
    
    isValid() {
        return this.timeIsValid() && this.moodIsValid();
    }
    
    render() {
        return (
            <div className="form">
                <div className="page">
                    {this.pages[this.state.pageIndex]}
                </div>
                <button type="button" onClick={this.previousPage} disabled={!this.canGoPrevious()}>Previous</button>
                <button type="button" onClick={this.nextPage} disabled={!this.canGoNext()}>Next</button>
                <button type="button" disabled={!this.isValid()}>Submit</button>
            </div>
        );
    }
}

ReactDOM.render(
    <BoredForm />,
    root
);