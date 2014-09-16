(function(root, Bitwig, Backbone, _) {
    'use strict';

    // inports
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
    //   main                 boolean default:false
    //   numTracks            Number default:8
    //   numSends             Number default:8
    //   numScenes            Number default:8
    //   trackScrollStepSize  Number default:1
    //
    var TrackBank = Backbone.Model.extend({
        model: Track,

        initialize: function(models, options) {
            _.defaults(options, {
                main: false,
                numTracks: 8,
                numSends: 8,
                numScenes: 8,
                trackScrollStepSize: 1
            });
            
            var trackBank = options.main ?
                    Bitwig.createMainTrackBank(
                        options.numTracks, options.numSends, options.numScenes) :
                    Bitwig.createTrackBank(
                        options.numTracks, options.numSends, options.numScenes);

            this.initTrackBank(models, options, trackBank);
            this.api = trackBank;
            this.initialized = true;
        },

        initTrackBank: function(models, options, api) {
            var context = this;

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
            this.set('trackScrollStepSize', options.trackScrollStepSize);
            this.on('change:trackScrollStepSize', function (model, value, options) {
                // if changed by user script
                options.observed || this.initialized &&
                    this.api.setTrackScrollStepSize(value);
            });

            this.set('clipLauncherScenes',
                     ClipLauncherScenesOrSlots.create(api.getClipLauncherScenes(),
                                                      options.clipLauncherScenes));

            var tracks = new TrackCollection();
            for(var i = 0; i < options.numTracks; i++) {
                tracks.add(Track.create(api.getTrack(i), options.track));
            }
            this.set('tracks', tracks);
        },

        launchScenes: function(index) {
            this.api.lacunhScenes(index);
        },

        scrollScenesDown: function() {
            this.api.scrollScenesDown();
        },

        scrollScenesPageDown: function() {
            this.api.scrollScenesPageDown();
        },

        scrollScenesPageUp: function() {
            this.api.scrollScenesPageUp();
        },

        scrollScenesUp: function() {
            this.api.scrollScenesUp();
        },

        scrollSendsDown: function() {
            this.api.scrollSendsDown();
        },

        scrollSendsPageDown: function() {
            this.api.scrollSendsPageDown();
        },

        scrollSendsPageUp: function() {
            this.api.scrollSendsPageUp();
        },

        scrollSendsUp: function() {
            this.api.scrollSendsUp();
        },

        scrollToScene: function(position) {
            this.api.scrollToScene(position);
        },

        scrollToTrack: function(position) {
            this.api.scrollToTrack(position);
        },


        scrollTracksDown: function() {
            this.api.scrollTracksDown();
        },

        scrollTracksPageDown: function() {
            this.api.scrollTracksPageDown();
        },

        scrollTracksPageUp: function() {
            this.api.scrollTracksPageUp();
        },

        scrollTracksUp: function() {
            this.api.scrollTracksUp();
        }


    }, {

        // factrory method
        create: function(options) {
            return new TrackBank(undefined, options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.TrackBank = TrackBank;

}(this, host, Backbone, _));
