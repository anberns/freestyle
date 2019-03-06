document.addEventListener('DOMContentLoaded', attachEventsListeners); 

class Event {
  constructor(id, distance, stroke) {
    this.id = id;
    this.distance = distance;
    this.stroke = stroke;
  }
  getName() {
    return this.distance + " " + this.stroke;
  }
}

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
  let deleteButtons = document.getElementsByClassName("delete_button")
  for (let b of deleteButtons) {
    b.addEventListener("click", (e) => { deleteEvent(e) });
  }
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
  newInput.id = "newName";
  newForm.appendChild(newInput);
  newForm.appendChild(newBr)
  newInput = document.createElement('input')
  newInput.type = "text";
  newInput.value = "Distance"
  newInput.id = "newDistance";
  newForm.appendChild(newInput);
  newBr = document.createElement('br')
  newForm.appendChild(newBr)
  newInput = document.createElement('input')
  newInput.type = "text";
  newInput.value = "Stroke"
  newInput.id = "newStroke";
  newForm.appendChild(newInput);
  newBr = document.createElement('br')
  newForm.appendChild(newBr)
  let newButton = document.createElement('button')
  newButton.textContent= "Add Event"
  newButton.className="normal_button"
  newForm.appendChild(newButton);
  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.getElementById("newName").value
    let distance = document.getElementById("newDistance").value
    let stroke = document.getElementById("newStroke").value
    let values = {
      name: name,
      distance: distance,
      stroke: stroke
    }
    $.ajax({
      type: 'post',
      url: "events",
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
  })

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
  let newEvent = Event(
    document.getElementById("edit-event-distance").value,
    document.getElementById("edit-event-stroke").value 
    // id
  )
  
  //let name = document.getElementById("edit-event-name").value
  //let distance = document.getElementById("edit-event-distance").value
  //let stroke = document.getElementById("edit-event-stroke").value
  let values = {
    name: newEvent.getName(),
    distance: newEvent.distance,
    stroke: newEvent.stroke
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
