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
            options || (options = {});
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
