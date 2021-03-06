"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _UtilsStringUtils = require("../Utils/stringUtils");

var _UtilsStringUtils2 = _interopRequireDefault(_UtilsStringUtils);

var Field = (function () {
    function Field(name) {
        _classCallCheck(this, Field);

        this._name = name || Math.random().toString(36).substring(7);
        this._detailLink = name === 'id';
        this._type = "string";
        this._order = null;
        this._label = null;
        this._maps = [];
        this._transforms = [];
        this._attributes = {};
        this._cssClasses = null;
        this._validation = { required: false, minlength: 0, maxlength: 99999 };
        this._defaultValue = null;
        this._editable = true;
        this._sortable = true;
        this._detailLinkRoute = 'edit';
        this._pinned = false;
        this._flattenable = true;
        this.dashboard = true;
        this.list = true;
        this._template = function () {
            return '';
        };
        this._templateIncludesLabel = false;
    }

    _createClass(Field, [{
        key: "label",
        value: function label() {
            if (arguments.length) {
                this._label = arguments[0];
                return this;
            }

            if (this._label === null) {
                return _UtilsStringUtils2["default"].camelCase(this._name);
            }

            return this._label;
        }
    }, {
        key: "type",
        value: function type() {
            return this._type;
        }
    }, {
        key: "name",
        value: function name() {
            if (arguments.length) {
                this._name = arguments[0];
                return this;
            }

            return this._name;
        }
    }, {
        key: "order",
        value: function order() {
            if (arguments.length) {
                if (arguments[1] !== true) {
                    console.warn('Setting order with Field.order is deprecated, order directly in fields array');
                }
                this._order = arguments[0];
                return this;
            }

            return this._order;
        }
    }, {
        key: "isDetailLink",
        value: function isDetailLink(detailLink) {
            if (arguments.length) {
                this._detailLink = arguments[0];
                return this;
            }

            if (this._detailLink === null) {
                return this._name === 'id';
            }

            return this._detailLink;
        }
    }, {
        key: "map",

        /**
         * Add a function to be applied to the response object to turn it into an entry
         */
        value: function map(fn) {
            if (!fn) return this._maps;
            if (typeof fn !== "function") {
                var type = typeof fn;
                throw new Error("Map argument should be a function, " + type + " given.");
            }

            this._maps.push(fn);

            return this;
        }
    }, {
        key: "hasMaps",
        value: function hasMaps() {
            return !!this._maps.length;
        }
    }, {
        key: "getMappedValue",
        value: function getMappedValue(value, entry) {
            for (var i in this._maps) {
                value = this._maps[i](value, entry);
            }

            return value;
        }

        /**
         * Add a function to be applied to the entry to turn it into a response object
         */
    }, {
        key: "transform",
        value: function transform(fn) {
            if (!fn) return this._transforms;
            if (typeof fn !== "function") {
                var type = typeof fn;
                throw new Error("transform argument should be a function, " + type + " given.");
            }

            this._transforms.push(fn);

            return this;
        }
    }, {
        key: "hasTranforms",
        value: function hasTranforms() {
            return !!this._transforms.length;
        }
    }, {
        key: "getTransformedValue",
        value: function getTransformedValue(value, entry) {
            for (var i in this._transforms) {
                value = this._transforms[i](value, entry);
            }

            return value;
        }
    }, {
        key: "attributes",
        value: function attributes(_attributes) {
            if (!arguments.length) {
                return this._attributes;
            }

            this._attributes = _attributes;

            return this;
        }
    }, {
        key: "cssClasses",
        value: function cssClasses(classes) {
            if (!arguments.length) return this._cssClasses;
            this._cssClasses = classes;
            return this;
        }
    }, {
        key: "getCssClasses",
        value: function getCssClasses(entry) {
            if (!this._cssClasses) {
                return '';
            }

            if (this._cssClasses.constructor === Array) {
                return this._cssClasses.join(' ');
            }

            if (typeof this._cssClasses === 'function') {
                return this._cssClasses(entry);
            }

            return this._cssClasses;
        }
    }, {
        key: "validation",
        value: function validation(_validation) {
            if (!arguments.length) {
                return this._validation;
            }

            for (var property in _validation) {
                if (!_validation.hasOwnProperty(property)) continue;
                if (_validation[property] === null) {
                    delete this._validation[property];
                } else {
                    this._validation[property] = _validation[property];
                }
            }

            return this;
        }
    }, {
        key: "defaultValue",
        value: function defaultValue(_defaultValue) {
            if (!arguments.length) return this._defaultValue;
            this._defaultValue = _defaultValue;
            return this;
        }
    }, {
        key: "editable",
        value: function editable(_editable) {
            if (!arguments.length) return this._editable;
            this._editable = _editable;
            return this;
        }
    }, {
        key: "sortable",
        value: function sortable(_sortable) {
            if (!arguments.length) return this._sortable;
            this._sortable = _sortable;
            return this;
        }
    }, {
        key: "detailLinkRoute",
        value: function detailLinkRoute(route) {
            if (!arguments.length) return this._detailLinkRoute;
            this._detailLinkRoute = route;
            return this;
        }
    }, {
        key: "pinned",
        value: function pinned(_pinned) {
            if (!arguments.length) return this._pinned;
            this._pinned = _pinned;
            return this;
        }
    }, {
        key: "flattenable",
        value: function flattenable() {
            return this._flattenable;
        }
    }, {
        key: "getTemplateValue",
        value: function getTemplateValue(data) {
            if (typeof this._template === 'function') {
                return this._template(data);
            }

            return this._template;
        }
    }, {
        key: "getTemplateValueWithLabel",
        value: function getTemplateValueWithLabel(data) {
            return this._templateIncludesLabel ? this.getTemplateValue(data) : false;
        }
    }, {
        key: "templateIncludesLabel",
        value: function templateIncludesLabel(_templateIncludesLabel) {
            if (!arguments.length) return this._templateIncludesLabel;
            this._templateIncludesLabel = _templateIncludesLabel;
            return this;
        }
    }, {
        key: "template",
        value: function template(_template) {
            var templateIncludesLabel = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            if (!arguments.length) return this._template;
            this._template = _template;
            this._templateIncludesLabel = templateIncludesLabel;
            return this;
        }
    }, {
        key: "detailLink",
        set: function set(isDetailLink) {
            return this._detailLink = isDetailLink;
        }
    }]);

    return Field;
})();

exports["default"] = Field;
module.exports = exports["default"];
//# sourceMappingURL=Field.js.map