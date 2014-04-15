/*global Ext: true*/
Ext.define('STI.view.category.Edit', {
    extend: 'Ext.form.Panel',
    xtype: 'categoryedit',
    requires: ['Ext.form.FieldSet'],
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
                        layout: 'hbox',
                        defaults: {
                            flex: 1,
                            margin: 5
                        },
                        items: [
                            {
                                xtype: 'button',
                                text: 'save',
                                ui: 'confirm-round',
                                itemId: 'categorySaveButton'
                            },
                            {
                                xtype: 'button',
                                text: 'delete',
                                ui: 'decline-round',
                                itemId: 'categoryDeleteButton'
                            }
                        ]
                    }

                ]
            }
        ]
    }
});