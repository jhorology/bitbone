(function(root, host, Backbone, _) {
    'use strict';

    var ClipLauncherScenesOrSlot =  Backbone.Model.extend({
        idAttribute: 'slot',
        initialize: function(attributes, options, api) {
            this.initClipLauncherScenesOrSlot(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initClipLauncherScenesOrSlot: function(attributes, options, api) {
        },

        launch: function() {
            this.api.launch(this.get('slot'));
        }
    }, {
        // factrory method
        create: function(attributes, options, api) {
            return new ClipLauncherScenesOrSlots(attributes, options, api);
        }
    });

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
                    var item = context.get(slot);
                    if (item) {
                        item.set('name', value, {observed:true});
                    } else {
                        context.add(ClipLauncherScenesOrSlot.create({slot:slot, name:value},
                                                                    null, context.api));
                    }
                });
        },

        returnToArrangement: function() {
            this.api.returnToArrangementp();
        },

        stop: function() {
            this.api.stop();
        }

    }, {

        // factrory method
        create: function(api, options) {
            return new ClipLauncherScenesOrSlots(undefined, options, api);
        }

    });

    // export
    root.bitwig || (root.bitwig = {});
    root.bitwig.ClipLauncherScenesOrSlot = ClipLauncherScenesOrSlot;
    root.bitwig.ClipLauncherScenesOrSlots = ClipLauncherScenesOrSlots;

}(this, this.host, this.Backbone, this._));
