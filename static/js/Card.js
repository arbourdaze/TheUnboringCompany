'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function (_React$Component) {
    _inherits(Card, _React$Component);

    function Card(props) {
        _classCallCheck(this, Card);

        var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

        _this.state = {
            nonphobias: _this.props.nonphobias
        };
        _this.sendData = _this.sendData.bind(_this);
        _this.proceed = _this.proceed.bind(_this);
        _this.getCard = _this.getCard.bind(_this);
        _this.getButton = _this.getButton.bind(_this);
        _this.getButtonPad = _this.getButtonPad.bind(_this);
        _this.sendData();
        return _this;
    }

    _createClass(Card, [{
        key: 'sendData',
        value: function sendData() {
            if (this.props.data.Phobias.length > 0) {
                var newNonphobias = this.state.nonphobias;
                newNonphobias = newNonphobias.concat(this.props.data.Phobias);
                this.setState({ nonphobias: newNonphobias });
                this.props.update(this.props.data.Phobias);
            }
        }
    }, {
        key: 'proceed',
        value: function proceed(title) {
            this.props.move(title);
        }
    }, {
        key: 'getButton',
        value: function getButton(destination) {
            var generateKey = function generateKey(pre) {
                return pre + '_' + new Date().getTime();
            };
            var that = this;
            return React.createElement(Button, {
                key: generateKey(destination.Title),
                classes: '',
                arg: destination.Title,
                buttonText: destination.FormalTitle,
                callback: this.proceed,
                enabler: function enabler() {
                    return !that.state.nonphobias.includes(destination.Phobias);
                }
            });
        }
    }, {
        key: 'getCard',
        value: function getCard(title) {
            var json = JSON.stringify({ Title: title });
            var card = null;

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/get-card',
                data: json,
                dataType: 'json',
                async: false,
                success: function success(res) {
                    card = res;
                },
                error: function error() {
                    if (debug) {
                        console.log('Error: could not find card');
                    }
                }
            });
            return card;
        }
    }, {
        key: 'getButtonPad',
        value: function getButtonPad() {
            var buttonList = [];
            var that = this;
            var data = this.props.data;
            for (var i = 0; i < data.Children.length; i++) {
                var childCard = that.getCard(data.Children[i]);
                buttonList.push(that.getButton(childCard));
            }
            for (var _i = 0; _i < data.Parent.length; _i++) {
                var parentCard = that.getCard(data.Parent[_i]);
                buttonList.push(that.getButton(parentCard));
            }
            return buttonList;
        }
    }, {
        key: 'render',
        value: function render() {
            var buttonPad = this.getButtonPad();
            return React.createElement(
                'div',
                { className: 'card' },
                React.createElement(
                    'p',
                    { className: 'title' },
                    this.props.data.FormalTitle
                ),
                React.createElement(
                    'div',
                    { className: 'narrative' },
                    this.props.data.Description.split('\n').map(function (i, key) {
                        return React.createElement(
                            'p',
                            { key: key },
                            i
                        );
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'button-pad' },
                    React.createElement(
                        'p',
                        null,
                        buttonPad.length > 0 && "Where do you go?"
                    ),
                    this.getButtonPad()
                )
            );
        }
    }]);

    return Card;
}(React.Component);