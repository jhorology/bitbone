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
            this.on('change:clipLauncherSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleClipLauncherSectionVisibility();
            });

            api.addCrossFadeSectionVisibilityObserver(function(value) {
                context.set('crossFadeSectionVisibility', value, {observed:true});
            });
            this.on('change:crossFadeSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleCrossFadeSectionVisibility();
            });

            api.addDeviceSectionVisibilityObserver(function(value) {
                context.set('deviceSectionVisibility', value, {observed:true});
            });
            this.on('change:deviceSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleDeviceSectionVisibility();
            });

            api.addIoSectionVisibilityObserver(function(value) {
                context.set('ioSectionVisibility', value, {observed:true});
            });
            this.on('change:ioSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleIoSectionVisibility();
            });

            api.addMeterSectionVisibilityObserver(function(value) {
                context.set('meterSectionVisibility', value, {observed:true});
            });
            this.on('change:meterSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleMeterSectionVisibility();
            });

            api.addSendsSectionVisibilityObserver(function(value) {
                context.set('sendsSectionVisibility', value, {observed:true});
            });
            this.on('change:sendsSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleSendsSectionVisibility();
            });
        },


        toggleClipLauncherSectionVisibility: function() {
            this.api.toggleClipLauncherSectionVisibility();
        },
        
        toggleCrossFadeSectionVisibility: function() {
            this.api.toggleCrossFadeSectionVisibility();
        },

        toggleDeviceSectionVisibility: function() {
            this.api.toggleDeviceSectionVisibility();
        },

        toggleIoSectionVisibility: function() {
            this.api.toggleIoSectionVisibility();
        },

        toggleMeterSectionVisibility: function() {
            this.api.toggleMeterSectionVisibility();
        },

        toggleSendsSectionVisibility: function() {
            this.api.toggleSendsSectionVisibility();
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
