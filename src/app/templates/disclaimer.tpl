<div class="loading-background"></div>
<div class="disclaimer-loading"></div>
<img class="icon-disclaimer" src="/src/app/images/icon.png">

<div class="disclaimer-state">
    <div class="disclaimer-content">
        <h1><%= i18n.__("Kedves Brokkoli Time felhasználó!") %></h1>
        <div class="disclaimer-text">

            <h2>Mielőtt le akarsz tölteni egy torrentet, be kell állítanod az azonosító kulcsodat.<br><br></h2>

            <p id="dpasskey-box"><b><%= i18n.__("Passkey") %>:</b> &nbsp;<input id="dpasskey" type="text" size="50" name="dpasskey" value="<%= App.settings.passkey %>">
                <span class="success_alert" style="display:none"><%= i18n.__("Saved") %></span>
                <span class="error_alert" style="display:none"><%= i18n.__("Invalid credentials") %></span>
            <br><br></p>

            <p>Ez bennevan a korábban letöltött torrent fájljaidban (a tracker URL-ben), ill. a torrent adatlapon a fájl neve mellett található <b>Letöltés</b> linkben is megtalálod.</p>
            <p>Ez az azonosító kulcs teszi lehetővé, hogy letöltsd a torrent fájlt közvetlenül az oldalról, bejelentkezés nélkül.<br><br></p>

            <p>Ha megváltozik az oldalon az azonosító kulcsod, akkor a Brokkoli Time beállításaiban is meg kell változtatnod!<br></p>
            <p><b>Passkey megváltoztatása után mindig indítsd újra a klienst!</b> (F11)<br><br></p>

            <p>A Brokkoli Time a beállításaidban tárolja az azonosító kulcsodat, és nem küldi ki semmilyen API felé. Csupán a torrent linkekben keresi a <i>{PASSKEY}</i> értéket, és kicseréli amikor le akarod tölteni az adott fájlt.<br><br></p>

            <p>JÓ SZÓRAKOZÁST!</p>
        </div>
        <a id="disclaimer-accept" class="btn-accept"><%= i18n.__("OK") %></a>
        <!--<a class="btn-close"><%= i18n.__("Leave") %></a>-->
    </div>
</div>