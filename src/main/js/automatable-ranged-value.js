(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var RangedValue = root.bitbone.RangedValue;

    // AutomatableRangedValue
    // -------------
    //
    // Attributes
    //
    //   name    string r
    //   text    string r
    //
    // Options
    //
    //   nameMaxChars  Number default 12
    //   nameFallback  string default ''
    //   textMaxChars  Number default 12
    //   textFallback  string default ''
    //
    // extend RangedValue
    // -------------
    //
    // Attributes
    //   value   Number r/w
    //
    // Options
    //   range   Number default 128
    //
    var AutomatableRangedValue = RangedValue.extend({
        initialize: function(attributes, options, api) {
            this.initAutomatableRangedValue(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initAutomatableRangedValue: function(attributes, options, api) {
            var context = this;

            this.initRangedValue(attributes, options, api);

            api.addNameObserver(
                _.isNumber(options.nameMaxChars) ? options.nameMaxChars : 12,
                _.isString(options.nameFallback) ? options.nameFallback : '',
                function(value) {
                    context.set('name', value, {observed:true});
                });

            api.addValueDisplayObserver(
                _.isNumber(options.textMaxChars) ? options.textMaxChars : 12,
                _.isString(options.textFallback) ? options.textFallback : '',
                function(value) {
                    context.set('text', value, {observed:true});
                });
        },

        reset: function() {
            this.api.reset();
        },

        // Sets if this value should be indicated in the GUI
        // as mapped. (Colored dots)
        setIndication: function(shouldIndicate) {
            this.api.setIndication(shouldIndicate);
        },

        // Set label of the mapped hardware parameter shown in the application
        // for certain cases (ex. for control learn)
        setLabel: function(label) {
            this.api.setLabel(label);
        },

        touch: function(isBeingTouched) {
            this.api.touch(isBeingTouched);
        }
    },{

        create: function(automatableRangedValue, options) {
            return new AutomatableRangedValue(undefined, options,
                                              automatableRangedValue);
        }

    });

    var AutomatableRangedValueCollection = Backbone.Collection.extend({
        model: AutomatableRangedValue
    });

    // exports
    root.bitbone || (root.bitbone = {});
    root.bitbone.AutomatableRangedValue = AutomatableRangedValue;
    root.bitbone.AutomatableRangedValueCollection =
        AutomatableRangedValueCollection;

}(this, host, Backbone, _));
