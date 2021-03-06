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
            options || (options = {});
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
