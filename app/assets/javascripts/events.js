document.addEventListener('DOMContentLoaded', attachEventsListeners); 

function attachEventsListeners() {
  loadEventsLink();
}

function loadEventsLink() {
  let eventsLink = document.getElementById('events_link');

  eventsLink.addEventListener("click", (e) => { showEvents(e) })

}

function showEvents(e) {
  e.preventDefault();
  e.stopPropagation();
  $.ajax({
    type: 'GET',
    url: `/events`,
    success: (response) => {
      let contentDiv = document.getElementById('main_content')
      contentDiv.innerHTML = "";
      let newDiv = document.createElement('div');
      newDiv.id = "events_list"
      contentDiv.appendChild(newDiv)
      for (let event of response.data) {
        let template = Handlebars.compile(document.getElementById('events-index-template').innerHTML)
        let eventObj = {
          id: event.id,
          name: event.attributes.name
        }
        let newEvent = template(eventObj)
        newDiv.innerHTML += newEvent
      }
    }
  });

}
