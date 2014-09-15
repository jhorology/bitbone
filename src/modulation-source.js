(function(root, bitwig, Backbone, _) {
    'use strict';

    // ModulationSource
    // -------------
    //
    // Attributes
    //  mapping  boolean r/w
    //  name     string r
    //
    // Options
    //   nameMaxChars  Number default 12
    //   nameFallback  string default ''
    //
    var ModulationSource = Backbone.Model.extend({
        initialize: function(attributes, options, api) {
            this.initModulationSource(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initModulationSource: function(attributes, options, api) {
            var context = this;

            api.addIsMappingObserver(function(value) {
                context.set('mapping', value, {observed:true});
            });
            this.on('change:mapping', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized &&
                    this.api.toggleMapping();
            });
            api.addNameObserver(
                _.isNumber(options.nameMaxChars) ? options.nameMaxChars : 12,
                _.isString(options.nameFallback) ? options.nameFallback : '',
                function(value) {
                    context.set('name', value, {observed:true});
                });
        },

        toggleMapping: function() {
            this.api.toggleMapping();
        }

    },{

        create: function(modulationSource, options) {
            return new ModulationSource(null, options, modulationSource);
        }

    });

    // ModulationSourceCollection
    // -------------
    var ModulationSourceCollection = Backbone.Collection.extend({
        model: ModulationSource
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.ModulationSource = ModulationSource;
    root.bitbone.ModulationSourceCollection = ModulationSourceCollection;

}(this, host, Backbone, _));
