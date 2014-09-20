(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var Track = root.bitbone.Track,
        TrackCollection = root.bitbone.TrackCollection,
        ClipLauncherScenesOrSlots = root.bitbone.ClipLauncherScenesOrSlots;

    // TrackBank
    // -------------
    //
    // Attributes
    // 
    //   canScrollScenesDown  boolean r
    //   canScrollScenesUp    boolean r
    //   canScrollSendsDown   boolean r
    //   canScrollSendsUp     boolean r
    //   canScrollTracksDown  boolean r
    //   canScrollTracksUp    boolean r
    //   sceneScrollPosition  Number r
    //   trackScrollPosition  Number r
    //   trackScrollStepSize  Number r/w
    //   clipLauncherScenes   ClipLauncherScenes
    //   tracks               TrackCollection
    //
    // Options
    //
    //   numTracks            Number default:8
    //   numSends             Number default:8
    //   numScenes            Number default:8
    //   trackScrollStepSize  Number default:1
    //
    var TrackBank = Backbone.Model.extend({
        model: Track,

        initialize: function(attributes, options, api) {
            
            this.initTrackBank(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initTrackBank: function(attributes, options, api) {
            var context = this;

            _.defaults(options, {
                trackScrollStepSize: 1
            });

            api.addCanScrollScenesDownObserver(function(value) {
                context.set('canScrollScenesDown', value, {observed:true});
            });

            api.addCanScrollScenesUpObserver(function(value) {
                context.set('canScrollScenesUp', value, {observed:true});
            });

            api.addCanScrollSendsDownObserver(function(value) {
                context.set('canScrollSendsDown', value, {observed:true});
            });

            api.addCanScrollSendsUpObserver(function(value) {
                context.set('canScrollSendsUp', value, {observed:true});
            });

            api.addCanScrollTracksDownObserver(function(value) {
                context.set('canScrollTracksDown', value, {observed:true});
            });

            api.addCanScrollTracksUpObserver(function(value) {
                context.set('canScrollTracksUp', value, {observed:true});
            });

            api.addSceneScrollPositionObserver(function(value) {
                context.set('sceneScrollPosition', value, {observed:true});
            }, -1 );

            api.addTrackScrollPositionObserver(function(value) {
                context.set('trackScrollPosition', value, {observed:true});
            }, -1 );

            api.setTrackScrollStepSize(options.trackScrollStepSize);


            var tracks = new TrackCollection();
            for(var i = 0; i < options.numTracks; i++) {
                tracks.add(Track.create(api.getTrack(i), options.track));
            }

            this.set({
                trackScrollStepSize: options.trackScrollStepSize,
                clipLauncherScenes:  ClipLauncherScenesOrSlots.create(api.getClipLauncherScenes(), options.clipLauncherScenes),
                tracks: tracks
            })
                .on('change:trackScrollStepSize', function (model, value, options) {
                    // if changed by user script
                    options.observed || this.initialized && this.api.setTrackScrollStepSize(value);
                });
            return this;
        },

        launchScenes: function(index) {
            this.api.lacunhScenes(index);
            return this;
        },

        scrollScenesDown: function() {
            this.api.scrollScenesDown();
            return this;
        },

        scrollScenesPageDown: function() {
            this.api.scrollScenesPageDown();
            return this;
        },

        scrollScenesPageUp: function() {
            this.api.scrollScenesPageUp();
            return this;
        },

        scrollScenesUp: function() {
            this.api.scrollScenesUp();
            return this;
        },

        scrollSendsDown: function() {
            this.api.scrollSendsDown();
            return this;
        },

        scrollSendsPageDown: function() {
            this.api.scrollSendsPageDown();
            return this;
        },

        scrollSendsPageUp: function() {
            this.api.scrollSendsPageUp();
            return this;
        },

        scrollSendsUp: function() {
            this.api.scrollSendsUp();
            return this;
        },

        scrollToScene: function(position) {
            this.api.scrollToScene(position);
            return this;
        },

        scrollToTrack: function(position) {
            this.api.scrollToTrack(position);
            return this;
        },


        scrollTracksDown: function() {
            this.api.scrollTracksDown();
            return this;
        },

        scrollTracksPageDown: function() {
            this.api.scrollTracksPageDown();
            return this;
        },

        scrollTracksPageUp: function() {
            this.api.scrollTracksPageUp();
            return this;
        },

        scrollTracksUp: function() {
            this.api.scrollTracksUp();
            return this;
        }

    }, {

        // factrory methods

        create: function(options) {
            _.defaults(options, {
                numTracks: 8,
                numSends: 8,
                numScenes: 8
            });
            return new TrackBank(null, options, Bitwig.createTrackBank(options.numTracks, options.numSends, options.numScenes));
        },

        createMain: function(options) {
            _.defaults(options, {
                numTracks: 8,
                numSends: 8,
                numScenes: 8
            });
            return new TrackBank(null, options, Bitwig.createMainTrackBank(options.numTracks, options.numSends, options.numScenes));
        },

        createEffect: function(options) {
            _.defaults(options, {
                numTracks: 2,
                numScenes: 8
            });
            return new TrackBank(null, options, Bitwig.createEffectTrackBank(options.numTracks, options.numScenes));
        }
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.TrackBank = TrackBank;

}(this, host, Backbone, _));
