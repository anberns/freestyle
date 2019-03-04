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
      let newUl = document.createElement('ul');
      newUl.id = "events_list"
      contentDiv.appendChild(newUl)
      for (let event of response.data) {
        let newLi = document.createElement('li');
        newLi.id = event.id;
        newLi.innerHTML = event.attributes.name;
        newUl.appendChild(newLi)
      }
    }
  });

}
