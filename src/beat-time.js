(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var RangedValue = root.bitbone.RangedValue;

    // BeatTime
    // -------------
    //
    // Attributes
    //
    //   rawValue   Number r/w
    //   text       string r
    //
    // Options
    //
    //   separator        string default "."
    //   barsLen          Number default 1
    //   beatsLen         Number default 1
    //   subdivisionLen   Number default 1
    //   ticksLen         Number default 0
    //
    var BeatTime = RangedValue.extend({
        initialize: function(attributes, options, api) {
            options || (options = {});
            this.initBeatTime(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initBeatTime: function(attributes, options, api) {
            var context = this;

            this.initRangedValue(attributes, options, api);

            // options defaults
            _.defaults(options, {
                separator: '.',
                barsLen: 1,
                beatsLen: 1,
                subdivisionLen: 1,
                ticksLen: 0
            });

            api.addRawValueObserver(function(value) {
                context.set('rawValue', value, {observed: true});
            });

            api.addTimeObserver(
                options.separator, options.barsLen, options.beatsLen, options.subdivisionLen, options.ticksLen,
                function(value) {
                    context.set('text', value, {observed: true});
                });


            this.on('change:rawValue', function(model, value, options) {
                options.observed || this.initialized && this.api.setRaw(value);
            });

            return this;
        },

        incRaw: function(delta) {
            this.api.incRaw(delta);
            return this;
        }

    },{

        create: function(beatTime, options) {
            return new BeatTime(null, options, beatTime);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.BeatTime = BeatTime;

}(this, host, Backbone, _));
