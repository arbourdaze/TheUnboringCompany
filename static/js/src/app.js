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
                personality: {
                    openness: null,
                    conscientiousness: null,
                    extroversion: null,
                    agreeableness: null,
                    neuroticism: null
                },
                activities: {
                    movies: {
                        name: "Movies",
                        like: "No",
                        options: [
                            "Action",
                            "Crime",
                            "Fantasy",
                            "Western",
                            "Historical",
                            "Romance",
                            "Animation",
                            "Horror",
                            "Sci-Fi",
                            "Documentary"
                            ],
                        choices: new Set()
                    },
                    cooking: {
                        name: "Cooking",
                        like: "No",
                        options: [
                            "American",
                            "Barbecue",
                            "Deli",
                            "Mexican",
                            "Chinese",
                            "Pizza",
                            "Italian",
                            "Breakfast",
                            "Sushi",
                            "Seafood",
                            "Indian",
                            "Korean",
                            "Japanese",
                            "Dessert",
                            "Vietnamese",
                            "Thai",
                            "Vegan",
                            "Vegetarian",
                            "Gluten-Free",
                            "Cocktail"
                            ],
                        choices: new Set()
                    }
                }
            },
            pageIndex: 0,
            submitted: false,
            fedback: false,
            results: [],
            feedback: {
                liked: new Set(),
                disliked: new Set()
            }
        };

        this.reassignData = this.reassignData.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.changePersonality = this.changePersonality.bind(this);
        this.changeActivity = this.changeActivity.bind(this);
        this.changeFeedback = this.changeFeedback.bind(this);
        this.submitFeedback = this.submitFeedback.bind(this);
        
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.canGoNext = this.canGoNext.bind(this);
        this.canGoPrevious = this.canGoPrevious.bind(this);
        
        this.timeIsValid = this.timeIsValid.bind(this);
        this.validateFeedback = this.validateFeedback.bind(this);

        this.getTimeDOM = this.getTimeDOM.bind(this);
        this.getPersonalityDOM = this.getPersonalityDOM.bind(this);
        this.getActivityDOM = this.getActivityDOM.bind(this);
        this.getMovies = this.getMovies.bind(this);
        this.getCooking = this.getCooking.bind(this);
        
        this.pages = [this.getTimeDOM, this.getPersonalityDOM, this.getMovies, this.getCooking];
        
        this.transformActivityData = this.transformActivityData.bind(this);
        this.transformFeedback = this.transformFeedback.bind(this);
        
        this.goBack = this.goBack.bind(this);
        this.send = this.send.bind(this);
        this.gatherData = this.gatherData.bind(this);
    }
    
    getTimeDOM() {
        return <BoredTime time={this.state.data.time} updateForm={this.changeTime} />;
    }
    
    getPersonalityDOM() {
        return <Personality data={this.state.data.personality} updateForm={this.changePersonality} />
    }
    
    getActivityDOM(activity) {
        return <Activity key={activity.name + '-activity'} data={activity} updateForm={this.changeActivity} />;
    }
    
    getMovies() {
        return this.getActivityDOM(this.state.data.activities.movies);
    }
    
    getCooking() {
        return this.getActivityDOM(this.state.data.activities.cooking);
    }
    
    changeTime(value) {
        let newData = Object.assign({}, this.state.data, {time: value});
        this.reassignData(newData);
    }
    
    changePersonality(value) {
        let newData = Object.assign({}, this.state.data, {personality: value});
        this.reassignData(newData);
    }

    changeActivity(activity) {
        let newActivities = this.state.data.activities;
        newActivities[activity.name.toLowerCase()] = activity;
        let newData = Object.assign({}, this.state.data, {activities: newActivities});
        this.reassignData(newData);
    }
    
    changeFeedback(value) {
        console.log(value);
        this.setState({feedback: value}, function() {
            if (debug) {
                console.log(this.state);
            }
        });
    }
    
    reassignData(newData) {
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
        if (this.canGoNext()) {
            $('unboring-button.next').removeClass('disabled');
        } else {
            $('unboring-button.next').addClass('disabled');
        }
    }

    previousPage() {
        if (this.canGoPrevious()) {
            this.setState({pageIndex: this.state.pageIndex - 1});
        }
        if (this.canGoPrevious()) {
            $('unboring-button.previous').removeClass('disabled');
        } else {
            $('unboring-button.previous').addClass('disabled');
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
    
    gatherData() {
        let data = {
            Time: {
                hours: this.state.data.time.hours,
                minutes: this.state.data.time.minutes
            },
            Topics: ["Movies", "Cooking"],
        };
        
        Object.assign(data, this.transformActivityData(this.state.data.activities.movies));
        Object.assign(data, this.transformActivityData(this.state.data.activities.cooking));
        data.Personality = this.state.data.personality;
        return data;
    }
    
    send() {
        if (this.timeIsValid()) {
            let data = this.gatherData();
            let json = JSON.stringify(data);
            let that = this;

            function successCallback(res, that) {
                that.setState({submitted: true});
                that.setState({results: res});
            }

            if (debug) {
                console.log(json);
            }

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/search',
                data: json,
                dataType: 'json',
                success: function (res) {
                    successCallback(res, that);
                },
                error: function () {
                    if (debug) {
                        console.log('error');
                    }
                }
            });
        }
    }
    
    transformActivityData(activity) {
        let data = {};
        let liked = [];
        let disliked = [];
        data[activity.name] = activity.like;
        let that = this;
        activity.options.forEach(function(opt) {
            if (activity.choices.has(opt)) {
                liked.push(opt);
            } else {
                disliked.push(opt);
            }
        });
        data['Liked' + activity.name] = liked;
        data['Disliked' + activity.name] = disliked;
        return data;
    }
    
    transformFeedback() {
        let data = {};
        let liked = [];
        let disliked = [];
        this.state.feedback.liked.forEach(function(opt) {
            liked.push(opt);
        }
        this.state.feedback.disliked.forEach(function(opt) {
            disliked.push(opt);
        }
        data.Liked = liked;
        data.Disliked = disliked;
        return data;
    }
    
    goBack() {
        this.setState({results: []});
        this.setState({submitted: false});
        this.setState({pageIndex: 0});
    }
    
    validateFeedback() {
        let total = this.state.feedback.liked.size + this.state.feedback.disliked.size;
        return total == this.state.results.length;
    }
    
    submitFeedback() {
        let data {}
        data.Feedback = this.transformFeedback();
        let json = JSON.stringify(data);
        
        function successCallback(res) {
            
        }
        
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/feedback',
            data: JSON.stringify(json),
            dataType: 'json',
            success: function (res) {
                successCallback(res, that);
            },
            error: function () {
                if (debug) {
                    console.log('error');
                }
            }
        });
    }
    
    render() {
        if (this.state.fedback) {
            return (
                <div className="page">
                    <Selections selections={this.state.feedback.liked} />
                </div>
            );
        } else if (this.state.submitted) {
            return (
                <div>
                    <div className="page">
                        <Results goBack={this.goBack} results={this.state.results} updateForm={this.changeFeedback} />
                    </div>
                    <UnboringButton callback={this.submitFeedback} enabler={this.validateFeedback} classes="submit" buttonText="Submit" />
                </div>
            );
        } else {
            return (
                <div className="form">
                    <div className="page">
                        {this.pages[this.state.pageIndex]()}
                    </div>
                    <div className="button-pad">
                        <UnboringButton callback={this.previousPage} enabler={this.canGoPrevious} classes="previous" buttonText="Previous" />
                        <UnboringButton callback={this.nextPage} enabler={this.canGoNext} classes="next" buttonText="Next" />
                        <UnboringButton callback={this.send} enabler={this.timeIsValid} classes="submit" buttonText="Submit" />
                    </div>
                </div>
            );
        }
    }
}

ReactDOM.render(
    <BoredForm />,
    root
);