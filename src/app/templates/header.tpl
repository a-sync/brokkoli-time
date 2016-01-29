<nav class="btn-set <%= process.platform %>">
    <% _.each(getButtons(), function(button) { %>
    <button class="btn-os os-<%= button %>"></button>
    <% }); %>
</nav>

<nav class="btn-set fs-<%= process.platform %>">
    <button class="btn-os fullscreen tooltipped" data-toggle="tooltip" data-placement="<%= fsTooltipPos() %>" title="<%= i18n.__("Toggle Fullscreen") %>"></button>
</nav>
<h1>
    Brokkoli Time
    <img class="header-icon" src="/src/app/images/icons/icon-bh.png">
    <img class="header-icon" src="/src/app/images/icons/icon-c.png">
    <div class="events img-<%= events() %>">
</h1>
