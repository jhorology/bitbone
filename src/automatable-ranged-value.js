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
    var AutomatableRangedValue = RangedValue.extend({
        initialize: function(attributes, options, api) {
            this.initAutomatableRangedValue(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initAutomatableRangedValue: function(attributes, options, api) {
            var context = this;

            this.initRangedValue(attributes, options, api);

            // options defaults
            _.defaults(options, {
                nameMaxChars: 12,
                nameFallback: '',
                textMaxChars: 12,
                textFallback: ''
            });

            api.addNameObserver(options.nameMaxChars, options.nameFallback, function(value) {
                context.set('name', value, {observed:true});
            });

            api.addValueDisplayObserver(options.textMaxChars, options.textFallback,function(value) {
                context.set('text', value, {observed:true});
            });
            return this;
        },

        reset: function() {
            this.api.reset();
            return this;
        },

        // Sets if this value should be indicated in the GUI
        // as mapped. (Colored dots)
        setIndication: function(shouldIndicate) {
            this.api.setIndication(shouldIndicate);
            return this;
        },

        // Set label of the mapped hardware parameter shown in the application
        // for certain cases (ex. for control learn)
        setLabel: function(label) {
            this.api.setLabel(label);
            return this;
        },

        touch: function(isBeingTouched) {
            this.api.touch(isBeingTouched);
            return this;
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
    root.bitbone.AutomatableRangedValueCollection = AutomatableRangedValueCollection;

}(this, host, Backbone, _));
