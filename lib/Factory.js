"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Application = require("./Application");

var _Application2 = _interopRequireDefault(_Application);

var _EntityEntity = require("./Entity/Entity");

var _EntityEntity2 = _interopRequireDefault(_EntityEntity);

var _DataStoreDataStore = require("./DataStore/DataStore");

var _DataStoreDataStore2 = _interopRequireDefault(_DataStoreDataStore);

var _UtilsPromisesResolver = require("./Utils/PromisesResolver");

var _UtilsPromisesResolver2 = _interopRequireDefault(_UtilsPromisesResolver);

var _QueriesReadQueries = require("./Queries/ReadQueries");

var _QueriesReadQueries2 = _interopRequireDefault(_QueriesReadQueries);

var _QueriesWriteQueries = require("./Queries/WriteQueries");

var _QueriesWriteQueries2 = _interopRequireDefault(_QueriesWriteQueries);

var _FieldField = require("./Field/Field");

var _FieldField2 = _interopRequireDefault(_FieldField);

var _FieldBooleanField = require("./Field/BooleanField");

var _FieldBooleanField2 = _interopRequireDefault(_FieldBooleanField);

var _FieldChoiceField = require("./Field/ChoiceField");

var _FieldChoiceField2 = _interopRequireDefault(_FieldChoiceField);

var _FieldChoicesField = require("./Field/ChoicesField");

var _FieldChoicesField2 = _interopRequireDefault(_FieldChoicesField);

var _FieldDateField = require("./Field/DateField");

var _FieldDateField2 = _interopRequireDefault(_FieldDateField);

var _FieldDateTimeField = require("./Field/DateTimeField");

var _FieldDateTimeField2 = _interopRequireDefault(_FieldDateTimeField);

var _FieldEmailField = require("./Field/EmailField");

var _FieldEmailField2 = _interopRequireDefault(_FieldEmailField);

var _FieldEmbeddedListField = require("./Field/EmbeddedListField");

var _FieldEmbeddedListField2 = _interopRequireDefault(_FieldEmbeddedListField);

var _FieldFloatFieldJs = require("./Field/FloatField.js");

var _FieldFloatFieldJs2 = _interopRequireDefault(_FieldFloatFieldJs);

var _FieldFileField = require("./Field/FileField");

var _FieldFileField2 = _interopRequireDefault(_FieldFileField);

var _FieldJsonField = require("./Field/JsonField");

var _FieldJsonField2 = _interopRequireDefault(_FieldJsonField);

var _FieldNumberField = require("./Field/NumberField");

var _FieldNumberField2 = _interopRequireDefault(_FieldNumberField);

var _FieldPasswordField = require("./Field/PasswordField");

var _FieldPasswordField2 = _interopRequireDefault(_FieldPasswordField);

var _FieldReferenceField = require("./Field/ReferenceField");

var _FieldReferenceField2 = _interopRequireDefault(_FieldReferenceField);

var _FieldReferencedListField = require("./Field/ReferencedListField");

var _FieldReferencedListField2 = _interopRequireDefault(_FieldReferencedListField);

var _FieldReferenceManyField = require("./Field/ReferenceManyField");

var _FieldReferenceManyField2 = _interopRequireDefault(_FieldReferenceManyField);

var _FieldTemplateField = require("./Field/TemplateField");

var _FieldTemplateField2 = _interopRequireDefault(_FieldTemplateField);

var _FieldTextField = require("./Field/TextField");

var _FieldTextField2 = _interopRequireDefault(_FieldTextField);

var _FieldWysiwygField = require("./Field/WysiwygField");

var _FieldWysiwygField2 = _interopRequireDefault(_FieldWysiwygField);

var _MenuMenu = require('./Menu/Menu');

var _MenuMenu2 = _interopRequireDefault(_MenuMenu);

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _Dashboard = require('./Dashboard');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _Entry = require('./Entry');

var _Entry2 = _interopRequireDefault(_Entry);

var Factory = (function () {
    function Factory() {
        _classCallCheck(this, Factory);

        this._fieldTypes = [];
        this._init();
    }

    _createClass(Factory, [{
        key: "application",
        value: function application(name, debug) {
            return new _Application2["default"](name, debug);
        }
    }, {
        key: "entity",
        value: function entity(name) {
            return new _EntityEntity2["default"](name);
        }
    }, {
        key: "field",
        value: function field(name, type) {
            type = type || 'string';

            if (!(type in this._fieldTypes)) {
                throw new Error("Unknown field type \"" + type + "\".");
            }

            return new this._fieldTypes[type](name);
        }
    }, {
        key: "registerFieldType",
        value: function registerFieldType(name, constructor) {
            this._fieldTypes[name] = constructor;
        }
    }, {
        key: "getFieldConstructor",
        value: function getFieldConstructor(name) {
            return this._fieldTypes[name];
        }
    }, {
        key: "menu",
        value: function menu(entity) {
            var menu = new _MenuMenu2["default"]();
            if (entity) {
                menu.populateFromEntity(entity);
            }
            return menu;
        }
    }, {
        key: "dashboard",
        value: function dashboard() {
            return new _Dashboard2["default"]();
        }
    }, {
        key: "collection",
        value: function collection(entity) {
            var collection = new _Collection2["default"]();
            if (entity) {
                collection.setEntity(entity);
            }
            return collection;
        }
    }, {
        key: "getEntryConstructor",
        value: function getEntryConstructor() {
            return _Entry2["default"];
        }
    }, {
        key: "getDataStore",
        value: function getDataStore() {
            return new _DataStoreDataStore2["default"]();
        }
    }, {
        key: "getReadQueries",
        value: function getReadQueries(RestWrapper, PromisesResolver, Application) {
            return new _QueriesReadQueries2["default"](RestWrapper, PromisesResolver, Application);
        }
    }, {
        key: "getWriteQueries",
        value: function getWriteQueries(RestWrapper, PromisesResolver, Application) {
            return new _QueriesWriteQueries2["default"](RestWrapper, PromisesResolver, Application);
        }
    }, {
        key: "getPromisesResolver",
        value: function getPromisesResolver() {
            return _UtilsPromisesResolver2["default"];
        }
    }, {
        key: "_init",
        value: function _init() {
            this.registerFieldType('boolean', _FieldBooleanField2["default"]);
            this.registerFieldType('choice', _FieldChoiceField2["default"]);
            this.registerFieldType('choices', _FieldChoicesField2["default"]);
            this.registerFieldType('date', _FieldDateField2["default"]);
            this.registerFieldType('datetime', _FieldDateTimeField2["default"]);
            this.registerFieldType('email', _FieldEmailField2["default"]);
            this.registerFieldType('embedded_list', _FieldEmbeddedListField2["default"]);
            this.registerFieldType('float', _FieldFloatFieldJs2["default"]);
            this.registerFieldType('string', _FieldField2["default"]);
            this.registerFieldType('file', _FieldFileField2["default"]);
            this.registerFieldType('json', _FieldJsonField2["default"]);
            this.registerFieldType('number', _FieldNumberField2["default"]);
            this.registerFieldType('password', _FieldPasswordField2["default"]);
            this.registerFieldType('reference', _FieldReferenceField2["default"]);
            this.registerFieldType('reference_many', _FieldReferenceManyField2["default"]);
            this.registerFieldType('referenced_list', _FieldReferencedListField2["default"]);
            this.registerFieldType('template', _FieldTemplateField2["default"]);
            this.registerFieldType('text', _FieldTextField2["default"]);
            this.registerFieldType('wysiwyg', _FieldWysiwygField2["default"]);
        }
    }]);

    return Factory;
})();

exports["default"] = Factory;
module.exports = exports["default"];
//# sourceMappingURL=Factory.js.map