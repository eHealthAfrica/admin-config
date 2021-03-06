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

var _EntityEntity = require("../Entity/Entity");

var _EntityEntity2 = _interopRequireDefault(_EntityEntity);

/**
 * Map an embedded list in the entry
 *
 * @example
 *
 *     {
 *        id: 123,
 *        title: "hello, world",
 *        comments: [
 *          { date: "2015-09-30", author: "John Doe", body: "Lorem Ipsum" },
 *          { date: "2015-10-02", author: "Jane Doe", body: "Sic dolor amet" }
 *        ]
 *     }
 *
 *     let commentsField = new EmbeddedListField('comments')
 *        .targetFields([
 *          new DateField('date'),
 *          new StringField('author'),
 *          new StringField('body')
 *        ])
 */

var EmbeddedListField = (function (_Field) {
    _inherits(EmbeddedListField, _Field);

    function EmbeddedListField(name) {
        _classCallCheck(this, EmbeddedListField);

        _get(Object.getPrototypeOf(EmbeddedListField.prototype), "constructor", this).call(this, name);
        this._type = 'embedded_list';
        this._flattenable = false;
        this._targetEntity = new _EntityEntity2["default"](); // link to an empty entity by default
        this._targetFields = [];
        this._sortField = null;
        this._sortDir = null;
        this._permanentFilters = null;
        this._listActions = [];
    }

    /**
     * Optionally set the target Entity
     *
     * Useful if the embedded entries can be edited in standalone
     */

    _createClass(EmbeddedListField, [{
        key: "targetEntity",
        value: function targetEntity(entity) {
            if (!arguments.length) {
                return this._targetEntity;
            }
            this._targetEntity = entity;

            return this;
        }

        /**
         * List the fields to map in the embedded entries
         *
         * @example
         *
         *     embeddedListField.targetFields([
         *       new DateField('date'),
         *       new StringField('author'),
         *       new StringField('body')
         *     ])
         */
    }, {
        key: "targetFields",
        value: function targetFields(value) {
            if (!arguments.length) return this._targetFields;
            this._targetFields = value;

            return this;
        }

        /**
         * Name of the field used for sorting.
         *
         * @param string
         */
    }, {
        key: "sortField",
        value: function sortField() {
            if (arguments.length) {
                this._sortField = arguments[0];
                return this;
            }

            return this._sortField ? this._sortField : this.targetEntity().identifier().name();
        }

        /**
         * Direction used for sorting.
         *
         * @param String either 'ASC' or 'DESC'
         */
    }, {
        key: "sortDir",
        value: function sortDir() {
            if (arguments.length) {
                this._sortDir = arguments[0];
                return this;
            }

            return this._sortDir;
        }
    }, {
        key: "listActions",
        value: function listActions(actions) {
            if (!arguments.length) {
                return this._listActions;
            }

            this._listActions = actions;

            return this;
        }

        /**
         * Define permanent filters to be added to the REST API calls
         *
         *     nga.field('post_id', 'reference').permanentFilters({
         *        published: true
         *     });
         *     // related API call will be /posts/:id?published=true
         *
         * @param {Object} filters list of filters to apply to the call
         */
    }, {
        key: "permanentFilters",
        value: function permanentFilters(filters) {
            if (!arguments.length) {
                return this._permanentFilters;
            }

            this._permanentFilters = filters;

            return this;
        }
    }]);

    return EmbeddedListField;
})(_Field3["default"]);

exports["default"] = EmbeddedListField;
module.exports = exports["default"];
//# sourceMappingURL=EmbeddedListField.js.map