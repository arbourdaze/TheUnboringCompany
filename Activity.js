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

        _this.state = {
            like: _this.props.like,
            types: _this.props.types
        };
        _this.addType = _this.addType.bind(_this);
        _this.removeType = _this.removeType.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.createChecklist = _this.createChecklist.bind(_this);
        _this.changeLike = _this.changeLike.bind(_this);
        return _this;
    }

    _createClass(Activity, [{
        key: "addType",
        value: function addType(type) {
            var newTypes = this.state.types;
            newTypes.add(type);
            this.setState({ types: newTypes }, function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "removeType",
        value: function removeType(type) {
            var newTypes = this.state.types;
            newTypes.remove(type);
            this.setState({ types: newTypes }, function () {
                this.props.updateForm(this.state);
            });
        }
    }, {
        key: "handleChange",
        value: function handleChange(event) {
            if (event.target.checked) {
                this.addType(event.target.value);
            } else {
                this.removeType(event.target.value);
            }
        }
    }, {
        key: "createChecklist",
        value: function createChecklist() {
            var checklist = [];
            var that = this;
            var i = 0;
            this.props.options.forEach(function (opt) {
                var line = React.createElement("input", { key: that.props.category + "-checkbox" + i, type: "checkbox", name: that.props.category, value: opt, checked: that.state.types.has(opt), onChange: that.handleChange });
                checklist.push(line);
                i++;
                checklist.push(React.createElement(
                    "label",
                    { key: that.props.category + "-label" + i },
                    opt
                ));
                checklist.push(React.createElement("br", { key: that.props.category + "-newline" + i }));
                i++;
            });
            return checklist;
        }
    }, {
        key: "changeLike",
        value: function changeLike(value) {
            this.setState({ like: value }, function () {
                if (this.state.like == "No") {
                    this.setState({ types: new Set() });
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
                    "h1",
                    null,
                    "Do you like ",
                    this.props.category,
                    "?"
                ),
                React.createElement(Likert, { score: this.state.like, updateForm: this.changeLike, options: ["Yes", "Maybe", "No"], category: this.props.category }),
                React.createElement("br", null),
                (this.state.like == "Yes" || this.state.like == "Maybe") && React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        "What kind of ",
                        this.props.category,
                        " do you like?"
                    ),
                    this.createChecklist()
                )
            );
        }
    }]);

    return Activity;
}(React.Component);