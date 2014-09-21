(function (root, Bitwig, Backbone, _) {
    'use strict';

    // RangedValue
    // -------------
    //
    // Attributes
    //   value   Number r/w
    //
    // Options
    //   range   Number default 128
    //
    var RangedValue = Backbone.Model.extend({

        initialize: function (attributes, options, api) {
            options || (options = {});
            this.initBooleanValue(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initRangedValue: function (attributes, options, api) {
            _.defaults(options, {
                range: 128
            });

            var context = this;
            
            this.range = options.range;

            api.addValueObserver(this.range, function (value) {
                context.set('value', value, {observed: true});
            });

            this.on('change:value', function (model, value, options) {
                options.observed || this.initialized &&
                    api.set(value, _.isNumber(options.range) ? options.range : this.range);
            });
            return this;
        },

        // Increments/Decrements the value.
        inc: function (delta, resolution) {
            var range = _.isNumber(resolution) ? resolution : this.range;
            this.api.inc(delta, range);
            return this;
        }

    },{

        create: function (rangedValue, options) {
            return new RangedValue(null, options, rangedValue);
        }

    });

    var RangedValueCollection = Backbone.Collection.extend({
        model: RangedValue
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.RangedValue = RangedValue;
    root.bitbone.RangedValueCollection = RangedValueCollection;

}(this, host, Backbone, _));
