'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Result = function (_React$Component) {
    _inherits(Result, _React$Component);

    function Result(props) {
        _classCallCheck(this, Result);

        var _this = _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).call(this, props));

        _this.state = {
            score: null
        };
        _this.labels = ["Sounds fun!", "Maybe later.", "Sounds boring."];
        _this.options = [1, 0, -1];
        var randomColor = new RandomColor();
        _this.color = randomColor.getColor();
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(Result, [{
        key: "handleChange",
        value: function handleChange(category, choice) {
            this.state.score = choice;
            this.props.updateForm(this.props.id, this.state.score);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "page-content-box result " + this.color },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col" },
                        this.props.name
                    ),
                    React.createElement(
                        "div",
                        { className: "col" },
                        this.props.description
                    )
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(Likert, { score: this.state.score, updateForm: this.handleChange, labels: this.labels, options: this.options, category: 'result' + this.props.id })
                )
            );
        }
    }]);

    return Result;
}(React.Component);