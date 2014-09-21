(function(root, Bitwig, Backbone, _) {
    'use strict';

    // import dependencies
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
    //   inPostion            BeatTime r
    //   outPostion           BeatTime r
    //   postion              BeatTime r
    //   tempo                RangedValue r
    //
    // Options
    //
    var Transport = Backbone.Model.extend({
        // instance methods

        initialize: function(attributes, options) {
            options || (options = {});
            var api = Bitwig.createTransport();

            this.initTransport(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initTransport: function(attributes, options, api) {
            var context = this;

            _.defaults(options, {
                tempo: {
                    range: 666
                }
            });

            api.addAutomationOverrideObserver(function(value) {
                context.set('automationOverride', value, {observed: true});
            });

            api.addAutomationWriteModeObserver(function(value) {
                context.set('automationWriteMode', value, {observed: true});
            });

            api.addClickObserver(function(value) {
                context.set('click', value, {observed: true});
            });

            api.addIsLoopActiveObserver(function(value) {
                context.set('loopActive', value, {observed: true});
            });

            api.addIsPlayingObserver(function(value) {
                context.set('playing', value, {observed: true});
            });

            api.addIsRecordingObserver(function(value) {
                context.set('recording', value, {observed: true});
            });

            api.addIsWritingArrangerAutomationObserver(function(value) {
                context.set('writingArrangerAutomation', value, {observed: true});
            });

            api.addIsWritingClipLauncherAutomationObserver(function(value) {
                context.set('writingClipLauncherAutomation', value, {observed: true});
            });

            api.addLauncherOverdubObserver(function(value) {
                context.set('launcherOverdub', value, {observed: true});
            });

            api.addMetronomeTicksObserver(function(value) {
                context.set('metronomeTicks', value, {observed: true});
            });

            api.addMetronomeVolumeObserver(function(value) {
                context.set('metronomeVolume', value, {observed: true});
            });

            api.addOverdubObserver(function(value) {
                context.set('overdub', value, {observed: true});
            });

            api.addPreRollObserver(function(value) {
                context.set('preRoll', value, {observed: true});
            });

            api.addPunchInObserver(function(value) {
                context.set('punchIn', value, {observed: true});
            });

            api.addPunchOutObserver(function(value) {
                context.set('punchOut', value, {observed: true});
            });

            this.on('change:automationWriteMode', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized && api.setAutomationWriteMode(value);
            })
                .on('change:click', function(model, value, options) {
                    options.observed || this.initialized && this.api.setClick(value);
                })
                .on('change:loopActive', function(model, value, options) {
                    options.observed || this.initialized && this.api.setLoop(value);
                })
                .on('change:playing', function(model, value, options) {
                    options.observed || this.initialized && ((value) ? this.stop() : this.play());
                })
                .on('change:recording', function(model, value, options) {
                    options.observed || this.initialized && this.record();
                })
                .on('change:writingArrangerAutomation', function(model, value, options) {
                    options.observed || this.initialized && this.api.toggleWriteArrangerAutomation();
                })
                .on('change:writingClipLauncherAutomation', function(model, value, options) {
                    options.observed || this.initialized && this.api.toggleWriteClipLauncherAutomation();
                })
                .on('change:launcherOverdub', function(model, value, options) {
                    // if changed by user script
                    options.observed || this.initialized && this.api.setLauncherOverdub(value);
                })
                .on('change:metronomeTicks', function(model, value, options) {
                    options.observed || this.initialized && this.api.toggleMetronomeTicks();
                })
                .on('change:metronomeVolume', function(model, value, options) {
                    options.observed || this.initialized &&
                        this.api.setMetronomeValue(value, _.isNumber(options.range) ? options.range : 128);
                })
                .on('change:overdub', function(model, value, options) {
                    options.observed || this.initialized && this.api.setOverdub(value);
                })
                .on('change:punchIn', function(model, value, options) {
                    options.observed || this.initialized && this.api.togglePunchIn();
                })
                .on('change:punchOut', function(model, value, options) {
                    options.observed || this.initialized && this.api.togglePunchOut();
                })
                .set({
                    inPosition: BeatTime.create(api.getInPosition(), options.inPostion),
                    outPosition: BeatTime.create(api.getOutPosition(), options.outPosition),
                    position: BeatTime.create(api.getPosition(), options.position),
                    tempo: RangedValue.create(api.getTempo(), options.tempo)
                });
            return this;
        },

        fastForward: function() {
            if (this.get('playing')) {
                this.stop();
                this.api.fastForward();
                this.deferredPlay(50);
            } else {
                this.api.fastForward();
            }
            return this;
        },

        incPosition: function(delta, snap) {
            this.api.incPosition(delta, snap);
            return this;
        },

        incTempo: function(delta, slow) {
            this.api.increaseTempo(delta, slow ? 64700 : 647);
            return this;
        },

        incTempoSlow: function(delta) {
            this.incTempo(delta, true);
            return this;
        },

        incTempoFast: function(delta) {
            this.incTempo(delta, false);
            return this;
        },

        jumpToInPosition: function() {
            var inPosition = this.get('inPosition').get('rawValue');
            if (this.get('playing')) {
                this.stop();
                this.get('position').setRaw(inPosition);
                this.deferredPlay(50);
            } else {
                this.get('position').setRaw(inPosition);
            }
            return this;
        },

        jumpToOutPosition: function() {
            var outPosition = this.get('outPosition').get('rawValue');
            if (this.get('playing')) {
                this.stop();
                this.get('position').setRaw(outPosition);
                this.deferredPlay(50);
            } else {
                this.get('position').setRaw(outPosition);
            }
            return this;
        },

        play: function() {
            this.api.play();
            return this;
        },

        deferredPlay: function(millis) {
            var context = this;
            Bitwig.scheduleTask(function() {
                context.play();
            }, null, millis);
            return this;
        },

        record: function() {
            this.api.record();
            return this;
        },

        resetAutomationOverrides: function() {
            this.api.resetAutomationOverrides();
            return this;
        },

        rstart: function() {
            this.api.restart();
            return this;
        },

        returnToArrangement: function() {
            this.api.returnToArrangement();
            return this;
        },

        rewind: function() {
            if (this.get('playing')) {
                this.stop();
                this.api.rewind();
                this.deferredPlay(50);
            } else {
                this.api.rewind();
            }
            return this;
        },

        stop: function() {
            this.api.stop();
            return this;
        },

        toggleClick: function() {
            this.api.toggleClick();
            return this;
        },

        toggleLatchAutomationWriteMode: function() {
            this.api.toggleLatchAutomationWriteMode();
            return this;
        },

        toggleLauncherOverdub: function() {
            this.api.toggleLauncherOverdub();
            return this;
        },

        toggleLoop: function() {
            this.api.toggleLoop();
            return this;
        },

        toggleMetronomeTicks: function() {
            this.api.toggleMetronomeTicks();
            return this;
        },

        toggleOverdub: function() {
            this.api.toggleOverdub();
            return this;
        },

        togglePlay: function() {
            this.api.togglePlay();
            return this;
        },

        togglePunchIn: function() {
            this.api.togglePunchIn();
            return this;
        },

        togglePunchOut: function() {
            this.api.togglePunchOut();
            return this;
        },

        toggleWriteArrangerAutomation: function() {
            this.api.toggleWriteArrangerAutomation();
            return this;
        },

        toggleWriteClipLauncherAutomation: function() {
            this.api.toggleWriteClipLauncherAutomation();
            return this;
        }
    },{
        // class methods

        create: function(options) {
            return new Transport(options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Transport = Transport;

}(this, host, Backbone, _));
