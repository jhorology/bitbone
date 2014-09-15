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

            api.addHasActiveEngineObserver(function(value) {
                context.set('hasActiveEngine', value, {observed: true});
            });

            this.on('change:hasActiveEngine', function(model, value, options) {
                options.observed || this.initialized &&
                    (value ? this.deactivateEngine() : this.activateEngine());
            });

            api.addSelectedModeObserver(
                function(value) {
                    context.set('selectedMode', value, {observed: true});
                },
                _.isNumber(options.selectedModeMaxChars) ?
                    options.selectedModeMaxChars : 12,
                _.isString(options.selectedModeFallbackText) ?
                    options.selectedModeFallback : ''
            );
        },

        activateEngine: function() {
            this.api.activateEngine();
        },

        arrowKeyDown: function() {
            this.api.arrowKeyDown();
        },

        arrowKeyLeft: function() {
            this.api.arrowKeyLeft();
        },

        arrowKeyRight: function() {
            this.api.arrowKeyRight();
        },

        arrowKeyUp: function() {
            this.api.arrowKeyUp();
        },

        copy: function() {
            this.api.copy();
        },

        cut: function() {
            this.api.cut();
        },

        deactivateEngine: function() {
            this.api.deactivateEngine();
        },

        'delete': function() {
            this.api['delete']();
        },

        duplicate: function() {
            this.api.duplicate();
        },

        enter: function() {
            this.api.enter();
        },

        escape: function() {
            this.api.escape();
        },

        focusPanelAbove: function() {
            this.api.focusPanelAbove();
        },

        focusPanelBelow: function() {
            this.api.focusPanelBelow();
        },

        focusPanelToLeft: function() {
            this.api.focusPanelToLeft();
        },

        focusPanelToRight: function() {
            this.api.focusPanelToRight();
        },

        nextPerspective: function() {
            this.api.nextPerspective();
        },

        paste: function() {
            this.api.paste();
        },

        previousPerspective: function() {
            this.api.previousPerspective();
        },

        redo: function() {
            this.api.redo();
        },

        rename: function() {
            this.api.rename();
        },

        selectAll: function() {
            this.api.selectAll();
        },

        selectNone: function() {
            this.api.selectNone();
        },

        setPerspective: function(perspective) {
            this.api.setPerspective(perspective);
        },

        toggleAutomationEditor: function() {
            this.api.toggleAutomationEditor();
        },

        toggleBrowserVisibility: function() {
            this.api.toggleBrowserVisibility();
        },

        toggleDevices: function() {
            this.api.toggleDevices();
        },

        toggleFullScreen: function() {
            this.api.toggleFullScreen();
        },

        toggleMixer: function() {
            this.api.toggleMixer();
        },

        toggleNoteEditor: function() {
            this.api.toggleNoteEditor();
        },

        undo: function() {
            this.api.undo();
        },

        zoomIn: function() {
            this.api.zoomIn();
        },

        zoomOut: function() {
            this.api.zoomOut();
        },

        zoomToFit: function() {
            this.api.zoomToFit();
        },

        zoomToSelection: function() {
            this.api.zoomToSelection();
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
            var api = Bitwig.createArranger(
                _.isNumber(options.screenIndex) ? options.screenIndex : 0);
            this.initArranger(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initArranger: function(attributes, options, api) {
            var context = this;

            api.addCueMarkerVisibilityObserver(function(value) {
                context.set('cueMarkerVisibility', value, {observed:true});
            });
            this.on('change:cueMarkerVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleCueMarkerVisibility();
            });

            api.addPlaybackFollowObserver(function(value){
                context.set('playbackFollow', value, {observed:true});
            });
            this.on('change:playbackFollow', function(model, value, options) {
                options.observed || this.initialized &&
                    this.togglePlaybackFollow();
            });

            api.addTrackRowHeightObserver(function(value) {
                context.set('trackRowHeight', value, {observed:true});
            });
            this.on('change:trackRowHeight', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleTrackRowHeight();
            });
        },

        toggleCueMarkerVisibility: function() {
            this.api.toggleCueMarkerVisibility();
        },

        togglePlaybackFollow: function() {
            this.api.togglePlaybackFollow();
        },

        toggleTrackRowHeight: function() {
            this.api.toggleTrackRowHeight();
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
            var context = this;

            this.range = _.isNumber(options.range) ? options.range : 128;

            api.addValueObserver(this.range, function (value) {
                context.set('value', value, {observed: true});
            });

            this.on('change:value', function (model, value, options) {
                // if changed by user script
                options.observed || this.initialized &&
                    api.set(value, _.isNumber(options.range) ? options.range : this.range);
            });
        },

        // Increments/Decrements the value.
        inc: function (delta, resolution) {
            var range = _.isNumber(resolution) ? resolution : this.range;
            this.api.inc(delta, range);
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
    // extend RangedValue
    // -------------
    //
    // Attributes
    //   value   Number r/w
    //
    // Options
    //   range   Number default 128
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

            api.addNameObserver(
                _.isNumber(options.nameMaxChars) ? options.nameMaxChars : 12,
                _.isString(options.nameFallback) ? options.nameFallback : '',
                function(value) {
                    context.set('name', value, {observed:true});
                });

            api.addValueDisplayObserver(
                _.isNumber(options.textMaxChars) ? options.textMaxChars : 12,
                _.isString(options.textFallback) ? options.textFallback : '',
                function(value) {
                    context.set('text', value, {observed:true});
                });
        },

        reset: function() {
            this.api.reset();
        },

        // Sets if this value should be indicated in the GUI
        // as mapped. (Colored dots)
        setIndication: function(shouldIndicate) {
            this.api.setIndication(shouldIndicate);
        },

        // Set label of the mapped hardware parameter shown in the application
        // for certain cases (ex. for control learn)
        setLabel: function(label) {
            this.api.setLabel(label);
        },

        touch: function(isBeingTouched) {
            this.api.touch(isBeingTouched);
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
    root.bitbone.AutomatableRangedValueCollection =
        AutomatableRangedValueCollection;

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
    //   timeSeparator string default "."
    //
    // extend RangedValue
    // -------------
    //
    // Attributes
    //   value   Number r/w
    //
    // Options
    //   range   Number default 128
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

            api.addRawValueObserver(function(value) {
                context.set('rawValue', value, {observed: true});
            });
            this.on('change:rawValue', function(model, value, options) {
                options.observed || this.initialized && this.api.setRaw(value);
            });

            api.addTimeObserver(
                _.isString(options.timeSeparator) ? options.timeSeparator : '.',
                1, 1, 1, 0, function(value) {
                    context.set('text', value, {observed: true});
                });
        },

        incRaw: function(delta) {
            this.api.incRaw(delta);
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
        },

        toggle: function() {
            this.api.toggle();
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
            this.set('pan', AutomatableRangedValue.create(api.getMute(),
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

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // ClipLauncherScenesOrSlot
    // -------------
    //
    // Attributes
    //
    //   slot       Number r
    //   name       string r
    //
    var ClipLauncherScenesOrSlot =  Backbone.Model.extend({
        idAttribute: 'slot',
        initialize: function(attributes, options, api) {
            this.initClipLauncherScenesOrSlot(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initClipLauncherScenesOrSlot: function(attributes, options, api) {
        },

        // Bitwig API wrapper methods
        // -------------

        launch: function() {
            this.api.launch(this.get('slot'));
        }
    }, {
        // factory method
        create: function(attributes, options, api) {
            return new ClipLauncherScenesOrSlots(attributes, options, api);
        }
    });

    // ClipLauncherScenesOrSlots
    // -------------
    //
    // Options
    //
    //   oneBased     boolean default false
    //
    var ClipLauncherScenesOrSlots =  Backbone.Collection.extend({
        model: ClipLauncherScenesOrSlot,

        initialize: function(models, options, api) {
            this.initClipLauncherScenesOrSlots(models, options, api);
            this.api = api;
            this.oneBased = options.oneBase;
            this.initialized = true;
        },

        initClipLauncherScenesOrSlots: function(models, options, api) {
            var context = this;
            api.addNameObserver(
                function(slot, value) {
                    context.add({slot:context.slotId(slot), name:value},
                                {observed:true, merge:true});
                });
        },

        slotId: function(slot) {
            return this.oneBased ? slot + 1 : slot;
        },

        // Bitwig API wrapper methods
        // -------------

        returnToArrangement: function() {
            this.api.returnToArrangement();
        },

        stop: function() {
            this.api.stop();
        }

    }, {

        // factory method
        create: function(api, options) {
            return new ClipLauncherScenesOrSlots(undefined, options, api);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.ClipLauncherScenesOrSlot = ClipLauncherScenesOrSlot;
    root.bitbone.ClipLauncherScenesOrSlots = ClipLauncherScenesOrSlots;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
    'use strict';
    // imports
    var ClipLauncherScenesOrSlot = root.bitbone.ClipLauncherScenesOrSlot,
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
    var ClipLauncherSlot =  ClipLauncherScenesOrSlot.extend({
        initialize: function(attributes, options, api) {
            this.initClipLauncherScenesOrSlot(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initClipLauncherSlot: function(attributes, options, api) {
            this.initClipLauncherScenesOrSlot(attributes, options, api);
        },

        record: function() {
            this.api.record(this.get('slot'));
        },

        select: function() {
            this.api.select(this.get('slot'));
        },

        showInEditor: function() {
            this.api.showInEditor(this.get('slot'));
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
                context.add({slot:context.slotId(slot), color:{R:r, G:g, B:b}},
                            {observed:true, merge:true});
            });

            api.addHasContentObserver(function(slot, value) {
                context.add({slot:context.slotId(slot), hasContent:value},
                            {observed:true, merge:true});
            });

            api.addIsPlayingObserver(function(slot, value) {
                context.add({slot:context.slotId(slot), playing:value},
                            {observed:true, merge:true});
            });

            api.addIsQueuedObserver(function(slot, value) {
                context.add({slot:context.slotId(slot), queued:value},
                            {observed:true, merge:true});
            });

            api.addIsRecordingObserver(function(slot, value) {
                context.add({slot:context.slotId(slot), recording:value},
                            {observed:true, merge:true});
            });

            api.addIsSelectedObserver(function(slot, value) {
                context.add({slot:context.slotId(slot), selected:value},
                            {observed:true, merge:true});
            });
        },

        createEmptyClip: function(slot, lengthInBeats) {
            this.api.createEmptyClip(slot, lengthInBeats);
        },

        setIndication: function(shouldIndicate) {
            this.api.setIndication(shouldIndicate);
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
    //   accentRange            Number default 128
    var Clip = Backbone.Model.extend({
        initialize: function(attributes, options) {
            var api = Bitwig.createCursorClip(
                _.isNumber(options.griwdWidth) ? options.gridWidth : 128,
                _.isNumber(options.griwdHeight) ? options.gridHeight : 128
            );
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

            this.set('shuffle', BooleanValue.create(api.getShuffle()));
            this.set('accent', RangedValue.create(api.getAccent(), {range:options.accentRange}));

        },

        clearStep: function(x, y) {
            this.api.clearStep(x, y);
        },

        scrollKeysPageDown: function() {
            this.api.scrollKeysPageDown();
        },

        scrollKeysPageUp: function() {
            this.api.scrollKeysPageUp();
        },

        scrollKeysStepDown: function() {
            this.api.scrollKeysStepDown();
        },

        scrollKeysStepUp: function() {
            this.api.scrollKeysStepUp();
        },

        scrollStepsStepBackwards: function() {
            this.api.scrollStepsStepBackwards();
        },

        scrollStepsStepForward: function() {
            this.api.scrollStepsStepForward();
        },

        scrollToKey: function(key) {
            this.api.scrollToKey(key);
        },

        scrollToStep: function(step) {
            this.api.scrollToStep(step);
        },

        selectStepContents: function(x, y, clearCurrentSelection) {
            this.api.scrollToStep(x, y, clearCurrentSelection);
        },

        setName: function(name) {
            this.api.setName(name);
        },

        setStep: function(x, y, insertDuration) {
            this.api.setStep(x, y, insertDuration);
        },

        setStepSize: function(lenthInBeatTime) {
            this.api.setStepSize(lenthInBeatTime);
        },

        toggleStep: function(x, y, insertVelocity) {
            this.api.setStep(x, y, insertVelocity);
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

    // Macro
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

            api.addIsMappingObserver(function(value) {
                context.set('mapping', value, {observed:true});
            });
            this.on('change:mapping', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized &&
                    this.api.toggleMapping();
            });
            api.addNameObserver(
                _.isNumber(options.nameMaxChars) ? options.nameMaxChars : 12,
                _.isString(options.nameFallback) ? options.nameFallback : '',
                function(value) {
                    context.set('name', value, {observed:true});
                });
        },

        toggleMapping: function() {
            this.api.toggleMapping();
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
            var context = this;

            api.addLabelbserver(
                _.isNumber(options.labelMaxChars) ? options.labelMaxChars : 12,
                _.isString(options.labelFallback) ? options.labelFallback : '',
                function(value) {
                    context.set('label', value, {observed:true});
                });

            this.set('amount', AutomatableRangedValue.create(api.getAmount(), options));
            this.set('modulationSource', ModulationSource.create(api.getModulationSource()));
        }

    },{

        create: function(automatedRangedValue, options) {
            return new AutomatableRangedValue(null, options, automatedRangedValue);
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
            var context = this, i, collection;

            api.addActiveModulationSourceObserver(
                _.isNumber(options.modulationSourceMaxChars) ?
                    options.modulationSourceMaxChars : 12,
                _.isString(options.modulationSourceFallback) ?
                    options.modulationSourceFallback : '',
                function(value) {
                    context.set('activeModulationSource', value, {observed:true});
                });

            api.addHasSelectedDeviceObserver(function(value) {
                context.set('hasSelectedDevice', value, {observed:true});
            });

            api.addIsEnabledObserver(function(value) {
                context.set('enabled', value, {observed:true});
            });

            api.addNameObserver(
                _.isNumber(options.nameMaxChars) ? options.nameMaxChars : 12,
                _.isString(options.nameFallback) ? options.nameFallback : '',
                function(value) {
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

            api.addPresetCategoryObserver(
                _.isNumber(options.presetCategoryMaxChars) ? options.presetCategoryaxChars : 12,
                _.isString(options.presetCategoryFallback) ? options.presetCategoryFallback : '',
                function(value) {
                    context.set('presetCategory', value, {observed:true});
                });

            api.addPresetCreatorsObserver(function() {
                context.set('presetCreators', arguments, {observed:true});
            });

            api.addPresetCreatorObserver(
                _.isNumber(options.presetCreatorMaxChars) ? options.presetCreatoraxChars : 12,
                _.isString(options.presetCreatorFallback) ? options.presetCreatorFallback : '',
                function(value) {
                    context.set('presetCreator', value, {observed:true});
                });


            collection = new AutomatableRangedValueCollection();
            for(i = 0; i < 8; i++) {
                collection.add(AutomatableRangedValue.create(api.getCommonParamater(i)));
            }
            this.set('commonParameters', collection);

            collection = new AutomatableRangedValueCollection();
            for(i = 0; i < 8; i++) {
                collection.add(AutomatableRangedValue.create(api.getEnvelopeParamater(i)));
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
                collection.add(AutomatableRangedValue.create(api.getParamater(i)));
            }
            this.set('parameters', collection);
        },

        mextParameterPage: function() {
            this.api.nextParamaterPage();
        },

        previousParameterPage: function() {
            this.api.previousParameterPage();
        },

        setParameterPage: function(page) {
            this.api.setParameterPage(page);
        },

        setPresetCategory: function(index) {
            this.api.setPresetCategory(index);
        },

        setPresetCreator: function(index) {
            this.api.setPresetCreator(index);
        },

        switchToNextPreset: function(index) {
            this.api.switchToNextPreset(index);
        },

        switchToPreviousPreset: function(index) {
            this.api.switchToPreviousPreset(index);
        },

        switchToNextPresetCategory: function(index) {
            this.api.switchToNextPresetCategory(index);
        },

        switchToPreviousPresetCategory: function(index) {
            this.api.switchToPreviousPresetCategory(index);
        },

        switchToNextPresetCreator: function(index) {
            this.api.switchToNextPresetCreator(index);
        },

        switchToPreviousPresetCreator: function(index) {
            this.api.switchToPreviousPresetCreator(index);
        },

        toggleEnableState: function(index) {
            this.api.toggleEnableState(index);
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
    // inports
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
        },

        selectNext: function() {
            this.api.selectNext();
        },

        selectPrevious: function() {
            this.api.selectPrevious();
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

    // UserControlBank
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
            this.initUserControlBank(models, options, api);
            this.api = api;
            this.initialized = true;
        },

        initSourceSelector: function(attributes, options, api) {
            this.set('hasAudioInputSelected', api.getHasAudioInputSelected());
            this.set('hasNoteInputSelected', api.getHasNoteInputSelected());
        }

    },{

        create: function(sourceSelector, options) {
            return new SourceSelector(undefined, options, sourceSelector);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.UserControlBank = SourceSelector;

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

            this.set('clipLauncherSlots', ClipLauncherSlots.create(api.getClipClipLauncherSlots()));

            this.set('matrixQueuedForStop', BooleanValue.create(api.getIsMatrixQueuedForStop()));

            this.set('matrixStoped', BooleanValue.create(api.getIsMatrixStoped()));

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
    // Options
    //    accentAmountRange   Number default 128
    //    accentRateRange     Number default 128
    //    accentPhaseRange    Number default 128
    //    shuffleAmountRange  Number default 128
    //    shuffleRateRange    Number default 128
    //
    var Groove = Backbone.Model.extend({
        initialize: function(attributes, options) {
            var api = Bitwig.createGroove();
            this.initGroove(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initGroove: function(attributes, options, api) {
            this.set('accentAmount',  AutomatableRangedValue.create(api.getAccentAmount(), {
                range: options.accentAmountRange
            }));

            this.set('accentRate', AutomatableRangedValue.create(api.getAccentRate(), {
                range: options.accentRateRange
            }));

            this.set('accentPhase', AutomatableRangedValue.create(api.getAccentPhase(), {
                range: options.accentPhaseRange
            }));

            this.set('shuffleAmount', AutomatableRangedValue.create(api.getShuffleAmount(), {
                range: options.shuffleAmountRange
            }));

            this.set('shuffleRate', AutomatableRangedValue.create(api.getShuffleRate(), {
                range: options.shuffleRateRange
            }));

            this.set('enabled', AutomatableRangedValue.create(api.getEnabled()));
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
            // TODO what's perspective?
            var mixer = Bitwig.createMixer(
                _.isString(options.perspective) ? options.perspective : '',
                _.isNumber(options.screenIndex) ? options.screenIndex : 0
            );

            this.initMixer(models, options, mixer);
            this.api = mixer;
            this.initialized = true;
        },

        initMixer: function(attributes, options, api) {
            var context = this;
            api.addClipLauncherSectionVisibilityObserver(function(value) {
                context.set('clipLauncherSectionVisibility', value, {observed:true});
            });
            this.on('change:clipLauncherSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleClipLauncherSectionVisibility();
            });

            api.addCrossFadeSectionVisibilityObserver(function(value) {
                context.set('crossFadeSectionVisibility', value, {observed:true});
            });
            this.on('change:crossFadeSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleCrossFadeSectionVisibility();
            });

            api.addDeviceSectionVisibilityObserver(function(value) {
                context.set('deviceSectionVisibility', value, {observed:true});
            });
            this.on('change:deviceSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleDeviceSectionVisibility();
            });

            api.addIoSectionVisibilityObserver(function(value) {
                context.set('ioSectionVisibility', value, {observed:true});
            });
            this.on('change:ioSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleIoSectionVisibility();
            });

            api.addMeterSectionVisibilityObserver(function(value) {
                context.set('meterSectionVisibility', value, {observed:true});
            });
            this.on('change:meterSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleMeterSectionVisibility();
            });

            api.addSendsSectionVisibilityObserver(function(value) {
                context.set('sendsSectionVisibility', value, {observed:true});
            });
            this.on('change:sendsSectionVisibility', function(model, value, options) {
                options.observed || this.initialized &&
                    this.toggleSendsSectionVisibility();
            });
        },


        toggleClipLauncherSectionVisibility: function() {
            this.api.toggleClipLauncherSectionVisibility();
        },
        
        toggleCrossFadeSectionVisibility: function() {
            this.api.toggleCrossFadeSectionVisibility();
        },

        toggleDeviceSectionVisibility: function() {
            this.api.toggleDeviceSectionVisibility();
        },

        toggleIoSectionVisibility: function() {
            this.api.toggleIoSectionVisibility();
        },

        toggleMeterSectionVisibility: function() {
            this.api.toggleMeterSectionVisibility();
        },

        toggleSendsSectionVisibility: function() {
            this.api.toggleSendsSectionVisibility();
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
    //
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
    var PrimaryDevice = Device.extend({

        initialize: function(attributes, options, device) {
            this.initPrimaryDevice(attributes, options, device);
            this.api = device;
            this.initialized = true;
        },

        initPrimaryDevice: function(attributes, options, api) {
            var context = this, i, collection;

            this.initDevice(attributes, options, api);

            api.addCanSwitchToDeviceObserver(
                DeviceType.ANY,
                ChainLocation.FIRST,
                function(value) {
                    context.set('canSwithcToFirst', value, {observed:true});
                });

            api.addCanSwitchToDeviceObserver(
                DeviceType.ANY,
                ChainLocation.LAST,
                function(value) {
                    context.set('canSwithcToLast', value, {observed:true});
                });

            api.addCanSwitchToDeviceObserver(
                DeviceType.ANY,
                ChainLocation.LAST,
                function(value) {
                    context.set('canSwithcToNext', value, {observed:true});
                });

            api.addCanSwitchToDeviceObserver(
                DeviceType.ANY,
                ChainLocation.PREVIOUS,
                function(value) {
                    context.set('canSwithcToPrevious', value, {observed:true});
                });
        },

        switchToDeviceFirst: function() {
            this.api.switchToDevice(DeviceType.ANY, ChainLocation.FISRT);
        },

        switchToDeviceLast: function() {
            this.api.switchToDevice(DeviceType.ANY, ChainLocation.LAST);
        },

        switchToDeviceNext: function() {
            this.api.switchToDevice(DeviceType.ANY, ChainLocation.NEXT);
        },

        switchToDevicePrevious: function() {
            this.api.switchToDevice(DeviceType.ANY, ChainLocation.Previous);
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

    // inports
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
    //   main                 boolean default:false
    //   numTracks            Number default:8
    //   numSends             Number default:8
    //   numScenes            Number default:8
    //   trackScrollStepSize  Number default:1
    //
    var TrackBank = Backbone.Model.extend({
        model: Track,

        initialize: function(models, options) {
            var numTracks = _.isNumber(options.numTracks) ? options.numTracks : 8,
                numSends = _.isNumber(options.numSends) ? options.numSends : 8,
                numScenes = _.isNumber(options.numScenes) ? options.numScenes : 8,
                trackBank = options.main ?
                    Bitwig.createMainTrackBank(numTracks, numSends, numScenes) :
                    Bitwig.createTrackBank(numTracks, numSends, numScenes);

            this.initTrackBank(models, options, trackBank);
            this.api = trackBank;
            this.initialized = true;
        },

        initTrackBank: function(models, options, api) {
            var context = this,
                numTracks = _.isNumber(options.numTracks) ? options.numTracks : 8,
                numSends = _.isNumber(options.numSends) ? options.numSends : 8,
                numScenes = _.isNumber(options.numScenes) ? options.numScenes : 8;

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

            var trackScrollStepSize = _.isNumber(options.trackScrollStepSize) ?
                    options.trackScrollStepSize : 1;
            api.setTrackScrollStepSize(trackScrollStepSize);
            this.set('trackScrollStepSize', trackScrollStepSize);
            this.on('change:trackScrollStepSize', function (model, value, options) {
                // if changed by user script
                options.observed || this.initialized &&
                    this.api.setTrackScrollStepSize(value);
            });

            this.set('clipLauncherScenes',
                     ClipLauncherScenesOrSlots.create(api.getClipLauncherScenes()));

            var tracks = new TrackCollection();
            for(var i = 0; i < numTracks; i++) {
                tracks.add(Track.create(api.getTrack(i)));
            }
            this.set('tracks', tracks);
        },

        launchScenes: function(index) {
            this.api.lacunhScenes(index);
        },

        scrollScenesDown: function() {
            this.api.scrollScenesDown();
        },

        scrollScenesPageDown: function() {
            this.api.scrollScenesPageDown();
        },

        scrollScenesPageUp: function() {
            this.api.scrollScenesPageUp();
        },

        scrollScenesUp: function() {
            this.api.scrollScenesUp();
        },

        scrollSendsDown: function() {
            this.api.scrollSendsDown();
        },

        scrollSendsPageDown: function() {
            this.api.scrollSendsPageDown();
        },

        scrollSendsPageUp: function() {
            this.api.scrollSendsPageUp();
        },

        scrollSendsUp: function() {
            this.api.scrollSendsUp();
        },

        scrollToScene: function(position) {
            this.api.scrollToScene(position);
        },

        scrollToTrack: function(position) {
            this.api.scrollToTrack(position);
        },


        scrollTracksDown: function() {
            this.api.scrollTracksDown();
        },

        scrollTracksPageDown: function() {
            this.api.scrollTracksPageDown();
        },

        scrollTracksPageUp: function() {
            this.api.scrollTracksPageUp();
        },

        scrollTracksUp: function() {
            this.api.scrollTracksUp();
        }


    }, {

        // factrory method
        create: function(options) {
            return new TrackBank(undefined, options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.TrackBank = TrackBank;

}(this, host, Backbone, _));

(function(root, Bitwig, Backbone, _) {
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
    //   inPostion            BeatTime r
    //   outPostion           BeatTime r
    //   postion              BeatTime r
    //   tempo                RangedValue r
    //
    // Options
    //
    //    metronomeVolumeRange  Number default 128
    //    timeSeparator         string default "."
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

            api.addAutomationOverrideObserver(function(value) {
                context.set('automationOverride', value);
            });

            api.addAutomationWriteModeObserver(function(value) {
                context.set('automationWriteMode', value, {observed: true});
            });
            this.on('change:automationWriteMode', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized && api.setAutomationWriteMode(value);
            });

            api.addClickObserver(function(value) {
                context.set('click', value, {observed: true});
            });
            this.on('change:click', function(model, value, options) {
                options.observed || this.initialized && this.api.setClick(value);
            });

            api.addIsLoopActiveObserver(function(value) {
                context.set('loopActive', value, {observed: true});
            });
            this.on('change:loopActive', function(model, value, options) {
                options.observed || this.initialized && this.api.setLoop(value);
            });

            api.addIsPlayingObserver(function(value) {
                context.set('playing', value, {observed: true});
            });
            this.on('change:playing', function(model, value, options) {
                options.observed || this.initialized && ((value) ? this.stop() : this.play());
            });

            api.addIsRecordingObserver(function(value) {
                context.set('recording', value, {observed: true});
            });
            this.on('change:recording', function(model, value, options) {
                options.observed || this.initialized && this.record();
            });

            api.addIsWritingArrangerAutomationObserver(function(value) {
                context.set('writingArrangerAutomation', value, {observed: true});
            });
            this.on('change:writingArrangerAutomation', function(model, value, options) {
                options.observed || this.initialized && this.api.toggleWriteArrangerAutomation();
            });

            api.addIsWritingClipLauncherAutomationObserver(function(value) {
                context.set('writingClipLauncherAutomation', value, {observed: true});
            });
            this.on('change:writingClipLauncherAutomation', function(model, value, options) {
                options.observed || this.initialized &&
                    this.api.toggleWriteClipLauncherAutomation();
            });

            api.addLauncherOverdubObserver(function(value) {
                context.set('launcherOverdub', value, {observed: true});
            });
            this.on('change:launcherOverdub', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized && this.api.setLauncherOverdub(value);
            });

            api.addMetronomeTicksObserver(function(value) {
                context.set('metronomeTicks', value, {observed: true});
            });
            this.on('change:metronomeTicks', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized && this.api.toggleMetronomeTicks();
            });

            api.addMetronomeVolumeObserver(function(value) {
                context.set('metronomeVolume', value, {observed: true});
            });
            this.on('change:metronomeVolume', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized &&
                    this.api.setMetronomeValue(
                        value, _.isNumber(options.metronomeVolumeRange) ? options.range : 128);
            });

            api.addOverdubObserver(function(value) {
                context.set('overdub', value, {observed: true});
            });
            this.on('change:overdub', function(model, value, options) {
                // if changed by user script
                options.observed || this.initialized && this.api.setOverdub(value);
            });

            api.addPreRollObserver(function(value) {
                context.set('preRoll', value, {observed: true});
            });

            api.addPunchInObserver(function(value) {
                context.set('punchIn', value, {observed: true});
            });
            this.on('change:punchIn', function(model, value, options) {
                options.observed || this.initialized && this.api.togglePunchIn();
            });

            api.addPunchOutObserver(function(value) {
                context.set('punchOut', value, {observed: true});
            });
            this.on('change:punchOut', function(model, value, options) {
                options.observed || this.initialized && this.api.togglePunchOut();
            });

            this.set('inPosition', BeatTime.create(api.getInPosition(), options));

            this.set('outPosition', BeatTime.create(api.getOutPosition(), options));

            this.set('position', BeatTime.create(api.getPosition(), options));

            this.set('tempo', RangedValue.create(api.getTempo(), {range: 666}));
        },

        fastForward: function() {
            if (this.get('playing')) {
                this.stop();
                this.api.fastForward();
                this.deferredPlay(50);
            } else {
                this.api.fastForward();
            }
        },

        incPosition: function(delta, snap) {
            this.api.incPosition(delta, snap);
        },

        incTempo: function(delta, slow) {
            this.api.increaseTempo(delta, slow ? 64700 : 647);
        },

        incTempoSlow: function(delta) {
            this.incTempo(delta, true);
        },

        incTempoFast: function(delta) {
            this.incTempo(delta, false);
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
        },

        play: function() {
            this.api.play();
        },

        deferredPlay: function(millis) {
            var context = this;
            Bitwig.scheduleTask(function() {
                context.play();
            }, null, millis);
        },

        record: function() {
            this.api.record();
        },

        resetAutomationOverrides: function() {
            this.api.resetAutomationOverrides();
        },

        rstart: function() {
            this.api.restart();
        },

        returnToArrangement: function() {
            this.api.returnToArrangement();
        },

        rewind: function() {
            if (this.get('playing')) {
                this.stop();
                this.api.rewind();
                this.deferredPlay(50);
            } else {
                this.api.rewind();
            }
        },

        stop: function() {
            this.api.stop();
        },

        toggleClick: function() {
            this.api.toggleClick();
        },

        toggleLatchAutomationWriteMode: function() {
            this.api.toggleLatchAutomationWriteMode();
        },

        toggleLauncherOverdub: function() {
            this.api.toggleLauncherOverdub();
        },

        toggleLoop: function() {
            this.api.toggleLoop();
        },

        toggleMetronomeTicks: function() {
            this.api.toggleMetronomeTicks();
        },

        toggleOverdub: function() {
            this.api.toggleOverdub();
        },

        togglePlay: function() {
            this.api.togglePlay();
        },

        togglePunchIn: function() {
            this.api.togglePunchIn();
        },

        togglePunchOut: function() {
            this.api.togglePunchOut();
        },

        toggleWriteArrangerAutomation: function() {
            this.api.toggleWriteArrangerAutomation();
        },

        toggleWriteClipLauncherAutomation: function() {
            this.api.toggleWriteClipLauncherAutomation();
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

}(this, this.host, this.Backbone, this._));

(function(root, Bitwig, Backbone, _) {
    'use strict';

    // inports
    var AutomatableRangedValue = root.bitbone.AutomatableRangedValue,
        AutomatableRangedValueCollection = root.bitbone.AutomatableRangedValueCollection;

    // UserControlBank
    // -------------
    //
    // Attributes
    //
    // Options
    //
    var UserControlBank = AutomatableRangedValueCollection.extend({
        initialize: function(models, options, numControllers) {
            var api = Bitwig.createUserControls(numControllers);
            this.initUserControlBank(models, options, api, numControllers);
            this.api = api;
            this.initialized = true;
        },

        initUserControlBank: function(attributes, options, api, numControllers) {
            for (var i=0; i < numControllers; i++) {
                this.add(AutomatableRangedValue.create(api.getControl(i)));
            }
        }

    },{

        create: function(numControllers, options) {
            return new UserControlBank(undefined, options, numControllers);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.UserControlBank = UserControlBank;

}(this, host, Backbone, _));
