(function(root, Bitwig, Backbone, _) {
    'use strict';

    // import dependenices
    var AutomatableRangedValue = root.bitbone.AutomatableRangedValue,
        AutomatableRangedValueCollection = root.bitbone.AutomatableRangedValueCollection;

    // UserControlBank
    // -------------
    //
    // Attributes
    //
    // Options
    //
    //   numControllers Number default 40
    //
    var UserControlBank = AutomatableRangedValueCollection.extend({
        initialize: function(models, options) {
            options || (options = {});
            _.defaults(options, {
                numControllers: 40
            });
            var api = Bitwig.createUserControls(options.numControllers);
            this.initUserControlBank(models, options, api);
            this.api = api;
            this.initialized = true;
        },

        initUserControlBank: function(attributes, options, api) {
            for (var i=0; i < options.numControllers; i++) {
                this.add(AutomatableRangedValue.create(api.getControl(i)));
            }
            return this;
        }

    },{
        create: function(options) {
            return new UserControlBank(undefined, options);
        }

    });

    // export
    root.bitbone || (root.bitbone = {});
    root.bitbone.UserControlBank = UserControlBank;

}(this, host, Backbone, _));
