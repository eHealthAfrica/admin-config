'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReferenceField2 = require("./ReferenceField");

var _ReferenceField3 = _interopRequireDefault(_ReferenceField2);

var _UtilsReferenceExtractor = require('../Utils/ReferenceExtractor');

var _UtilsReferenceExtractor2 = _interopRequireDefault(_UtilsReferenceExtractor);

var ReferencedListField = (function (_ReferenceField) {
    _inherits(ReferencedListField, _ReferenceField);

    function ReferencedListField(name) {
        _classCallCheck(this, ReferencedListField);

        _get(Object.getPrototypeOf(ReferencedListField.prototype), 'constructor', this).call(this, name);
        this._type = 'referenced_list';
        this._targetReferenceField = null;
        this._targetFields = [];
        this._detailLink = false;
        this._listActions = [];
        this._entryCssClasses = null;
    }

    _createClass(ReferencedListField, [{
        key: 'targetReferenceField',
        value: function targetReferenceField(value) {
            if (!arguments.length) return this._targetReferenceField;
            this._targetReferenceField = value;
            return this;
        }
    }, {
        key: 'targetFields',
        value: function targetFields(value) {
            if (!arguments.length) return this._targetFields;
            this._targetFields = value;

            return this;
        }
    }, {
        key: 'getGridColumns',
        value: function getGridColumns() {
            var columns = [];
            for (var i = 0, l = this._targetFields.length; i < l; i++) {
                var field = this._targetFields[i];
                columns.push({
                    field: field,
                    label: field.label()
                });
            }

            return columns;
        }
    }, {
        key: 'getSortFieldName',
        value: function getSortFieldName() {
            if (!this.sortField()) {
                return null;
            }

            return this._targetEntity.name() + '_ListView.' + this.sortField();
        }
    }, {
        key: 'listActions',
        value: function listActions(actions) {
            if (!arguments.length) {
                return this._listActions;
            }

            this._listActions = actions;

            return this;
        }
    }, {
        key: 'entryCssClasses',
        value: function entryCssClasses(classes) {
            if (!arguments.length) {
                return this._entryCssClasses;
            }

            this._entryCssClasses = classes;

            return this;
        }
    }, {
        key: 'getReferences',
        value: function getReferences(withRemoteComplete) {
            return _UtilsReferenceExtractor2['default'].getReferences(this._targetFields, withRemoteComplete);
        }
    }, {
        key: 'getNonOptimizedReferences',
        value: function getNonOptimizedReferences(withRemoteComplete) {
            return _UtilsReferenceExtractor2['default'].getNonOptimizedReferences(this._targetFields, withRemoteComplete);
        }
    }, {
        key: 'getOptimizedReferences',
        value: function getOptimizedReferences(withRemoteComplete) {
            return _UtilsReferenceExtractor2['default'].getOptimizedReferences(this._targetFields, withRemoteComplete);
        }
    }]);

    return ReferencedListField;
})(_ReferenceField3['default']);

exports['default'] = ReferencedListField;
module.exports = exports['default'];
//# sourceMappingURL=ReferencedListField.js.map