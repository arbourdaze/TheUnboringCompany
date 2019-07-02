'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Selections = function (_React$Component) {
    _inherits(Selections, _React$Component);

    function Selections(props) {
        _classCallCheck(this, Selections);

        var _this = _possibleConstructorReturn(this, (Selections.__proto__ || Object.getPrototypeOf(Selections)).call(this, props));

        _this.createRows = _this.createRows.bind(_this);
        return _this;
    }

    _createClass(Selections, [{
        key: 'createRows',
        value: function createRows() {
            var selections = this.props.selections;
            var rows = [];
            var i = 0;
            for (var _i = 0; _i < selections.length; _i++) {
                rows.push(React.createElement(Selection, { key: 'selection-' + _i, name: selections[_i].Name, description: selections[_i].Description }));
            }
            return rows;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.createRows()
            );
        }
    }]);

    return Selections;
}(React.Component);