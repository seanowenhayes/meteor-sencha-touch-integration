/*global Ext: true*/
Ext.define('STI.model.Category', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name', type: 'string' }
        ],

        // Make sure to use MongoDb _id property.
        idProperty: '_id'
    }
});
