'use strict';

//npx babel --watch src --out-dir . --presets react-app/prod 

let debug = true;

let root = document.querySelector('#root');


class BoredForm extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = { time: null, mood: {
            openness: null,
            conscientiousness: null,
            extroversion: null,
            agreeableness: null,
            neuroticism: null
            }
        };
        let boredTime = <BoredTime time={this.state.time} updateForm={this.changeTime} />;
        let mood = <Mood mood={this.state.mood} updateForm={this.changeMood} />;
        this.pages = [boredTime, mood];
        this.page = this.pages[0];
    }
    
    changeTime(value) {
      this.setState({time: value}, function () {
          if (debug) {
            console.log(this.state.time);
          }
      });
    }
    
    changeMood(value) {
        this.setState({mood: value}, function() {
            if (debug) {
                console.log(this.state.mood);
            }
        });
    }
    
    render() {
        return (
            <div className="form">
                <div className="page">
                    {this.page}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <BoredForm />,
    root
);