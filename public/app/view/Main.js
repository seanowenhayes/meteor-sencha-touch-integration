Ext.define('STI.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'STI.view.category.List'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'List',
                iconCls: 'home',
                xtype: 'categorylist',
                layout: 'fit'
            }
        ]
    }
});
