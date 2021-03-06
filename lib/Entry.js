'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _UtilsObjectProperties = require('./Utils/objectProperties');

var Entry = (function () {
    function Entry(entityName, values, identifierValue) {
        _classCallCheck(this, Entry);

        this._entityName = entityName;
        this.values = values || {};
        this._identifierValue = identifierValue;
        this.listValues = {};
    }

    _createClass(Entry, [{
        key: 'transformToRest',

        /**
         * Transform an Entry to a JS object for the REST API Request
         *
         * @return {Object}
         */
        value: function transformToRest(fields) {

            var restEntry = (0, _UtilsObjectProperties.clone)(this.values);
            fields.forEach(function (field) {
                var fieldName = field.name();
                if (fieldName in restEntry) {
                    restEntry[fieldName] = field.getTransformedValue(restEntry[fieldName], restEntry);
                }
            });

            return (0, _UtilsObjectProperties.cloneAndNest)(restEntry);
        }
    }, {
        key: 'entityName',
        get: function get() {
            return this._entityName;
        }
    }, {
        key: 'identifierValue',
        get: function get() {
            return this._identifierValue;
        }
    }], [{
        key: 'createForFields',
        value: function createForFields(fields, entityName) {
            var entry = new Entry(entityName);
            fields.forEach(function (field) {
                entry.values[field.name()] = field.defaultValue();
            });
            return entry;
        }

        /**
         * Map a JS object from the REST API Response to an Entry
         *
         * @return {Entry}
         */
    }, {
        key: 'createFromRest',
        value: function createFromRest(restEntry) {
            var fields = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
            var entityName = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
            var identifierName = arguments.length <= 3 || arguments[3] === undefined ? 'id' : arguments[3];

            if (!restEntry || Object.keys(restEntry).length == 0) {
                return Entry.createForFields(fields, entityName);
            }
            var excludedFields = fields.filter(function (f) {
                return !f.flattenable();
            }).map(function (f) {
                return f.name();
            });

            var values = (0, _UtilsObjectProperties.cloneAndFlatten)(restEntry, excludedFields);

            fields.forEach(function (field) {
                var fieldName = field.name();
                values[fieldName] = field.getMappedValue(values[fieldName], values);
            });

            return new Entry(entityName, values, values[identifierName]);
        }

        /**
         * Map an array of JS objects from the REST API Response to an array of Entries
         *
         * @return {Array[Entry]}
         */
    }, {
        key: 'createArrayFromRest',
        value: function createArrayFromRest(restEntries, fields, entityName, identifierName) {
            return restEntries.map(function (e) {
                return Entry.createFromRest(e, fields, entityName, identifierName);
            });
        }
    }]);

    return Entry;
})();

exports['default'] = Entry;
module.exports = exports['default'];
//# sourceMappingURL=Entry.js.map