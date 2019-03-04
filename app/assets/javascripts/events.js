document.addEventListener('DOMContentLoaded', attachEventsListeners); 



function attachEventsListeners() {
  loadEventsLink();
}

function loadEventsLink() {
  let eventsLink = document.getElementById('events_link');
  eventsLink.addEventListener("click", (e) => { showEvents(e) })
}

function loadEventEditLinks() {
  let editButtons = document.getElementsByClassName("edit_button");
  for (let b of editButtons) {
    b.addEventListener("click", (e) => { editEvent(e) });
  }
}

function editEvent(e) {
  $.ajax({
    type: 'GET',
    url: e.target.id,
    success: (response) => {
      let contentDiv = document.getElementById('main_content')
      contentDiv.innerHTML = "";
      let newDiv = document.createElement('div');
      newDiv.id = "event_edit_form"
      contentDiv.appendChild(newDiv)
      let template = Handlebars.compile(document.getElementById('event-edit-template').innerHTML); 
      let event = template(response.data)
      newDiv.innerHTML += event
    }
  })
}

function showEvents(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: `/events`,
    success: (response) => {
      Handlebars.registerHelper('if_eq', function(a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
      });
      let contentDiv = document.getElementById('main_content')
      contentDiv.innerHTML = "";
      let newDiv = document.createElement('div');
      newDiv.id = "events_list"
      contentDiv.appendChild(newDiv)
      let template = Handlebars.compile(document.getElementById('events-index-template').innerHTML); 
      let events = template(response.data)
      newDiv.innerHTML += events
      loadEventEditLinks();
    }
  });

}
