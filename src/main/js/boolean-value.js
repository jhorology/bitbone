(function(root, Bitwig, Backbone, _) {
    'use strict';

    // BooleanValue
    // -------------
    //
    // Attributes
    //   boolean r/w value
    //
    var BooleanValue =  Backbone.Model.extend({
        initialize: function(attributes, options, api) {
            this.initBooleanValue(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initBooleanValue: function(attributes, options, api) {
            var context = this;

            api.addValueObserver(function(value) {
                context.set('value', value, {observed:true});
            });
            this.on('change:value', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized && this.api.set(value);
            });
        },

        toggle: function() {
            this.api.toggle();
        }

    },{

        create: function(booleanValue, options) {
            return new BooleanValue(null, options, booleanValue);
        }

    });

    var BooleanValueCollection = Backbone.Collection.extend({
        model: BooleanValue
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.BooleanValue = BooleanValue;
    root.bitbone.BooleanValueCollection = BooleanValueCollection;

}(this, host, Backbone, _));
