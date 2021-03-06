'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _View2 = require('./View');

var _View3 = _interopRequireDefault(_View2);

var _UtilsOrderElement = require("../Utils/orderElement");

var _UtilsOrderElement2 = _interopRequireDefault(_UtilsOrderElement);

var ListView = (function (_View) {
    _inherits(ListView, _View);

    function ListView(name) {
        _classCallCheck(this, ListView);

        _get(Object.getPrototypeOf(ListView.prototype), 'constructor', this).call(this, name);

        this._type = 'ListView';
        this._perPage = 30;
        this._infinitePagination = false;
        this._listActions = [];
        this._batchActions = ['delete'];
        this._filters = [];
        this._permanentFilters = {};
        this._exportFields = null;
        this._exportOptions = {};
        this._entryCssClasses = null;

        this._sortField = 'id';
        this._sortDir = 'DESC';
    }

    _createClass(ListView, [{
        key: 'perPage',
        value: function perPage() {
            if (!arguments.length) {
                return this._perPage;
            }
            this._perPage = arguments[0];
            return this;
        }

        /** @deprecated Use perPage instead */
    }, {
        key: 'limit',
        value: function limit() {
            if (!arguments.length) {
                return this.perPage();
            }
            return this.perPage(arguments[0]);
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
        key: 'getSortFieldName',
        value: function getSortFieldName() {
            return this.name() + '.' + this._sortField;
        }
    }, {
        key: 'infinitePagination',
        value: function infinitePagination() {
            if (arguments.length) {
                this._infinitePagination = arguments[0];
                return this;
            }

            return this._infinitePagination;
        }
    }, {
        key: 'actions',
        value: function actions(_actions) {
            if (!arguments.length) {
                return this._actions;
            }

            this._actions = _actions;

            return this;
        }
    }, {
        key: 'exportFields',
        value: function exportFields(_exportFields) {
            if (!arguments.length) {
                return this._exportFields;
            }

            this._exportFields = _exportFields;

            return this;
        }
    }, {
        key: 'exportOptions',
        value: function exportOptions(_exportOptions) {
            if (!arguments.length) {
                return this._exportOptions;
            }

            this._exportOptions = _exportOptions;

            return this;
        }
    }, {
        key: 'batchActions',
        value: function batchActions(actions) {
            if (!arguments.length) {
                return this._batchActions;
            }

            this._batchActions = actions;

            return this;
        }

        /**
         * Define permanent filters to be added to the REST API calls
         *
         *     posts.listView().permanentFilters({
         *        published: true
         *     });
         *     // related API call will be /posts?published=true
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
         * Define filters the user can add to the datagrid
         *
         *     posts.listView().filters([
         *       nga.field('title'),
         *       nga.field('age', 'number')
         *     ]);
         *
         * @param {Field[]} filters list of filters to add to the GUI
         */
    }, {
        key: 'filters',
        value: function filters(_filters) {
            if (!arguments.length) {
                return this._filters;
            }

            this._filters = _UtilsOrderElement2['default'].order(_filters);

            return this;
        }
    }, {
        key: 'getFilterReferences',
        value: function getFilterReferences(withRemoteComplete) {
            var result = {};
            var lists = this._filters.filter(function (f) {
                return f.type() === 'reference';
            });

            var filterFunction = null;
            if (withRemoteComplete === true) {
                filterFunction = function (f) {
                    return f.remoteComplete();
                };
            } else if (withRemoteComplete === false) {
                filterFunction = function (f) {
                    return !f.remoteComplete();
                };
            }

            if (filterFunction !== null) {
                lists = lists.filter(filterFunction);
            }

            for (var i = 0, c = lists.length; i < c; i++) {
                var list = lists[i];
                result[list.name()] = list;
            }

            return result;
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
        key: 'getEntryCssClasses',
        value: function getEntryCssClasses(entry) {
            if (!this._entryCssClasses) {
                return '';
            }

            if (this._entryCssClasses.constructor === Array) {
                return this._entryCssClasses.join(' ');
            }

            if (typeof this._entryCssClasses === 'function') {
                return this._entryCssClasses(entry);
            }

            return this._entryCssClasses;
        }
    }]);

    return ListView;
})(_View3['default']);

exports['default'] = ListView;
module.exports = exports['default'];
//# sourceMappingURL=ListView.js.map