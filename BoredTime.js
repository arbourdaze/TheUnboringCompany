'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BoredTime = function (_React$Component) {
    _inherits(BoredTime, _React$Component);

    function BoredTime(props) {
        _classCallCheck(this, BoredTime);

        var _this = _possibleConstructorReturn(this, (BoredTime.__proto__ || Object.getPrototypeOf(BoredTime)).call(this, props));

        _this.state = {
            hours: _this.props.time.hours,
            minutes: _this.props.time.minutes
        };
        _this.changeHours = _this.changeHours.bind(_this);
        _this.changeMinutes = _this.changeMinutes.bind(_this);
        return _this;
    }

    _createClass(BoredTime, [{
        key: "changeHours",
        value: function changeHours(e) {
            this.setState({ hours: e.target.value }, function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "changeMinutes",
        value: function changeMinutes(e) {
            this.setState({ minutes: e.target.value }, function () {
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
                    "h3",
                    null,
                    "How long will you be bored?"
                ),
                React.createElement(
                    "label",
                    { htmlFor: "bored-hours" },
                    "Hours: "
                ),
                React.createElement("input", { type: "number", name: "bored-hours", value: this.state.hours, min: "0", max: "6", onChange: this.changeHours }),
                React.createElement(
                    "label",
                    { htmlFor: "bored-minutes" },
                    "Minutes: "
                ),
                React.createElement("input", { type: "number", name: "bored-minutes", value: this.state.minutes, min: "0", max: "59", onChange: this.changeMinutes })
            );
        }
    }]);

    return BoredTime;
}(React.Component);