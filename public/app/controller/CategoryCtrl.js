/*globals Ext: true*/
Ext.define('STI.controller.CategoryCtrl', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            createCategoryTextField: 'categorycreate #createCategoryTextField',
            createCategoryButton: 'categorycreate #createCategoryButton'
        },
        control: {
            createCategoryButton: {
                tap: 'createCategory'
            }
        },
        stores: ['Categories']
    },

    createCategory: function (button) {
        var me = this,
            textField = me.getCreateCategoryTextField(),
            name = textField.getValue(),
            categoryStore = Ext.getStore('CategoryStore');

        categoryStore.add({name: name});

    }
});
