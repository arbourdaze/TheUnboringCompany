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
                movies: {
                    like: "No",
                    types: new Set()
                },
                cooking: {
                    like: "No",
                    types: new Set()
                }
            },
            pageIndex: 0
        };
        
        this.reassignData = this.reassignData.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.changeMovies = this.changeMovies.bind(this);
        this.changeCooking = this.changeCooking.bind(this);
        
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.canGoNext = this.canGoNext.bind(this);
        this.canGoPrevious = this.canGoPrevious.bind(this);
        
        this.timeIsValid = this.timeIsValid.bind(this);
        this.isValid = this.isValid.bind(this);
        
        this.ternaryChoiceValues = ["Yes", "Maybe", "No"];
        this.genres = ["Action", "Crime", "Fantasy", "Western", "Historical", "Romance", "Animation", "Horror", "Sci-Fi", "Documentary"];
        this.foods = ["American", "Barbecue", "Deli", "Mexican", "Chinese", "Pizza", "Italian", "Breakfast", "Sushi", "Seafood", "Indian", "Korean", "Japanese", "Dessert", "Vietnamese", "Thai", "Vegan", "Vegetarian", "Gluten-Free", "Cocktail"];
        
        this.getBoredTime = this.getBoredTime.bind(this);
        this.getMovies = this.getMovies.bind(this);
        this.getCooking = this.getCooking.bind(this);
        
        this.pages = [this.getBoredTime, this.getMovies, this.getCooking];
    }
    
    getBoredTime() {
        return <BoredTime time={this.state.data.time} updateForm={this.changeTime} />;
    }
    
    getMovies() {
        let movies = this.state.data.movies;
        return <Activity key='movies-activity' category='movies' like={movies.like} types={movies.types} options={this.genres} updateForm={this.changeMovies} />;
    }
    
    getCooking() {
        let cooking = this.state.data.cooking;
        return <Activity key='cooking-activity' category='cooking' like={cooking.like} types={cooking.types} options={this.foods} updateForm={this.changeCooking} />;
    }
    
    changeTime(value) {
      let newData = Object.assign({}, this.state.data, {time: value});
      this.setState({data: newData}, function () {
          if (debug) {
            console.log(this.state);
          }
      });
    }

    changeMovies(value) {
        let newData = Object.assign({}, this.state.data, {movies: value});
        this.reassignData(newData);
    }
    
    changeCooking(value) {
        let newData = Object.assign({}, this.state.data, {cooking: value});
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
    
    isValid() {
        return this.timeIsValid();
    }
    
    send() {
        if (isValid()) {
            $.ajax({
                type: 'Post',
                url: '/code.py',
                data: this.state.data
            }).success(function () {
                console.log('success');
            });
        }
    }
    
    render() {
        return (
            <div className="form">
                <div className="page">
                    {this.pages[this.state.pageIndex]()}
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