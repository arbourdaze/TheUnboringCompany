'use strict';

//npx babel --watch src --out-dir . --presets react-app/prod 

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = true;

var root = document.querySelector('#root');

var BoredForm = function (_React$Component) {
    _inherits(BoredForm, _React$Component);

    function BoredForm(props) {
        _classCallCheck(this, BoredForm);

        var _this = _possibleConstructorReturn(this, (BoredForm.__proto__ || Object.getPrototypeOf(BoredForm)).call(this, props));

        _this.state = {
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

        _this.reassignData = _this.reassignData.bind(_this);
        _this.changeTime = _this.changeTime.bind(_this);
        _this.changeMovies = _this.changeMovies.bind(_this);
        _this.changeCooking = _this.changeCooking.bind(_this);

        _this.nextPage = _this.nextPage.bind(_this);
        _this.previousPage = _this.previousPage.bind(_this);
        _this.canGoNext = _this.canGoNext.bind(_this);
        _this.canGoPrevious = _this.canGoPrevious.bind(_this);

        _this.timeIsValid = _this.timeIsValid.bind(_this);

        _this.ternaryChoiceValues = ["Yes", "Maybe", "No"];
        _this.genres = ["Action", "Crime", "Fantasy", "Western", "Historical", "Romance", "Animation", "Horror", "Sci-Fi", "Documentary"];
        _this.foods = ["American", "Barbecue", "Deli", "Mexican", "Chinese", "Pizza", "Italian", "Breakfast", "Sushi", "Seafood", "Indian", "Korean", "Japanese", "Dessert", "Vietnamese", "Thai", "Vegan", "Vegetarian", "Gluten-Free", "Cocktail"];

        _this.getBoredTime = _this.getBoredTime.bind(_this);
        _this.getMovies = _this.getMovies.bind(_this);
        _this.getCooking = _this.getCooking.bind(_this);

        _this.pages = [_this.getBoredTime, _this.getMovies, _this.getCooking];

        _this.transformOptions = _this.transformOptions.bind(_this);
        _this.send = _this.send.bind(_this);
        return _this;
    }

    _createClass(BoredForm, [{
        key: 'getBoredTime',
        value: function getBoredTime() {
            return React.createElement(BoredTime, { time: this.state.data.time, updateForm: this.changeTime });
        }
    }, {
        key: 'getMovies',
        value: function getMovies() {
            var movies = this.state.data.movies;
            return React.createElement(Activity, { key: 'movies-activity', category: 'movies', like: movies.like, types: movies.types, options: this.genres, updateForm: this.changeMovies });
        }
    }, {
        key: 'getCooking',
        value: function getCooking() {
            var cooking = this.state.data.cooking;
            return React.createElement(Activity, { key: 'cooking-activity', category: 'cooking', like: cooking.like, types: cooking.types, options: this.foods, updateForm: this.changeCooking });
        }
    }, {
        key: 'changeTime',
        value: function changeTime(value) {
            var newData = Object.assign({}, this.state.data, { time: value });
            this.setState({ data: newData }, function () {
                if (debug) {
                    console.log(this.state);
                }
            });
        }
    }, {
        key: 'changeMovies',
        value: function changeMovies(value) {
            var newData = Object.assign({}, this.state.data, { movies: value });
            this.reassignData(newData);
        }
    }, {
        key: 'changeCooking',
        value: function changeCooking(value) {
            var newData = Object.assign({}, this.state.data, { cooking: value });
            this.reassignData(newData);
        }
    }, {
        key: 'reassignData',
        value: function reassignData(newData) {
            this.setState({ data: newData }, function () {
                if (debug) {
                    console.log(this.state);
                }
            });
        }
    }, {
        key: 'nextPage',
        value: function nextPage() {
            if (this.canGoNext()) {
                this.setState({ pageIndex: this.state.pageIndex + 1 });
            }
        }
    }, {
        key: 'previousPage',
        value: function previousPage() {
            if (this.canGoPrevious()) {
                this.setState({ pageIndex: this.state.pageIndex - 1 });
            }
        }
    }, {
        key: 'canGoPrevious',
        value: function canGoPrevious() {
            return this.state.pageIndex > 0;
        }
    }, {
        key: 'canGoNext',
        value: function canGoNext() {
            return this.state.pageIndex < this.pages.length - 1;
        }
    }, {
        key: 'timeIsValid',
        value: function timeIsValid() {
            var time = this.state.data.time;
            return (time.hours > 0 || time.minutes > 0) && time.hours >= 0 && time.hours <= 12 && time.minutes >= 0 && time.minutes <= 59;
        }
    }, {
        key: 'send',
        value: function send() {
            if (this.timeIsValid()) {
                var data = { Hours: this.state.data.time.hours, Minutes: this.state.data.time.minutes };
                var movies = this.state.data.movies;
                var cooking = this.state.data.cooking;
                data.LikeMovies = movies.like;
                data.LikeCooking = cooking.like;
                Object.assign(data, this.transformOptions(this.genres, movies.types));
                Object.assign(data, this.transformOptions(this.foods, cooking.types));
                var json = JSON.stringify(data);
                console.log(json);
                /*             $.ajax({
                                type: 'Post',
                                url: '/code.py',
                                data: json
                            }).success(function () {
                                console.log('success');
                            }); */
            }
        }
    }, {
        key: 'transformOptions',
        value: function transformOptions(options, choices) {
            var newOptions = {};
            var that = this;
            options.forEach(function (opt) {
                newOptions[opt] = choices.has(opt);
            });
            return newOptions;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'form' },
                React.createElement(
                    'div',
                    { className: 'page' },
                    this.pages[this.state.pageIndex]()
                ),
                React.createElement(
                    'button',
                    { type: 'button', onClick: this.previousPage, disabled: !this.canGoPrevious() },
                    'Previous'
                ),
                React.createElement(
                    'button',
                    { type: 'button', onClick: this.nextPage, disabled: !this.canGoNext() },
                    'Next'
                ),
                React.createElement(
                    'button',
                    { type: 'button', onClick: this.send, disabled: !this.timeIsValid() },
                    'Submit'
                )
            );
        }
    }]);

    return BoredForm;
}(React.Component);

ReactDOM.render(React.createElement(BoredForm, null), root);