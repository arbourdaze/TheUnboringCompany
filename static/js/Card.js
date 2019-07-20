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
            phobia: _this.props.data.Phobia,
            nonphobias: _this.props.nonphobias
        };
        _this.data = _this.props.data;
        _this.sendData = _this.sendData.bind(_this);
        _this.proceed = _this.proceed.bind(_this);
        _this.getButtonPad = _this.getButtonPad.bind(_this);
        _this.sendData();
        return _this;
    }

    _createClass(Card, [{
        key: "sendData",
        value: function sendData() {
            if (this.data.Phobia) {
                this.props.update(this.data.Phobia);
            }
        }
    }, {
        key: "proceed",
        value: function proceed(cardID) {
            this.props.move(cardID);
        }
    }, {
        key: "getButtonPad",
        value: function getButtonPad() {
            var buttonList = [];
            for (var childID in this.data.Children) {
                var child = this.props.getChild(childID);
                buttonList.push(React.createElement(Button, {
                    classes: "",
                    buttonText: child.Description,
                    id: childID,
                    callback: this.proceed,
                    enabler: !this.props.nonphobias.includes(child.Phobia)
                }));
            }
            return buttonList;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "narrative" },
                    this.data.Description.split('\n').map(function (i, key) {
                        return React.createElement(
                            "p",
                            { key: key },
                            i
                        );
                    })
                ),
                React.createElement(
                    "div",
                    { className: "buttonPad" },
                    this.getButtonPad()
                )
            );
        }
    }]);

    return Card;
}(React.Component);