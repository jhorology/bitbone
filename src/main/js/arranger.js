(function(root, Bitwig, Backbone, _) {
    'use strict';
    // Arranger
    // -------------
    //
    // Backbone Model Attributes
    //   cueMarkerVisiblity  boolean r/w
    //   playbackFollow      boolean r/w
    //   trackRowHeight      boolean r/w
    //
    // Options
    //   screenIndex         Numner default 0
    var Arranger = Backbone.Model.extend({
        initialize: function(attributes, options) {
            var api = Bitwig.createArranger(
                _.isNumber(options.screenIndex) ? options.screenIndex : 0);
            this.initArranger(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initArranger: function(attributes, options, api) {
            var context = this;

            api.addCueMarkerVisibilityObserver(function(value) {
                context.set('cueMarkerVisibility', value, {observed:true});
            });
            this.on('change:cueMarkerVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleCueMarkerVisibility();
            });

            api.addPlaybackFollowObserver(function(value){
                context.set('playbackFollow', value, {observed:true});
            });
            this.on('change:playbackFollow', function(model, value, options) {
                options.observed || this.initialized &&
                    this.togglePlaybackFollow();
            });

            api.addTrackRowHeightObserver(function(value) {
                context.set('trackRowHeight', value, {observed:true});
            });
            this.on('change:trackRowHeight', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleTrackRowHeight();
            });
        },

        toggleCueMarkerVisibility: function() {
            this.api.toggleCueMarkerVisibility();
        },

        togglePlaybackFollow: function() {
            this.api.togglePlaybackFollow();
        },

        toggleTrackRowHeight: function() {
            this.api.toggleTrackRowHeight();
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
