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

            _.defaults(options, {
                labelMaxChars: 12,
                labelFallback: ''
            });

            var context = this;

            api.addLabelObserver(
                options.labelMaxChars,
                options.labelFallback,
                function(value) {
                    context.set('label', value, {observed:true});
                });

            this.set('amount', AutomatableRangedValue.create(api.getAmount(), options.amount));
            this.set('modulationSource',
                     ModulationSource.create(api.getModulationSource(), options.modulationSource));
        }

    },{

        create: function(automatedRangedValue, options) {
            return new Macro(null, options, automatedRangedValue);
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
