<ul class="nav nav-hor left">
    <li class="source active showMovies providerinfo" data-toggle="tooltip" data-placement="top" title="Kukorica API"><%= i18n.__("Movies") %></li>
    <li class="source showShows providerinfo" data-toggle="tooltip" data-placement="top" id="TVApi" title="TV API"><%= i18n.__("TV Series") %></li>
    <!--<li class="source showAnime providerinfo" data-toggle="tooltip" data-placement="top" title="Haruhichan"><%= i18n.__("Anime") %></li>-->
</ul>
<ul id="nav-filters" class="nav nav-hor filters">
    <% if(typeof type !== 'undefined'){ %>
        <li class="dropdown filter types">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <%= i18n.__("Type") %>
                    <span class="value"><%= i18n.__(type.capitalizeEach()) %></span>
                    <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
                <% _.each(types, function(c) { %>
                    <li><a href="#" data-value="<%= c %>"><%= i18n.__(c) %></a></li>
                <% }); %>
            </ul>
        </li>

    <% }if(typeof genre !== 'undefined'){ %>
        <li class="dropdown filter genres">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <%= i18n.__("Genre") %>
                    <span class="value"><%= i18n.__(genre.capitalizeEach()) %></span>
                    <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
                <% _.each(genres, function(c) { %>
                    <li><a href="#" data-value="<%= c %>"><%= i18n.__(c.capitalizeEach()) %></a></li>
                <% }); %>
            </ul>
        </li>
    <%} if(typeof sorter !== 'undefined'){ %>
        <li class="dropdown filter sorters">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <%= i18n.__("Sort by") %>
                    <span class="value"><%= i18n.__(sorter.capitalizeEach()) %></span>
                    <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
                <% _.each(sorters, function(c) { %>
                    <li><a href="#" data-value="<%= c %>"><%= i18n.__(c.capitalizeEach()) %></a></li>
                <% }); %>
            </ul>
        </li>
    <%}%>
</ul>
<ul class="nav nav-hor right">
    <li>
        <div class="right search">
            <form>
                <input id="searchbox" type="text" placeholder="<%= i18n.__("Search") %>">
                <div class="clear fa fa-times"></div>
            </form>
        </div>
    </li>
    
    <!--Keyboard Shortcuts-->
    <li>
        <i id="filterbar-keyboard" class="fa fa-keyboard-o keyboard tooltipped" data-toggle="tooltip" data-placement="bottom" title="<%= i18n.__("Keyboard Shortcuts") %>"></i>
    </li>

    <!-- Randomize -->
    <% if (Settings.activateRandomize) { %>
    <li style="display:block">
    <% } else { %>
    <li style="display:none">
    <% } %>
        <i id="filterbar-random" class="fa fa-random tooltipped" data-toggle="tooltip" data-placement="bottom" title="<%= i18n.__("Randomize") %>"></i>
    </li>

    <!-- VPN -->
    <% if(App.VPNClient.isDisabled()) { %>
    <% } else { %>
        <li>
            <i style="color:#CC0000" id="filterbar-vpn-connect" class="fa fa-unlock-alt vpn-connect tooltipped" data-toggle="tooltip" data-placement="bottom" title="<%= i18n.__("Connect VPN") %>"></i>
        </li>
    <% } %>

    <!-- Watchlist -->
    <% if (Settings.activateWatchlist) { %>
    <li style="display:block">
    <% } else { %>
    <li style="display:none">
    <% } %>
        <i id="filterbar-watchlist" class="fa fa-inbox watchlist tooltipped" data-toggle="tooltip" data-placement="bottom" title="<%= i18n.__("Watchlist") %>"></i>
    </li>

    <!-- Favorites -->
    <% if (Settings.activateFavorites) { %>
    <li style="display:block">
        <% } else { %>
    <li style="display:none">
        <% } %>
        <i id="filterbar-favorites" class="fa fa-heart favorites tooltipped" data-toggle="tooltip" data-placement="bottom" title="<%= i18n.__("Favorites") %>"></i>
    </li>

    <!-- Torrent Collection -->
    <% if (Settings.activateTorrentCollection) { %>
    <li id="torrent_col" style="display:block">
    <% } else { %>
    <li id="torrent_col" style="display:none">
    <% } %>
        <i id="filterbar-torrent-collection" class="fa fa-folder-open torrent-collection tooltipped" data-toggle="tooltip" data-placement="bottom" title="<%= i18n.__("Torrent Collection") %>"></i>
    </li>

    <!-- About -->
    <li>
        <i id="filterbar-about" class="fa fa-info-circle about tooltipped" data-toggle="tooltip" data-placement="bottom" title="<%= i18n.__("About") %>"></i>
    </li>

    <!-- Settings -->
    <li>
        <i id="filterbar-settings" class="fa fa-cog settings tooltipped" data-toggle="tooltip" data-placement="left" title="<%= i18n.__("Settings") %>"></i>
    </li>

</ul>
