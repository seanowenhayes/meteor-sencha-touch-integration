Ext.define('STI.view.Main', {
    extend: 'Ext.navigation.View',
    xtype: 'main',
    requires: [
        'STI.view.category.List',
        'STI.view.category.Create'
    ],
    config: {
        items: [
            {
                title: 'List',
                iconCls: 'home',
                xtype: 'categorylist',
                layout: 'fit',
                items: [{
                    xtype: 'categorycreate',
                    docked: 'top'
                }]
            }
        ]
    }
});
