(function(root, Bitwig, Backbone, _) {
    'use strict';

    // Arranger
    // -------------
    //
    // Attributes
    //
    //   cueMarkerVisiblity  boolean r/w
    //   playbackFollow      boolean r/w
    //   trackRowHeight      boolean r/w
    //
    // Options
    //
    //   screenIndex         Numner default 0
    //
    var Arranger = Backbone.Model.extend({
        initialize: function(attributes, options) {
            options || (options = {});
            _.defaults(options, {
                screenIndex: 0
            });

            var api = Bitwig.createArranger(options.screenIndex);
            this.initArranger(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initArranger: function(attributes, options, api) {
            var context = this;

            api.addCueMarkerVisibilityObserver(function(value) {
                context.set('cueMarkerVisibility', value, {observed:true});
            });

            api.addPlaybackFollowObserver(function(value){
                context.set('playbackFollow', value, {observed:true});
            });

            api.addTrackRowHeightObserver(function(value) {
                context.set('trackRowHeight', value, {observed:true});
            });

            this.on('change:cueMarkerVisibility', function(model, value, options) {
                options.observed || this.initialized && this.toggleCueMarkerVisibility();
            })
                .on('change:playbackFollow', function(model, value, options) {
                    options.observed || this.initialized && this.togglePlaybackFollow();
                })
                .on('change:trackRowHeight', function(model, value, options) {
                    options.observed || this.initialized && this.toggleTrackRowHeight();
                });

            return this;
        },

        toggleCueMarkerVisibility: function() {
            this.api.toggleCueMarkerVisibility();
            return this;
        },

        togglePlaybackFollow: function() {
            this.api.togglePlaybackFollow();
            return this;
        },

        toggleTrackRowHeight: function() {
            this.api.toggleTrackRowHeight();
            return this;
        }
    },{
        create: function(options) {
            return new Arranger(options);
        }
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Arranger = Arranger;
}(this, host, Backbone, _));
