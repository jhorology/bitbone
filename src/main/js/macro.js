(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var AutomatableRangedValue = root.bitbone.AutomatableRangedValue,
        ModulationSource = root.bitbone.ModulationSource;

    // Macro
    // -------------
    //
    // Attributes
    //
    //   label             string r
    //   amount            AutomatableRangedValue r
    //   modulationSource  ModulationSource r
    //
    // Options
    //
    //   labelMaxChars  Number default 12
    //   labelFallback   string default ''
    //   range          Number default 128
    //
    var Macro = Backbone.Model.extend({
        initialize: function(attributes, options, macro) {
            this.initMacro(attributes, options, macro);
            this.api = macro;
            this.initialized = true;
        },

        initMacro: function(attributes, options, api) {
            var context = this;

            api.addLabelbserver(
                _.isNumber(options.labelMaxChars) ? options.labelMaxChars : 12,
                _.isString(options.labelFallback) ? options.labelFallback : '',
                function(value) {
                    context.set('label', value, {observed:true});
                });

            this.set('amount', AutomatableRangedValue.create(api.getAmount(), options));
            this.set('modulationSource', ModulationSource.create(api.getModulationSource()));
        }

    },{

        create: function(automatedRangedValue, options) {
            return new AutomatableRangedValue(null, options, automatedRangedValue);
        }

    });

    // MacroCollection
    // -------------
    var MacroCollection = Backbone.Collection.extend({
        model: Macro
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Macro = Macro;
    root.bitbone.MacroCollection = MacroCollection;

}(this, host, Backbone, _));
