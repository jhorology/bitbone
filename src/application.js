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
            options || (options = {});
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
