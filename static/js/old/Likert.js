'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Likert = function (_React$Component) {
    _inherits(Likert, _React$Component);

    function Likert(props) {
        _classCallCheck(this, Likert);

        var _this = _possibleConstructorReturn(this, (Likert.__proto__ || Object.getPrototypeOf(Likert)).call(this, props));

        _this.state = {
            val: _this.props.val
        };
        _this.options = _this.props.options;
        _this.labels = _this.props.labels;
        _this.handleChange = _this.handleChange.bind(_this);
        _this.createRow = _this.createRow.bind(_this);
        return _this;
    }

    _createClass(Likert, [{
        key: "handleChange",
        value: function handleChange(value, checked) {
            if (checked) {
                this.state.val = value;
            }
            this.props.updateForm(this.props.name, this.state.val);
        }
    }, {
        key: "createRow",
        value: function createRow() {
            var row = [];
            for (var i = 0; i < this.options.length; i++) {
                row.push(React.createElement(Radio, {
                    key: "like-" + this.props.name + i,
                    name: "like-" + this.props.name,
                    label: this.labels[i],
                    val: this.options[i],
                    checked: this.state.val === this.options[i],
                    updateForm: this.handleChange
                }));
            }
            return row;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "likert" },
                React.createElement(
                    "div",
                    { className: "row" },
                    this.createRow()
                )
            );
        }
    }]);

    return Likert;
}(React.Component);