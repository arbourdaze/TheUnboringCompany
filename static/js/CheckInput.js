'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckInput = function (_React$Component) {
    _inherits(CheckInput, _React$Component);

    function CheckInput(props) {
        _classCallCheck(this, CheckInput);

        var _this = _possibleConstructorReturn(this, (CheckInput.__proto__ || Object.getPrototypeOf(CheckInput)).call(this, props));

        _this.state = {
            checked: _this.props.checked
        };
        _this.randomColor = new RandomColor();
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(CheckInput, [{
        key: "handleChange",
        value: function handleChange(event) {
            this.state.checked = event.target.checked;
            this.props.updateForm(this.props.opt, this.state.checked);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { key: this.props.name + "-check-input" + this.props.number, className: "row" },
                React.createElement(
                    "label",
                    { className: "checkbox-container" },
                    this.props.opt,
                    React.createElement("input", { type: "checkbox", name: this.props.name, value: this.props.opt, checked: this.state.checked, onChange: this.handleChange }),
                    React.createElement("span", { className: 'checkmark ' + this.randomColor.getColor() })
                )
            );
        }
    }]);

    return CheckInput;
}(React.Component);