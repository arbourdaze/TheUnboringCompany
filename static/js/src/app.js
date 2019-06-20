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
            results: []
        };
        
        this.reassignData = this.reassignData.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.changeActivity = this.changeActivity.bind(this);
        
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.canGoNext = this.canGoNext.bind(this);
        this.canGoPrevious = this.canGoPrevious.bind(this);
        
        this.timeIsValid = this.timeIsValid.bind(this);

        this.getTimeDOM = this.getTimeDOM.bind(this);
        this.getActivityDOM = this.getActivityDOM.bind(this);
        this.getMovies = this.getMovies.bind(this);
        this.getCooking = this.getCooking.bind(this);
        
        this.pages = [this.getTimeDOM, this.getMovies, this.getCooking];
        
        this.transformActivityData = this.transformActivityData.bind(this);
        
        this.goBack = this.goBack.bind(this);
        this.send = this.send.bind(this);
    }
    
    getTimeDOM() {
        //$('body').css('background-color','gray');
        return <BoredTime time={this.state.data.time} updateForm={this.changeTime} />;
    }
    
    getActivityDOM(activity) {
        //$('body').css('background-color','gray');
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

    changeActivity(activity) {
        let newActivities = this.state.data.activities;
        newActivities[activity.name.toLowerCase()] = activity;
        let newData = Object.assign({}, this.state.data, {activities: newActivities});
        this.reassignData(newData);
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
    
    send() {
        if (this.timeIsValid()) {
            let data = {
                Time: {
                    hours: this.state.data.time.hours,
                    minutes: this.state.data.time.minutes
                },
                Topics: ["Movies", "Cooking"],
            };
            
            function successCallback(res, that) {
                that.setState({submitted: true});
                that.setState({results: res});
            }
            
            Object.assign(data, this.transformActivityData(this.state.data.activities.movies));
            Object.assign(data, this.transformActivityData(this.state.data.activities.cooking));
            let json = JSON.stringify(data);
            console.log(json);
            let that = this;

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
    
    goBack() {
        this.setState({results: []});
        this.setState({submitted: false});
        this.setState({pageIndex: 0});
    }
    
    render() {
        if (this.state.submitted) {
            return (
                <Results goBack={this.goBack} results={this.state.results} />
            );
        }
        return (
            <div className="form">
                <div className="page">
                    {this.pages[this.state.pageIndex]()}
                </div>
                <UnboringButton callback={this.previousPage} enabler={this.canGoPrevious} classes="previous" buttonText="Previous" />
                <UnboringButton callback={this.nextPage} enabler={this.canGoNext} classes="next" buttonText="Next" />
                <UnboringButton callback={this.send} enabler={this.timeIsValid} classes="submit" buttonText="Submit" />
            </div>
        );
    }
}

ReactDOM.render(
    <BoredForm />,
    root
);