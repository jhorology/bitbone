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
    var Groove = Backbone.Model.extend({
        initialize: function(attributes, options) {
            var api = Bitwig.createGroove();
            this.initGroove(attributes, options, api);
            this.api = api;
            this.initialized = true;
        },

        initGroove: function(attributes, options, api) {
            this.set('accentAmount',
                     AutomatableRangedValue.create(api.getAccentAmount(), options.accentAmount));

            this.set('accentRate',
                     AutomatableRangedValue.create(api.getAccentRate(), options.accentRate));

            this.set('accentPhase',
                     AutomatableRangedValue.create(api.getAccentPhase(), options.accentPhase));

            this.set('shuffleAmount',
                     AutomatableRangedValue.create(api.getShuffleAmount(), options.shuffleAmount));

            this.set('shuffleRate',
                     AutomatableRangedValue.create(api.getShuffleRate(), options.shuffleRate));

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
