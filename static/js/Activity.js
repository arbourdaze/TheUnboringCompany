'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Activity = function (_React$Component) {
    _inherits(Activity, _React$Component);

    function Activity(props) {
        _classCallCheck(this, Activity);

        var _this = _possibleConstructorReturn(this, (Activity.__proto__ || Object.getPrototypeOf(Activity)).call(this, props));

        _this.state = _this.props.data;
        _this.randomColor = new RandomColor();
        _this.addChoice = _this.addChoice.bind(_this);
        _this.removeChoice = _this.removeChoice.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.createChecklist = _this.createChecklist.bind(_this);
        _this.changeLike = _this.changeLike.bind(_this);
        _this.labels = ["Yes", "Maybe", "No"];
        return _this;
    }

    _createClass(Activity, [{
        key: "addChoice",
        value: function addChoice(choice) {
            var newChoices = this.state.choices;
            newChoices.add(choice);
            this.setState({ choices: newChoices }, function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "removeChoice",
        value: function removeChoice(choice) {
            var newChoices = this.state.choices;
            newChoices.delete(choice);
            this.setState({ choices: newChoices }, function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "handleChange",
        value: function handleChange(value, checked) {
            if (checked) {
                this.addChoice(value);
            } else {
                this.removeChoice(value);
            }
        }
    }, {
        key: "createChecklist",
        value: function createChecklist() {
            var checklist = [];
            var that = this;
            var i = 0;
            this.state.options.forEach(function (opt) {
                checklist.push(React.createElement(CheckInput, {
                    name: that.state.name,
                    number: i,
                    opt: opt,
                    checked: that.state.choices.has(opt),
                    updateForm: that.handleChange
                }));
            });
            return checklist;
        }
    }, {
        key: "changeLike",
        value: function changeLike(key, value) {
            this.setState({ like: value }, function () {
                if (this.state.like == "No") {
                    this.setState({ choices: new Set() });
                }
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h2",
                    { className: "question" },
                    "Do you like ",
                    this.state.name.toLowerCase(),
                    "?"
                ),
                React.createElement(
                    "div",
                    { className: "page-content-box" },
                    React.createElement(Likert, { score: this.state.like, updateForm: this.changeLike, labels: this.labels, options: this.labels, category: this.state.name })
                ),
                React.createElement("br", null),
                (this.state.like == "Yes" || this.state.like == "Maybe") && React.createElement(
                    "div",
                    { className: "page-content-box" },
                    React.createElement(
                        "h2",
                        { className: "question" },
                        "What kind of ",
                        this.state.name.toLowerCase(),
                        " do you like?"
                    ),
                    this.createChecklist()
                )
            );
        }
    }]);

    return Activity;
}(React.Component);