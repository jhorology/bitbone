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

            this.on('change:hasActiveEngine', function(model, value, options) {
                options.observed || this.initialized &&
                    (value ? this.deactivateEngine() : this.activateEngine());
            });

            api.addSelectedModeObserver(
                function(value) {
                    context.set('selectedMode', value, {observed: true});
                },
                options.selectedModeMaxChars,
                options.selectedModeFallback
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
