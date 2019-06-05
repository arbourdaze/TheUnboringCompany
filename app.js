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
        _this.changeTime = _this.changeTime.bind(_this);
        _this.changeMood = _this.changeMood.bind(_this);
        _this.nextPage = _this.nextPage.bind(_this);
        _this.previousPage = _this.previousPage.bind(_this);
        _this.canGoNext = _this.canGoNext.bind(_this);
        _this.canGoPrevious = _this.canGoPrevious.bind(_this);
        _this.timeIsValid = _this.timeIsValid.bind(_this);
        _this.moodIsValid = _this.moodIsValid.bind(_this);
        _this.isValid = _this.isValid.bind(_this);
        var boredTime = React.createElement(BoredTime, { time: _this.state.data.time, updateForm: _this.changeTime });
        _this.moodValues = ["0", "0.25", "0.5", "0.75", "1"];
        var mood = React.createElement(Mood, { mood: _this.state.data.mood, updateForm: _this.changeMood, moodValues: _this.moodValues });
        _this.pages = [boredTime, mood];
        return _this;
    }

    _createClass(BoredForm, [{
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
        key: 'changeMood',
        value: function changeMood(value) {
            var newData = Object.assign({}, this.state.data, { mood: value });
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
        key: 'moodIsValid',
        value: function moodIsValid() {
            var mood = this.state.data.mood;
            return this.moodValues.includes(mood.openness) && this.moodValues.includes(mood.conscientiousness) && this.moodValues.includes(mood.extroversion) && this.moodValues.includes(mood.agreeableness) && this.moodValues.includes(mood.neuroticism);
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            return this.timeIsValid() && this.moodIsValid();
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
                    this.pages[this.state.pageIndex]
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
                    { type: 'button', disabled: !this.isValid() },
                    'Submit'
                )
            );
        }
    }]);

    return BoredForm;
}(React.Component);

ReactDOM.render(React.createElement(BoredForm, null), root);