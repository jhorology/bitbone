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
