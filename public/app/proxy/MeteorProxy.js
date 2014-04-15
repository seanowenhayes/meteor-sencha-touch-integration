/*globals Ext: true*/
Ext.define('STI.proxy.MeteorProxy', {
    extend: 'Ext.data.proxy.Proxy',
    alias: 'proxy.meteor',

    config: {

        /**
         * The meteor collection to use for storage.
         */
        collection: null
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
            filters = operation.getFilters(),
            start = operation.getStart(),
            limit = operation.getLimit(),
            record;

        //read a single record
        if (id !== undefined) {
            record = collection.findOne({_id: id});
            if (record) {
                records.push(record);
                operation.setSuccessful();
            }
        } else {
            // TODO apply sorters, filters, start and limit.
            meteorSorters = this.senchaSortersToMeteorSorters(senchaSorters);

            records = collection.find({}, meteorSorters).fetch();
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
        var convertedSorters = {sort: []},
            sort;
        if (sorters && sorters.length) {
            sort = sorters.map(function (sorter) {
                var direction = sorter.getDirection() || 'asc',
                    field = sorter.getProperty();
                return direction && field ? [field, direction] : false;
            });
            convertedSorters.sort = sort;
        }
        return convertedSorters;
    }
});