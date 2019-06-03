'use strict';

//npx babel --watch src --out-dir . --presets react-app/prod 

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = true;

var root = document.querySelector('#root');

var BoredForm = function (_React$Component) {
    _inherits(BoredForm, _React$Component);

    function BoredForm(props) {
        _classCallCheck(this, BoredForm);

        var _this = _possibleConstructorReturn(this, (BoredForm.__proto__ || Object.getPrototypeOf(BoredForm)).call(this, props));

        _this.state = { time: null, mood: {
                openness: null,
                conscientiousness: null,
                extroversion: null,
                agreeableness: null,
                neuroticism: null
            }
        };
        var boredTime = React.createElement(BoredTime, { time: _this.state.time, updateForm: _this.changeTime });
        var mood = React.createElement(Mood, { mood: _this.state.mood, updateForm: _this.changeMood });
        _this.pages = [boredTime, mood];
        _this.page = _this.pages[0];
        return _this;
    }

    _createClass(BoredForm, [{
        key: 'changeTime',
        value: function changeTime(value) {
            this.setState({ time: value }, function () {
                if (debug) {
                    console.log(this.state.time);
                }
            });
        }
    }, {
        key: 'changeMood',
        value: function changeMood(value) {
            this.setState({ mood: value }, function () {
                if (debug) {
                    console.log(this.state.mood);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'form' },
                React.createElement(
                    'div',
                    { className: 'page' },
                    this.page
                )
            );
        }
    }]);

    return BoredForm;
}(React.Component);

ReactDOM.render(React.createElement(BoredForm, null), root);