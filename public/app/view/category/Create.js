/*globals Ext: true*/
Ext.define('STI.view.category.Create', {

    extend: 'Ext.Container',

    xtype: 'categorycreate',

    config: {
        layout: 'hbox',
        padding: 10,
        items: [{
            xtype: 'textfield',
            itemId: 'createCategoryTextField',
            name: 'name',
            label: 'new category',
            placeHolder: 'name',
            flex: 1
        }, {
            xtype: 'button',
            text: '+',
            itemId: 'createCategoryButton',
            margin: 5
        }]
    }
});