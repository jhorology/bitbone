(function(root, Bitwig, Backbone, _) {
    'use strict';

    // inports
    var AutomatableRangedValue = root.bitbone.AutomatableRangedValue,
        AutomatableRangedValueCollection = root.bitbone.AutomatableRangedValueCollection;

    // UserControlBank
    // -------------
    //
    // Attributes
    //
    // Options
    //
    var UserControlBank = AutomatableRangedValueCollection.extend({
        initialize: function(models, options, numControllers) {
            var api = Bitwig.createUserControls(numControllers);
            this.initUserControlBank(models, options, api, numControllers);
            this.api = api;
            this.initialized = true;
        },

        initUserControlBank: function(attributes, options, api, numControllers) {
            for (var i=0; i < numControllers; i++) {
                this.add(AutomatableRangedValue.create(api.getControl(i)));
            }
        }

    },{

        create: function(numControllers, options) {
            return new UserControlBank(undefined, options, numControllers);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.UserControlBank = UserControlBank;

}(this, host, Backbone, _));
