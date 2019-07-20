'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Results = function (_React$Component) {
    _inherits(Results, _React$Component);

    function Results(props) {
        _classCallCheck(this, Results);

        var _this = _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));

        _this.state = {
            liked: new Set(),
            disliked: new Set()
        };
        _this.results = _this.props.results;
        _this.handleBackButton = _this.handleBackButton.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.createRows = _this.createRows.bind(_this);
        _this.results = _this.props.results;
        return _this;
    }

    _createClass(Results, [{
        key: 'handleBackButton',
        value: function handleBackButton() {
            this.props.goBack();
        }
    }, {
        key: 'handleChange',
        value: function handleChange(id, score) {
            var newLiked = this.state.liked;
            var newDisliked = this.state.disliked;
            switch (score) {
                case 2:
                    {
                        newDisliked.delete(id);
                        newLiked.add(id);
                        break;
                    }
                case 1:
                    {
                        newLiked.delete(id);
                        newDisliked.add(id);
                        break;
                    }
                default:
                    break;
            }
            this.setState({
                liked: newLiked,
                disliked: newDisliked
            }, function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: 'createRows',
        value: function createRows() {
            var rows = [];
            var i = 0;
            for (var _i = 0; _i < this.results.length; _i++) {
                rows.push(React.createElement(Result, { key: 'result-' + _i, id: _i, result: this.results[_i], updateForm: this.handleChange }));
            }
            return rows;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h2',
                    { className: 'question' },
                    'How do you feel about the following?'
                ),
                this.createRows()
            );
        }
    }]);

    return Results;
}(React.Component);