var Q = require('q'),
    os = require('os'),
    path = require('path'),
    _ = require('underscore'),
    data_path = require('nw.gui').App.dataPath;

/** Default settings **/
var Settings = {};

// User interface
Settings.language = 'hu';
Settings.translateSynopsis = false;
Settings.coversShowRating = true;
Settings.watchedCovers = 'fade';
Settings.showAdvancedSettings = false;

Settings.postersMinWidth = 142;
Settings.postersMaxWidth = 342;
Settings.postersMinFontSize = 0.8;
Settings.postersMaxFontSize = 1.3;
Settings.postersSizeRatio = (513 / 342);
Settings.postersWidth = Settings.postersMinWidth;
Settings.postersJump = [142, 162, 182, 202, 222, 242, 262, 282, 302, 322, 342];

//Playback
Settings.alwaysFullscreen = false;
Settings.playNextEpisodeAuto = false;
Settings.chosenPlayer = 'local';

// Advanced UI
Settings.alwaysOnTop = false;
Settings.theme = 'Brokkoli_-_Dark_theme';
Settings.ratingStars = false; //trigger on click in details
Settings.startScreen = 'Movies';
Settings.lastTab = '';

// Quality
Settings.shows_default_quality = '720p';
Settings.movies_default_quality = '1080p';
Settings.moviesShowQuality = false;
Settings.movies_quality = 'all';
//Settings.moviesShowGooglecloud = true;

// Subtitles
Settings.subtitle_language = 'none';
Settings.subtitle_size = '28px';
Settings.subtitle_color = '#ffffff';
Settings.subtitle_decoration = 'Outline';
Settings.subtitle_font = 'Arial';

// More options
Settings.httpApiPort = 8008;
Settings.httpApiUsername = 'popcorn';
Settings.httpApiPassword = 'popcorn';

// Trakt.tv
Settings.traktToken = '';
Settings.traktTokenRefresh = '';
Settings.traktTokenTTL = '';
Settings.traktTvVersion = '0.0.2';
Settings.traktLastSync = '';
Settings.traktLastActivities = '';
Settings.traktSyncOnStart = false;
Settings.traktPlayback = false;

// TVShow Time
Settings.tvstAccessToken = '';

// Advanced options
Settings.connectionLimit = 100;
Settings.dhtLimit = 500;
Settings.streamPort = 0; // 0 = Random
Settings.tmpLocation = path.join(os.tmpDir(), 'brokkoli-time-cache');
Settings.databaseLocation = path.join(data_path, 'data');
Settings.deleteTmpOnClose = true;
Settings.automaticUpdating = false;
Settings.events = true;
Settings.minimizeToTray = true;
Settings.bigPicture = false;

// Features
Settings.activateTorrentCollection = true;
Settings.activateWatchlist = false;
Settings.activateFavorites = true;
Settings.activateVpn = false;
Settings.activateRandomize = false;
Settings.onlineSearchEngine = 'RARBG';

// Ratio
Settings.totalDownloaded = 0;
Settings.totalUploaded = 0;

// VPN
Settings.vpn = false;
Settings.vpnUsername = '';
Settings.vpnPassword = '';

Settings.passkey = '{PASSKEY}';

Settings.tvAPI = [{
    url: 'https://api-fetch.website/tv/',
    strictSSL: true
},{
    url: 'https://popcorntime.ws/api/eztv/',
    strictSSL: true
},{
    url: 'https://eztvapi.ml/',
    strictSSL: true
},{
    url: 'https://popcornwvnbg7jev.onion.to/',
    strictSSL: true
}];

Settings.ytsAPI = [{
    url: 'http://bigfathead.eu/kukorica/',
    strictSSL: true
},{
    url: 'http://kukorica.devs.space/',
    strictSSL: true
}/*,{
    url: 'https://movies.api-fetch.website/',
    strictSSL: true
}*/
];

Settings.updateEndpoint = {
    url: '127.0.0.1',//'https://popcornbxexxf3bu.onion.to/',
    index: 0,
    proxies: [/*{
        url: 'https://popcornqbt6ktnfs.onion.to/',
        //fingerprint: '30:A6:BA:6C:19:A4:D5:C3:5A:E8:F1:56:C6:B4:E1:DC:EF:DD:EC:8C',
    }, {
        url: 'https://popcornd6v5duho3.onion.to/',
        //fingerprint: '30:A6:BA:6C:19:A4:D5:C3:5A:E8:F1:56:C6:B4:E1:DC:EF:DD:EC:8C',
    }*/]
};

// App Settings
Settings.version = false;
Settings.dbversion = '0.1.0';
Settings.font = 'tahoma';
Settings.defaultWidth = Math.round(window.screen.availWidth * 0.8);
Settings.defaultHeight = Math.round(window.screen.availHeight * 0.8);

// Miscellaneous
Settings.playerSubPosition = '0px';
Settings.playerVolume = '1';
Settings.tv_detail_jump_to = 'next';


var ScreenResolution = {
    get SD() {
        return window.screen.width < 1280 || window.screen.height < 720;
    },
    get HD() {
        return window.screen.width >= 1280 && window.screen.width < 1920 || window.screen.height >= 720 && window.screen.height < 1080;
    },
    get FullHD() {
        return window.screen.width >= 1920 && window.screen.width < 2000 || window.screen.height >= 1080 && window.screen.height < 1600;
    },
    get UltraHD() {
        return window.screen.width >= 2000 || window.screen.height >= 1600;
    },
    get QuadHD() {
        return window.screen.width >= 3000 || window.screen.height >= 1800;
    },
    get Standard() {
        return window.devicePixelRatio <= 1;
    },
    get Retina() {
        return window.devicePixelRatio > 1;
    }
};

var AdvSettings = {

    get: function (variable) {
        if (typeof Settings[variable] !== 'undefined') {
            return Settings[variable];
        }

        return false;
    },

    set: function (variable, newValue) {
        Database.writeSetting({
                key: variable,
                value: newValue
            })
            .then(function () {
                Settings[variable] = newValue;
            });
    },

    setup: function () {
        AdvSettings.performUpgrade();
        return AdvSettings.getHardwareInfo();
    },

    getHardwareInfo: function () {
        if (/64/.test(process.arch)) {
            AdvSettings.set('arch', 'x64');
        } else {
            AdvSettings.set('arch', 'x86');
        }

        switch (process.platform) {
            case 'darwin':
                AdvSettings.set('os', 'mac');
                break;
            case 'win32':
                AdvSettings.set('os', 'windows');
                break;
            case 'linux':
                AdvSettings.set('os', 'linux');
                break;
            default:
                AdvSettings.set('os', 'unknown');
                break;
        }

        return Q();
    },

    getNextApiEndpoint: function (endpoint) {
        if (endpoint.index < endpoint.proxies.length - 1) {
            endpoint.index++;
        } else {
            endpoint.index = 0;
        }
        endpoint.ssl = undefined;
        _.extend(endpoint, endpoint.proxies[endpoint.index]);
        return endpoint;
    },

    checkApiEndpoints: function (endpoints) {
        return Q.all(_.map(endpoints, function (endpoint) {
            return AdvSettings.checkApiEndpoint(endpoint);
        }));
    },

    checkApiEndpoint: function (endpoint, defer) {
        if (Settings.automaticUpdating === false) {
            return;
        }
        var tls = require('tls'),
            http = require('http'),
            uri = require('url');

        defer = defer || Q.defer();

        endpoint.ssl = undefined;
        _.extend(endpoint, endpoint.proxies[endpoint.index]);

        var url = uri.parse(endpoint.url);
        win.debug('Checking %s endpoint', url.hostname);

        if (endpoint.ssl === false) {
            var timeoutWrapper = function (req) {
                return function () {
                    win.warn('[%s] Endpoint timed out',
                        url.hostname);
                    req.abort();
                    tryNextEndpoint();
                };
            };
            var request = http.get({
                hostname: url.hostname
            }, function (res) {
                res.once('data', function (body) {
                    clearTimeout(timeout);
                    res.removeAllListeners('error');
                    // Doesn't match the expected response
                    if (!_.isRegExp(endpoint.fingerprint) || !endpoint.fingerprint.test(body.toString('utf8'))) {
                        win.warn('[%s] Endpoint fingerprint %s does not match %s',
                            url.hostname,
                            endpoint.fingerprint,
                            body.toString('utf8'));
                        tryNextEndpoint();
                    } else {
                        defer.resolve();
                    }
                }).once('error', function (e) {
                    win.warn('[%s] Endpoint failed [%s]',
                        url.hostname,
                        e.message);
                    clearTimeout(timeout);
                    tryNextEndpoint();
                });
            });

            var fn = timeoutWrapper(request);
            var timeout = setTimeout(fn, 5000);
        } else {
            tls.connect(443, url.hostname, {
                servername: url.hostname,
                rejectUnauthorized: false
            }, function () {
                this.setTimeout(0);
                this.removeAllListeners('error');
                if (!this.authorized ||
                    this.authorizationError ||
                    this.getPeerCertificate().fingerprint !== endpoint.fingerprint) {
                    // "These are not the certificates you're looking for..."
                    // Seems like they even got a certificate signed for us :O
                    win.warn('[%s] Endpoint fingerprint %s does not match %s',
                        url.hostname,
                        endpoint.fingerprint,
                        this.getPeerCertificate().fingerprint);
                    tryNextEndpoint();
                } else {
                    defer.resolve();
                }
                this.end();
            }).once('error', function (e) {
                win.warn('[%s] Endpoint failed [%s]',
                    url.hostname,
                    e.message);
                this.setTimeout(0);
                tryNextEndpoint();
            }).once('timeout', function () {
                win.warn('[%s] Endpoint timed out',
                    url.hostname);
                this.removeAllListeners('error');
                this.end();
                tryNextEndpoint();
            }).setTimeout(5000);
        }

        function tryNextEndpoint() {
            if (endpoint.index < endpoint.proxies.length - 1) {
                endpoint.index++;
                AdvSettings.checkApiEndpoint(endpoint, defer);
            } else {
                endpoint.index = 0;
                endpoint.ssl = undefined;
                _.extend(endpoint, endpoint.proxies[endpoint.index]);
                defer.resolve();
            }
        }

        return defer.promise;
    },

    performUpgrade: function () {
        // This gives the official version (the package.json one)
        gui = require('nw.gui');
        var currentVersion = gui.App.manifest.version;

        if (currentVersion !== AdvSettings.get('version')) {
            // Nuke the DB if there's a newer version
            // Todo: Make this nicer so we don't lose all the cached data
            var cacheDb = openDatabase('cachedb', '', 'Cache database', 50 * 1024 * 1024);

            cacheDb.transaction(function (tx) {
                tx.executeSql('DELETE FROM subtitle');
                tx.executeSql('DELETE FROM metadata');
            });

            // Add an upgrade flag
            window.__isUpgradeInstall = true;
        }
        AdvSettings.set('version', currentVersion);
        AdvSettings.set('releaseName', gui.App.manifest.releaseName);
    },
};
