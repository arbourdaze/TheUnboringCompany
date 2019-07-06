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
                        options: ["Action", "Crime", "Fantasy", "Western", "Historical", "Romance", "Animation", "Horror", "Sci-Fi", "Documentary"],
                        choices: new Set()
                    },
                    cooking: {
                        name: "Cooking",
                        like: "No",
                        options: ["American", "Barbecue", "Deli", "Mexican", "Chinese", "Pizza", "Italian", "Breakfast", "Sushi", "Seafood", "Indian", "Korean", "Japanese", "Dessert", "Vietnamese", "Thai", "Vegan", "Vegetarian", "Gluten-Free", "Cocktail"],
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

        _this.reassignData = _this.reassignData.bind(_this);
        _this.changeTime = _this.changeTime.bind(_this);
        _this.changePersonality = _this.changePersonality.bind(_this);
        _this.changeActivity = _this.changeActivity.bind(_this);
        _this.changeFeedback = _this.changeFeedback.bind(_this);
        _this.submitFeedback = _this.submitFeedback.bind(_this);

        _this.nextPage = _this.nextPage.bind(_this);
        _this.previousPage = _this.previousPage.bind(_this);
        _this.canGoNext = _this.canGoNext.bind(_this);
        _this.canGoPrevious = _this.canGoPrevious.bind(_this);

        _this.timeIsValid = _this.timeIsValid.bind(_this);
        _this.validateFeedback = _this.validateFeedback.bind(_this);

        _this.getTimeDOM = _this.getTimeDOM.bind(_this);
        _this.getPersonalityDOM = _this.getPersonalityDOM.bind(_this);
        _this.getActivityDOM = _this.getActivityDOM.bind(_this);
        _this.getMovies = _this.getMovies.bind(_this);
        _this.getCooking = _this.getCooking.bind(_this);

        _this.pages = [_this.getTimeDOM, _this.getPersonalityDOM, _this.getMovies, _this.getCooking];

        _this.transformActivityData = _this.transformActivityData.bind(_this);

        _this.goBack = _this.goBack.bind(_this);
        _this.send = _this.send.bind(_this);
        _this.gatherData = _this.gatherData.bind(_this);
        return _this;
    }

    _createClass(BoredForm, [{
        key: 'getTimeDOM',
        value: function getTimeDOM() {
            return React.createElement(BoredTime, { time: this.state.data.time, updateForm: this.changeTime });
        }
    }, {
        key: 'getPersonalityDOM',
        value: function getPersonalityDOM() {
            return React.createElement(Personality, { data: this.state.data.personality, updateForm: this.changePersonality });
        }
    }, {
        key: 'getActivityDOM',
        value: function getActivityDOM(activity) {
            return React.createElement(Activity, { key: activity.name + '-activity', data: activity, updateForm: this.changeActivity });
        }
    }, {
        key: 'getMovies',
        value: function getMovies() {
            return this.getActivityDOM(this.state.data.activities.movies);
        }
    }, {
        key: 'getCooking',
        value: function getCooking() {
            return this.getActivityDOM(this.state.data.activities.cooking);
        }
    }, {
        key: 'changeTime',
        value: function changeTime(value) {
            var newData = Object.assign({}, this.state.data, { time: value });
            this.reassignData(newData);
        }
    }, {
        key: 'changePersonality',
        value: function changePersonality(value) {
            var newData = Object.assign({}, this.state.data, { personality: value });
            this.reassignData(newData);
        }
    }, {
        key: 'changeActivity',
        value: function changeActivity(activity) {
            var newActivities = this.state.data.activities;
            newActivities[activity.name.toLowerCase()] = activity;
            var newData = Object.assign({}, this.state.data, { activities: newActivities });
            this.reassignData(newData);
        }
    }, {
        key: 'changeFeedback',
        value: function changeFeedback(value) {
            console.log(value);
            this.setState({ feedback: value }, function () {
                if (debug) {
                    console.log(this.state);
                }
            });
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
            if (this.canGoNext()) {
                $('unboring-button.next').removeClass('disabled');
            } else {
                $('unboring-button.next').addClass('disabled');
            }
        }
    }, {
        key: 'previousPage',
        value: function previousPage() {
            if (this.canGoPrevious()) {
                this.setState({ pageIndex: this.state.pageIndex - 1 });
            }
            if (this.canGoPrevious()) {
                $('unboring-button.previous').removeClass('disabled');
            } else {
                $('unboring-button.previous').addClass('disabled');
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
        key: 'gatherData',
        value: function gatherData() {
            var data = {
                Time: {
                    hours: this.state.data.time.hours,
                    minutes: this.state.data.time.minutes
                },
                Topics: ["Movies", "Cooking"]
            };

            Object.assign(data, this.transformActivityData(this.state.data.activities.movies));
            Object.assign(data, this.transformActivityData(this.state.data.activities.cooking));
            data.Personality = this.state.data.personality;
            var json = JSON.stringify(data);
            if (debug) {
                console.log(json);
            }
            return json;
        }
    }, {
        key: 'send',
        value: function send() {
            if (this.timeIsValid()) {
                var successCallback = function successCallback(res, that) {
                    that.setState({ submitted: true });
                    that.setState({ results: res });
                };

                var json = this.gatherData();
                var _that = this;

                $.ajax({
                    type: 'POST',
                    contentType: 'application/json',
                    url: '/search',
                    data: json,
                    dataType: 'json',
                    success: function success(res) {
                        successCallback(res, _that);
                    },
                    error: function error() {
                        if (debug) {
                            console.log('error');
                        }
                    }
                });
            }
        }
    }, {
        key: 'transformActivityData',
        value: function transformActivityData(activity) {
            var data = {};
            var liked = [];
            var disliked = [];
            data[activity.name] = activity.like;
            var that = this;
            activity.options.forEach(function (opt) {
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
    }, {
        key: 'goBack',
        value: function goBack() {
            this.setState({ results: [] });
            this.setState({ submitted: false });
            this.setState({ pageIndex: 0 });
        }
    }, {
        key: 'validateFeedback',
        value: function validateFeedback() {
            var total = this.state.feedback.liked.size + this.state.feedback.disliked.size;
            return total == this.state.results.length;
        }
    }, {
        key: 'submitFeedback',
        value: function submitFeedback() {
            var json = this.state.data.feedback;
            function successCallback(res) {}
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/feedback',
                data: JSON.stringify(json),
                dataType: 'json',
                success: function success(res) {
                    successCallback(res, that);
                },
                error: function error() {
                    if (debug) {
                        console.log('error');
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.fedback) {
                return React.createElement(
                    'div',
                    { className: 'page' },
                    React.createElement(Selections, { selections: this.state.feedback.liked })
                );
            } else if (this.state.submitted) {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'div',
                        { className: 'page' },
                        React.createElement(Results, { goBack: this.goBack, results: this.state.results, updateForm: this.changeFeedback })
                    ),
                    React.createElement(UnboringButton, { callback: this.submitFeedback, enabler: this.validateFeedback, classes: 'submit', buttonText: 'Submit' })
                );
            } else {
                return React.createElement(
                    'div',
                    { className: 'form' },
                    React.createElement(
                        'div',
                        { className: 'page' },
                        this.pages[this.state.pageIndex]()
                    ),
                    React.createElement(
                        'div',
                        { className: 'button-pad' },
                        React.createElement(UnboringButton, { callback: this.previousPage, enabler: this.canGoPrevious, classes: 'previous', buttonText: 'Previous' }),
                        React.createElement(UnboringButton, { callback: this.nextPage, enabler: this.canGoNext, classes: 'next', buttonText: 'Next' }),
                        React.createElement(UnboringButton, { callback: this.send, enabler: this.timeIsValid, classes: 'submit', buttonText: 'Submit' })
                    )
                );
            }
        }
    }]);

    return BoredForm;
}(React.Component);

ReactDOM.render(React.createElement(BoredForm, null), root);