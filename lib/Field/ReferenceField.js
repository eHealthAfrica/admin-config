'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Field2 = require("./Field");

var _Field3 = _interopRequireDefault(_Field2);

var ReferenceField = (function (_Field) {
    _inherits(ReferenceField, _Field);

    function ReferenceField(name) {
        _classCallCheck(this, ReferenceField);

        _get(Object.getPrototypeOf(ReferenceField.prototype), 'constructor', this).call(this, name);
        this._type = 'reference';
        this._targetEntity = null;
        this._targetField = null;
        this._perPage = 30;
        this._permanentFilters = null;
        this._sortField = null;
        this._sortDir = null;
        this._singleApiCall = false;
        this._detailLink = true;
        this._remoteComplete = false;
        this._remoteCompleteOptions = {
            refreshDelay: 500
        };
    }

    _createClass(ReferenceField, [{
        key: 'perPage',
        value: function perPage(_perPage) {
            if (!arguments.length) return this._perPage;
            this._perPage = _perPage;
            return this;
        }
    }, {
        key: 'datagridName',
        value: function datagridName() {
            return this._targetEntity.name() + '_ListView';
        }
    }, {
        key: 'targetEntity',
        value: function targetEntity(entity) {
            if (!arguments.length) {
                return this._targetEntity;
            }
            this._targetEntity = entity;

            return this;
        }
    }, {
        key: 'targetField',
        value: function targetField(field) {
            if (!arguments.length) return this._targetField;
            this._targetField = field;

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
        key: 'permanentFilters',
        value: function permanentFilters(filters) {
            if (!arguments.length) {
                return this._permanentFilters;
            }

            this._permanentFilters = filters;

            return this;
        }

        /**
         * @deprecated use permanentFilters() instead
         */
    }, {
        key: 'filters',
        value: function filters(_filters) {
            console.warn('ReferenceField.filters() is deprecated, please use ReferenceField.permanentFilters() instead');
            return this.permanentFilters(_filters);
        }
    }, {
        key: 'sortField',
        value: function sortField() {
            if (arguments.length) {
                this._sortField = arguments[0];
                return this;
            }

            return this._sortField;
        }
    }, {
        key: 'sortDir',
        value: function sortDir() {
            if (arguments.length) {
                this._sortDir = arguments[0];
                return this;
            }

            return this._sortDir;
        }
    }, {
        key: 'singleApiCall',
        value: function singleApiCall(_singleApiCall) {
            if (!arguments.length) return this._singleApiCall;
            this._singleApiCall = _singleApiCall;
            return this;
        }
    }, {
        key: 'hasSingleApiCall',
        value: function hasSingleApiCall() {
            return typeof this._singleApiCall === 'function';
        }
    }, {
        key: 'getSingleApiCall',
        value: function getSingleApiCall(identifiers) {
            return this.hasSingleApiCall() ? this._singleApiCall(identifiers) : this._singleApiCall;
        }
    }, {
        key: 'getIdentifierValues',
        value: function getIdentifierValues(rawValues) {
            var results = {};
            var identifierName = this._name;
            for (var i = 0, l = rawValues.length; i < l; i++) {
                var identifier = rawValues[i][identifierName];
                if (identifier == null) {
                    continue;
                }

                if (identifier instanceof Array) {
                    for (var j in identifier) {
                        results[identifier[j]] = true;
                    }
                    continue;
                }

                results[identifier] = true;
            }

            return Object.keys(results);
        }
    }, {
        key: 'getSortFieldName',
        value: function getSortFieldName() {
            if (!this.sortField()) {
                return null;
            }

            return this._targetEntity.name() + '_ListView.' + this.sortField();
        }

        /**
         * Enable autocompletion using REST API for choices.
         *
         * Available options are:
         *
         * * `refreshDelay`: minimal delay between two API calls in milliseconds. By default: 500.
         * * `searchQuery`: a function returning the parameters to add to the query string basd on the input string.
         *
         *       new ReferenceField('authors')
         *           .targetEntity(author)
         *           .targetField(new Field('name'))
         *           .remoteComplete(true, {
         *               refreshDelay: 300,
         *               // populate choices from the response of GET /tags?q=XXX
         *               searchQuery: function(search) { return { q: search }; }
         *           })
         *           .perPage(10) // limit the number of results to 10
         *
         * @param {Boolean} remoteComplete true to enable remote complete. False by default
         * @param {Object} options Remote completion options (optional)
         */
    }, {
        key: 'remoteComplete',
        value: function remoteComplete(_remoteComplete, options) {
            if (!arguments.length) return this._remoteComplete;
            this._remoteComplete = _remoteComplete;
            if (options) {
                this.remoteCompleteOptions(options);
            }
            return this;
        }
    }, {
        key: 'remoteCompleteOptions',
        value: function remoteCompleteOptions(options) {
            if (!arguments.length) return this._remoteCompleteOptions;
            this._remoteCompleteOptions = options;
            return this;
        }
    }]);

    return ReferenceField;
})(_Field3['default']);

exports['default'] = ReferenceField;
module.exports = exports['default'];
//# sourceMappingURL=ReferenceField.js.map