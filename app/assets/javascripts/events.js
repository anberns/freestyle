document.addEventListener('DOMContentLoaded', attachEventsListeners); 

function attachEventsListeners() {
  loadEventsNavLink();
}

function loadEventsNavLink() {
  let eventsLink = document.getElementById('events_link');
  eventsLink.addEventListener("click", (e) => { showEvents(e) })
}

function loadEventCardLinks() {
  let editButtons = document.getElementsByClassName("edit_button");
  for (let b of editButtons) {
    b.addEventListener("click", (e) => { editEvent(e) });
  }
  let deleteButton = document.getElementsByClassName("delete_button")[0]
  deleteButton.addEventListener("click", (e) => { deleteEvent(e) })
  let addButton = document.getElementsByClassName("normal_button")[0];
  addButton.addEventListener("click", (e) => { addEvent(e) }) 
}

function loadEventUpdateButton() {
  let updateButton = document.getElementsByClassName("normal_button")[0]
  updateButton.addEventListener("click", (e) => { updateEvent(e) })
}

function registerIfEq() {
  Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
  }); 
}

function createNewDiv(id) {
  let contentDiv = document.getElementById('main_content')
  contentDiv.innerHTML = "";
  let newDiv = document.createElement('div');
  newDiv.id = id; 
  contentDiv.appendChild(newDiv)
  return newDiv;
}

function addEvent(e) {
  e.preventDefault();
  let addButton = document.getElementsByClassName("normal_button")[0];
  addButton.parentNode.removeChild(addButton)
  let formDiv = document.createElement('div')
  let contentDiv = document.getElementById('main_content') 
  contentDiv.appendChild(formDiv);
  let newForm = document.createElement('form');
  formDiv.appendChild(newForm)
  let newInput = document.createElement('input')
  let newBr = document.createElement('br')
  newInput.type = "text";
  newInput.value = "Event Name"
  newForm.appendChild(newInput);
  newForm.appendChild(newBr)
  newInput = document.createElement('input')
  newInput.type = "text";
  newInput.value = "Distance"
  newForm.appendChild(newInput);
  newBr = document.createElement('br')
  newForm.appendChild(newBr)
  newInput = document.createElement('input')
  newInput.type = "text";
  newInput.value = "Stroke"
  newForm.appendChild(newInput);

}

function deleteEvent(e) {
  e.preventDefault();
  $.ajax({
    type: 'DELETE',
    url: `e${e.target.id}`,
    success: (response) => {
      registerIfEq();
      let newDiv = createNewDiv("events_list");
      let template = Handlebars.compile(document.getElementById('events-index-template').innerHTML); 
      let events = template(response.data)
      newDiv.innerHTML += events
      loadEventCardLinks(); 
    }
  })
}

function updateEvent(e) {
  let name = document.getElementById("edit-event-name").value
  let distance = document.getElementById("edit-event-distance").value
  let stroke = document.getElementById("edit-event-stroke").value
  let values = {
    name: name,
    distance: distance,
    stroke: stroke
  }
  e.preventDefault();
  $.ajax({
    type: 'PATCH',
    url: e.target.id,
    data: values,
    success: (response) => {
      registerIfEq();
      let newDiv = createNewDiv("events_list");
      let template = Handlebars.compile(document.getElementById('events-index-template').innerHTML); 
      let events = template(response.data)
      newDiv.innerHTML += events
      loadEventCardLinks(); 
    }
  })
}

function editEvent(e) {
  $.ajax({
    type: 'GET',
    url: e.target.id,
    success: (response) => {
      let newDiv = createNewDiv("event_edit_form");
      let template = Handlebars.compile(document.getElementById('event-edit-template').innerHTML); 
      let event = template(response.data)
      newDiv.innerHTML += event
      loadEventUpdateButton();
    }
  })
}

function showEvents(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: `/events`,
    success: (response) => {
      registerIfEq();
      let newDiv = createNewDiv("events_list");
      let template = Handlebars.compile(document.getElementById('events-index-template').innerHTML); 
      let events = template(response.data)
      newDiv.innerHTML += events
      loadEventCardLinks();
    }
  });

}
