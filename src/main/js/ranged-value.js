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
            this.initBooleanValue(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initRangedValue: function (attributes, options, api) {
            var context = this;

            this.range = _.isNumber(options.range) ? options.range : 128;

            api.addValueObserver(this.range, function (value) {
                context.set('value', value, {observed: true});
            });

            this.on('change:value', function (model, value, options) {
                // if changed by user script
                options.observed || this.initialized &&
                    api.set(value, _.isNumber(options.range) ? options.range : this.range);
            });
        },

        // Increments/Decrements the value.
        inc: function (delta, resolution) {
            var range = _.isNumber(resolution) ? resolution : this.range;
            this.api.inc(delta, range);
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
