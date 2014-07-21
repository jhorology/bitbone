(function (root, Bitwig, Backbone, _) {
    'use strict';
    // imports
    var RangedValue = root.bitbone.RangedValue;

    // BeatTime
    // -------------
    //
    // Attributes
    //   rawValue   Number r/w
    //   text       string r
    //
    // Options
    //   timeSeparator string default "."
    //
    // extends RangedValue
    // -------------
    //
    // Attributes
    //   value   Number r/w
    //
    // Options
    //   range   Number default 128
    //
    var BeatTime = RangedValue.extend({
        initialize: function (attributes, options, api) {
            this.initBeatTime(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initBeatTime: function (attributes, options, api) {
            var context = this;

            this.initRangedValue(attributes, options, api);

            api.addRawValueObserver(function (value) {
                context.set('rawValue', value, {observed: true});
            });
            this.on('change:rawValue', function (model, value, options) {
                options.observed || this.initialized && this.api.setRaw(value);
            });

            api.addTimeObserver(
                _.isString(options.timeSeparator) ? options.timeSeparator : '.',
                1, 1, 1, 0, function (value) {
                    context.set('text', value, {observed: true});
                });
        },

        incRaw: function (delta) {
            this.api.incRaw(delta);
        }

    },{

        create: function (beatTime, options) {
            return new BeatTime(null, options, beatTime);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.BeatTime = BeatTime;

}(this, host, Backbone, _));
