/*
* A list of field types to instruct ng-admin to treat
* as Reference fields. This fixes a problem where fields
* that extended Reference would not be recognised as Reference
* fields and so would not get their data correctly
*/
const REFERENCE_FIELD_TYPES = [
    'reference',
    'reference_many',
    'filteredReference', // custom
    'addToListReference' // custom
]

function isReferenceField (field) {
    return REFERENCE_FIELD_TYPES.includes(field.type())
}

export default {

    getReferencedLists(fields) {
        return this.indexByName(fields.filter(f => f.type() === 'referenced_list'));
    },
    getReferences(fields, withRemoteComplete, optimized = null) {
        let references = fields.filter(
            /* custom  */
            f => isReferenceField(f)
            /* custome */
        );
        if (withRemoteComplete === true) {
            references = references.filter(r => r.remoteComplete());
        } else if (withRemoteComplete === false) {
            references = references.filter(r => !r.remoteComplete());
        }
        if (optimized !== null) {
            references = references.filter(r => r.hasSingleApiCall() === optimized)
        }
        return this.indexByName(references);
    },
    getNonOptimizedReferences(fields, withRemoteComplete) {
        return this.getReferences(fields, withRemoteComplete, false);
    },
    getOptimizedReferences(fields, withRemoteComplete) {
        return this.getReferences(fields, withRemoteComplete, true);
    },
    indexByName(references) {
        return references.reduce((referencesByName, reference) => {
            referencesByName[reference.name()] = reference;
            return referencesByName;
        }, {});
    }
};


