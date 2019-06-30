'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Personality = function (_React$Component) {
    _inherits(Personality, _React$Component);

    function Personality(props) {
        _classCallCheck(this, Personality);

        var _this = _possibleConstructorReturn(this, (Personality.__proto__ || Object.getPrototypeOf(Personality)).call(this, props));

        _this.state = _this.props.data;
        _this.randomColor = new RandomColor();
        _this.handleChange = _this.handleChange.bind(_this);
        _this.labels = ["Very low", "Low", "Moderate", "High", "Very High"];
        _this.options = [0, 0.25, 0.5, 0.75, 1];
        return _this;
    }

    _createClass(Personality, [{
        key: "createList",
        value: function createList() {
            var bigFive = [];
            var that = this;
            Object.keys(this.state).forEach(function (key) {
                bigFive.push(React.createElement(
                    "div",
                    { key: 'personality-trait-' + key, className: "page-content-box personality-trait" },
                    React.createElement(
                        "h3",
                        null,
                        key,
                        ":"
                    ),
                    React.createElement(Likert, { score: that.state[key], updateForm: that.handleChange, labels: that.labels, options: that.options, category: key })
                ));
                bigFive.push(React.createElement("br", { key: 'personality-trait-newline-' + key }));
            });
            return bigFive;
        }
    }, {
        key: "handleChange",
        value: function handleChange(key, value) {
            this.setState(_defineProperty({}, key, value), function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h2",
                    { className: "question" },
                    "How would you describe your personality?"
                ),
                this.createList()
            );
        }
    }]);

    return Personality;
}(React.Component);