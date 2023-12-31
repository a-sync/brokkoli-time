<%  
if(typeof backdrop === "undefined"){ backdrop = ""; }; 
if(typeof synopsis === "undefined"){ synopsis = i18n.__("Synopsis not available."); };
for(var i = 0; i < genre.length; i++){ genre[i] = i18n.__(genre[i]); };
%>

<div data-bgr="<%= backdrop %>" class="backdrop"></div>
<div class="backdrop-overlay"></div>

<div class="fa fa-times close-icon"></div>

<section class="poster-box">
    <img src="images/posterholder.png" data-cover="<%= cover %>" class="mcover-image" />
</section>

<section class="content-box">

    <div class="meta-container">
        <div class="title"><%= title %></div>

        <div class="metadatas">
            <% if (year) { %>
                <div class="metaitem"><%= year %></div><div class="dot"></div>
            <% }; %>

            <% if (runtime) { %>
                <div id="runtime" class="metaitem"><%= runtime %> min</div><div class="dot"></div>
            <% }; %>

            <% if (genre && genre.length) { %>
                <div class="metaitem"><%= genre.join(" / ") %></div><div class="dot"></div>
            <% }; %>

            <div data-toggle="tooltip" data-placement="top" title="<%=i18n.__("Open IMDb page") %>" class="movie-imdb-link"></div><div class="dot"></div>

            <div class="rating-container">
                <div class="star-container" data-toggle="tooltip" data-placement="right" title="<%= rating %>/10">
                <% var p_rating = Math.round(rating) / 2; %>

                   <% for (var i = 1; i <= Math.floor(p_rating); i++) { %>
                            <i class="fa fa-star rating-star"></i>
                        <% }; %>
                        <% if (p_rating % 1 > 0) { %>
                            <span class = "fa-stack rating-star-half-container">
                                <i class="fa fa-star fa-stack-1x rating-star-half-empty"></i>
                                <i class="fa fa-star-half fa-stack-1x rating-star-half"></i>
                            </span>
                        <% }; %>
                        <% for (var i = Math.ceil(p_rating); i < 5; i++) { %>
                            <i class="fa fa-star rating-star-empty"></i>
                    <% }; %>

                </div>
                <div class="number-container hidden"><%= rating %> <em>/10</em></div>
            </div>

            <!--health, ratio-->
            <div data-toggle="tooltip" data-placement="left" title="<%=i18n.__("Health false") %>" class="fa fa-circle health-icon <%= health %>"></div>
            <div data-toogle="tooltip" data-placement="left" title="<%=i18n.__("Magnet link") %>" class="fa fa-magnet magnet-link"></div>
            <!--show file list-->
            <div data-toggle="tooltip" data-placement="left" title="<%=i18n.__("Open file list") %>" id="show-file-list" class="fa fa-folder"></div>
            
        </div>

        <div class="overview" style="font-size:14px;">
            <%= synopsis %>

            <div style="margin-top:8px;"><div id="directors" style="color:#ccc; float:left; margin-right:5px;">Director:</div> <%= directors.join(" / ") %></div>

            <div style="margin-top:8px;"><div id="cast" style="color:#ccc; float:left; margin-right:5px;">Cast:</div> <%= cast.join(" / ") %></div>

            <div class="movie-providers-list" style="height: 20px; color:#666; font-size:11px;">
                <!--
                <div id="resources" style="float:left; margin-right:5px;"><%=i18n.__("Provider:") %> </div>
                <div class="movie-yify-link provider" data-placement="bottom" title="yify.is">yts / </div>
                <div class="movie-video2k-link provider" data-placement="bottom" title="video2k.is">video2k / </div>
                <div class="movie-imdbid-link provider" data-placement="bottom" title="imdb.com">imdb / </div>
                <div class="movie-yifysubtitles-link provider" data-placement="bottom" title="yifysubtitles.com">yifysubtitles / </div>
                <div class="movie-opensubtitles-link provider" data-placement="bottom" title="opensubtitles.org">opensubtitles / </div>
                <div class="movie-googlevideo-link provider" data-placement="bottom" title="cloud src">googlecloud / </div>
                <div class="movie-youtube-link provider" data-placement="bottom" title="youtube.com">youtube / </div>
                <div class="movie-tmdb-link provider" data-placement="bottom" title="themoviedb.org">themoviedb / </div>
                -->
            </div>
	    </div>
    </div>

    <div class="bottom-container">

	<!--<div class="trailer" id="watch-trailer" data-placement="top" title="watch youtube trailer"><%=i18n.__("Watch Trailer") %></div>-->
	<div class="favourites-toggle"><%=i18n.__("Add to bookmarks") %></div>
        <div class="watched-toggle"><%=i18n.__("Not Seen") %></div>
	<br>


	<div class="button dropup" style="text-transform:uppercase;" id="player-chooser"></div>
	<!-- data-placement="left" title="Torrent - best quality at the smallest filesize"
	Stream torrent - best quality at the smallest filesize but speed potentially throttled, ISP monitor & limited download bandwidth (by seeders)-->
    <!--<div id="watch-googlevideo" class="button" style="text-transform:uppercase;" data-placement="bottom" title="Google Cloud - very fast speed, no ISP monitor & unlimited download bandwidth">Stream</div>--><!--Play via Google Cloud - possibly bad quality but very fast speed, no ISP monitor & unlimited download bandwidth-->




	<div id="watch-trailer" class="button" data-placement="bottom"><%=i18n.__("Watch Trailer") %></div>
	<!-- title="Watch youtube trailer" -->

	<div class="movie-quality-container">
           <% if (torrents["720p"] !== undefined && torrents["1080p"] !== undefined) { %>
                <div class="q720">720p</div>
                <div class="q1080">1080p</div>
                <div class="quality switch white">
                    <input data-toogle="tooltip" data-placement="top" title="720p - <%= Common.fileSize(torrents['720p'].size) %><br>1080p - <%= Common.fileSize(torrents['1080p'].size) %>" type="radio" name="switch" id="switch-hd-off" >
                    <input data-toogle="tooltip" data-placement="top" title="720p - <%= Common.fileSize(torrents['720p'].size) %><br>1080p - <%= Common.fileSize(torrents['1080p'].size) %>" type="radio" name="switch" id="switch-hd-on" checked >
                    <span class="toggle"></span>
                </div>
            <% } else { %>
                <% if (torrents["720p"] !== undefined) { %>
                    <div data-toogle="tooltip" data-placement="top" title="<%= Common.fileSize(torrents['720p'].size) %>" class="q720">720p</div>
                <% }else if (torrents["1080p"] !== undefined) { %>
                    <div data-toogle="tooltip" data-placement="top" title="<%= Common.fileSize(torrents['1080p'].size) %>" class="q720">1080p</div>
                <% }else if (torrents["480p"] !== undefined) { %>
                    <div data-toogle="tooltip" data-placement="top" title="<%= Common.fileSize(torrents['480p'].size) %>" class="q720">480p</div>
                <% }else if (torrents["HDRip"] !== undefined) { %>
                    <div data-toogle="tooltip" data-placement="top" title="<%= Common.fileSize(torrents['HDRip'].size) %>" class="q720">HDRip</div>
                <% }else { %>
                    HDRip
                <% } %>

            <% } %>
        </div>
       

	<div style="float:left; max-width: 165px;">
	<div class="sub-dropdown">
          <%= i18n.__("Subtitles") %>
          <div class="sub-flag-icon flag selected-lang none"></div>
          <div class="sub-dropdown-arrow"></div>
        </div>                                            
        <div class="flag-container">
          <div class="sub-flag-icon flag none" data-lang="none" title="<%= i18n.__("Disabled") %>"></div>
          <% for(var lang in subtitle){ %>
              <div class="sub-flag-icon flag <%= lang %>" data-lang="<%= lang %>" title="<%= App.Localization.langcodes[lang].nativeName %>"></div>
           <% } %>
        </div>
	</div>

    </div>
</section>
