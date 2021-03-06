'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _MenuMenu = require('./Menu/Menu');

var _MenuMenu2 = _interopRequireDefault(_MenuMenu);

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _Dashboard = require('./Dashboard');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _UtilsOrderElement = require("./Utils/orderElement");

var _UtilsOrderElement2 = _interopRequireDefault(_UtilsOrderElement);

var Application = (function () {
    function Application() {
        var title = arguments.length <= 0 || arguments[0] === undefined ? 'ng-admin' : arguments[0];
        var debug = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        _classCallCheck(this, Application);

        this._baseApiUrl = '';
        this._customTemplate = function (viewName) {};
        this._title = title;
        this._menu = null;
        this._dashboard = null;
        this._layout = false;
        this._header = false;
        this._entities = [];
        this._errorMessage = this.defaultErrorMessage;
        this._debug = debug;
    }

    _createClass(Application, [{
        key: 'defaultErrorMessage',
        value: function defaultErrorMessage(response) {
            var body = response.data;

            if (typeof body === 'object') {
                body = JSON.stringify(body);
            }

            return 'Oops, an error occured : (code: ' + response.status + ') ' + body;
        }
    }, {
        key: 'getViewsOfType',
        value: function getViewsOfType(type) {
            return _UtilsOrderElement2['default'].order(this.entities.map(function (entity) {
                return entity.views[type];
            }).filter(function (view) {
                return view.enabled;
            }));
        }
    }, {
        key: 'getRouteFor',
        value: function getRouteFor(entity, viewUrl, viewType, identifierValue, identifierName) {
            var baseApiUrl = entity.baseApiUrl() || this.baseApiUrl(),
                url = viewUrl || entity.getUrl(viewType, identifierValue, identifierName);

            // If the view or the entity don't define the url, retrieve it from the baseURL of the entity or the app
            if (!url) {
                url = baseApiUrl + encodeURIComponent(entity.name());
                if (identifierValue != null) {
                    url += '/' + encodeURIComponent(identifierValue);
                }
            } else if (!/^(?:[a-z]+:)?\/\//.test(url)) {
                // Add baseUrl for relative URL
                url = baseApiUrl + url;
            }

            return url;
        }
    }, {
        key: 'debug',
        value: function debug(_debug) {
            if (!arguments.length) return this._debug;
            this._debug = _debug;
            return this;
        }
    }, {
        key: 'layout',
        value: function layout(_layout) {
            if (!arguments.length) return this._layout;
            this._layout = _layout;
            return this;
        }
    }, {
        key: 'header',
        value: function header(_header) {
            if (!arguments.length) return this._header;
            this._header = _header;
            return this;
        }
    }, {
        key: 'title',
        value: function title(_title) {
            if (!arguments.length) return this._title;
            this._title = _title;
            return this;
        }

        /**
         * Getter/Setter for the main application menu
         *
         * If the getter is called first, it will return a menu based on entities.
         *
         *     application.addEntity(new Entity('posts'));
         *     application.addEntity(new Entity('comments'));
         *     application.menu(); // Menu { children: [ Menu { title: "Posts" }, Menu { title: "Comments" } ]}
         *
         * If the setter is called first, all subsequent calls to the getter will return the set menu.
         *
         *     application.addEntity(new Entity('posts'));
         *     application.addEntity(new Entity('comments'));
         *     application.menu(new Menu().addChild(new Menu().title('Foo')));
         *     application.menu(); // Menu { children: [ Menu { title: "Foo" } ]}
         *
         * @see Menu
         */
    }, {
        key: 'menu',
        value: function menu(_menu) {
            if (!arguments.length) {
                if (!this._menu) {
                    this._menu = this.buildMenuFromEntities();
                }
                return this._menu;
            }

            this._menu = _menu;
            return this;
        }
    }, {
        key: 'buildMenuFromEntities',
        value: function buildMenuFromEntities() {
            return new _MenuMenu2['default']().children(this.entities.filter(function (entity) {
                return entity.menuView().enabled;
            }).sort(function (e1, e2) {
                return e1.menuView().order() - e2.menuView().order();
            }).map(function (entity) {
                return new _MenuMenu2['default']().populateFromEntity(entity);
            }));
        }
    }, {
        key: 'dashboard',
        value: function dashboard(_dashboard) {
            if (!arguments.length) {
                if (!this._dashboard) {
                    this._dashboard = this.buildDashboardFromEntities();
                }
                return this._dashboard;
            }
            this._dashboard = _dashboard;
            return this;
        }
    }, {
        key: 'buildDashboardFromEntities',
        value: function buildDashboardFromEntities() {
            var dashboard = new _Dashboard2['default']();
            this.entities.filter(function (entity) {
                return entity.dashboardView().enabled;
            }).map(function (entity) {
                dashboard.addCollection(entity.dashboardView()); // yep, a collection is a ListView, and so is a DashboardView - forgive this duck typing for BC sake
            });
            if (!dashboard.hasCollections()) {
                // still no collection from dashboardViews, let's use listViews instead
                this.entities.filter(function (entity) {
                    return entity.listView().enabled;
                }).map(function (entity, index) {
                    var collection = new _Collection2['default']();
                    var listView = entity.listView();
                    collection.setEntity(entity);
                    collection.perPage(listView.perPage());
                    collection.sortField(listView.sortField());
                    collection.sortDir(listView.sortDir());
                    collection.order(index);
                    // use only the first 3 cols
                    collection.fields(listView.fields().filter(function (el, index) {
                        return index < 3;
                    }));
                    dashboard.addCollection(collection);
                });
            }
            return dashboard;
        }
    }, {
        key: 'customTemplate',
        value: function customTemplate(_customTemplate) {
            if (!arguments.length) return this._customTemplate;
            this._customTemplate = _customTemplate;
            return this;
        }
    }, {
        key: 'baseApiUrl',
        value: function baseApiUrl(url) {
            if (!arguments.length) return this._baseApiUrl;
            this._baseApiUrl = url;
            return this;
        }
    }, {
        key: 'addEntity',
        value: function addEntity(entity) {
            if (!entity) {
                throw new Error("No entity given");
            }

            this._entities.push(entity);

            return this;
        }
    }, {
        key: 'getEntity',
        value: function getEntity(entityName) {
            var foundEntity = this._entities.filter(function (e) {
                return e.name() === entityName;
            })[0];
            if (!foundEntity) {
                throw new Error('Unable to find entity "' + entityName + '"');
            }

            return foundEntity;
        }
    }, {
        key: 'hasEntity',
        value: function hasEntity(fieldName) {
            return !!this._entities.filter(function (f) {
                return f.name() === fieldName;
            }).length;
        }
    }, {
        key: 'getViewByEntityAndType',
        value: function getViewByEntityAndType(entityName, type) {
            return this._entities.filter(function (e) {
                return e.name() === entityName;
            })[0].views[type];
        }
    }, {
        key: 'getErrorMessage',
        value: function getErrorMessage(response) {
            if (typeof this._errorMessage === 'function') {
                return this._errorMessage(response);
            }

            return this._errorMessage;
        }
    }, {
        key: 'errorMessage',
        value: function errorMessage(_errorMessage) {
            if (!arguments.length) return this._errorMessage;
            this._errorMessage = _errorMessage;
            return this;
        }
    }, {
        key: 'getErrorMessageFor',
        value: function getErrorMessageFor(view, response) {
            return view.getErrorMessage(response) || view.getEntity().getErrorMessage(response) || this.getErrorMessage(response);
        }
    }, {
        key: 'getEntityNames',
        value: function getEntityNames() {
            return this.entities.map(function (f) {
                return f.name();
            });
        }
    }, {
        key: 'entities',
        get: function get() {
            return this._entities;
        }
    }]);

    return Application;
})();

exports['default'] = Application;
module.exports = exports['default'];
//# sourceMappingURL=Application.js.map