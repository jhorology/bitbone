(function(root, Bitwig, Backbone, _) {
    'use strict';
    // imports
    var ClipLauncherSceneOrSlot = root.bitbone.ClipLauncherSceneOrSlot,
        ClipLauncherScenesOrSlots = root.bitbone.ClipLauncherScenesOrSlots;


    // ClipLauncherSlot
    // -------------
    //
    // Attributes
    //
    //   color      object {R,G,B} r
    //   hasContent boolean r
    //   playing    boolean r
    //   queued     boolean r
    //   recording  boolean r
    //   selected   boolean r
    //
    // extend ClipLauncherScenesOrSlot
    // -------------
    //
    // Attributes
    //
    //   slot       Number r
    //   name       string r
    //
    var ClipLauncherSlot =  ClipLauncherSceneOrSlot.extend({
        idAttribute: 'slot',
        initialize: function(attributes, options) {
            options || (options = {});
            this.initClipLauncherSlot(attributes, options);
            this.api = options.api;
            this.initialized = true;
        },

        initClipLauncherSlot: function(attributes, options) {
            this.initClipLauncherSceneOrSlot(attributes, options);
            return this;
        },

        record: function() {
            this.api.record(this.get('slot'));
            return this;
        },

        select: function() {
            this.api.select(this.get('slot'));
            return this;
        },

        showInEditor: function() {
            this.api.showInEditor(this.get('slot'));
            return this;
        }
    });

    // ClipLauncherSlots
    // -------------
    // extend ClipLauncherScenesOrSlots
    var ClipLauncherSlots =  ClipLauncherScenesOrSlots.extend({
        model: ClipLauncherSlot,

        initialize: function(models, options, api) {
            options || (options = {});
            this.initClipLauncherSlots(models, options, api);
            this.api = api;
            this.initialized = true;
        },

        initClipLauncherSlots: function(models, options, api) {
            var context = this;
            this.initClipLauncherScenesOrSlots(models, options, api);
            
            api.addColorObserver(function(slot, r, g, b) {
                context.add({slot:slot, color:{R:r, G:g, B:b}}, {observed:true, merge:true});
            });

            api.addHasContentObserver(function(slot, value) {
                context.add({slot:slot, hasContent:value}, {observed:true, merge:true});
            });

            api.addIsPlayingObserver(function(slot, value) {
                context.add({slot:slot, playing:value}, {observed:true, merge:true});
            });

            api.addIsQueuedObserver(function(slot, value) {
                context.add({slot:slot, queued:value}, {observed:true, merge:true});
            });

            api.addIsRecordingObserver(function(slot, value) {
                context.add({slot:slot, recording:value}, {observed:true, merge:true});
            });

            api.addIsSelectedObserver(function(slot, value) {
                context.add({slot:slot, selected:value}, {observed:true, merge:true});
            });
            return this;
        },

        createEmptyClip: function(slot, lengthInBeats) {
            this.api.createEmptyClip(slot, lengthInBeats);
            return this;
        },

        setIndication: function(shouldIndicate) {
            this.api.setIndication(shouldIndicate);
            return this;
        }

    }, {

        // factory method
        create: function(api, options) {
            return new ClipLauncherSlots(undefined, options, api);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.ClipLauncherSlot = ClipLauncherSlot;
    root.bitbone.ClipLauncherSlots = ClipLauncherSlots;

}(this, host, Backbone, _));
