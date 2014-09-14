(function(root, Bitwig, Backbone, _) {
    'use strict';

    // ClipLauncherScenesOrSlot
    // -------------
    //
    // Attributes
    //
    //   slot       Number r
    //   name       string r
    //
    var ClipLauncherScenesOrSlot =  Backbone.Model.extend({
        idAttribute: 'slot',
        initialize: function(attributes, options, api) {
            this.initClipLauncherScenesOrSlot(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initClipLauncherScenesOrSlot: function(attributes, options, api) {
        },

        // Bitwig API wrapper methods
        // -------------

        launch: function() {
            this.api.launch(this.get('slot'));
        }
    }, {
        // factory method
        create: function(attributes, options, api) {
            return new ClipLauncherScenesOrSlots(attributes, options, api);
        }
    });

    // ClipLauncherScenesOrSlots
    // -------------
    // Collection of ClipLauncherScenesOrSlot
    //
    var ClipLauncherScenesOrSlots =  Backbone.Collection.extend({
        model: ClipLauncherScenesOrSlot,

        initialize: function(models, options, api) {
            this.inttClipLauncherScenesOrSlots(models, options, api);
            this.api = api;
            this.initialized = true;
        },

        initClipLauncherScenesOrSlots: function(models, options, api) {
            var context = this;
            api.addNameObserver(
                function(slot, value) {
                    context.add({slot:slot + (_.isNumber(options.oneBased) ? 1 : 0), name:value},
                                {observed:true, merge:true});
                });
        },

        // Bitwig API wrapper methods
        // -------------

        returnToArrangement: function() {
            this.api.returnToArrangement();
        },

        stop: function() {
            this.api.stop();
        }

    }, {

        // factory method
        create: function(api, options) {
            return new ClipLauncherScenesOrSlots(undefined, options, api);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.ClipLauncherScenesOrSlot = ClipLauncherScenesOrSlot;
    root.bitbone.ClipLauncherScenesOrSlots = ClipLauncherScenesOrSlots;

}(this, host, Backbone, _));
