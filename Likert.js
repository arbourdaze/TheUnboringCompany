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
            choice: null
        };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(Likert, [{
        key: "handleChange",
        value: function handleChange(event) {
            this.setState({ choice: event.target.value }, function () {
                this.props.updateForm(this.state.choice);
            });
        }
    }, {
        key: "createRow",
        value: function createRow() {
            var row = [];
            for (var i = 0; i < this.props.options.length; i++) {
                row.push(React.createElement(Radio, {
                    key: this.props.category + "likert-radio" + i,
                    name: "like-" + this.props.category,
                    val: this.props.options[i],
                    ticked: this.props.score == this.props.options[i]
                }));
            }
            return row;
        }
    }, {
        key: "createRowHeader",
        value: function createRowHeader() {
            var header = [];
            for (var i = 0; i < this.props.options.length; i++) {
                header.push(React.createElement(
                    "th",
                    { key: this.props.category + "likert-header" + i },
                    this.props.options[i]
                ));
            }
            return header;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { onChange: this.handleChange },
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            this.createRow()
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            this.createRowHeader()
                        )
                    )
                )
            );
        }
    }]);

    return Likert;
}(React.Component);