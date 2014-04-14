/*globals Ext: true*/
Ext.define('STI.store.Categories', {
    extend: 'Ext.data.Store',
    requires: ['STI.model.Category', 'STI.proxy.MeteorProxy'],
    config: {
        model: 'STI.model.Category',
        storeId: 'CategoryStore',
        autoSync: true,
        autoLoad: true,
        proxy: {
            type: 'meteor',
            collection: Categories
        }
    }
});