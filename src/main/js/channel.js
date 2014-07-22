(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var BooleanValue = root.bitbone.BooleanValue,
        AutomatableRangedValue = root.bitbone.AutomatableRangedValue,
        AutomatableRangedValueCollection =
            root.bitbone.AutomatableRangedValueCollection;

    // Channel
    // -------------
    //
    // Backbone Model Attributes
    //
    //   color        object {R,G,B} r
    //   selected     boolean r
    //   name         string r
    //   vuMeterLeft  Number r  *options.useVuMeter
    //   vuMeterRight Number r  *options.useVuMeter
    //
    // Properties
    //
    //   exists  BooleanValue
    //   mute    BooleanValue
    //   pan     AutomatableRangedValue
    //   sends   AutomatableRangedValueCollection
    //   volume  AutomatableRangedValue
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
    //   'note'       args: on/off boolean,
    //                      note#
    //                      velocity *options.useNoteEvent
    var Channel = Backbone.Model.extend({
        // Initialize backbone model.
        initialize: function(attributes, options, channel) {

            this.initChannel(attributes, options, channel);
            this.api = channel;
            this.initialized = true;
        },

        initChannel: function(attributes, options, channel) {
            var context = this,
                api = channel,
                // options
                numSends = _.isNumber(options.numSends) ? options.numSends : 8,
                vuMeterRange = _.isNumber(options.vuMeterRange) ?
                    options.vuMeterRange : 127,
                i;

            api.addColorObserver(function(red, green, blue) {
                context.set('color', {R:red, G:green, B:blue}, {observed:true});
            });

            api.addIsSelectedObserver(function(value) {
                context.set('selected', value, {observed:true});
            });

            api.addNameObserver(
                _.isNumber(options.nameMaxChars) ? options.nameMaxChars :12, '',
                function(value) {
                    context.set('name', value, {observed:true});
                });

            if (options.useNoteEvent) {
                api.addNoteObserver(function(on, note, vel) {
                    context.trigger('note', on, note, vel);
                });
            }

            if (options.useVuMeter) {

                api.addVuMeterObserver(vuMeterRange, 0, true, function(value) {
                    context.set('vuMeterLeft', value, {observed:true});
                });

                api.addVuMeterObserver(vuMeterRange, 1, true, function(value) {
                    context.set('vuMeterRight', value, {observed:true});
                });
            }

            this.exists = BooleanValue.create(api.exists());
            this.mute = BooleanValue.create(api.getMute());
            this.pan = AutomatableRangedValue.create(api.getMute(),
                                                     {range:options.panRange});
            this.sends = new AutomatableRangedValueCollection();
            for (i = 0; i < numSends; i++) {
                this.sends.add(
                    AutomatableRangedValue.create(api.getSend(i), {range:options.sendRange}));
            }
            this.solo = BooleanValue.create(api.getSolo());
            this.volume = AutomatableRangedValue.
                create(api.getVolume(), {range:options.volumeRange});
        },

        select: function() {
            this.api.select();
        }

    }, {

        // factrory method
        create: function(channel, options) {
            return new Channel(undefined, options, channel);
        }

    });

    // AutomatableRangedValueCollection
    // -------------
    var ChannelCollection = Backbone.Collection.extend({
        model: Channel
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Channel = Channel;
    root.bitbone.ChannelCollection = ChannelCollection;

}(this, host, Backbone, _));
