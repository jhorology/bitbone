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
            this.initClipLauncherScenesOrSlot(attributes, options);
            this.api = options.api;
            this.initialized = true;
        },

        initClipLauncherScenesOrSlot: function(attributes, options) {
        },

        // Bitwig API wrapper methods
        // -------------

        launch: function() {
            this.api.launch(this.get('slot'));
        }
    });

    // ClipLauncherScenesOrSlots
    // -------------
    //
    // Options
    //
    //   oneBased     boolean default false
    //
    var ClipLauncherScenesOrSlots =  Backbone.Collection.extend({
        model: ClipLauncherScenesOrSlot,

        initialize: function(models, options, api) {
            this.initClipLauncherScenesOrSlots(models, options, api);
            this.api = api;
            this.oneBased = options.oneBase;
            this.initialized = true;
        },

        initClipLauncherScenesOrSlots: function(models, options, api) {
            var context = this;
            api.addNameObserver(
                function(slot, value) {
                    context.add({slot:context.slotId(slot), name:value},
                                {observed:true, merge:true, api:api});
                });
        },

        slotId: function(slot) {
            return this.oneBased ? slot + 1 : slot;
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
