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
        let boredTime = <BoredTime time={this.state.data.time} updateForm={this.changeTime} />;
        let mood = <Mood mood={this.state.data.mood} updateForm={this.changeMood} />;
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
        let nextIndex = this.state.pageIndex;
        if (nextIndex < this.pages.length) {
            this.setState({pageIndex: nextIndex + 1});
        }
    }
    
    render() {
        return (
            <div className="form">
                <div className="page">
                    {this.pages[this.state.pageIndex]}
                </div>
                <button type="button" className="next-page" onClick={this.nextPage}>Next</button>
            </div>
        );
    }
}

ReactDOM.render(
    <BoredForm />,
    root
);