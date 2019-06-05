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

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(Likert, [{
        key: "handleChange",
        value: function handleChange(event) {
            this.props.updateForm(event.target.value);
        }
    }, {
        key: "createRow",
        value: function createRow() {
            var row = [];
            for (var i = 0; i < this.props.moodValues.length; i++) {
                row.push(React.createElement(Radio, { key: i, name: this.props.name, val: this.props.moodValues[i] }));
            }
            return row;
        }
    }, {
        key: "createRowHeader",
        value: function createRowHeader() {
            var header = [];
            for (var i = 0; i < this.props.moodValues.length; i++) {
                header.push(React.createElement(
                    "th",
                    { key: i },
                    this.createRowHeaderCell(i)
                ));
            }
            return header;
        }
    }, {
        key: "createRowHeaderCell",
        value: function createRowHeaderCell(i) {
            if (i == 0) {
                return this.props.low;
            } else if (i == Math.floor(this.props.moodValues.length / 2)) {
                return React.createElement(
                    "span",
                    null,
                    "Neutral"
                );
            } else if (i == this.props.moodValues.length - 1) {
                return this.props.high;
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "likert", name: this.props.name, onChange: this.handleChange },
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