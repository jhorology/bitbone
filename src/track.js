(function(root, Bitwig, Backbone, _) {
    'use strict';

    // inports
    var Channel = root.bitbone.Channel,
        BooleanValue = root.bitbone.BooleanValue,
        ClipLauncherSlots = root.bitbone.ClipLauncherSlots,
        Device = root.bitbone.Device,
        SourceSelector = root.bitbone.SourceSelector;

    // Track extend Channel
    // -------------
    //
    // Attributes
    // 
    //   name                 string r/w
    //   arm                  BooleanValue
    //   trackType            string r
    //   pitchNames           Collection {id, name} r
    //   canHoldAudioData     BooleanValue
    //   canHoldNoteData      BooleanValue
    //   clipLauncherSlots    ClipLauncherSlots
    //   matrixQueuedForStop  BooleanValue
    //   matrixStopped        BooleanValue
    //   primaryDevice        Device
    //   sourceSelector       SourceSelector
    //
    // Options
    //   trackTypeMaxChars   Number default:6
    //   trackTypeFallback   string default:''
    //   usePitchNames       boolean default false
    //
    var Track = Channel.extend({

        initialize: function(attributes, options, track) {
            this.initTrack(attributes, options, track);
            this.api = track;
            this.initialized = true;
        },

        initTrack: function(attributes, options, api) {
            var context = this;

            // options default
            _.defaults(options, {
                usePitchName: false,
                trackTypeMaxChars: 12,
                trackTypeFallbacks: ''
            });

            this.initChannel(attributes, options, api);
            api.addTrackTypeObserver(options.trackTypeMaxChars, options.trackTypeFallback, function(value) {
                context.set('trackType', value);
            });

            this.on('change:name', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized && this.api.setName(value);
            }).set({
                arm: BooleanValue.create(api.getArm(), options.arm),
                canHoldAudioData: BooleanValue.create(api.getCanHoldAudioData(), options.canHoldAudioData),
                canHoldNoteData: BooleanValue.create(api.getCanHoldNoteData(), options.canHoldNoteData),
                clipLauncherSlots: ClipLauncherSlots.create(api.getClipLauncherSlots(), options.clipLauncherSlots),
                matrixQueuedForStop: BooleanValue.create(api.getIsMatrixQueuedForStop(), options.matrixQueuedForStop),
                matrixStoped: BooleanValue.create(api.getIsMatrixStopped(), options.matrixStoped),
                primaryDevice: Device.create(api.getPrimaryDevice(), options.primaryDevice),
                sourceSelector: SourceSelector.create(api.getSourceSelector(), options.sourceSelector)
            });

            if (options.usePitchNames) {
                this.set('pitchNames', new Backbone.Collection());
                api.addPitchNamesObserver(function(key, name) {
                    context.add({id:key, name:name});
                });
            }
            return this;
        },

        playNote: function(key, vel) {
            this.api.playNote(key, vel);
            return this;
        },


        returnToArrangement: function() {
            this.api.returnToArrangement();
            return this;
        },

        startNote: function(key, vel) {
            this.api.startNote(key, vel);
            return this;
        },

        stop: function() {
            this.api.stop();
            return this;
        },

        stopNote: function(key, vel) {
            this.api.stopNote(key, vel);
            return this;
        }

    }, {

        // factrory methods

        create: function(track, options) {
            return new Track(null, options, track);
        },

        createMaster: function(options) {
            _.defaults(options, {
                numScenes: 8
            });

            // force numSends to zero.
            options || (options = {});
            options.numSends = 0;

            return Track.create(Bitwig.createMasterTrack(options.numScenes), options);
        }

    });

    var TrackCollection = Backbone.Collection.extend({
        model: Track
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Track = Track;
    root.bitbone.TrackCollection = TrackCollection;

}(this, host, Backbone, _));
