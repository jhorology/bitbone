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
            options || (options = {});
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
