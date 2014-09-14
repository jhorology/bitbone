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
    //   accentRange            Number default 128
    var Clip = Backbone.Model.extend({
        initialize: function(attributes, options) {
            var api = Bitwig.createCursorClip(
                _.isNumber(options.griwdWidth) ? options.gridWidth : 128,
                _.isNumber(options.griwdHeight) ? options.gridHeight : 128
            );
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

            this.set('shuffle', BooleanValue.create(api.getShuffle()));
            this.set('accent', RangedValue.create(api.getAccent(), {range:options.accentRange}));

        },

        clearStep: function(x, y) {
            this.api.clearStep(x, y);
        },

        scrollKeysPageDown: function() {
            this.api.scrollKeysPageDown();
        },

        scrollKeysPageUp: function() {
            this.api.scrollKeysPageUp();
        },

        scrollKeysStepDown: function() {
            this.api.scrollKeysStepDown();
        },

        scrollKeysStepUp: function() {
            this.api.scrollKeysStepUp();
        },

        scrollStepsStepBackwards: function() {
            this.api.scrollStepsStepBackwards();
        },

        scrollStepsStepForward: function() {
            this.api.scrollStepsStepForward();
        },

        scrollToKey: function(key) {
            this.api.scrollToKey(key);
        },

        scrollToStep: function(step) {
            this.api.scrollToStep(step);
        },

        selectStepContents: function(x, y, clearCurrentSelection) {
            this.api.scrollToStep(x, y, clearCurrentSelection);
        },

        setName: function(name) {
            this.api.setName(name);
        },

        setStep: function(x, y, insertDuration) {
            this.api.setStep(x, y, insertDuration);
        },

        setStepSize: function(lenthInBeatTime) {
            this.api.setStepSize(lenthInBeatTime);
        },

        toggleStep: function(x, y, insertVelocity) {
            this.api.setStep(x, y, insertVelocity);
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
