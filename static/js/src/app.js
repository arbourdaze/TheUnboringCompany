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
                        like: null,
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
                        like: null,
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
                    },
                    jokes: {
                        name: "Jokes",
                        like: null,
                        options: [],
                        choices: new Set()
                    },
                    videos: {
                        name: "Videos",
                        like: null,
                        options: [],
                        choices: new Set()
                    },
                    riddles: {
                        name: "Riddles",
                        like: null,
                        options: [],
                        choices: new Set()
                    },
                    games: {
                        name: "Games",
                        like: null,
                        options: [],
                        choices: new Set()
                    }
                }
            },
            pageIndex: 0,
            submitted: false,
            results: []
        };

        this.reassignData = this.reassignData.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.changePersonality = this.changePersonality.bind(this);
        this.changeActivity = this.changeActivity.bind(this);
        this.changeFeedback = this.changeFeedback.bind(this);
        
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.canGoNext = this.canGoNext.bind(this);
        this.canGoPrevious = this.canGoPrevious.bind(this);
        this.canSurpriseMe = this.canSurpriseMe.bind(this);
        
        this.timeIsValid = this.timeIsValid.bind(this);
        this.validateFeedback = this.validateFeedback.bind(this);

        this.getTimeDOM = this.getTimeDOM.bind(this);
        this.getPersonalityDOM = this.getPersonalityDOM.bind(this);
        this.getActivityDOM = this.getActivityDOM.bind(this);
        this.getMovies = this.getMovies.bind(this);
        this.getCooking = this.getCooking.bind(this);
        this.getJokes = this.getJokes.bind(this);
        this.getVideos = this.getVideos.bind(this);
        this.getRiddles = this.getRiddles.bind(this);
        this.getGames = this.getGames.bind(this);
        this.setupPages = this.setupPages.bind(this);
        
        this.transformActivityData = this.transformActivityData.bind(this);
        
        this.goBack = this.goBack.bind(this);
        this.send = this.send.bind(this);       
        this.gatherData = this.gatherData.bind(this);
        this.sendAnswers = this.sendAnswers.bind(this);
        this.sendFeedback = this.sendFeedback.bind(this);
        this.surpriseMe = this.surpriseMe.bind(this);
        
        this.setupPages();
    }
    
    setupPages() {
        this.pages = [
            this.getTimeDOM,
            this.getPersonalityDOM,
            this.getMovies,
            this.getCooking,
            this.getJokes,
            this.getVideos,
            this.getRiddles,
            this.getGames
        ];
    }
    
    getMovies() {
        return this.getActivityDOM(this.state.data.activities.movies);
    }
    
    getCooking() {
        return this.getActivityDOM(this.state.data.activities.cooking);
    }
    
    getJokes() {
        return this.getActivityDOM(this.state.data.activities.jokes);
    }
    
    getVideos() {
        return this.getActivityDOM(this.state.data.activities.videos);
    }
    
    getRiddles() {
        return this.getActivityDOM(this.state.data.activities.riddles);
    }
    
    getGames() {
        return this.getActivityDOM(this.state.data.activities.games);
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
    
    changeFeedback(data) {
        let liked = data.liked;
        let disliked = data.disliked;
        let results = this.state.results;
        liked.forEach(function(id) {
            let result = results[id];
            result.Category = 2;
            results[id] = result;
        });
        disliked.forEach(function(id) {
            let result = results[id];
            result.Category = 1;
            results[id] = result;
        });
        this.setState({results: results}, function() {
            if (debug) {
                console.log(this.state.results);
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
            Topics: ["Movies", "Cooking", "Jokes", "Videos", "Riddles", "Games"],
        };
        for (let key in this.state.data.activities) {
            Object.assign(data, this.transformActivityData(this.state.data.activities[key]));
        }
        data.Personality = this.state.data.personality;
        return data;
    }
    
    sendFeedback() {
        let data = this.state.results;
        let json = JSON.stringify(data);
        let that = this;
        function successCallback(res) {
            that.sendAnswers();
        }
        
        if (debug) {
            console.log(json);
        }

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/get-feedback',
            data: json,
            dataType: 'json',
            success: function (res) {
                successCallback(res);
            },
            error: function () {
                if (debug) {
                    console.log('error');
                }
            }
        });
        
    }
    
    sendAnswers() {
        if (this.timeIsValid()) {
            let data = this.gatherData();
            this.send(data, 'search');
        }
    }
    
    send(data, route) {
        let json = JSON.stringify(data);
        let that = this;

        function successCallback(res, that) {
            window.scrollTo(0,0);
            that.setState({submitted: false});
            that.setState({results: res});
            that.setState({submitted: true});
            if (debug) {
                console.log('success');
            }
        }

        if (debug) {
            console.log(json);
        }

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/' + route,
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

    goBack() {
        this.setState({results: []});
        this.setState({submitted: false});
        this.setState({pageIndex: 0});
    }
    
    validateFeedback() {
        let results = this.state.results;
        let isValid = true;
        for (let i = 0; i < results.length; i++) {
            if (results[i].Category != 2 && results[i].Category != 1) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }
    
    surpriseMe() {
        let time = this.state.data.time;
        time.hours = Math.floor(Math.random() * 3) + 3;
        time.minutes = Math.floor(Math.random() * 59);
        this.changeTime(time);
        let activities = this.state.data.activities;
        let that = this;
        Object.keys(activities).forEach(function (key) {
            let activity = activities[key];
            activity.like = "Yes";
            if (activity.options.length > 0) {
                let count = Math.floor(Math.random() * activity.options.length);
                for (let i = 0; i < count; i++) {
                    activity.choices.add(activity.options[i]);
                }
            }
            that.changeActivity(activity);
        });
        this.sendAnswers();
    }
    
    canSurpriseMe() {
        return true;
    }
    
    render() {
        if (this.state.submitted) {
            return (
                <div>
                    <div className="page">
                        <Results goBack={this.goBack} results={this.state.results} updateForm={this.changeFeedback} />
                    </div>
                    <UnboringButton callback={this.sendFeedback} enabler={this.validateFeedback} classes="submit" buttonText="Submit" />
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
                        <UnboringButton callback={this.sendAnswers} enabler={this.timeIsValid} classes="submit" buttonText="Submit" />
                        <UnboringButton callback={this.surpriseMe} enabler={this.canSurpriseMe} classes="surprise" buttonText="Surprise Me!" />
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