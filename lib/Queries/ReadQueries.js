'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Queries2 = require('./Queries');

var _Queries3 = _interopRequireDefault(_Queries2);

var _UtilsReferenceExtractor = require('../Utils/ReferenceExtractor');

var _UtilsReferenceExtractor2 = _interopRequireDefault(_UtilsReferenceExtractor);

var ReadQueries = (function (_Queries) {
    _inherits(ReadQueries, _Queries);

    function ReadQueries() {
        _classCallCheck(this, ReadQueries);

        _get(Object.getPrototypeOf(ReadQueries.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ReadQueries, [{
        key: 'getOne',

        /**
         * Get one entity
         *
         * @param {Entity}   entity
         * @param {String}   viewType
         * @param {mixed}    identifierValue
         * @param {String}   identifierName
         * @param {String}   url
         *
         * @returns {promise} (list of fields (with their values if set) & the entity name, label & id-
         */
        value: function getOne(entity, viewType, identifierValue, identifierName, url) {
            return this._restWrapper.getOne(entity.name(), this._application.getRouteFor(entity, url, viewType, identifierValue, identifierName), entity.retrieveMethod());
        }

        /**
         * Return the list of all object of entityName type
         * Get all the object from the API
         *
         * @param {ListView} view                the view associated to the entity
         * @param {Number}   page                the page number
         * @param {Object}   filterValues        searchQuery to filter elements
         * @param {String}   sortField           the field to be sorted ex: entity.fieldName
         * @param {String}   sortDir             the direction of the sort
         *
         * @returns {promise} the entity config & the list of objects
         */
    }, {
        key: 'getAll',
        value: function getAll(view, page, filterValues, sortField, sortDir) {
            page = page || 1;
            filterValues = filterValues || {};
            var url = view.getUrl();

            if (sortField && sortField.split('.')[0] === view.name()) {
                sortField = sortField;
                sortDir = sortDir;
            } else {
                sortField = view.getSortFieldName();
                sortDir = view.sortDir();
            }

            var allFilterValues = {};
            var permanentFilters = view.permanentFilters();
            Object.keys(filterValues).forEach(function (key) {
                allFilterValues[key] = filterValues[key];
            });
            Object.keys(permanentFilters).forEach(function (key) {
                allFilterValues[key] = permanentFilters[key];
            });

            return this.getRawValues(view.entity, view.name(), view.type, page, view.perPage(), allFilterValues, view.filters(), sortField, sortDir, url).then(function (values) {
                return {
                    data: values.data,
                    totalItems: values.totalCount || values.headers('X-Total-Count') || values.data.length
                };
            });
        }

        /**
         * Return the list of all object of entityName type
         * Get all the object from the API
         *
         * @param {Entity}   entity
         * @param {String}   viewName
         * @param {String}   viewType
         * @param {Number}   page
         * @param {Number}   perPage
         * @param {Object}   filterValues
         * @param {Object}   filterFields
         * @param {String}   sortField
         * @param {String}   sortDir
         * @param {String}   url
         *
         * @returns {promise} the entity config & the list of objects
         */
    }, {
        key: 'getRawValues',
        value: function getRawValues(entity, viewName, viewType, page, perPage, filterValues, filterFields, sortField, sortDir, url) {
            var params = {};

            // Compute pagination
            if (page !== -1) {
                params._page = typeof page === 'undefined' ? 1 : parseInt(page, 10);
                params._perPage = perPage;
            }

            // Compute sorting
            if (sortField && sortField.split('.')[0] === viewName) {
                params._sortField = sortField.substr(sortField.indexOf('.') + 1);
                params._sortDir = sortDir;
            }

            // Compute filtering
            if (filterValues && Object.keys(filterValues).length !== 0) {
                (function () {
                    params._filters = {};
                    var filterName = undefined,
                        mappedValue = undefined;
                    for (filterName in filterValues) {
                        if (filterFields.hasOwnProperty(filterName) && filterFields[filterName].hasMaps()) {
                            mappedValue = filterFields[filterName].getMappedValue(filterValues[filterName]);
                            Object.keys(mappedValue).forEach(function (key) {
                                params._filters[key] = mappedValue[key];
                            });
                            continue;
                        }

                        // It's weird to not map, but why not.
                        params._filters[filterName] = filterValues[filterName];
                    }
                })();
            }

            // Get grid data
            return this._restWrapper.getList(params, entity.name(), this._application.getRouteFor(entity, url, viewType), entity.retrieveMethod());
        }
    }, {
        key: 'getReferenceData',
        value: function getReferenceData(references, rawValues) {
            var nonOptimizedReferencedData = this.getFilteredReferenceData(_UtilsReferenceExtractor2['default'].getNonOptimizedReferences(references), rawValues);
            var optimizedReferencedData = this.getOptimizedReferenceData(_UtilsReferenceExtractor2['default'].getOptimizedReferences(references), rawValues);
            return Promise.all([nonOptimizedReferencedData, optimizedReferencedData]).then(function (results) {
                var data = {};
                var name = undefined;
                for (name in results[0]) {
                    data[name] = results[0][name];
                }
                for (name in results[1]) {
                    data[name] = results[1][name];
                }
                return data;
            });
        }

        /**
         * Returns all References for an entity with associated values [{targetEntity.identifier: targetLabel}, ...]
         * by calling the API for each entries
         *
         * @param {ReferenceField} references A hash of Reference and ReferenceMany objects
         * @param {Array} rawValues
         *
         * @returns {Promise}
         */
    }, {
        key: 'getFilteredReferenceData',
        value: function getFilteredReferenceData(references, rawValues) {
            if (!references || !Object.keys(references).length) {
                return this._promisesResolver.empty({});
            }

            var getOne = this.getOne.bind(this),
                calls = [];

            for (var i in references) {
                var reference = references[i],
                    targetEntity = reference.targetEntity(),
                    identifiers = reference.getIdentifierValues(rawValues);

                for (var k in identifiers) {
                    calls.push(getOne(targetEntity, 'listView', identifiers[k], reference.name()));
                }
            }

            return this.fillFilteredReferencedData(calls, references, rawValues);
        }

        /**
         * Returns all References for an entity with associated values [{targetEntity.identifier: targetLabel}, ...]
         * by calling the API once
         *
         * @param {[ReferenceField]} references A hash of Reference and ReferenceMany objects
         * @param {Array} rawValues
         *
         * @returns {Promise}
         */
    }, {
        key: 'getOptimizedReferenceData',
        value: function getOptimizedReferenceData(references, rawValues) {
            if (!references || !Object.keys(references).length) {
                return this._promisesResolver.empty({});
            }

            var getRawValues = this.getRawValues.bind(this),
                calls = [];

            for (var i in references) {
                var reference = references[i],
                    targetEntity = reference.targetEntity(),
                    identifiers = reference.getIdentifierValues(rawValues);

                // Check if we should retrieve values with 1 or multiple requests
                var singleCallFilters = reference.getSingleApiCall(identifiers);
                calls.push(getRawValues(targetEntity, targetEntity.name() + '_ListView', 'listView', 1, reference.perPage(), singleCallFilters, {}, reference.sortField(), reference.sortDir()));
            }

            return this.fillOptimizedReferencedData(calls, references);
        }

        /**
         * Returns all References for an entity with associated values [{targetEntity.identifier: targetLabel}, ...]
         * without filters on an entity
         *
         * @param {[ReferenceField]} references A hash of Reference and ReferenceMany objects
         *
         * @returns {Promise}
         */
    }, {
        key: 'getAllReferencedData',
        value: function getAllReferencedData(references, search) {
            if (!references || !Object.keys(references).length) {
                return this._promisesResolver.empty({});
            }

            var calls = [],
                getRawValues = this.getRawValues.bind(this);

            var _loop = function (i) {
                var reference = references[i];
                var targetEntity = reference.targetEntity();

                var permanentFilters = reference.permanentFilters();
                var filterValues = permanentFilters || {};

                if (typeof permanentFilters === 'function') {
                    console.warn('Reference.permanentFilters() called with a function is deprecated. Use the searchQuery option for remoteComplete() instead');
                    filterValues = permanentFilters(search);
                }

                if (search) {
                    // remote complete situation
                    var options = reference.remoteCompleteOptions();
                    if (options.searchQuery) {
                        (function () {
                            var filterValuesFromRemoteComplete = options.searchQuery(search);
                            Object.keys(filterValuesFromRemoteComplete).forEach(function (key) {
                                filterValues[key] = filterValuesFromRemoteComplete[key];
                            });
                        })();
                    } else {
                        // by default, filter the list by the referenceField name
                        filterValues[reference.targetField().name()] = search;
                    }
                }

                var filterFields = {};
                filterFields[reference.name()] = reference;

                calls.push(getRawValues(targetEntity, targetEntity.name() + '_ListView', 'listView', 1, reference.perPage(), filterValues, filterFields, reference.getSortFieldName(), reference.sortDir()));
            };

            for (var i in references) {
                _loop(i);
            }

            return this.fillOptimizedReferencedData(calls, references);
        }

        /**
         * Fill all reference entries to return [{targetEntity.identifier: targetLabel}, ...]
         *
         * @param {[Promise]} apiCalls
         * @param {[Reference]} references
         * @returns {Promise}
         */
    }, {
        key: 'fillOptimizedReferencedData',
        value: function fillOptimizedReferencedData(apiCalls, references) {
            return this._promisesResolver.allEvenFailed(apiCalls).then(function (responses) {
                if (responses.length === 0) {
                    return {};
                }

                var referencedData = {},
                    i = 0;

                for (var j in references) {
                    var reference = references[j],
                        response = responses[i++];

                    // Retrieve entries depending on 1 or many request was done
                    if (response.status == 'error') {
                        // the response failed
                        continue;
                    }

                    referencedData[reference.name()] = response.result.data;
                }

                return referencedData;
            });
        }

        /**
         * Fill all reference entries to return [{targetEntity.identifier: targetLabel}, ...]
         *
         * @param {[Promise]} apiCalls
         * @param {[Reference]} references
         * @param {[Object]} rawValues
         * @returns {Promise}
         */
    }, {
        key: 'fillFilteredReferencedData',
        value: function fillFilteredReferencedData(apiCalls, references, rawValues) {
            return this._promisesResolver.allEvenFailed(apiCalls).then(function (responses) {
                if (responses.length === 0) {
                    return {};
                }

                var referencedData = {},
                    response = undefined,
                    i = 0;

                for (var j in references) {
                    var data = [],
                        reference = references[j],
                        identifiers = reference.getIdentifierValues(rawValues);

                    for (var k in identifiers) {
                        response = responses[i++];
                        if (response.status == 'error') {
                            // one of the responses failed
                            continue;
                        }
                        data.push(response.result);
                    }

                    if (!data.length) {
                        continue;
                    }

                    referencedData[reference.name()] = data;
                }

                return referencedData;
            });
        }

        /**
         * Returns all ReferencedList for an entity for associated values [{targetEntity.identifier: [targetFields, ...]}}
         *
         * @param {View}   referencedLists
         * @param {String} sortField
         * @param {String} sortDir
         * @param {*} entityId
         *
         * @returns {promise}
         */
    }, {
        key: 'getReferencedListData',
        value: function getReferencedListData(referencedLists, sortField, sortDir, entityId) {
            var getRawValues = this.getRawValues.bind(this),
                calls = [];

            var _loop2 = function (i) {
                var referencedList = referencedLists[i],
                    targetEntity = referencedList.targetEntity(),
                    viewName = referencedList.datagridName(),
                    currentSortField = referencedList.getSortFieldName(),
                    currentSortDir = referencedList.sortDir(),
                    filter = {};

                if (sortField && sortField.split('.')[0] === viewName) {
                    currentSortField = sortField;
                    currentSortDir = sortDir || 'ASC';
                }

                var permanentFilters = referencedList.permanentFilters() || {};
                Object.keys(permanentFilters).forEach(function (key) {
                    filter[key] = permanentFilters[key];
                });
                filter[referencedList.targetReferenceField()] = entityId;

                calls.push(getRawValues(targetEntity, viewName, 'listView', 1, referencedList.perPage(), filter, {}, currentSortField, currentSortDir));
            };

            for (var i in referencedLists) {
                _loop2(i);
            }

            return this._promisesResolver.allEvenFailed(calls).then(function (responses) {
                var j = 0,
                    entries = {};

                for (var i in referencedLists) {
                    var response = responses[j++];
                    if (response.status == 'error') {
                        // If a response fail, skip it
                        continue;
                    }

                    entries[i] = response.result.data;
                }

                return entries;
            });
        }
    }, {
        key: 'getRecordsByIds',
        value: function getRecordsByIds(entity, ids) {
            var _this = this;

            if (!ids || !ids.length) {
                return this._promisesResolver.empty();
            }

            var calls = ids.map(function (id) {
                return _this.getOne(entity, 'listView', id, entity.identifier().name());
            });

            return this._promisesResolver.allEvenFailed(calls).then(function (responses) {
                return responses.filter(function (r) {
                    return r.status != 'error';
                }).map(function (r) {
                    return r.result;
                });
            });
        }
    }]);

    return ReadQueries;
})(_Queries3['default']);

exports['default'] = ReadQueries;
module.exports = exports['default'];
//# sourceMappingURL=ReadQueries.js.map