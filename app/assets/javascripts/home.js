$.getScript(events.js);
$.getScript(teams.js);

document.addEventListener('DOMContentLoaded', attachListeners); 

function attachListeners() {
  loadTeamsLink();
  loadEventsLink();
}
