'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RandomColor = function () {
    function RandomColor() {
        _classCallCheck(this, RandomColor);

        this.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
        this.getColor = this.getColor.bind(this);
    }

    _createClass(RandomColor, [{
        key: 'getColor',
        value: function getColor() {
            return this.colors[Math.floor(Math.random() * this.colors.length)];
        }
    }]);

    return RandomColor;
}();

;

var randomColor = new RandomColor();