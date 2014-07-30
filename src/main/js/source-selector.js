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