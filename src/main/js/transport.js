(function (root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var BeatTime = root.bitbone.BeatTime,
        RangedValue = root.bitbone.RangedValue;

    // Transport
    // -------------
    //
    // Attributes
    //
    //   automationOverride   boolean r
    //   automationWriteMode  boolean r/w
    //   click                boolean r/w
    //   loopActive           boolean r/w
    //   playing              boolean r/w
    //   recording            boolean r/w
    //   writingArrangerAutomation      boolean r/w
    //   writingClipLauncherAutomation  boolean r/w
    //   launcherOverdub      boolean r/w
    //   metronomeTicks       boolean r/w
    //   metronomeVolume      Number  r/w
    //   overdub              boolean r/w
    //   preRoll              string  r
    //   punchIn              boolean r/w
    //   punchOut             boolean r/w
    //
    // Properties
    //
    //   inPostion            BeatTime
    //   outPostion           BeatTime
    //   postion              BeatTime
    //   tempo                RangedValue
    //
    // Options
    //    metronomeVolumeRange  Number default 128
    //
    var Transport = Backbone.Model.extend({
        // instance methods

        initialize: function (attributes, options) {
            var api = Bitwig.createTransport();

            this.initTransport(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initTransport: function (attributes, options, api) {
            var context = this;

            api.addAutomationOverrideObserver(function (value) {
                context.set('automationOverride', value);
            });

            api.addAutomationWriteModeObserver(function (value) {
                context.set('automationWriteMode', value, {observed: true});
            });
            this.on('change:automationWriteMode', function (model, value, options) {
                // if changed by user script
                options.observed || this.initialized && api.setAutomationWriteMode(value);
            });

            api.addClickObserver(function (value) {
                context.set('click', value, {observed: true});
            });
            this.on('change:click', function (model, value, options) {
                options.observed || this.initialized && this.api.setClick(value);
            });

            api.addIsLoopActiveObserver(function (value) {
                context.set('loopActive', value, {observed: true});
            });
            this.on('change:loopActive', function (model, value, options) {
                options.observed || this.initialized && this.api.setLoop(value);
            });

            api.addIsPlayingObserver(function (value) {
                context.set('playing', value, {observed: true});
            });
            this.on('change:playing', function (model, value, options) {
                options.observed || this.initialized && ((value) ? this.stop() : this.play());
            });

            api.addIsRecordingObserver(function (value) {
                context.set('recording', value, {observed: true});
            });
            this.on('change:recording', function (model, value, options) {
                options.observed || this.initialized && this.record();
            });

            api.addIsWritingArrangerAutomationObserver(function (value) {
                context.set('writingArrangerAutomation', value, {observed: true});
            });
            this.on('change:writingArrangerAutomation', function (model, value, options) {
                options.observed || this.initialized && this.api.toggleWriteArrangerAutomation();
            });

            api.addIsWritingClipLauncherAutomationObserver(function (value) {
                context.set('writingClipLauncherAutomation', value, {observed: true});
            });
            this.on('change:writingClipLauncherAutomation', function (model, value, options) {
                options.observed || this.initialized &&
                    this.api.toggleWriteClipLauncherAutomation();
            });

            api.addLauncherOverdubObserver(function (value) {
                context.set('launcherOverdub', value, {observed: true});
            });
            this.on('change:launcherOverdub', function (model, value, options) {
                // if changed by user script
                options.observed || this.initialized && this.api.setLauncherOverdub(value);
            });

            api.addMetronomeTicksObserver(function (value) {
                context.set('metronomeTicks', value, {observed: true});
            });
            this.on('change:metronomeTicks', function (model, value, options) {
                // if changed by user script
                options.observed || this.initialized && this.api.toggleMetronomeTicks();
            });

            api.addMetronomeVolumeObserver(function (value) {
                context.set('metronomeVolume', value, {observed: true});
            });
            this.on('change:metronomeVolume', function (model, value, options) {
                // if changed by user script
                options.observed || this.initialized &&
                    this.api.setMetronomeValue(
                        value, _.isNumber(options.metronomeVolumeRange) ? options.range : 128);
            });

            api.addOverdubObserver(function (value) {
                context.set('overdub', value, {observed: true});
            });
            this.on('change:overdub', function (model, value, options) {
                // if changed by user script
                options.observed || this.initialized && this.api.setOverdub(value);
            });

            api.addPreRollObserver(function (value) {
                context.set('preRoll', value, {observed: true});
            });

            api.addPunchInObserver(function (value) {
                context.set('punchIn', value, {observed: true});
            });
            this.on('change:punchIn', function (model, value, options) {
                options.observed || this.initialized && this.api.togglePunchIn();
            });

            api.addPunchOutObserver(function (value) {
                context.set('punchOut', value, {observed: true});
            });
            this.on('change:punchOut', function (model, value, options) {
                options.observed || this.initialized && this.api.togglePunchOut();
            });

            this.inPosition = BeatTime.create(api.getInPosition(), options);

            this.inPosition = BeatTime.create(api.getOutPosition(), options);

            this.inPosition = BeatTime.create(api.getPosition(), options);

            this.tempo = RangedValue.create(api.getTempo(), {range: 666});
        },

        fastForward: function () {
            if (this.get('playing')) {
                this.stop();
                this.api.fastForward();
                this.deferredPlay(50);
            } else {
                this.api.fastForward();
            }
        },

        incPosition: function (delta, snap) {
            this.api.incPosition(delta, snap);
        },

        incTempo: function (delta, slow) {
            this.api.increaseTempo(delta, slow ? 64700 : 647);
        },

        incTempoSlow: function (delta) {
            this.incTempo(delta, true);
        },

        incTempoFast: function (delta) {
            this.incTempo(delta, false);
        },

        jumpToInPosition: function () {
            var inPosition = this.inPosition.get('rawValue');
            if (this.get('playing')) {
                this.stop();
                this.api.getPosition().setRaw(inPosition);
                this.deferredPlay(50);
            } else {
                this.api.getPosition().setRaw(inPosition);
            }
        },

        jumpToOutPosition: function () {
            var outPosition = this.outPosition.get('rawValue');
            if (this.get('playing')) {
                this.stop();
                this.api.getPosition().setRaw(outPosition);
                this.deferredPlay(50);
            } else {
                this.api.getPosition().setRaw(outPosition);
            }
        },

        play: function () {
            this.api.play();
        },

        deferredPlay: function (millis) {
            var context = this;
            Bitwig.scheduleTask(function () {
                context.play();
            }, null, millis);
        },

        record: function () {
            this.api.record();
        },

        resetAutomationOverrides: function () {
            this.api.resetAutomationOverrides();
        },

        rstart: function () {
            this.api.restart();
        },

        returnToArrangement: function () {
            this.api.returnToArrangement();
        },

        rewind: function () {
            if (this.get('playing')) {
                this.stop();
                this.api.rewind();
                this.deferredPlay(50);
            } else {
                this.api.rewind();
            }
        },

        stop: function () {
            this.api.stop();
        },

        toggleClick: function () {
            this.api.toggleClick();
        },

        toggleLatchAutomationWriteMode: function () {
            this.api.toggleLatchAutomationWriteMode();
        },

        toggleLauncherOverdub: function () {
            this.api.toggleLauncherOverdub();
        },

        toggleLoop: function () {
            this.api.toggleLoop();
        },

        toggleMetronomeTicks: function () {
            this.api.toggleMetronomeTicks();
        },

        toggleOverdub: function () {
            this.api.toggleOverdub();
        },

        togglePlay: function () {
            this.api.togglePlay();
        },

        togglePunchIn: function () {
            this.api.togglePunchIn();
        },

        togglePunchOut: function () {
            this.api.togglePunchOut();
        },

        toggleWriteArrangerAutomation: function () {
            this.api.toggleWriteArrangerAutomation();
        },

        toggleWriteClipLauncherAutomation: function () {
            this.api.toggleWriteClipLauncherAutomation();
        }
    },{
        // class methods

        create: function (options) {
            return new Transport(options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Transport = Transport;

}(this, this.host, this.Backbone, this._));
