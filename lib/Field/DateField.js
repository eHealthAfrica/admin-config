"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Field2 = require("./Field");

var _Field3 = _interopRequireDefault(_Field2);

var DateField = (function (_Field) {
    _inherits(DateField, _Field);

    function DateField(name) {
        _classCallCheck(this, DateField);

        _get(Object.getPrototypeOf(DateField.prototype), "constructor", this).call(this, name);

        this._format = null;
        this._parse = function (date) {
            if (date instanceof Date) {
                // the datepicker returns a JS Date object, with hours, minutes and timezone
                // in order to convert it back to date, we must remove the timezone, then
                // remove hours and minutes
                date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

                var dateString = date.toJSON();
                return dateString ? dateString.substr(0, 10) : null;
            }
            return date;
        };
        this._type = "date";
    }

    _createClass(DateField, [{
        key: "format",
        value: function format(value) {
            if (!arguments.length) return this._format;
            this._format = value;
            return this;
        }
    }, {
        key: "parse",
        value: function parse(value) {
            if (!arguments.length) return this._parse;
            this._parse = value;
            return this;
        }
    }]);

    return DateField;
})(_Field3["default"]);

exports["default"] = DateField;
module.exports = exports["default"];
//# sourceMappingURL=DateField.js.map