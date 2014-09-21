(function(root, Bitwig, Backbone, _) {
    'use strict';

    // UserControlBank
    // -------------
    //
    // Attributes
    //
    //   clipLauncherSectionVisibility  boolean r/w
    //   CrossFadeSectionVisibility     boolean r/w
    //   eviceSectionVisibility         boolean r/w
    //   ioSectionVisibility            boolean r/w
    //   meterSectionVisibility         boolean r/w
    //   sendsSectionVisibility         boolean r/w
    //
    // Options
    //
    //   perspective   string default ''
    //   screenIndex   Number default 0
    //
    var Mixer = Backbone.Model.extend({
        initialize: function(models, options) {
            options || (options = {});
            _.defaults(options, {
                perspective: '',
                screenIndex: 0
            });

            // TODO what's perspective?
            var mixer = Bitwig.createMixer(options.perspective, options.screenIndex);

            this.initMixer(models, options, mixer);
            this.api = mixer;
            this.initialized = true;
        },

        initMixer: function(attributes, options, api) {
            var context = this;
            api.addClipLauncherSectionVisibilityObserver(function(value) {
                context.set('clipLauncherSectionVisibility', value, {observed:true});
            });

            api.addCrossFadeSectionVisibilityObserver(function(value) {
                context.set('crossFadeSectionVisibility', value, {observed:true});
            });

            api.addDeviceSectionVisibilityObserver(function(value) {
                context.set('deviceSectionVisibility', value, {observed:true});
            });

            api.addIoSectionVisibilityObserver(function(value) {
                context.set('ioSectionVisibility', value, {observed:true});
            });

            api.addMeterSectionVisibilityObserver(function(value) {
                context.set('meterSectionVisibility', value, {observed:true});
            });

            api.addSendsSectionVisibilityObserver(function(value) {
                context.set('sendsSectionVisibility', value, {observed:true});
            });


            this.on('change:clipLauncherSectionVisibility', function(model, value, options) {
                options.observed || this.initialized && this.toggleClipLauncherSectionVisibility();
            })
                .on('change:crossFadeSectionVisibility', function(model, value, options) {
                    options.observed || this.initialized && this.toggleCrossFadeSectionVisibility();
                })
                .on('change:deviceSectionVisibility', function(model, value, options) {
                    options.observed || this.initialized && this.toggleDeviceSectionVisibility();
                })
                .on('change:ioSectionVisibility', function(model, value, options) {
                    options.observed || this.initialized && this.toggleIoSectionVisibility();
                })
                .on('change:meterSectionVisibility', function(model, value, options) {
                    options.observed || this.initialized && this.toggleMeterSectionVisibility();
                })
                .on('change:sendsSectionVisibility', function(model, value, options) {
                    options.observed || this.initialized && this.toggleSendsSectionVisibility();
                });
            return this;
        },


        toggleClipLauncherSectionVisibility: function() {
            this.api.toggleClipLauncherSectionVisibility();
            return this;
        },
        
        toggleCrossFadeSectionVisibility: function() {
            this.api.toggleCrossFadeSectionVisibility();
            return this;
        },

        toggleDeviceSectionVisibility: function() {
            this.api.toggleDeviceSectionVisibility();
            return this;
        },

        toggleIoSectionVisibility: function() {
            this.api.toggleIoSectionVisibility();
            return this;
        },

        toggleMeterSectionVisibility: function() {
            this.api.toggleMeterSectionVisibility();
            return this;
        },

        toggleSendsSectionVisibility: function() {
            this.api.toggleSendsSectionVisibility();
            return this;
        }
    },{

        create: function(options) {
            return new Mixer(undefined, options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Mixier = Mixer;

}(this, host, Backbone, _));
