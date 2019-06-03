'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mood = function (_React$Component) {
    _inherits(Mood, _React$Component);

    function Mood(props) {
        _classCallCheck(this, Mood);

        var _this = _possibleConstructorReturn(this, (Mood.__proto__ || Object.getPrototypeOf(Mood)).call(this, props));

        _this.state = {
            openness: _this.props.mood.openness,
            conscientiousness: _this.props.mood.conscientiousness,
            extroversion: _this.props.mood.extroversion,
            agreeableness: _this.props.mood.agreeableness,
            neuroticism: _this.props.mood.neuroticism
        };
        return _this;
    }

    _createClass(Mood, [{
        key: "changeOpenness",
        value: function changeOpenness(value) {
            this.setState({ openness: value }, function () {
                if (debug) {
                    console.log(this.state);
                }
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "changeConscientiousness",
        value: function changeConscientiousness(value) {
            this.setState({ conscientiousness: value }, function () {
                if (debug) {
                    console.log(this.state);
                }
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "changeExtroversion",
        value: function changeExtroversion(value) {
            this.setState({ extroversion: value }, function () {
                if (debug) {
                    console.log(this.state);
                }
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "changeAgreeableness",
        value: function changeAgreeableness(value) {
            this.setState({ agreeableness: value }, function () {
                if (debug) {
                    console.log(this.state);
                }
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "changeNeuroticism",
        value: function changeNeuroticism(value) {
            this.setState({ neuroticism: value }, function () {
                if (debug) {
                    console.log(this.state);
                }
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "mood" },
                React.createElement(
                    "h1",
                    null,
                    "How are you feeling right now?"
                ),
                React.createElement(Likert, { name: "openness", low: "Dumb", high: "Smart", score: this.state.openness, updateForm: this.changeOpenness }),
                React.createElement(Likert, { name: "conscientiousness", low: "Lazy", high: "Overachieving", score: this.state.conscientiousness, updateForm: this.changeConscientiousness }),
                React.createElement(Likert, { name: "extroversion", low: "Shy", high: "Social", score: this.state.extroversion, updateForm: this.changeExtroversion }),
                React.createElement(Likert, { name: "agreeableness", low: "Rude", high: "Friendly", score: this.state.agreeableness, updateForm: this.changeAgreeableness }),
                React.createElement(Likert, { name: "neuroticism", low: "Chill", high: "Stressed", score: this.state.neuroticism, updateForm: this.changeNeuroticism })
            );
        }
    }]);

    return Mood;
}(React.Component);