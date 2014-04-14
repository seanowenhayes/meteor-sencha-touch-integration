/*global Ext: true*/
Ext.define('STI.model.Category', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            { name: 'name', type: 'string' }
        ],
        idProperty: '_id'
    }
});
