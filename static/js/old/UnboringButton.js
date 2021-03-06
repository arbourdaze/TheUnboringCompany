'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnboringButton = function (_React$Component) {
    _inherits(UnboringButton, _React$Component);

    function UnboringButton(props) {
        _classCallCheck(this, UnboringButton);

        var _this = _possibleConstructorReturn(this, (UnboringButton.__proto__ || Object.getPrototypeOf(UnboringButton)).call(this, props));

        _this.state = {
            disabled: _this.props.disabled
        };
        _this.callback = _this.callback.bind(_this);
        _this.enabler = _this.enabler.bind(_this);
        return _this;
    }

    _createClass(UnboringButton, [{
        key: 'callback',
        value: function callback() {
            if (!this.state.disabled) {
                this.props.callback();
            }
        }
    }, {
        key: 'enabler',
        value: function enabler() {
            return this.props.enabler();
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                {
                    className: 'unboring-button' + (this.props.classes.length > 0 && ' ' + this.props.classes) + (!this.enabler() && ' disabled'),
                    onClick: this.enabler() ? this.callback : undefined },
                this.props.buttonText
            );
        }
    }]);

    return UnboringButton;
}(React.Component);