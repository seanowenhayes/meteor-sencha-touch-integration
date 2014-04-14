/*globals Ext: true*/
Ext.define('STI.controller.CategoryCtrl', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            main: 'main',
            createCategoryTextField: 'categorycreate #createCategoryTextField',
            createCategoryButton: 'categorycreate #createCategoryButton',
            categoryList: 'categorylist',
            categorySaveButton: 'categoryedit #categorySaveButton',
            categoryEdit: 'categoryedit'
        },
        control: {
            createCategoryButton: {
                tap: 'createCategory'
            },
            categoryList: {
                itemtap: 'openCategory'
            },
            categorySaveButton: {
                tap: 'saveCategory'
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

    },

    openCategory: function (list, index, target, record) {
        var nav = this.getMain();
        nav.push({
            xtype: 'categoryedit',
            record: record
        });
    },

    saveCategory: function () {
        var me = this,
            nav = me.getMain(),
            categoryEdit = me.getCategoryEdit(),
            editedValues = categoryEdit.getValues(),
            record = categoryEdit.getRecord();
        record.set(editedValues);
        nav.pop();
    }
});
