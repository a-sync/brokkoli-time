(function (App) {
    'use strict';

    var prevX = 0;
    var prevY = 0;

    var Item = Backbone.Marionette.ItemView.extend({
        template: '#item-tpl',

        tagName: 'li',
        className: 'item',

        attributes: function () {
            return {
                'data-imdb-id': this.model.get('imdb_id')
            };
        },

        ui: {
            coverImage: '.cover-image',
            cover: '.cover',
            bookmarkIcon: '.actions-favorites',
            watchedIcon: '.actions-watched'
        },
        events: {
            'click .actions-favorites': 'toggleFavorite',
            'click .actions-watched': 'toggleWatched',
            'click .cover': 'showDetail',
            'mouseover .cover': 'hoverItem'
        },

        initialize: function () {

            var imdb = this.model.get('imdb_id'),
                bookmarked = App.userBookmarks.indexOf(imdb) !== -1,
                itemtype = this.model.get('type'),
                images = this.model.get('images'),
                img = (images) ? images.poster : this.model.get('image'),
                watched, cached, that = this;

            switch (itemtype) {
                case 'bookmarkedshow':
                    watched = App.watchedShows.indexOf(imdb) !== -1;
                    this.model.set('image', App.Trakt.resizeImage(img, 'thumb'));
                    break;
                case 'show':
                    watched = App.watchedShows.indexOf(imdb) !== -1;
                    images.poster = App.Trakt.resizeImage(img, 'thumb');
                    break;
                case 'bookmarkedmovie':
                case 'movie':
                    watched = App.watchedMovies.indexOf(imdb) !== -1;
                    this.model.set('image', img);
                    break;
            }
            this.model.set('watched', watched);
            this.model.set('bookmarked', bookmarked);
        },

        onShow: function () {
            this.ui.coverImage.on('load', _.bind(this.showCover, this));
        },

        onRender: function () {
            var itemtype = this.model.get('type');
            if (itemtype === 'show' || itemtype === 'bookmarkedshow' || itemtype === 'historyshow') {
                this.ui.watchedIcon.remove();
            }

        },

        onDestroy: function () {
            try {
                this.ui.coverImage.off('load');
            } catch (err) {
                win.error(err);
            }
        },

        hoverItem: function (e) {
            if (e.pageX !== prevX || e.pageY !== prevY) {
                $('.item.selected').removeClass('selected');
                $(this.el).addClass('selected');
                prevX = e.pageX;
                prevY = e.pageY;
            }
        },

        showCover: function () {
            var coverUrl;
            var itemtype = this.model.get('type');
            switch (itemtype) {
                case 'bookmarkedmovie':
                    if (this.model.get('watched')) {
                        this.ui.watchedIcon.addClass('selected');
                        switch (Settings.watchedCovers) {
                        case 'fade':
                        case 'hide':
                            this.$el.addClass('watched');
                            break;
                        }
                    }
                    coverUrl = this.model.get('image');
                    this.ui.bookmarkIcon.addClass('selected');
                    break;
                case 'bookmarkedshow':
                    coverUrl = this.model.get('image');
                    this.ui.bookmarkIcon.addClass('selected');
                    break;
                case 'movie':
                    coverUrl = this.model.get('image');

                    if (this.model.get('watched')) {
                        this.ui.watchedIcon.addClass('selected');
                        switch (Settings.watchedCovers) {
                        case 'fade':
                            this.$el.addClass('watched');
                            break;
                        case 'hide':
                            if ($('.search input').val()) {
                                this.$el.addClass('watched');
                            } else {
                                this.$el.remove();
                            }
                            break;
                        }
                    }
                    if (this.model.get('bookmarked')) {
                        this.ui.bookmarkIcon.addClass('selected');
                    }
                    break;
                case 'show':
                    coverUrl = this.model.get('images').poster;

                    if (this.model.get('bookmarked')) {
                        this.ui.bookmarkIcon.addClass('selected');
                    }
                    break;
            }


            this.ui.watchedIcon.tooltip({
                title: this.ui.watchedIcon.hasClass('selected') ? i18n.__('Mark as unseen') : i18n.__('Mark as Seen')
            });
            this.ui.bookmarkIcon.tooltip({
                title: this.ui.bookmarkIcon.hasClass('selected') ? i18n.__('Remove from bookmarks') : i18n.__('Add to bookmarks')
            });

            var this_ = this;

            var coverCache = new Image();
            coverCache.src = coverUrl;
            coverCache.onload = function () {
                try {
                    this_.ui.cover.css('background-image', 'url(' + coverUrl + ')').addClass('fadein');
                } catch (e) {}
                coverCache = null;
            };
            coverCache.onerror = function () {
                try {
                    this_.ui.cover.css('background-image', 'url("images/posterholder.png")').addClass('fadein');
                } catch (e) {}
                coverCache = null;
            };

            this.ui.coverImage.remove();

        },

        showDetail: function (e) {
            e.preventDefault();
            var provider = App.Providers.get(this.model.get('provider'));
            var data;
            var type = this.model.get('type');
            switch (type) {
                case 'bookmarkedmovie':
                    var SelectedMovie = new Backbone.Model({
                        imdb_id: this.model.get('imdb_id'),
                        image: this.model.get('image'),
                        cover: this.model.get('cover'),
                        torrents: this.model.get('torrents'),
                        title: this.model.get('title'),
                        genre: this.model.get('genre'),
                        synopsis: this.model.get('synopsis'),
                        runtime: this.model.get('runtime'),
                        year: this.model.get('year'),
                        health: this.model.get('health'),
                        subtitle: this.model.get('subtitle'),
                        backdrop: this.model.get('backdrop'),
                        rating: this.model.get('rating'),
                        trailer: this.model.get('trailer'),
                        provider: this.model.get('provider'),
                        watched: this.model.get('watched'),
                        bookmarked: true,
                        google_video: this.model.get('google_video'),
                        directors: this.model.get('directors'),
                        cast: this.model.get('cast'),
                    });

                    App.vent.trigger('movie:showDetail', SelectedMovie);
                    break;

                case 'bookmarkedshow':
                    type = 'show';
                    /* falls through */
                case 'show':
                case 'movie':
                    var Type = type.charAt(0).toUpperCase() + type.slice(1);
                    this.model.set('health', false);
                    $('.spinner').show();
                    data = provider.detail(this.model.get('imdb_id'), this.model.attributes)
                        .catch(function () {
                            $('.spinner').hide();
                            $('.notification_alert').text(i18n.__('Error loading data, try again later...')).fadeIn('fast').delay(2500).fadeOut('fast');
                        })
                        .then(function (data) {
                            data.provider = provider.name;
                            $('.spinner').hide();
                            App.vent.trigger(type + ':showDetail', new App.Model[Type](data));
                        });
                    break;

            }

        },

        toggleWatched: function (e) {
            e.stopPropagation();
            e.preventDefault();
            var that = this;
            if (this.model.get('watched')) {
                this.ui.watchedIcon.removeClass('selected');
                if (Settings.watchedCovers === 'fade') {
                    this.$el.removeClass('watched');
                }
                Database.markMovieAsNotWatched({
                        imdb_id: this.model.get('imdb_id')
                    }, true)
                    .then(function () {
                        that.model.set('watched', false);
                        App.vent.trigger('movie:unwatched', {
                            imdb_id: that.model.get('imdb_id')
                        }, 'seen');
                    });
            } else {
                this.ui.watchedIcon.addClass('selected');
                switch (Settings.watchedCovers) {
                case 'fade':
                    this.$el.addClass('watched');
                    break;
                case 'hide':
                    this.$el.remove();
                    break;
                }
                Database.markMovieAsWatched({
                        imdb_id: this.model.get('imdb_id'),
                        from_browser: true
                    }, true)
                    .then(function () {
                        that.model.set('watched', true);
                        App.vent.trigger('movie:watched', {
                            imdb_id: that.model.get('imdb_id')
                        }, 'seen');
                    });

            }

            this.ui.watchedIcon.tooltip({
                title: this.ui.watchedIcon.hasClass('selected') ? i18n.__('Mark as unseen') : i18n.__('Mark as Seen')
            });
        },

        toggleFavorite: function (e) {
            e.stopPropagation();
            e.preventDefault();
            var that = this;
            var provider = App.Providers.get(this.model.get('provider'));
            var data;

            switch (this.model.get('type')) {
            case 'bookmarkedshow':
            case 'bookmarkedmovie':
                Database.deleteBookmark(this.model.get('imdb_id'))
                    .then(function () {
                        App.userBookmarks.splice(App.userBookmarks.indexOf(that.model.get('imdb_id')), 1);
                        win.info('Bookmark deleted (' + that.model.get('imdb_id') + ')');
                        if (that.model.get('type') === 'movie') {
                            // we'll make sure we dont have a cached movie
                            Database.deleteMovie(that.model.get('imdb_id'));
                        }

                        // we'll delete this element from our list view
                        $(e.currentTarget).closest('li').animate({
                            paddingLeft: '0px',
                            paddingRight: '0px',
                            width: '0%',
                            opacity: 0
                        }, 500, function () {
                            $(this).remove();
                            $('.items').append($('<li/>').addClass('item ghost'));
                            if ($('.items li').length === 0) {
                                App.vent.trigger('movies:list', []);
                            }
                        });
                    });
                break;

            case 'movie':
                if (this.model.get('bookmarked')) {
                    this.ui.bookmarkIcon.removeClass('selected');
                    Database.deleteBookmark(this.model.get('imdb_id'))
                        .then(function () {
                            win.info('Bookmark deleted (' + that.model.get('imdb_id') + ')');
                            // we'll make sure we dont have a cached movie
                            return Database.deleteMovie(that.model.get('imdb_id'));
                        })
                        .then(function () {
                            that.model.set('bookmarked', false);
                        });
                } else {
                    this.ui.bookmarkIcon.addClass('selected');

                    if (this.model.get('imdb_id').indexOf('mal') !== -1 && this.model.get('item_data') === 'Movie') {
                        // Anime
                        data = provider.detail(this.model.get('imdb_id'), this.model.attributes)
                            .catch(function () {
                                $('.notification_alert').text(i18n.__('Error loading data, try again later...')).fadeIn('fast').delay(2500).fadeOut('fast');
                            })
                            .then(function (data) {
                                var movie = {
                                    imdb_id: data.imdb_id,
                                    image: data.image,
                                    cover: data.cover,
                                    torrents: {}, //
                                    title: data.title,
                                    genre: {}, //
                                    synopsis: data.synopsis,
                                    runtime: data.runtime,
                                    year: data.year,
                                    health: false,
                                    subtitle: data.subtitle,
                                    backdrop: undefined,
                                    rating: data.rating,
                                    trailer: false,
                                    provider: that.model.get('provider'),
                                };
                                movie.torrents = data.torrents;
                                movie.genre = data.genre;

                                Database.addMovie(movie)
                                    .then(function (idata) {
                                        return Database.addBookmark(that.model.get('imdb_id'), 'movie');
                                    })
                                    .then(function () {
                                        win.info('Bookmark added (' + that.model.get('imdb_id') + ')');
                                        that.model.set('bookmarked', true);
                                        App.userBookmarks.push(that.model.get('imdb_id'));
                                    });
                            });
                    } else {
                        // Movie
                        var movie = {
                            imdb_id: this.model.get('imdb_id'),
                            image: this.model.get('image'),
                            cover: this.model.get('cover'),
                            torrents: this.model.get('torrents'),
                            title: this.model.get('title'),
                            genre: this.model.get('genre'),
                            synopsis: this.model.get('synopsis'),
                            runtime: this.model.get('runtime'),
                            year: this.model.get('year'),
                            health: this.model.get('health'),
                            subtitle: this.model.get('subtitle'),
                            backdrop: this.model.get('backdrop'),
                            rating: this.model.get('rating'),
                            trailer: this.model.get('trailer'),
                            provider: this.model.get('provider'),
                            google_video: this.model.get('google_video'),
                            directors: this.model.get('directors'),
                            cast: this.model.get('cast'),
                        };

                        Database.addMovie(movie)
                            .then(function () {
                                return Database.addBookmark(that.model.get('imdb_id'), 'movie');
                            })
                            .then(function () {
                                win.info('Bookmark added (' + that.model.get('imdb_id') + ')');
                                that.model.set('bookmarked', true);
                            });
                    }
                }
                break;
            case 'show':
                if (this.model.get('bookmarked') === true) {
                    this.ui.bookmarkIcon.removeClass('selected');
                    this.model.set('bookmarked', false);
                    Database.deleteBookmark(this.model.get('imdb_id'))
                        .then(function () {
                            win.info('Bookmark deleted (' + that.model.get('imdb_id') + ')');

                            App.userBookmarks.splice(App.userBookmarks.indexOf(that.model.get('imdb_id')), 1);

                            // we'll make sure we dont have a cached show
                            Database.deleteTVShow(that.model.get('imdb_id'));
                        });
                } else {
                    this.model.set('bookmarked', true);
                    this.ui.bookmarkIcon.addClass('selected');
                    data = provider.detail(this.model.get('imdb_id'), this.model.attributes)
                        .then(function (data) {
                            data.provider = that.model.get('provider');
                            promisifyDb(db.tvshows.find({
                                    imdb_id: that.model.get('imdb_id').toString(),
                                }))
                                .then(function (res) {
                                    if (res != null && res.length > 0) {
                                        return Database.updateTVShow(data);
                                    } else {
                                        return Database.addTVShow(data);
                                    }
                                })
                                .then(function (idata) {
                                    return Database.addBookmark(that.model.get('imdb_id'), 'tvshow');
                                })
                                .then(function () {
                                    win.info('Bookmark added (' + that.model.get('imdb_id') + ')');
                                    that.model.set('bookmarked', true);
                                    App.userBookmarks.push(that.model.get('imdb_id'));
                                }).catch(function (err) {
                                    win.error(err);
                                });
                        }).catch(function (err) {
                            win.error(err);
                            $('.notification_alert').text(i18n.__('Error loading data, try again later...')).fadeIn('fast').delay(2500).fadeOut('fast');
                        });
                }
                break;

            }

            this.ui.bookmarkIcon.tooltip({
                title: this.ui.bookmarkIcon.hasClass('selected') ? i18n.__('Remove from bookmarks') : i18n.__('Add to bookmarks')
            });
        }

    });

    App.View.Item = Item;
})(window.App);
