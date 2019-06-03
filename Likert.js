'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Likert = function (_Input) {
    _inherits(Likert, _Input);

    function Likert(props) {
        _classCallCheck(this, Likert);

        return _possibleConstructorReturn(this, (Likert.__proto__ || Object.getPrototypeOf(Likert)).call(this, props));
    }

    _createClass(Likert, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "likert", name: this.props.name, onChange: this.handleChange },
                React.createElement(
                    "h3",
                    null,
                    this.props.question
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
                                this.props.low
                            ),
                            React.createElement("th", null),
                            React.createElement(
                                "th",
                                null,
                                "Neutral"
                            ),
                            React.createElement("th", null),
                            React.createElement(
                                "th",
                                null,
                                this.props.high
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Likert;
}(Input);