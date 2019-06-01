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

        _this.state = { value: null };

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(Likert, [{
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ value: event.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            return "hi"
            /*         <div>
                        <table className="likert">
                            <tr>
                                <td>
                                    <input type="radio" value="0" onChange={this.handleChange} />
                                </td>
                                <td>
                                    <input type="radio" value="0.25" onChange={this.handleChange} />
                                </td>
                                <td>
                                    <input type="radio" value="0.5" onChange={this.handleChange} />
                                </td>
                                <td>
                                    <input type="radio" value="0.75" onChange={this.handleChange} />
                                </td>
                                <td>
                                    <input type="radio" value="1" onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Strongly disagree
                                </th>
                                <th>
                                    Disagree
                                </th>
                                <th>
                                    Neutral
                                </th>
                                <th>
                                    Agree
                                </th>
                                <th>
                                    Strongly agree
                                </th>
                            </tr>
                        </table>
                    </div> */
            ;
        }
    }]);

    return Likert;
}(React.Component);

var root = document.querySelector('#root');

ReactDOM.render(React.createElement(Likert, null), root);