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
    // Channel
    // -------------
    //
    // Attributes
    //
    //   color        object {R,G,B} r
    //   selected     boolean r
    //   name         string r
    //   vuMeterLeft  Number r  *optional options.useVuMeter
    //   vuMeterRight Number r  *optional options.useVuMeter
    //   exists       BooleanValue  r
    //   mute         BooleanValue  r
    //   pan          AutomatableRangedValue r
    //   sends        AutomatableRangedValueCollection t
    //   volume       AutomatableRangedValue r
    //
    // Options
    //
    //   useNoteEvent  boolean default false
    //   useVuMeter    boolean default false
    //   numSends      Number default 8
    //   nameMaxChars  Number default 12
    //   vuMeterRamge  boolean default 127
    //   panRange      Number default 128
    //   sendRange     Number default 128
    //   volumeRange   Number default 128
    //
    // Events
    //   'note'       optional *options.useNoteEvent
    //                args: on/off boolean,
    //                      note#
    //                      velocity
    //
    var Track = Channel.extend({

        initialize: function(attributes, options, track) {
            this.initTrack(attributes, options, track);
            this.api = track;
            this.initialized = true;
        },

        initTrack: function(attributes, options, api) {
            var context = this;

            this.initChannel(attributes, options, api);

            this.on('change:name', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized && this.api.setName(value);
            });


            if (options.usePitchNames) {
                this.set('pitchNames', new Backbone.Collection());
                api.addPitchNamesObserver(function(key, name) {
                    context.add({id:key, name:name});
                });
            }

            api.addTrackTypeObserver(
                _.isNumber(options.trackTypeMaxChars) ? options.trackTypeMaxChars : 6,
                _.isNumber(options.trackTypeFallback) ? options.trackTypeFallback : '',
                function(value) {
                    context.set('trackType', value);
                });

            this.set('arm', BooleanValue.create(api.getArm()));

            this.set('canHoldAudioData', BooleanValue.create(api.getCanHoldAudioData()));

            this.set('canHoldNoteData', BooleanValue.create(api.getCanHoldNoteData()));

            this.set('clipLauncherSlots', ClipLauncherSlots.create(api.getClipLauncherSlots()));

            this.set('matrixQueuedForStop', BooleanValue.create(api.getIsMatrixQueuedForStop()));

            this.set('matrixStoped', BooleanValue.create(api.getIsMatrixStopped()));

            this.set('primaryDevice', Device.create(api.getPrimaryDevice()));

            this.set('sourceSelector', SourceSelector.create(api.getSourceSelector()));
        },

        playNote: function(key, vel) {
            this.api.playNote(key, vel);
        },


        returnToArrangement: function() {
            this.api.returnToArrangement();
        },

        startNote: function(key, vel) {
            this.api.startNote(key, vel);
        },

        stop: function() {
            this.api.stop();
        },

        stopNote: function(key, vel) {
            this.api.stopNote(key, vel);
        }

    }, {

        // factrory method
        create: function(track, options) {
            return new Track(undefined, options, track);
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
