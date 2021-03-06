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

var CreateView = (function (_View) {
    _inherits(CreateView, _View);

    function CreateView(name) {
        _classCallCheck(this, CreateView);

        _get(Object.getPrototypeOf(CreateView.prototype), 'constructor', this).call(this, name);
        this._type = 'CreateView';
        this._submitCreationSuccess = null;
        this._submitCreationError = null;
    }

    /**
     * Add a function to be executed after the creation succeeds.
     *
     * This is the ideal place to use the response to update the entry, or
     * redirect to another view.
     *
     * If the function returns false, the default execution workflow is stopped.
     * This means that the function must provide a custom workflow.
     *
     * If the function throws an exception, the onSubmitError callback will
     * execute.
     *
     * The syntax depends on the framework calling the function.
     *
     * With ng-admin, the function can be an angular injectable, listing
     * required dependencies in an array. Among other, the function can receive
     * the following services:
     *  - $event: the form submission event
     *  - entry: the current Entry instance
     *  - entity: the current entity
     *  - form: the form object (for form validation and errors)
     *  - progression: the controller for the loading indicator
     *  - notification: the controller for top notifications
     *
     * The function can be asynchronous, in which case it should return
     * a Promise.
     *
     * @example
     *
     *     post.creationView().onSubmitSuccess(['progression', 'notification', '$state', 'entry', 'entity', function(progression, notification, $state, entry, entity) {
     *         // stop the progress bar
     *         progression.done();
     *         // add a notification
     *         notification.log(`Element #${entry._identifierValue} successfully created.`, { addnCls: 'humane-flatty-success' });
     *         // redirect to the list view
     *         $state.go($state.get('list'), { entity: entity.name() });
     *         // cancel the default action (redirect to the edition view)
     *         return false;
     *      }])
     *
     */

    _createClass(CreateView, [{
        key: 'onSubmitSuccess',
        value: function onSubmitSuccess(_onSubmitSuccess) {
            if (!arguments.length) return this._onSubmitSuccess;
            this._onSubmitSuccess = _onSubmitSuccess;
            return this;
        }

        /**
         * Add a function to be executed after the creation request receives a
         * failed http response from the server.
         *
         * This is the ideal place to use the response to update the entry, display
         * server-side validation error, or redirect to another view.
         *
         * If the function returns false, the default execution workflow is stopped.
         * This means that the function must provide a custom workflow.
         *
         * The syntax depends on the framework calling the function.
         *
         * With ng-admin, the function can be an angular injectable, listing
         * required dependencies in an array. Among other, the function can receive
         * the following services:
         *  - $event: the form submission event
         *  - error: the response from the server
         *  - errorMessage: the error message based on the response
         *  - entry: the current Entry instance
         *  - entity: the current entity
         *  - form: the form object (for form validation and errors)
         *  - progression: the controller for the loading indicator
         *  - notification: the controller for top notifications
         *
         * The function can be asynchronous, in which case it should return
         * a Promise.
         *
         * @example
         *
         *     post.creationView().onSubmitError(['error', 'form', 'progression', 'notification', function(error, form, progression, notification) {
         *         // mark fields based on errors from the response
         *         error.violations.forEach(violation => {
         *             if (form[violation.propertyPath]) {
         *                 form[violation.propertyPath].$valid = false;
         *             }
         *         });
         *         // stop the progress bar
         *         progression.done();
         *         // add a notification
         *         notification.log(`Some values are invalid, see details in the form`, { addnCls: 'humane-flatty-error' });
         *         // cancel the default action (default error messages)
         *         return false;
         *     }]);
         */
    }, {
        key: 'onSubmitError',
        value: function onSubmitError(_onSubmitError) {
            if (!arguments.length) return this._onSubmitError;
            this._onSubmitError = _onSubmitError;
            return this;
        }
    }]);

    return CreateView;
})(_View3['default']);

exports['default'] = CreateView;
module.exports = exports['default'];
//# sourceMappingURL=CreateView.js.map