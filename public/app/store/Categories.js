/*globals Ext: true*/
Ext.define('STI.store.Categories', {
    extend: 'Ext.data.Store',
    requires: ['STI.model.Category', 'STI.proxy.MeteorProxy'],
    config: {
        model: 'STI.model.Category',
        storeId: 'CategoryStore',
        autoSync: true,
        autoLoad: true,

        // Let meteor do the grouping filtering and sorting.
        remoteGroup: true,
        remoteFilter: true,
        remoteSort: true,
        sorters: ['name'],
        filters: [{
            property: 'name',
            value: 'a'
        }],
        proxy: {
            type: 'meteor',
            collection: Categories
        }
    }
});