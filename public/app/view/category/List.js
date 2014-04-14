/*globals Ext: true*/
Ext.define('STI.view.category.List', {
    extend: 'Ext.List',
    xtype: 'categorylist',
    requires: ['STI.store.Categories', 'STI.view.category.Edit'],
    config: {
        store: 'CategoryStore',
        itemTpl: 'Name: {name}'
    }
});