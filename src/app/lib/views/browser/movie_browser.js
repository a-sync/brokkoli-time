(function (App) {
    'use strict';

    var MovieBrowser = App.View.PCTBrowser.extend({
        collectionModel: App.Model.MovieCollection,
        filters: {
            genres: App.Config.genres,
            sorters: App.Config.sorters,
            types: App.Config.types_site
        }
    });

    App.View.MovieBrowser = MovieBrowser;
})(window.App);
