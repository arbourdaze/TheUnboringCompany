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
                ID: 1,
                Title: "Introduction",
                Phobias: [],
                Description: "You open your eyes to darkness." + "\n" + "As you sit up to get your bearings, you realize you're on a dock." + "\n" + "As your eyes adjust, you make out the long shapes of buildings behind the trees on the island in front of you, but see no lights in their windows." + "\n" + "And something reeks." + "\n" + "You don't know what this place is or how you got here, but you know you shouldn't be here." + "\n" + "Something knocks against the dock.  You fight back a startled scream.  You turn around to find a small unmanned boat.",
                Children: [],
                Parent: null
            }
        };
        _this.update = _this.update.bind(_this);
        _this.move = _this.move.bind(_this);
        _this.getCard = _this.getCard.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'update',
        value: function update(phobia, cardID) {
            var newNonPhobias = this.state.nonphobias;
            newNonPhobias = newNonPhobias.push(phobia);
            this.setState({ nonphobias: newNonPhobias });
        }
    }, {
        key: 'move',
        value: function move(cardID) {
            this.setState({ card: this.getCard(cardID) });
        }
    }, {
        key: 'getCard',
        value: function getCard(cardID) {}
    }, {
        key: 'send',
        value: function send(data, route) {
            var json = JSON.stringify(data);
            var that = this;

            function successCallback(res, that) {
                window.scrollTo(0, 0);
                that.setState({ submitted: false });
                that.setState({ results: res });
                that.setState({ submitted: true });
                if (debug) {
                    console.log('success');
                }
            }

            if (debug) {
                console.log(json);
            }

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/' + route,
                data: json,
                dataType: 'json',
                success: function success(res) {
                    successCallback(res, that);
                },
                error: function error() {
                    if (debug) {
                        console.log('error');
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
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