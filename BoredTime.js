'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BoredTime = function (_Input) {
  _inherits(BoredTime, _Input);

  function BoredTime(props) {
    _classCallCheck(this, BoredTime);

    return _possibleConstructorReturn(this, (BoredTime.__proto__ || Object.getPrototypeOf(BoredTime)).call(this, props));
  }

  _createClass(BoredTime, [{
    key: "render",
    value: function render() {
      var time = this.props.time;
      return React.createElement(
        "div",
        { onChange: this.handleChange },
        React.createElement(
          "h3",
          null,
          "\"How long will you be bored?\""
        ),
        React.createElement("input", { type: "time", name: "bored-time", value: time })
      );
    }
  }]);

  return BoredTime;
}(Input);