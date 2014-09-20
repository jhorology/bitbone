(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var RangedValue = root.bitbone.RangedValue,
        BooleanValue = root.bitbone.BooleanValue;

    // Clip
    // -------------
    //
    // Attributes
    //
    //   canScrollKeysDown      boolean r
    //   canScrollKeysUp        boolean r
    //   canScrollStepsForward  boolean r
    //   payingStep             number  r
    //   accent                 RangedValue  r
    //   shuffle                BooleanValue r
    //
    // Options
    //
    //   gridWidth              Numner default 128
    //   gridHeight             Numner default 128
    //   accent                 object RangedValue options
    //
    var Clip = Backbone.Model.extend({
        initialize: function(attributes, options) {

            _.defaults(options, {
                gridWidth: 128,
                gridHeight: 128
                // accent:{} --> RangedValue
            });

            var api = Bitwig.createCursorClip(options.gridWidth, options.gridHeight);
            this.initClip(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initClip: function(attributes, options, api) {
            var context = this;

            api.addCanScrollKeysDownObserver(function(value) {
                context.set('canScrollKeysDown', value, {observed:true});
            });
            api.addCanScrollKeysUpObserver(function(value) {
                context.set('canScrollKeysUp', value, {observed:true});
            });
            api.addCanScrollStepsForwardObserver(function(value) {
                context.set('canScrollStepsForward', value, {observed:true});
            });
            api.addPlayingStepObserver(function(value) {
                context.set('playingStep', value, {observed:true});
            });

            api.addStepDataObserver(function(step, note, vel) {
            });

            this.set({
                shuffle: BooleanValue.create(api.getShuffle()),
                accent: RangedValue.create(api.getAccent(), options.accent)
            });
            return this;
        },

        clearStep: function(x, y) {
            this.api.clearStep(x, y);
            return this;
        },

        scrollKeysPageDown: function() {
            this.api.scrollKeysPageDown();
            return this;
        },

        scrollKeysPageUp: function() {
            this.api.scrollKeysPageUp();
            return this;
        },

        scrollKeysStepDown: function() {
            this.api.scrollKeysStepDown();
            return this;
        },

        scrollKeysStepUp: function() {
            this.api.scrollKeysStepUp();
            return this;
        },

        scrollStepsStepBackwards: function() {
            this.api.scrollStepsStepBackwards();
            return this;
        },

        scrollStepsStepForward: function() {
            this.api.scrollStepsStepForward();
            return this;
        },

        scrollToKey: function(key) {
            this.api.scrollToKey(key);
            return this;
        },

        scrollToStep: function(step) {
            this.api.scrollToStep(step);
            return this;
        },

        selectStepContents: function(x, y, clearCurrentSelection) {
            this.api.scrollToStep(x, y, clearCurrentSelection);
            return this;
        },

        setName: function(name) {
            this.api.setName(name);
            return this;
        },

        setStep: function(x, y, insertDuration) {
            this.api.setStep(x, y, insertDuration);
            return this;
        },

        setStepSize: function(lenthInBeatTime) {
            this.api.setStepSize(lenthInBeatTime);
            return this;
        },

        toggleStep: function(x, y, insertVelocity) {
            this.api.setStep(x, y, insertVelocity);
            return this;
        }

    },{
        create: function(options) {
            return new Clip(options);
        }
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Clip = Clip;
}(this, host, Backbone, _));
