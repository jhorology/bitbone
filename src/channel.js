(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var BooleanValue = root.bitbone.BooleanValue,
        AutomatableRangedValue = root.bitbone.AutomatableRangedValue,
        AutomatableRangedValueCollection = root.bitbone.AutomatableRangedValueCollection;

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

        initChannel: function(attributes, options, api) {
            var context = this;

            _.defaults(options, {
                useNoteEvent: false,
                useVuMeter: false,
                numSends: 8,
                nameMaxChars: 12,
                nameFallback: '',
                vuMeterRamge: 127
            });

            api.addColorObserver(function(red, green, blue) {
                context.set('color', {R:red, G:green, B:blue}, {observed:true});
            });

            api.addIsSelectedObserver(function(value) {
                context.set('selected', value, {observed:true});
            });

            api.addNameObserver(
                options.nameMaxChars, options.nameFallback,
                function(value) {
                    context.set('name', value, {observed:true});
                });

            if (options.useNoteEvent) {
                api.addNoteObserver(function(on, note, vel) {
                    context.trigger('note', on, note, vel);
                });
            }

            if (options.useVuMeter) {
                api.addVuMeterObserver(options.vuMeterRange, 0, true, function(value) {
                    context.set('vuMeterLeft', value, {observed:true});
                });
                api.addVuMeterObserver(options.vuMeterRange, 1, true, function(value) {
                    context.set('vuMeterRight', value, {observed:true});
                });
            }

            var sends = new AutomatableRangedValueCollection();
            for (var i = 0; i < options.numSends; i++) {
                var send = api.getSend(i);
                if (send === null) { break; }
                sends.add(AutomatableRangedValue.create(api.getSend(i), options.send));
            }
            this.set({
                exists: BooleanValue.create(api.exists()),
                mute: BooleanValue.create(api.getMute()),
                pan: AutomatableRangedValue.create(api.getPan(), options.pan),
                sends: sends,
                solo: BooleanValue.create(api.getSolo()),
                volume: AutomatableRangedValue.create(api.getVolume(), options.volume)
            });
            return this;
        },

        select: function() {
            this.api.select();
            return this;
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
