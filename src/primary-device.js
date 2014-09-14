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
