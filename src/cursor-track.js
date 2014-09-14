(function(root, Bitwig, Backbone, _) {
    'use strict';

    // inports
    var Track = root.bitbone.Track;

    // CursorTrack extend Track
    // -------------
    //
    // Options
    //
    //   numSends             Number default:8
    //   numScenes            Number default:8
    //
    // Track
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
    //   usePichNames        boolean default false
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
    var CursorTrack = Track.extend({

        initialize: function(attributes, options) {
            var cursorTrack = Bitwig.createCursorTrack(
                _.isNumber(options.numSends) ? options.numSends : 8,
                _.isNumber(options.numScenes) ? options.numScenes : 8
            );

            this.initCursorTrack(attributes, options, cursorTrack);
            this.api = cursorTrack;
            this.initialized = true;
        },

        initCursorTrack: function(attributes, options, api) {
            var context = this;

            this.initTrack(attributes, options, api);
        },

        selectNext: function() {
            this.api.selectNext();
        },

        selectPrevious: function() {
            this.api.selectPrevious();
        }

    }, {

        // factrory method
        create: function(options) {
            return new Track(undefined, options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.CursorTrack= CursorTrack;

}(this, host, Backbone, _));
