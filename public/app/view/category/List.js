/*globals Ext: true*/
Ext.define('STI.view.category.List', {
    extend: 'Ext.List',
    xtype: 'categorylist',
    requires: ['STI.store.Categories'],
    config: {
        store: 'CategoryStore',
        itemTpl: 'Name: {name}'
    }
});