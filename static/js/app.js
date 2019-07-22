'use strict';

//npx babel --watch src --out-dir . --presets react-app/prod

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = true;

var root = document.querySelector('#root');

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            nonphobias: [],
            card: {
                Title: "",
                FormalTitle: "",
                Description: "",
                Phobias: [],
                Children: [],
                Parent: [],
                Image: []
            }
        };
        _this.update = _this.update.bind(_this);
        _this.getCard = _this.getCard.bind(_this);
        _this.move = _this.move.bind(_this);
        return _this;
    }

    _createClass(App, [{
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
                        console.log('error');
                    }
                }
            });
            return card;
        }
    }, {
        key: 'getNextCard',
        value: function getNextCard(title) {
            var json = JSON.stringify({
                Title: title,
                NonPhobias: this.state.nonphobias
            });
            var card = null;

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/get-next-card',
                data: json,
                dataType: 'json',
                async: false,
                success: function success(res) {
                    card = res;
                },
                error: function error() {
                    if (debug) {
                        console.log('error');
                    }
                }
            });

            return card;
        }
    }, {
        key: 'update',
        value: function update(phobia, cardID) {
            var newNonPhobias = this.state.nonphobias;
            newNonPhobias = newNonPhobias.push(phobia);
            this.setState({ nonphobias: newNonPhobias });
        }
    }, {
        key: 'move',
        value: function move(title) {
            var nextCard = this.getNextCard(title);
            this.setState({ card: nextCard });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.card.Title === "") {
                return React.createElement(Button, {
                    classes: '',
                    buttonText: 'Begin',
                    arg: 'Intro',
                    callback: this.move,
                    enabler: function enabler() {
                        return true;
                    }
                });
            }
            return React.createElement(
                'div',
                null,
                React.createElement(Card, {
                    data: this.state.card,
                    nonphobias: this.state.nonphobias,
                    update: this.update,
                    move: this.move,
                    getCard: this.getCard
                })
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), root);