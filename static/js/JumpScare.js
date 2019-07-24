var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JumpScare = function (_React$Component) {
    _inherits(JumpScare, _React$Component);

    function JumpScare(props) {
        _classCallCheck(this, JumpScare);

        var _this = _possibleConstructorReturn(this, (JumpScare.__proto__ || Object.getPrototypeOf(JumpScare)).call(this, props));

        _this.state = {};
        _this.run = _this.run.bind(_this);
        document.getElementById('soundEffect').play();
        return _this;
    }

    _createClass(JumpScare, [{
        key: 'run',
        value: function run() {
            this.props.run();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'button-pad' },
                    React.createElement('img', { src: '/static/img/' + this.props.monster + '.jpg' }),
                    React.createElement(Button, {
                        classes: '',
                        callback: this.run,
                        enabler: function enabler() {
                            return true;
                        },
                        buttonText: 'Run!'
                    })
                )
            );
        }
    }]);

    return JumpScare;
}(React.Component);