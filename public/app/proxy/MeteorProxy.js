/*globals Ext: true*/
Ext.define('STI.proxy.MeteorProxy', {
    extend: 'Ext.data.proxy.Proxy',
    alias: 'proxy.meteor',

    config: {

        /**
         * The meteor collection to use for storage.
         */
        collection: null,

        cursor: null
    },

    create: function (operation, callback, scope) {
        var records = operation.getRecords(),
            collection = this.getCollection(),
            data,
            allocatedId;

        operation.setStarted();

        Ext.Array.each(records, function (record) {
            data = record.getData(true);
            delete data._id;
            allocatedId = collection.insert(data);
            record.setId(allocatedId);
        });

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback === 'function') {
            callback.call(scope || this, operation);
        }
    },

    read: function (operation, callback, scope) {
        var records = [],
            model = this.getModel(),
            idProperty = model.getIdProperty(),
            params = operation.getParams() || {},
            collection = this.getCollection(),
            id = params[idProperty],
            senchaSorters = operation.getSorters(),
            meteorSorters,
            meteorFilters,
            filters = operation.getFilters(),
            start = operation.getStart(),
            limit = operation.getLimit(),
            options = {},
            record,
            cursor;

        //read a single record
        if (id !== undefined) {
            record = collection.findOne({_id: id});
            if (record) {
                records.push(record);
                operation.setSuccessful();
            }
        } else {
            meteorSorters = this.senchaSortersToMeteorSorters(senchaSorters);
            meteorFilters = this.senchaFilterToMeteorFilter(filters);
            options.sort = meteorSorters;
            options.limit = limit;
            options.skip = start;
            cursor = collection.find(meteorFilters, options);
            this.setCursor(cursor);
            records = cursor.fetch();
            operation.setSuccessful();
        }

        operation.setCompleted();

        operation.setResultSet(Ext.create('Ext.data.ResultSet', {
            records: records,
            total: records.length,
            loaded: true
        }));
        operation.setRecords(records);

        if (typeof callback === 'function') {
            callback.call(scope || this, operation);
        }
    },

    update: function (operation, callback, scope) {
        var records = operation.getRecords(),
            collection = this.getCollection(),
            id,
            data;

        operation.setStarted();

        Ext.Array.each(records, function (record) {
            id = record.getId();
            data = record.getData(true);
            collection.update({_id: id}, data);
        });

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback === 'function') {
            callback.call(scope || this, operation);
        }
    },

    destroy: function (operation, callback, scope) {
        var records = operation.getRecords(),
            collection = this.getCollection();

        operation.setStarted();

        Ext.Array.each(records, function (record) {
            var id = record.getId();
            collection.remove({_id: id});
        });

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback === 'function') {
            callback.call(scope || this, operation);
        }
    },

    /**
     * private
     * @param sorters [Sorter]
     * @return sorters
     */
    senchaSortersToMeteorSorters: function (sorters) {
        var convertedSorters = [];
        if (sorters && sorters.length) {
            convertedSorters = sorters.map(function (sorter) {
                var direction = sorter.getDirection() || 'asc',
                    field = sorter.getProperty();
                return direction && field ? [field, direction] : false;
            });
        }
        return convertedSorters;
    },

    senchaFilterToMeteorFilter: function (senchaFilters) {
        console.log(senchaFilters);
        var meteorFilters = {};
        if (senchaFilters && senchaFilters.length) {
            Ext.Array.each(senchaFilters, function (filter) {
                var property = filter.getProperty(),
                    value = filter.getValue();
                meteorFilters[property] = value;
            });
        }
        return meteorFilters;
    },

    /**
     * Listen to changes on the cursor.
     * @param newCursor
     * @param oldCursor
     */
    updateCursor: function (newCursor, oldCursor) {
        if (newCursor) {
            // TODO listen for changes and push them into the store.
            // listen
//            newCursor.observeChanges({
//                added: console.log
//            });
        }
        if (oldCursor) {
            //cleanup
        }
    }
});