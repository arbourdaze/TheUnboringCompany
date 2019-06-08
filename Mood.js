'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mood = function (_React$Component) {
    _inherits(Mood, _React$Component);

    function Mood(props) {
        _classCallCheck(this, Mood);

        var _this = _possibleConstructorReturn(this, (Mood.__proto__ || Object.getPrototypeOf(Mood)).call(this, props));

        _this.state = {
            openness: _this.props.mood.openness,
            conscientiousness: _this.props.mood.conscientiousness,
            extroversion: _this.props.mood.extroversion,
            agreeableness: _this.props.mood.agreeableness,
            neuroticism: _this.props.mood.neuroticism
        };
        _this.changeOpenness = _this.changeOpenness.bind(_this);
        _this.changeConscientiousness = _this.changeConscientiousness.bind(_this);
        _this.changeExtroversion = _this.changeExtroversion.bind(_this);
        _this.changeAgreeableness = _this.changeAgreeableness.bind(_this);
        _this.changeNeuroticism = _this.changeNeuroticism.bind(_this);
        return _this;
    }

    _createClass(Mood, [{
        key: "changeOpenness",
        value: function changeOpenness(value) {
            this.setState({ openness: value }, function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "changeConscientiousness",
        value: function changeConscientiousness(value) {
            this.setState({ conscientiousness: value }, function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "changeExtroversion",
        value: function changeExtroversion(value) {
            this.setState({ extroversion: value }, function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "changeAgreeableness",
        value: function changeAgreeableness(value) {
            this.setState({ agreeableness: value }, function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "changeNeuroticism",
        value: function changeNeuroticism(value) {
            this.setState({ neuroticism: value }, function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "mood" },
                React.createElement(
                    "h1",
                    null,
                    "How are you feeling right now?"
                ),
                React.createElement(Likert, { name: "openness", low: "Dumb", high: "Smart", score: this.state.openness, updateForm: this.changeOpenness, values: this.props.moodValues }),
                React.createElement(Likert, { name: "conscientiousness", low: "Lazy", high: "Overachieving", score: this.state.conscientiousness, updateForm: this.changeConscientiousness, values: this.props.moodValues }),
                React.createElement(Likert, { name: "extroversion", low: "Shy", high: "Social", score: this.state.extroversion, updateForm: this.changeExtroversion, values: this.props.moodValues }),
                React.createElement(Likert, { name: "agreeableness", low: "Rude", high: "Friendly", score: this.state.agreeableness, updateForm: this.changeAgreeableness, values: this.props.moodValues }),
                React.createElement(Likert, { name: "neuroticism", low: "Chill", high: "Stressed", score: this.state.neuroticism, updateForm: this.changeNeuroticism, values: this.props.moodValues })
            );
        }
    }]);

    return Mood;
}(React.Component);