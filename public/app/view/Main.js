Ext.define('STI.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'STI.view.category.List',
        'STI.view.category.Create'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'List',
                iconCls: 'home',
                xtype: 'categorylist',
                layout: 'fit'
            },
            {
                xtype: 'categorycreate',
                docked: 'top'
            }
        ]
    }
});
