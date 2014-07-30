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
