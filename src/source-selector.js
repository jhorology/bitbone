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
            options || (options = {});
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
