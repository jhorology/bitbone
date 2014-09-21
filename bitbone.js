(function(root, Bitwig, Backbone, _) {
    'use strict';

    // Application
    // -------------
    //
    // Attributes
    //   hasActiveEngin  boolean r/w
    //   selectedMode    string  r
    //
    // Options
    //   selectedModeMaxChars  Number default 12
    //   selectedModeFallback  string default ''
    //
    var Application = Backbone.Model.extend({
        // Initialize backbone model.
        initialize: function(attributes, options) {
            var api = Bitwig.createApplication();
            this.initApplication(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initApplication: function(attributes, options, api) {
            var context = this;

            // options defualts
            _.defaults(options, {
                selectedModeMaxChars: 12,
                selectedModeFallback: ''
            });

            api.addHasActiveEngineObserver(function(value) {
                context.set('hasActiveEngine', value, {observed: true});
            });

            api.addSelectedModeObserver(function(value) {
                context.set('selectedMode', value, {observed: true});
            }, options.selectedModeMaxChars, options.selectedModeFallback);

            this.on('change:hasActiveEngine', function(model, value, options) {
                options.observed || this.initialized && (value ? this.deactivateEngine() : this.activateEngine());
            });
            return this;
        },

        activateEngine: function() {
            this.api.activateEngine();
            return this;
        },

        arrowKeyDown: function() {
            this.api.arrowKeyDown();
            return this;
        },

        arrowKeyLeft: function() {
            this.api.arrowKeyLeft();
            return this;
        },

        arrowKeyRight: function() {
            this.api.arrowKeyRight();
            return this;
        },

        arrowKeyUp: function() {
            this.api.arrowKeyUp();
            return this;
        },

        copy: function() {
            this.api.copy();
            return this;
        },

        cut: function() {
            this.api.cut();
        },

        deactivateEngine: function() {
            this.api.deactivateEngine();
            return this;
        },

        'delete': function() {
            this.api['delete']();
            return this;
        },

        duplicate: function() {
            this.api.duplicate();
            return this;
        },

        enter: function() {
            this.api.enter();
            return this;
        },

        escape: function() {
            this.api.escape();
            return this;
        },

        focusPanelAbove: function() {
            this.api.focusPanelAbove();
            return this;
        },

        focusPanelBelow: function() {
            this.api.focusPanelBelow();
            return this;
        },

        focusPanelToLeft: function() {
            this.api.focusPanelToLeft();
            return this;
        },

        focusPanelToRight: function() {
            this.api.focusPanelToRight();
            return this;
        },

        nextPerspective: function() {
            this.api.nextPerspective();
            return this;
        },

        paste: function() {
            this.api.paste();
            return this;
        },

        previousPerspective: function() {
            this.api.previousPerspective();
            return this;
        },

        redo: function() {
            this.api.redo();
            return this;
        },

        rename: function() {
            this.api.rename();
            return this;
        },

        selectAll: function() {
            this.api.selectAll();
            return this;
        },

        selectNone: function() {
            this.api.selectNone();
            return this;
        },

        setPerspective: function(perspective) {
            this.api.setPerspective(perspective);
            return this;
        },

        toggleAutomationEditor: function() {
            this.api.toggleAutomationEditor();
            return this;
        },

        toggleBrowserVisibility: function() {
            this.api.toggleBrowserVisibility();
            return this;
        },

        toggleDevices: function() {
            this.api.toggleDevices();
            return this;
        },

        toggleFullScreen: function() {
            this.api.toggleFullScreen();
            return this;
        },

        toggleMixer: function() {
            this.api.toggleMixer();
            return this;
        },

        toggleNoteEditor: function() {
            this.api.toggleNoteEditor();
            return this;
        },

        undo: function() {
            this.api.undo();
            return this;
        },

        zoomIn: function() {
            this.api.zoomIn();
            return this;
        },

        zoomOut: function() {
            this.api.zoomOut();
            return this;
        },

        zoomToFit: function() {
            this.api.zoomToFit();
            return this;
        },

        zoomToSelection: function() {
            this.api.zoomToSelection();
            return this;
        }
    },{
        create: function(options) {
            return new Application(options);
        }
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Application = Application;
}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // Arranger
    // -------------
    //
    // Attributes
    //
    //   cueMarkerVisiblity  boolean r/w
    //   playbackFollow      boolean r/w
    //   trackRowHeight      boolean r/w
    //
    // Options
    //
    //   screenIndex         Numner default 0
    //
    var Arranger = Backbone.Model.extend({
        initialize: function(attributes, options) {
            _.defaults(options, {
                screenIndex: 0
            });

            var api = Bitwig.createArranger(options.screenIndex);
            this.initArranger(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initArranger: function(attributes, options, api) {
            var context = this;

            api.addCueMarkerVisibilityObserver(function(value) {
                context.set('cueMarkerVisibility', value, {observed:true});
            });

            api.addPlaybackFollowObserver(function(value){
                context.set('playbackFollow', value, {observed:true});
            });

            api.addTrackRowHeightObserver(function(value) {
                context.set('trackRowHeight', value, {observed:true});
            });

            this.on('change:cueMarkerVisibility', function(model, value, options) {
                options.observed || this.initialized && this.toggleCueMarkerVisibility();
            })
                .on('change:playbackFollow', function(model, value, options) {
                    options.observed || this.initialized && this.togglePlaybackFollow();
                })
                .on('change:trackRowHeight', function(model, value, options) {
                    options.observed || this.initialized && this.toggleTrackRowHeight();
                });

            return this;
        },

        toggleCueMarkerVisibility: function() {
            this.api.toggleCueMarkerVisibility();
            return this;
        },

        togglePlaybackFollow: function() {
            this.api.togglePlaybackFollow();
            return this;
        },

        toggleTrackRowHeight: function() {
            this.api.toggleTrackRowHeight();
            return this;
        }
    },{
        create: function(options) {
            return new Arranger(options);
        }
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Arranger = Arranger;
}(this, host, Backbone, _));

(function (root, Bitwig, Backbone, _) {
    'use strict';

    // RangedValue
    // -------------
    //
    // Attributes
    //   value   Number r/w
    //
    // Options
    //   range   Number default 128
    //
    var RangedValue = Backbone.Model.extend({

        initialize: function (attributes, options, api) {
            this.initBooleanValue(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initRangedValue: function (attributes, options, api) {
            _.defaults(options, {
                range: 128
            });

            var context = this;
            
            this.range = options.range;

            api.addValueObserver(this.range, function (value) {
                context.set('value', value, {observed: true});
            });

            this.on('change:value', function (model, value, options) {
                options.observed || this.initialized &&
                    api.set(value, _.isNumber(options.range) ? options.range : this.range);
            });
            return this;
        },

        // Increments/Decrements the value.
        inc: function (delta, resolution) {
            var range = _.isNumber(resolution) ? resolution : this.range;
            this.api.inc(delta, range);
            return this;
        }

    },{

        create: function (rangedValue, options) {
            return new RangedValue(null, options, rangedValue);
        }

    });

    var RangedValueCollection = Backbone.Collection.extend({
        model: RangedValue
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.RangedValue = RangedValue;
    root.bitbone.RangedValueCollection = RangedValueCollection;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var RangedValue = root.bitbone.RangedValue;

    // AutomatableRangedValue
    // -------------
    //
    // Attributes
    //
    //   name    string r
    //   text    string r
    //
    // Options
    //
    //   nameMaxChars  Number default 12
    //   nameFallback  string default ''
    //   textMaxChars  Number default 12
    //   textFallback  string default ''
    //
    var AutomatableRangedValue = RangedValue.extend({
        initialize: function(attributes, options, api) {
            this.initAutomatableRangedValue(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initAutomatableRangedValue: function(attributes, options, api) {
            var context = this;

            this.initRangedValue(attributes, options, api);

            // options defaults
            _.defaults(options, {
                nameMaxChars: 12,
                nameFallback: '',
                textMaxChars: 12,
                textFallback: ''
            });

            api.addNameObserver(options.nameMaxChars, options.nameFallback, function(value) {
                context.set('name', value, {observed:true});
            });

            api.addValueDisplayObserver(options.textMaxChars, options.textFallback,function(value) {
                context.set('text', value, {observed:true});
            });
            return this;
        },

        reset: function() {
            this.api.reset();
            return this;
        },

        // Sets if this value should be indicated in the GUI
        // as mapped. (Colored dots)
        setIndication: function(shouldIndicate) {
            this.api.setIndication(shouldIndicate);
            return this;
        },

        // Set label of the mapped hardware parameter shown in the application
        // for certain cases (ex. for control learn)
        setLabel: function(label) {
            this.api.setLabel(label);
            return this;
        },

        touch: function(isBeingTouched) {
            this.api.touch(isBeingTouched);
            return this;
        }
    },{

        create: function(automatableRangedValue, options) {
            return new AutomatableRangedValue(undefined, options,
                                              automatableRangedValue);
        }

    });

    var AutomatableRangedValueCollection = Backbone.Collection.extend({
        model: AutomatableRangedValue
    });

    // exports
    root.bitbone || (root.bitbone = {});
    root.bitbone.AutomatableRangedValue = AutomatableRangedValue;
    root.bitbone.AutomatableRangedValueCollection = AutomatableRangedValueCollection;

}(this, host, Backbone, _));

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

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // BooleanValue
    // -------------
    //
    // Attributes
    //
    //   boolean r/w value
    //
    var BooleanValue =  Backbone.Model.extend({
        initialize: function(attributes, options, api) {
            this.initBooleanValue(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initBooleanValue: function(attributes, options, api) {
            var context = this;

            api.addValueObserver(function(value) {
                context.set('value', value, {observed:true});
            });
            this.on('change:value', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized && this.api.set(value);
            });
            return this;
        },

        toggle: function() {
            this.api.toggle();
            return this;
        }

    },{

        create: function(booleanValue, options) {
            return new BooleanValue(null, options, booleanValue);
        }

    });

    var BooleanValueCollection = Backbone.Collection.extend({
        model: BooleanValue
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.BooleanValue = BooleanValue;
    root.bitbone.BooleanValueCollection = BooleanValueCollection;

}(this, host, Backbone, _));

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
        initialize: function(attributes, options, api) {

            this.initChannel(attributes, options, api);
            this.api = api;
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

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // ClipLauncherSceneOrSlot
    // -------------
    //
    // Attributes
    //
    //   slot       Number r
    //   name       string r
    //
    var ClipLauncherSceneOrSlot =  Backbone.Model.extend({
        idAttribute: 'slot',
        initialize: function(attributes, options, api) {
            this.initClipLauncherSceneOrSlot(attributes, options);
            this.api = options.api;
            this.initialized = true;
        },

        initClipLauncherSceneOrSlot: function(attributes, options) {
            return this;
        },

        // Bitwig API wrapper methods
        // -------------

        launch: function() {
            this.api.launch(this.get('slot'));
        }
    });

    // ClipLauncherScenesOrSlots
    // -------------
    //
    // Options
    //
    var ClipLauncherScenesOrSlots =  Backbone.Collection.extend({
        model: ClipLauncherSceneOrSlot,

        initialize: function(models, options, api) {
            this.initClipLauncherScenesOrSlots(models, options, api);
            this.api = api;
            this.initialized = true;
        },

        initClipLauncherScenesOrSlots: function(models, options, api) {
            var context = this;
            api.addNameObserver(function(slot, value) {
                context.add({slot:slot, name:value}, {observed:true, merge:true, api:api});
            });
            return this;
        },

        // Bitwig API wrapper methods
        // -------------

        returnToArrangement: function() {
            this.api.returnToArrangement();
            return this;
        },

        stop: function() {
            this.api.stop();
            return this;
        }

    }, {

        // factory method
        create: function(api, options) {
            return new ClipLauncherScenesOrSlots(undefined, options, api);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.ClipLauncherSceneOrSlot = ClipLauncherSceneOrSlot;
    root.bitbone.ClipLauncherScenesOrSlots = ClipLauncherScenesOrSlots;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';
    // imports
    var ClipLauncherSceneOrSlot = root.bitbone.ClipLauncherSceneOrSlot,
        ClipLauncherScenesOrSlots = root.bitbone.ClipLauncherScenesOrSlots;


    // ClipLauncherSlot
    // -------------
    //
    // Attributes
    //
    //   color      object {R,G,B} r
    //   hasContent boolean r
    //   playing    boolean r
    //   queued     boolean r
    //   recording  boolean r
    //   selected   boolean r
    //
    // extend ClipLauncherScenesOrSlot
    // -------------
    //
    // Attributes
    //
    //   slot       Number r
    //   name       string r
    //
    var ClipLauncherSlot =  ClipLauncherSceneOrSlot.extend({
        idAttribute: 'slot',
        initialize: function(attributes, options) {
            this.initClipLauncherSlot(attributes, options);
            this.api = options.api;
            this.initialized = true;
        },

        initClipLauncherSlot: function(attributes, options) {
            this.initClipLauncherSceneOrSlot(attributes, options);
            return this;
        },

        record: function() {
            this.api.record(this.get('slot'));
            return this;
        },

        select: function() {
            this.api.select(this.get('slot'));
            return this;
        },

        showInEditor: function() {
            this.api.showInEditor(this.get('slot'));
            return this;
        }
    });

    // ClipLauncherSlots
    // -------------
    // extend ClipLauncherScenesOrSlots
    var ClipLauncherSlots =  ClipLauncherScenesOrSlots.extend({
        model: ClipLauncherSlot,

        initialize: function(models, options, api) {
            this.initClipLauncherSlots(models, options, api);
            this.api = api;
            this.initialized = true;
        },

        initClipLauncherSlots: function(models, options, api) {
            var context = this;
            this.initClipLauncherScenesOrSlots(models, options, api);
            
            api.addColorObserver(function(slot, r, g, b) {
                context.add({slot:slot, color:{R:r, G:g, B:b}}, {observed:true, merge:true});
            });

            api.addHasContentObserver(function(slot, value) {
                context.add({slot:slot, hasContent:value}, {observed:true, merge:true});
            });

            api.addIsPlayingObserver(function(slot, value) {
                context.add({slot:slot, playing:value}, {observed:true, merge:true});
            });

            api.addIsQueuedObserver(function(slot, value) {
                context.add({slot:slot, queued:value}, {observed:true, merge:true});
            });

            api.addIsRecordingObserver(function(slot, value) {
                context.add({slot:slot, recording:value}, {observed:true, merge:true});
            });

            api.addIsSelectedObserver(function(slot, value) {
                context.add({slot:slot, selected:value}, {observed:true, merge:true});
            });
            return this;
        },

        createEmptyClip: function(slot, lengthInBeats) {
            this.api.createEmptyClip(slot, lengthInBeats);
            return this;
        },

        setIndication: function(shouldIndicate) {
            this.api.setIndication(shouldIndicate);
            return this;
        }

    }, {

        // factory method
        create: function(api, options) {
            return new ClipLauncherSlots(undefined, options, api);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.ClipLauncherSlot = ClipLauncherSlot;
    root.bitbone.ClipLauncherSlots = ClipLauncherSlots;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var RangedValue = root.bitbone.RangedValue,
        BooleanValue = root.bitbone.BooleanValue;

    // Clip
    // -------------
    //
    // Attributes
    //
    //   canScrollKeysDown      boolean r
    //   canScrollKeysUp        boolean r
    //   canScrollStepsForward  boolean r
    //   payingStep             number  r
    //   accent                 RangedValue  r
    //   shuffle                BooleanValue r
    //
    // Options
    //
    //   gridWidth              Numner default 128
    //   gridHeight             Numner default 128
    //   accent                 object RangedValue options
    //
    var Clip = Backbone.Model.extend({
        initialize: function(attributes, options) {

            _.defaults(options, {
                gridWidth: 128,
                gridHeight: 128
                // accent:{} --> RangedValue
            });

            var api = Bitwig.createCursorClip(options.gridWidth, options.gridHeight);
            this.initClip(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initClip: function(attributes, options, api) {
            var context = this;

            api.addCanScrollKeysDownObserver(function(value) {
                context.set('canScrollKeysDown', value, {observed:true});
            });
            api.addCanScrollKeysUpObserver(function(value) {
                context.set('canScrollKeysUp', value, {observed:true});
            });
            api.addCanScrollStepsForwardObserver(function(value) {
                context.set('canScrollStepsForward', value, {observed:true});
            });
            api.addPlayingStepObserver(function(value) {
                context.set('playingStep', value, {observed:true});
            });

            api.addStepDataObserver(function(step, note, vel) {
            });

            this.set({
                shuffle: BooleanValue.create(api.getShuffle()),
                accent: RangedValue.create(api.getAccent(), options.accent)
            });
            return this;
        },

        clearStep: function(x, y) {
            this.api.clearStep(x, y);
            return this;
        },

        scrollKeysPageDown: function() {
            this.api.scrollKeysPageDown();
            return this;
        },

        scrollKeysPageUp: function() {
            this.api.scrollKeysPageUp();
            return this;
        },

        scrollKeysStepDown: function() {
            this.api.scrollKeysStepDown();
            return this;
        },

        scrollKeysStepUp: function() {
            this.api.scrollKeysStepUp();
            return this;
        },

        scrollStepsStepBackwards: function() {
            this.api.scrollStepsStepBackwards();
            return this;
        },

        scrollStepsStepForward: function() {
            this.api.scrollStepsStepForward();
            return this;
        },

        scrollToKey: function(key) {
            this.api.scrollToKey(key);
            return this;
        },

        scrollToStep: function(step) {
            this.api.scrollToStep(step);
            return this;
        },

        selectStepContents: function(x, y, clearCurrentSelection) {
            this.api.scrollToStep(x, y, clearCurrentSelection);
            return this;
        },

        setName: function(name) {
            this.api.setName(name);
            return this;
        },

        setStep: function(x, y, insertDuration) {
            this.api.setStep(x, y, insertDuration);
            return this;
        },

        setStepSize: function(lenthInBeatTime) {
            this.api.setStepSize(lenthInBeatTime);
            return this;
        },

        toggleStep: function(x, y, insertVelocity) {
            this.api.setStep(x, y, insertVelocity);
            return this;
        }

    },{
        create: function(options) {
            return new Clip(options);
        }
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Clip = Clip;
}(this, host, Backbone, _));

(function(root, bitwig, Backbone, _) {
    'use strict';

    // ModulationSource
    // -------------
    //
    // Attributes
    //  mapping  boolean r/w
    //  name     string r
    //
    // Options
    //   nameMaxChars  Number default 12
    //   nameFallback  string default ''
    //
    var ModulationSource = Backbone.Model.extend({
        initialize: function(attributes, options, api) {
            this.initModulationSource(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initModulationSource: function(attributes, options, api) {
            var context = this;
            _.defaults(options, {
                nameMaxChars: 12,
                nameFallback: ''
            });


            api.addIsMappingObserver(function(value) {
                context.set('mapping', value, {observed:true});
            });
            api.addNameObserver(options.nameMaxChars, options.nameFallback, function(value) {
                context.set('name', value, {observed:true});
            });

            this.on('change:mapping', function(model, value, options) {
                options.observed || this.initialized && this.api.toggleMapping();
            });
            return this;
        },
        
        toggleMapping: function() {
            this.api.toggleMapping();
            return this;
        }

    },{

        create: function(modulationSource, options) {
            return new ModulationSource(null, options, modulationSource);
        }

    });

    // ModulationSourceCollection
    // -------------
    var ModulationSourceCollection = Backbone.Collection.extend({
        model: ModulationSource
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.ModulationSource = ModulationSource;
    root.bitbone.ModulationSourceCollection = ModulationSourceCollection;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var AutomatableRangedValue = root.bitbone.AutomatableRangedValue,
        ModulationSource = root.bitbone.ModulationSource;

    // Macro
    // -------------
    //
    // Attributes
    //
    //   label             string r
    //   amount            AutomatableRangedValue r
    //   modulationSource  ModulationSource r
    //
    // Options
    //
    //   labelMaxChars  Number default 12
    //   labelFallback   string default ''
    //   range          Number default 128
    //
    var Macro = Backbone.Model.extend({
        initialize: function(attributes, options, macro) {
            this.initMacro(attributes, options, macro);
            this.api = macro;
            this.initialized = true;
        },

        initMacro: function(attributes, options, api) {

            _.defaults(options, {
                labelMaxChars: 12,
                labelFallback: ''
            });

            var context = this;

            api.addLabelObserver(options.labelMaxChars, options.labelFallback, function(value) {
                context.set('label', value, {observed:true});
            });

            this.set({
                amount: AutomatableRangedValue.create(api.getAmount(), options.amount),
                modulationSource: ModulationSource.create(api.getModulationSource(), options.modulationSource)
            });
            return this;
        }

    },{

        create: function(automatedRangedValue, options) {
            return new Macro(null, options, automatedRangedValue);
        }

    });

    // MacroCollection
    // -------------
    var MacroCollection = Backbone.Collection.extend({
        model: Macro
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Macro = Macro;
    root.bitbone.MacroCollection = MacroCollection;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var AutomatableRangedValue = root.bitbone.AutomatableRangedValue,
        AutomatableRangedValueCollection = root.bitbone.AutomatableRangedValueCollection,
        Macro = root.bitbone.Macro,
        MacroCollection = root.bitbone.MacroCollection,
        ModulationSource = root.bitbone.ModulationSource,
        ModulationSourceCollection = root.bitbone.ModulationSourceCollection;

    // Device
    // -------------
    //
    // Attributes
    //   activeModulationSource       string r
    //   hasSelectedDevice            boolean r
    //   enabled                      boolean r/w
    //   name                         string r
    //   nextParameterPageEnabled     boolean r
    //   previousParameterPageEnabled boolean r
    //   pageNames                    Array of string r
    //   selectedPage                 number r -1=unselected
    //   presetCategories             Array of string
    //   presetCategory               string
    //   presetCreators               Array of string
    //   presetCreator                string
    //   commonParameters             AutomatableRangedValueCollection
    //   envelopeParameters           AutomatableRangedValueCollection
    //   macros                       MacroCollection
    //   modulationSources            ModulationSourceCollection
    //   paramater                    AutomatableRangedValueCollection
    //
    // Options
    //   modulationSourceMaxChars  Number default:12
    //   modulationSourceFallback  string default:''
    //   nameMaxChars              Number default:12
    //   nameFallback              string default:''
    //   presetCategoryMaxChars    Number default:12
    //   presetCategoryFallback    string default:''
    //   presetCreatorMaxChars     Number default:12
    //   presetCreatorFallback     string default:''
    //
    //
    var Device = Backbone.Model.extend({

        initialize: function(attributes, options, device) {
            this.initDevice(attributes, options, device);
            this.api = device;
            this.initialized = true;
        },

        initDevice: function(attributes, options, api) {

            // options defaults
            _.defaults(options, {
                modulationSourceMaxChars: 12,
                modulationSourceFallback: '',
                nameMaxChars: 12,
                nameFallback: '',
                presetCategoryMaxChars: 12,
                presetCategoryFallback: '',
                presetCreatorMaxChars: 12,
                presetCreatorFallback: ''
            });

            var context = this, i, collection;

            api.addActiveModulationSourceObserver(options.modulationSourceMaxChars, options.modulationSourceFallback, function(value) {
                context.set('activeModulationSource', value, {observed:true});
            });

            api.addHasSelectedDeviceObserver(function(value) {
                context.set('hasSelectedDevice', value, {observed:true});
            });

            api.addIsEnabledObserver(function(value) {
                context.set('enabled', value, {observed:true});
            });

            api.addNameObserver(options.nameMaxChars, options.nameFallback, function(value) {
                context.set('name', value, {observed:true});
            });

            api.addNextParameterPageEnabledObserver(function(value) {
                context.set('nextParameterPageEnabled', value, {observed:true});
            });
            api.addPreviousParameterPageEnabledObserver(function(value) {
                context.set('previousParameterPageEnabled', value, {observed:true});
            });

            api.addPageNamesObserver(function() {
                context.set('pageNames', arguments, {observed:true});
            });

            api.addSelectedPageObserver(-1, function(value) {
                context.set('selectedPage', value, {observed:true});
            });

            api.addPresetCategoriesObserver(function() {
                context.set('presetCategories', arguments, {observed:true});
            });

            api.addPresetCategoryObserver(options.presetCategoryMaxChars, options.presetCategoryFallback, function(value) {
                context.set('presetCategory', value, {observed:true});
            });

            api.addPresetCreatorsObserver(function() {
                context.set('presetCreators', arguments, {observed:true});
            });

            api.addPresetCreatorObserver(options.presetCreatorMaxChars, options.presetCreatorFallback, function(value) {
                context.set('presetCreator', value, {observed:true});
            });


            collection = new AutomatableRangedValueCollection();
            for(i = 0; i < 8; i++) {
                collection.add(AutomatableRangedValue.create(api.getCommonParameter(i)));
            }
            this.set('commonParameters', collection);

            collection = new AutomatableRangedValueCollection();
            for(i = 0; i < 8; i++) {
                collection.add(AutomatableRangedValue.create(api.getEnvelopeParameter(i)));
            }
            this.set('envelopeParameters', collection);

            collection = new MacroCollection();
            for(i = 0; i < 8; i++) {
                collection.add(Macro.create(api.getMacro(i)));
            }
            this.set('macros', collection);

            collection = new ModulationSourceCollection();
            for(i = 0; i < 8; i++) {
                collection.add(ModulationSource.create(api.getModulationSource(i)));
            }
            this.set('modulationSources', collection);

            collection = new AutomatableRangedValueCollection();
            for(i = 0; i < 8; i++) {
                collection.add(AutomatableRangedValue.create(api.getParameter(i)));
            }
            this.set('parameters', collection);
            return this;
        },

        mextParameterPage: function() {
            this.api.nextParamaterPage();
            return this;
        },

        previousParameterPage: function() {
            this.api.previousParameterPage();
            return this;
        },

        setParameterPage: function(page) {
            this.api.setParameterPage(page);
            return this;
        },

        setPresetCategory: function(index) {
            this.api.setPresetCategory(index);
            return this;
        },

        setPresetCreator: function(index) {
            this.api.setPresetCreator(index);
            return this;
        },

        switchToNextPreset: function(index) {
            this.api.switchToNextPreset(index);
            return this;
        },

        switchToPreviousPreset: function(index) {
            this.api.switchToPreviousPreset(index);
            return this;
        },

        switchToNextPresetCategory: function(index) {
            this.api.switchToNextPresetCategory(index);
            return this;
        },

        switchToPreviousPresetCategory: function(index) {
            this.api.switchToPreviousPresetCategory(index);
            return this;
        },

        switchToNextPresetCreator: function(index) {
            this.api.switchToNextPresetCreator(index);
            return this;
        },

        switchToPreviousPresetCreator: function(index) {
            this.api.switchToPreviousPresetCreator(index);
            return this;
        },

        toggleEnableState: function(index) {
            this.api.toggleEnableState(index);
            return this;
        }

    },{
        // class methods

        create: function(device, options) {
            return new Device(undefined, options, device);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Device = Device;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var Device = root.bitbone.Device;

    // CursorDevice extend Device
    // -------------
    //
    // Attributes
    //
    //   canSelectNext            boolean r
    //   canSelectPrevious        boolean r
    //
    // Options
    //
    var CursorDevice = Device.extend({
        // instance methods

        initialize: function(attributes, options) {
            var api = Bitwig.createCursorDevice();
            this.initCursorDevice(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initCursorDevice: function(attributes, options, api) {
            var context = this;

            this.initDevice(attributes, options, api);
            api.addCanSelectNextObserver(function(value) {
                context.set('canSelectNext', value, {observed:true});
            });

            api.addCanSelectPreviousObserver(function(value) {
                context.set('canSelectPrevious', value, {observed:true});
            });
            return this;
        },

        selectNext: function() {
            this.api.selectNext();
            return this;
        },

        selectPrevious: function() {
            this.api.selectPrevious();
            return this;
        }

    },{
        // class methods

        create: function(options) {
            return new CursorDevice(options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.CursorDevice = CursorDevice;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // inports
    var BooleanValue = root.bitbone.BooleanValue;

    // SourceSelector
    // -------------
    //
    // Attributes
    //
    //   hasAudioInputSelected BooleanValue
    //   hasNoteSelected       BooleanValue
    //
    // Options
    //
    var SourceSelector = Backbone.Model.extend({
        initialize: function(models, options, api) {
            this.initSourceSelector(models, options, api);
            this.api = api;
            this.initialized = true;
        },

        initSourceSelector: function(attributes, options, api) {
            this.set({
                hasAudioInputSelected: BooleanValue.create(api.getHasAudioInputSelected()),
                hasNoteInputSelected: BooleanValue.create(api.getHasNoteInputSelected())
            });
            return this;
        }

    },{

        create: function(sourceSelector, options) {
            return new SourceSelector(undefined, options, sourceSelector);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.SourceSelector = SourceSelector;

}(this, host, Backbone, _));

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

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var Track = root.bitbone.Track;

    // CursorTrack extend Track
    // -------------
    //
    // Options
    //
    //   numSends             Number default:8
    //   numScenes            Number default:8
    //
    var CursorTrack = Track.extend({

        initialize: function(attributes, options) {
            // options defaults
            _.defaults(options, {
                numSends: 8,
                numScenes: 8
            });

            var cursorTrack = Bitwig.createCursorTrack(
                options.numSends, options.numScenes);

            this.initCursorTrack(attributes, options, cursorTrack);
            this.api = cursorTrack;
            this.initialized = true;
        },

        initCursorTrack: function(attributes, options, api) {
            var context = this;

            this.initTrack(attributes, options, api);
            return this;
        },

        selectNext: function() {
            this.api.selectNext();
            return this;
        },

        selectPrevious: function() {
            this.api.selectPrevious();
            return this;
        }

    }, {

        // factrory method
        create: function(options) {
            return new CursorTrack(undefined, options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.CursorTrack= CursorTrack;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var  AutomatableRangedValue = root.bitbone.AutomatableRangedValue;

    // Groove
    // -------------
    //
    // Attributes
    //
    //   accentAmount   AutomatableRangedValue
    //   accentRate     AutomatableRangedValue
    //   accentPhase    AutomatableRangedValue
    //   shuffleAmount  AutomatableRangedValue
    //   shuffleRate    AutomatableRangedValue
    //   enabled        AutomatableRangedValue
    //
    var Groove = Backbone.Model.extend({
        initialize: function(attributes, options) {
            var api = Bitwig.createGroove();
            this.initGroove(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initGroove: function(attributes, options, api) {
            this.set({
                accentAmount: AutomatableRangedValue.create(api.getAccentAmount(), options.accentAmount),
                accentRate: AutomatableRangedValue.create(api.getAccentRate(), options.accentRate),
                accentPhase: AutomatableRangedValue.create(api.getAccentPhase(), options.accentPhase),
                shuffleAmount: AutomatableRangedValue.create(api.getShuffleAmount(), options.shuffleAmount),
                shuffleRate: AutomatableRangedValue.create(api.getShuffleRate(), options.shuffleRate),
                enabled: AutomatableRangedValue.create(api.getEnabled())
            });
            return this;
        }

    },{

        create: function(options) {
            return new Groove(null, options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Groove = Groove;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // UserControlBank
    // -------------
    //
    // Attributes
    //
    //   clipLauncherSectionVisibility  boolean r/w
    //   CrossFadeSectionVisibility     boolean r/w
    //   eviceSectionVisibility         boolean r/w
    //   ioSectionVisibility            boolean r/w
    //   meterSectionVisibility         boolean r/w
    //   sendsSectionVisibility         boolean r/w
    //
    // Options
    //
    //   perspective   string default ''
    //   screenIndex   Number default 0
    //
    var Mixer = Backbone.Model.extend({
        initialize: function(models, options) {
            _.defaults(options, {
                perspective: '',
                screenIndex: 0
            });

            // TODO what's perspective?
            var mixer = Bitwig.createMixer(options.perspective, options.screenIndex);

            this.initMixer(models, options, mixer);
            this.api = mixer;
            this.initialized = true;
        },

        initMixer: function(attributes, options, api) {
            var context = this;
            api.addClipLauncherSectionVisibilityObserver(function(value) {
                context.set('clipLauncherSectionVisibility', value, {observed:true});
            });

            api.addCrossFadeSectionVisibilityObserver(function(value) {
                context.set('crossFadeSectionVisibility', value, {observed:true});
            });

            api.addDeviceSectionVisibilityObserver(function(value) {
                context.set('deviceSectionVisibility', value, {observed:true});
            });

            api.addIoSectionVisibilityObserver(function(value) {
                context.set('ioSectionVisibility', value, {observed:true});
            });

            api.addMeterSectionVisibilityObserver(function(value) {
                context.set('meterSectionVisibility', value, {observed:true});
            });

            api.addSendsSectionVisibilityObserver(function(value) {
                context.set('sendsSectionVisibility', value, {observed:true});
            });


            this.on('change:clipLauncherSectionVisibility', function(model, value, options) {
                options.observed || this.initialized && this.toggleClipLauncherSectionVisibility();
            })
                .on('change:crossFadeSectionVisibility', function(model, value, options) {
                    options.observed || this.initialized && this.toggleCrossFadeSectionVisibility();
                })
                .on('change:deviceSectionVisibility', function(model, value, options) {
                    options.observed || this.initialized && this.toggleDeviceSectionVisibility();
                })
                .on('change:ioSectionVisibility', function(model, value, options) {
                    options.observed || this.initialized && this.toggleIoSectionVisibility();
                })
                .on('change:meterSectionVisibility', function(model, value, options) {
                    options.observed || this.initialized && this.toggleMeterSectionVisibility();
                })
                .on('change:sendsSectionVisibility', function(model, value, options) {
                    options.observed || this.initialized && this.toggleSendsSectionVisibility();
                });
            return this;
        },


        toggleClipLauncherSectionVisibility: function() {
            this.api.toggleClipLauncherSectionVisibility();
            return this;
        },
        
        toggleCrossFadeSectionVisibility: function() {
            this.api.toggleCrossFadeSectionVisibility();
            return this;
        },

        toggleDeviceSectionVisibility: function() {
            this.api.toggleDeviceSectionVisibility();
            return this;
        },

        toggleIoSectionVisibility: function() {
            this.api.toggleIoSectionVisibility();
            return this;
        },

        toggleMeterSectionVisibility: function() {
            this.api.toggleMeterSectionVisibility();
            return this;
        },

        toggleSendsSectionVisibility: function() {
            this.api.toggleSendsSectionVisibility();
            return this;
        }
    },{

        create: function(options) {
            return new Mixer(undefined, options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.Mixier = Mixer;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var Device = root.bitbone.Device,
        ChainLocation = root.ChainLocation,
        DeviceType = root.DeviceType;

    // PrimaryDevice
    // -------------
    // 
    // Attributes
    //   canSwitchToFirst      boolean r
    //   canSwitchToLast       boolean r
    //   canSwitchToNext       boolean r
    //   canSwitchToPrevious   boolean r
    var PrimaryDevice = Device.extend({

        initialize: function(attributes, options, device) {
            this.initPrimaryDevice(attributes, options, device);
            this.api = device;
            this.initialized = true;
        },

        initPrimaryDevice: function(attributes, options, api) {
            var context = this;

            this.initDevice(attributes, options, api);

            api.addCanSwitchToDeviceObserver(DeviceType.ANY, ChainLocation.FIRST, function(value) {
                context.set('canSwithcToFirst', value, {observed:true});
            });

            api.addCanSwitchToDeviceObserver(DeviceType.ANY, ChainLocation.LAST, function(value) {
                context.set('canSwithcToLast', value, {observed:true});
            });

            api.addCanSwitchToDeviceObserver(DeviceType.ANY, ChainLocation.LAST, function(value) {
                context.set('canSwithcToNext', value, {observed:true});
            });

            api.addCanSwitchToDeviceObserver(DeviceType.ANY, ChainLocation.PREVIOUS, function(value) {
                context.set('canSwithcToPrevious', value, {observed:true});
            });
            return this;
        },

        switchToDeviceFirst: function() {
            this.api.switchToDevice(DeviceType.ANY, ChainLocation.FISRT);
            return this;
        },

        switchToDeviceLast: function() {
            this.api.switchToDevice(DeviceType.ANY, ChainLocation.LAST);
            return this;
        },

        switchToDeviceNext: function() {
            this.api.switchToDevice(DeviceType.ANY, ChainLocation.NEXT);
            return this;
        },

        switchToDevicePrevious: function() {
            this.api.switchToDevice(DeviceType.ANY, ChainLocation.Previous);
            return this;
        }

    },{
        // class methods

        create: function(device, options) {
            return new Device(undefined, options, device);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.PrimaryDevice = PrimaryDevice;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // imports
    var Track = root.bitbone.Track,
        TrackCollection = root.bitbone.TrackCollection,
        ClipLauncherScenesOrSlots = root.bitbone.ClipLauncherScenesOrSlots;

    // TrackBank
    // -------------
    //
    // Attributes
    // 
    //   canScrollScenesDown  boolean r
    //   canScrollScenesUp    boolean r
    //   canScrollSendsDown   boolean r
    //   canScrollSendsUp     boolean r
    //   canScrollTracksDown  boolean r
    //   canScrollTracksUp    boolean r
    //   sceneScrollPosition  Number r
    //   trackScrollPosition  Number r
    //   trackScrollStepSize  Number r/w
    //   clipLauncherScenes   ClipLauncherScenes
    //   tracks               TrackCollection
    //
    // Options
    //
    //   numTracks            Number default:8
    //   numSends             Number default:8
    //   numScenes            Number default:8
    //   trackScrollStepSize  Number default:1
    //
    var TrackBank = Backbone.Model.extend({
        model: Track,

        initialize: function(attributes, options, api) {
            
            this.initTrackBank(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initTrackBank: function(attributes, options, api) {
            var context = this;

            _.defaults(options, {
                trackScrollStepSize: 1
            });

            api.addCanScrollScenesDownObserver(function(value) {
                context.set('canScrollScenesDown', value, {observed:true});
            });

            api.addCanScrollScenesUpObserver(function(value) {
                context.set('canScrollScenesUp', value, {observed:true});
            });

            api.addCanScrollSendsDownObserver(function(value) {
                context.set('canScrollSendsDown', value, {observed:true});
            });

            api.addCanScrollSendsUpObserver(function(value) {
                context.set('canScrollSendsUp', value, {observed:true});
            });

            api.addCanScrollTracksDownObserver(function(value) {
                context.set('canScrollTracksDown', value, {observed:true});
            });

            api.addCanScrollTracksUpObserver(function(value) {
                context.set('canScrollTracksUp', value, {observed:true});
            });

            api.addSceneScrollPositionObserver(function(value) {
                context.set('sceneScrollPosition', value, {observed:true});
            }, -1 );

            api.addTrackScrollPositionObserver(function(value) {
                context.set('trackScrollPosition', value, {observed:true});
            }, -1 );

            api.setTrackScrollStepSize(options.trackScrollStepSize);


            var tracks = new TrackCollection();
            for(var i = 0; i < options.numTracks; i++) {
                tracks.add(Track.create(api.getTrack(i), options.track));
            }

            this.set({
                trackScrollStepSize: options.trackScrollStepSize,
                clipLauncherScenes:  ClipLauncherScenesOrSlots.create(api.getClipLauncherScenes(), options.clipLauncherScenes),
                tracks: tracks
            })
                .on('change:trackScrollStepSize', function (model, value, options) {
                    // if changed by user script
                    options.observed || this.initialized && this.api.setTrackScrollStepSize(value);
                });
            return this;
        },

        launchScenes: function(index) {
            this.api.lacunhScenes(index);
            return this;
        },

        scrollScenesDown: function() {
            this.api.scrollScenesDown();
            return this;
        },

        scrollScenesPageDown: function() {
            this.api.scrollScenesPageDown();
            return this;
        },

        scrollScenesPageUp: function() {
            this.api.scrollScenesPageUp();
            return this;
        },

        scrollScenesUp: function() {
            this.api.scrollScenesUp();
            return this;
        },

        scrollSendsDown: function() {
            this.api.scrollSendsDown();
            return this;
        },

        scrollSendsPageDown: function() {
            this.api.scrollSendsPageDown();
            return this;
        },

        scrollSendsPageUp: function() {
            this.api.scrollSendsPageUp();
            return this;
        },

        scrollSendsUp: function() {
            this.api.scrollSendsUp();
            return this;
        },

        scrollToScene: function(position) {
            this.api.scrollToScene(position);
            return this;
        },

        scrollToTrack: function(position) {
            this.api.scrollToTrack(position);
            return this;
        },


        scrollTracksDown: function() {
            this.api.scrollTracksDown();
            return this;
        },

        scrollTracksPageDown: function() {
            this.api.scrollTracksPageDown();
            return this;
        },

        scrollTracksPageUp: function() {
            this.api.scrollTracksPageUp();
            return this;
        },

        scrollTracksUp: function() {
            this.api.scrollTracksUp();
            return this;
        }

    }, {

        // factrory methods

        create: function(options) {
            _.defaults(options, {
                numTracks: 8,
                numSends: 8,
                numScenes: 8
            });
            return new TrackBank(null, options, Bitwig.createTrackBank(options.numTracks, options.numSends, options.numScenes));
        },

        createMain: function(options) {
            _.defaults(options, {
                numTracks: 8,
                numSends: 8,
                numScenes: 8
            });
            return new TrackBank(null, options, Bitwig.createMainTrackBank(options.numTracks, options.numSends, options.numScenes));
        },

        createEffect: function(options) {
            _.defaults(options, {
                numTracks: 2,
                numScenes: 8
            });
            return new TrackBank(null, options, Bitwig.createEffectTrackBank(options.numTracks, options.numScenes));
        }
    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.TrackBank = TrackBank;

}(this, host, Backbone, _));

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

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // import dependenices
    var AutomatableRangedValue = root.bitbone.AutomatableRangedValue,
        AutomatableRangedValueCollection = root.bitbone.AutomatableRangedValueCollection;

    // UserControlBank
    // -------------
    //
    // Attributes
    //
    // Options
    //
    //   numControllers Number default 40
    //
    var UserControlBank = AutomatableRangedValueCollection.extend({
        initialize: function(models, options) {
            _.defaults(options, {
                numControllers: 40
            });
            var api = Bitwig.createUserControls(options.numControllers);
            this.initUserControlBank(models, options, api);
            this.api = api;
            this.initialized = true;
        },

        initUserControlBank: function(attributes, options, api) {
            for (var i=0; i < options.numControllers; i++) {
                this.add(AutomatableRangedValue.create(api.getControl(i)));
            }
            return this;
        }

    },{
        create: function(options) {
            return new UserControlBank(undefined, options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.UserControlBank = UserControlBank;

}(this, host, Backbone, _));
