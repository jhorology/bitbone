(function(root, Bitwig, Backbone, _) {
    'use strict';

    // ClipLauncherSceneOrSlot
    // -------------
    //
    // Attributes
    //
    //   slot       Number r
    //   name       string r
    //
    var ClipLauncherSceneOrSlot =  Backbone.Model.extend({
        idAttribute: 'slot',
        initialize: function(attributes, options, api) {
            options || (options = {});
            this.initClipLauncherSceneOrSlot(attributes, options);
            this.api = options.api;
            this.initialized = true;
        },

        initClipLauncherSceneOrSlot: function(attributes, options) {
            return this;
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
    var ClipLauncherScenesOrSlots =  Backbone.Collection.extend({
        model: ClipLauncherSceneOrSlot,

        initialize: function(models, options, api) {
            options || (options = {});
            this.initClipLauncherScenesOrSlots(models, options, api);
            this.api = api;
            this.initialized = true;
        },

        initClipLauncherScenesOrSlots: function(models, options, api) {
            var context = this;
            api.addNameObserver(function(slot, value) {
                context.add({slot:slot, name:value}, {observed:true, merge:true, api:api});
            });
            return this;
        },

        // Bitwig API wrapper methods
        // -------------

        returnToArrangement: function() {
            this.api.returnToArrangement();
            return this;
        },

        stop: function() {
            this.api.stop();
            return this;
        }

    }, {

        // factory method
        create: function(api, options) {
            return new ClipLauncherScenesOrSlots(undefined, options, api);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.ClipLauncherSceneOrSlot = ClipLauncherSceneOrSlot;
    root.bitbone.ClipLauncherScenesOrSlots = ClipLauncherScenesOrSlots;

}(this, host, Backbone, _));
