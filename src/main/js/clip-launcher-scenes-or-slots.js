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
                _.isNumber(options.nameMaxChars) ? options.nameMaxChars : 12,
                _.isString(options.nameFallback) ? options.nameFallback : '',
                function(slot, value) {
                    context.createOrUpdateSlot({slot:slot, name:value},{observed:true});
                });
        },

        createOrUpdateSlot: function(attributes, options) {
            var item = this.get(attributes.slot);
            if (item) {
                item.set(attributes, options);
            } else {
                this.add(this.model.create(attributes, options, this.api));
            }
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
    root.bitwig || (root.bitwig = {});
    root.bitwig.ClipLauncherScenesOrSlot = ClipLauncherScenesOrSlot;
    root.bitwig.ClipLauncherScenesOrSlots = ClipLauncherScenesOrSlots;

}(this, host, Backbone, _));
