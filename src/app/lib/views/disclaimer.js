(function (App) {
    'use strict';

    var that, currPasskey;

    var DisclaimerModal = Backbone.Marionette.ItemView.extend({
        template: '#disclaimer-tpl',
        className: 'disclaimer',

        ui: {
            success_alert: '.success_alert',
            error_alert: '.error_alert',
        },

        events: {
            'click .btn-accept': 'acceptDisclaimer',
            'click .btn-close': 'closeApp',
            'change #dpasskey': 'savePasskey',
        },

        onShow: function () {
            that = this;
        },

        initialize: function () {
            Mousetrap.pause();
            currPasskey = App.settings.passkey;
            win.warn('Show Disclaimer');
        },

        acceptDisclaimer: function (e) {
            e.preventDefault();
            Mousetrap.unpause();
            AdvSettings.set('disclaimerAccepted', 1);
            App.vent.trigger('disclaimer:close');

            var p = App.settings.passkey;
            if(p != currPasskey && /^[0-9a-f]{32}$/i.test(p)) {
                //App.vent.trigger('restartPopcornTime');
                App.vent.trigger('movies:list');
            }
        },

        closeApp: function (e) {
            e.preventDefault();
            gui.App.quit();
        },

        savePasskey: function(e) {
            e.preventDefault();

            var p = $(e.currentTarget).val();

            if(p != App.settings.passkey) {
                if ( ! (/^[0-9a-f]{32}$/i.test(p)) ) {
                    p = currPasskey;
                }

                App.settings['passkey'] = p;

                App.db.writeSetting({
                    key: 'passkey',
                    value: p
                }).then(function () {
                    if (p == currPasskey) that.ui.error_alert.show().delay(1000).fadeOut(400);
                    else that.ui.success_alert.show().delay(1000).fadeOut(400);
                });
            }
        }
    });

    App.View.DisclaimerModal = DisclaimerModal;
})(window.App);
