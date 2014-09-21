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
            options || (options = {});
            this.initModulationSource(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initModulationSource: function(attributes, options, api) {
            var context = this;
            _.defaults(options, {
                nameMaxChars: 12,
                nameFallback: ''
            });


            api.addIsMappingObserver(function(value) {
                context.set('mapping', value, {observed:true});
            });
            api.addNameObserver(options.nameMaxChars, options.nameFallback, function(value) {
                context.set('name', value, {observed:true});
            });

            this.on('change:mapping', function(model, value, options) {
                options.observed || this.initialized && this.api.toggleMapping();
            });
            return this;
        },
        
        toggleMapping: function() {
            this.api.toggleMapping();
            return this;
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
