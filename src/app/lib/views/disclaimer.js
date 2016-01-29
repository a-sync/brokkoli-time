(function (App) {
    'use strict';

    var that, currPasskey, currPasskey2;

    var DisclaimerModal = Backbone.Marionette.ItemView.extend({
        template: '#disclaimer-tpl',
        className: 'disclaimer',

        ui: {
            success_alert: '.success_alert',
            error_alert: '.error_alert',
            success_alert2: '.success_alert2',
            error_alert2: '.error_alert2',
        },

        events: {
            'click .btn-accept': 'acceptDisclaimer',
            'click .btn-close': 'closeApp',
            'change #dpasskey': 'savePasskey',
            'change #dpasskey2': 'savePasskey2',
        },

        onShow: function () {
            that = this;
        },

        initialize: function () {
            Mousetrap.pause();
            currPasskey = App.settings.passkey;
            currPasskey2 = App.settings.passkey2;
            win.warn('Show Disclaimer');
        },

        acceptDisclaimer: function (e) {
            e.preventDefault();
            Mousetrap.unpause();
            AdvSettings.set('disclaimerAccepted', 1);
            App.vent.trigger('disclaimer:close');

            var p = App.settings.passkey;
            var p2 = App.settings.passkey2;
            if((p != currPasskey && /^[0-9a-f]{32}$/i.test(p)) || (p2 != currPasskey2 && /^[0-9a-f]{32}$/i.test(p2))) {
                App.vent.trigger('restartPopcornTime');
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
        },

        savePasskey2: function(e) {
            e.preventDefault();

            var p2 = $(e.currentTarget).val();

            if(p2 != App.settings.passkey2) {
                if ( ! (/^[0-9a-f]{32}$/i.test(p2)) ) {
                    p2 = currPasskey2;
                }

                App.settings['passkey2'] = p2;

                App.db.writeSetting({
                    key: 'passkey2',
                    value: p2
                }).then(function () {
                    if (p2 == currPasskey2) that.ui.error_alert2.show().delay(1000).fadeOut(400);
                    else that.ui.success_alert2.show().delay(1000).fadeOut(400);
                });
            }
        }

    });

    App.View.DisclaimerModal = DisclaimerModal;
})(window.App);
