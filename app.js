'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = true;

var Likert = function (_React$Component) {
    _inherits(Likert, _React$Component);

    function Likert(props) {
        _classCallCheck(this, Likert);

        var _this = _possibleConstructorReturn(this, (Likert.__proto__ || Object.getPrototypeOf(Likert)).call(this, props));

        _this.state = { value: null };

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(Likert, [{
        key: "handleChange",
        value: function handleChange(event) {
            this.setState({ value: event.target.value }, function () {
                if (debug) {
                    console.log(this.state.value);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "likert", name: this.props.name, onChange: this.handleChange },
                React.createElement(
                    "h3",
                    null,
                    this.props.trait
                ),
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                null,
                                React.createElement("input", { name: this.props.name, type: "radio", value: "0" })
                            ),
                            React.createElement(
                                "td",
                                null,
                                React.createElement("input", { name: this.props.name, type: "radio", value: "0.25" })
                            ),
                            React.createElement(
                                "td",
                                null,
                                React.createElement("input", { name: this.props.name, type: "radio", value: "0.5" })
                            ),
                            React.createElement(
                                "td",
                                null,
                                React.createElement("input", { name: this.props.name, type: "radio", value: "0.75" })
                            ),
                            React.createElement(
                                "td",
                                null,
                                React.createElement("input", { name: this.props.name, type: "radio", value: "1" })
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Strongly disagree"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Disagree"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Neutral"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Agree"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Strongly agree"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Likert;
}(React.Component);

var Mood = function (_React$Component2) {
    _inherits(Mood, _React$Component2);

    function Mood(props) {
        _classCallCheck(this, Mood);

        return _possibleConstructorReturn(this, (Mood.__proto__ || Object.getPrototypeOf(Mood)).call(this, props));
    }

    _createClass(Mood, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "mood" },
                React.createElement(Likert, { name: "openness", trait: "Creative" }),
                React.createElement(Likert, { name: "conscientiousness", trait: "Ambitious" }),
                React.createElement(Likert, { name: "extroversion", trait: "Social" }),
                React.createElement(Likert, { name: "agreeableness", trait: "Nice" }),
                React.createElement(Likert, { name: "neuroticism", trait: "Stressed" })
            );
        }
    }]);

    return Mood;
}(React.Component);

var root = document.querySelector('#root');

ReactDOM.render(React.createElement(Mood, null), root);