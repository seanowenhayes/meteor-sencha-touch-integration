/*global Ext: true*/
Ext.define('STI.view.category.Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'categoryedit',
    config: {
        items: [
            {
                xtype: 'fieldset',
                title: 'edit category',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Name',
                        name: 'name'
                    },
                    {
                        xtype: 'button',
                        text: 'save',
                        ui: 'action',
                        itemId: 'categorySaveButton'
                    }
                ]
            }
        ]
    }
});