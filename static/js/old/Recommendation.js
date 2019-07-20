'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recommendation = function (_React$Component) {
    _inherits(Recommendation, _React$Component);

    function Recommendation(props) {
        _classCallCheck(this, Recommendation);

        var _this = _possibleConstructorReturn(this, (Recommendation.__proto__ || Object.getPrototypeOf(Recommendation)).call(this, props));

        var randomColor = new RandomColor();
        _this.color = randomColor.getColor();
        _this.result = _this.props.result;
        return _this;
    }

    _createClass(Recommendation, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "page-content-box result " + this.color, "data-type": this.result.Type },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col" },
                        this.result.Name
                    ),
                    React.createElement(
                        "div",
                        { className: "col" },
                        this.result.Description
                    )
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    this.props.actionItem
                )
            );
        }
    }]);

    return Recommendation;
}(React.Component);