"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _UtilsStringUtils = require("../Utils/stringUtils");

var _UtilsStringUtils2 = _interopRequireDefault(_UtilsStringUtils);

var _FieldField = require("../Field/Field");

var _FieldField2 = _interopRequireDefault(_FieldField);

var _ViewDashboardView = require('../View/DashboardView');

var _ViewDashboardView2 = _interopRequireDefault(_ViewDashboardView);

var _ViewMenuView = require('../View/MenuView');

var _ViewMenuView2 = _interopRequireDefault(_ViewMenuView);

var _ViewListView = require('../View/ListView');

var _ViewListView2 = _interopRequireDefault(_ViewListView);

var _ViewCreateView = require('../View/CreateView');

var _ViewCreateView2 = _interopRequireDefault(_ViewCreateView);

var _ViewEditView = require('../View/EditView');

var _ViewEditView2 = _interopRequireDefault(_ViewEditView);

var _ViewDeleteView = require('../View/DeleteView');

var _ViewDeleteView2 = _interopRequireDefault(_ViewDeleteView);

var _ViewShowView = require('../View/ShowView');

var _ViewShowView2 = _interopRequireDefault(_ViewShowView);

var _ViewBatchDeleteView = require('../View/BatchDeleteView');

var _ViewBatchDeleteView2 = _interopRequireDefault(_ViewBatchDeleteView);

var _ViewExportView = require('../View/ExportView');

var _ViewExportView2 = _interopRequireDefault(_ViewExportView);

var index = 0;

var Entity = (function () {
    function Entity(name) {
        _classCallCheck(this, Entity);

        this._name = name;
        this._uniqueId = this._name + '_' + index++;
        this._baseApiUrl = null;
        this._label = null;
        this._identifierField = new _FieldField2["default"]("id");
        this._isReadOnly = false;
        this._errorMessage = null;
        this._order = 0;
        this._url = null;
        this._createMethod = null; // manually set the HTTP-method for create operation, defaults to post
        this._updateMethod = null; // manually set the HTTP-method for update operation, defaults to put
        this._retrieveMethod = null; // manually set the HTTP-method for the get operation, defaults to get
        this._deleteMethod = null; // manually set the HTTP-method for the delete operation, defaults to delete

        this._initViews();
    }

    _createClass(Entity, [{
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
        key: "name",
        value: function name() {
            if (arguments.length) {
                this._name = arguments[0];
                return this;
            }

            return this._name;
        }
    }, {
        key: "menuView",
        value: function menuView() {
            return this._views["MenuView"];
        }
    }, {
        key: "dashboardView",
        value: function dashboardView() {
            return this._views["DashboardView"];
        }
    }, {
        key: "listView",
        value: function listView() {
            return this._views["ListView"];
        }
    }, {
        key: "creationView",
        value: function creationView() {
            return this._views["CreateView"];
        }
    }, {
        key: "editionView",
        value: function editionView() {
            return this._views["EditView"];
        }
    }, {
        key: "deletionView",
        value: function deletionView() {
            return this._views["DeleteView"];
        }
    }, {
        key: "batchDeleteView",
        value: function batchDeleteView() {
            return this._views["BatchDeleteView"];
        }
    }, {
        key: "exportView",
        value: function exportView() {
            return this._views["ExportView"];
        }
    }, {
        key: "showView",
        value: function showView() {
            return this._views["ShowView"];
        }
    }, {
        key: "baseApiUrl",
        value: function baseApiUrl(_baseApiUrl) {
            if (!arguments.length) return this._baseApiUrl;
            this._baseApiUrl = _baseApiUrl;
            return this;
        }
    }, {
        key: "_initViews",
        value: function _initViews() {
            this._views = {
                "DashboardView": new _ViewDashboardView2["default"]().setEntity(this),
                "MenuView": new _ViewMenuView2["default"]().setEntity(this),
                "ListView": new _ViewListView2["default"]().setEntity(this),
                "CreateView": new _ViewCreateView2["default"]().setEntity(this),
                "EditView": new _ViewEditView2["default"]().setEntity(this),
                "DeleteView": new _ViewDeleteView2["default"]().setEntity(this),
                "BatchDeleteView": new _ViewBatchDeleteView2["default"]().setEntity(this),
                "ExportView": new _ViewExportView2["default"]().setEntity(this),
                "ShowView": new _ViewShowView2["default"]().setEntity(this)
            };
        }
    }, {
        key: "identifier",
        value: function identifier(value) {
            if (!arguments.length) return this._identifierField;
            if (!(value instanceof _FieldField2["default"])) {
                throw new Error('Entity ' + this.name() + ': identifier must be an instance of Field.');
            }
            this._identifierField = value;
            return this;
        }
    }, {
        key: "readOnly",
        value: function readOnly() {
            this._isReadOnly = true;

            this._views["CreateView"].disable();
            this._views["EditView"].disable();
            this._views["DeleteView"].disable();
            this._views["BatchDeleteView"].disable();

            return this;
        }
    }, {
        key: "getErrorMessage",
        value: function getErrorMessage(response) {
            if (typeof this._errorMessage === 'function') {
                return this._errorMessage(response);
            }

            return this._errorMessage;
        }
    }, {
        key: "errorMessage",
        value: function errorMessage(_errorMessage) {
            if (!arguments.length) return this._errorMessage;
            this._errorMessage = _errorMessage;
            return this;
        }
    }, {
        key: "order",
        value: function order(_order) {
            if (!arguments.length) return this._order;
            this._order = _order;
            return this;
        }
    }, {
        key: "url",
        value: function url(_url) {
            if (!arguments.length) return this._url;
            this._url = _url;
            return this;
        }
    }, {
        key: "getUrl",
        value: function getUrl(viewType, identifierValue, identifierName) {
            if (typeof this._url === 'function') {
                return this._url(this.name(), viewType, identifierValue, identifierName);
            }

            return this._url;
        }
    }, {
        key: "createMethod",
        value: function createMethod(_createMethod) {
            if (!arguments.length) return this._createMethod;
            this._createMethod = _createMethod;
            return this;
        }
    }, {
        key: "updateMethod",
        value: function updateMethod(_updateMethod) {
            if (!arguments.length) return this._updateMethod;
            this._updateMethod = _updateMethod;
            return this;
        }
    }, {
        key: "retrieveMethod",
        value: function retrieveMethod(_retrieveMethod) {
            if (!arguments.length) return this._retrieveMethod;
            this._retrieveMethod = _retrieveMethod;
            return this;
        }
    }, {
        key: "deleteMethod",
        value: function deleteMethod(_deleteMethod) {
            if (!arguments.length) return this._deleteMethod;
            this._deleteMethod = _deleteMethod;
            return this;
        }
    }, {
        key: "uniqueId",
        get: function get() {
            return this._uniqueId;
        }
    }, {
        key: "views",
        get: function get() {
            return this._views;
        }
    }, {
        key: "isReadOnly",
        get: function get() {
            return this._isReadOnly;
        }
    }]);

    return Entity;
})();

exports["default"] = Entity;
module.exports = exports["default"];
//# sourceMappingURL=Entity.js.map