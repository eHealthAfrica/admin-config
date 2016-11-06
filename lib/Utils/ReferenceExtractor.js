/*
* A list of field types to instruct ng-admin to treat
* as Reference fields. This fixes a problem where fields
* that extended Reference would not be recognised as Reference
* fields and so would not get their data correctly
*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var REFERENCE_FIELD_TYPES = ['reference', 'reference_many', 'filteredReference', // custom
'addToListReference' // custom
];

function isReferenceField(field) {
    return REFERENCE_FIELD_TYPES.includes(field.type());
}

/*
* Same as above but for Reference Lists
*/
var REFERENCE_LIST_FIELD_TYPES = ['referenced_list', 'groupedReferenceList' // custom
];

function isReferenceListField(field) {
    return REFERENCE_LIST_FIELD_TYPES.includes(field.type());
}

exports['default'] = {

    getReferencedLists: function getReferencedLists(fields) {
        return this.indexByName(fields.filter(
        /* custom */
        function (f) {
            return isReferenceListField(f);
        }
        /* custom */
        ));
    },
    getReferences: function getReferences(fields, withRemoteComplete) {
        var optimized = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        var references = fields.filter(
        /* custom */
        function (f) {
            return isReferenceField(f);
        }
        /* custome */
        );
        if (withRemoteComplete === true) {
            references = references.filter(function (r) {
                return r.remoteComplete();
            });
        } else if (withRemoteComplete === false) {
            references = references.filter(function (r) {
                return !r.remoteComplete();
            });
        }
        if (optimized !== null) {
            references = references.filter(function (r) {
                return r.hasSingleApiCall() === optimized;
            });
        }
        return this.indexByName(references);
    },
    getNonOptimizedReferences: function getNonOptimizedReferences(fields, withRemoteComplete) {
        return this.getReferences(fields, withRemoteComplete, false);
    },
    getOptimizedReferences: function getOptimizedReferences(fields, withRemoteComplete) {
        return this.getReferences(fields, withRemoteComplete, true);
    },
    indexByName: function indexByName(references) {
        return references.reduce(function (referencesByName, reference) {
            referencesByName[reference.name()] = reference;
            return referencesByName;
        }, {});
    }
};
module.exports = exports['default'];
//# sourceMappingURL=ReferenceExtractor.js.map