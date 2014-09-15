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

            this.set('exists', BooleanValue.create(api.exists()));
            this.set('mute',BooleanValue.create(api.getMute()));
            this.set('pan', AutomatableRangedValue.create(api.getPan(),
                                                          {range:options.panRange}));
            var sends = new AutomatableRangedValueCollection();
            for (i = 0; i < numSends; i++) {
                sends.add(AutomatableRangedValue.create(api.getSend(i),
                                                        {range:options.sendRange}));
            }
            this.set('sends', sends);
            this.set('solo', BooleanValue.create(api.getSolo()));
            this.set('volume', AutomatableRangedValue.
                     create(api.getVolume(), {range:options.volumeRange}));
        },

        select: function() {
            this.api.select();
        }

    }, {

        // factory method
        create: function(channel, options) {
            return new Channel(undefined, options, channel);
        }

    });

    var ChannelCollection = Backbone.Collection.extend({
        model: Channel
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Channel = Channel;
    root.bitbone.ChannelCollection = ChannelCollection;

}(this, host, Backbone, _));
