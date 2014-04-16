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
            categoryDeleteButton: 'categoryedit #categoryDeleteButton',
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
            },
            categoryDeleteButton: {
                tap: 'deleteCategory'
            },
            createCategoryTextField: {
                keyup: 'createCategoryOnEnter'
            }
        },
        stores: ['Categories']
    },

    /**
     * Trigger the same action for pressing enter in the text field as for pressing the add button.
     * @param textfield
     * @param event
     */
    createCategoryOnEnter: function (textfield, event) {
        var keycode = event.browserEvent.keyCode;
        if (keycode === 13) {
            this.createCategory();
        }
    },

    deleteCategory: function () {
        var me = this,
            nav = me.getMain(),
            categoryEdit = me.getCategoryEdit(),
            categoryStore = Ext.getStore('CategoryStore'),
            record = categoryEdit.getRecord();
        categoryStore.remove(record);
        nav.pop();
    },

    createCategory: function () {
        var me = this,
            textField = me.getCreateCategoryTextField(),
            name = textField.getValue(),
            categoryStore = Ext.getStore('CategoryStore');

        categoryStore.add({name: name});
        textField.setValue('');
        textField.focus();
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
