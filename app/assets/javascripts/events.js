document.addEventListener('DOMContentLoaded', attachEventsListeners); 

// attach initial listeners
function attachEventsListeners() {
  loadEventsNavLink();
}

// add listener to Event nav tab
function loadEventsNavLink() {
  let eventsLink = document.getElementById('events_link');
  eventsLink.addEventListener("click", (e) => { showEvents(e) })
}

// add listeners to Event cards
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

// add listener to Event update button
function loadEventUpdateButton() {
  let updateButton = document.getElementsByClassName("normal_button")[0]
  updateButton.addEventListener("click", (e) => { updateEvent(e) })
}

// Handlebars comparison helper
// Help from https://code-maven.com/handlebars-conditionals
function registerIfEq() {
  Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
  }); 
}

// Event JS class with methods
class Event {
  constructor(id, distance, stroke) {
    this.id = id;
    this.distance = distance,
    this.stroke = stroke
  }
  strokeToTitle() {
    return this.stroke.charAt(0).toUpperCase() + this.stroke.slice(1);
  }
  getName() {
    return this.distance + " " + this.strokeToTitle();
  }
}

// Build form to add event
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
  newInput.value = "Distance"
  newInput.id = "newDistance";
  newForm.appendChild(newInput);
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
    let distance = document.getElementById("newDistance").value
    let stroke = document.getElementById("newStroke").value
    let values = {
      distance: distance,
      stroke: stroke.toLowerCase()
    }
    $.ajax({
      type: 'post',
      url: "events",
      data: values,
      success: (response) => {
        let eventsArr = createEventArray(response);
        _showEventsHelper(eventsArr);  
      }
    }) 
  })
}

// Delete Event Ajax call
function deleteEvent(e) {
  e.preventDefault();
  $.ajax({
    type: 'DELETE',
    url: `e${e.target.id}`,
    success: (response) => {
      let eventsArr = createEventArray(response);
      _showEventsHelper(eventsArr); 
    }
  })
}

// Update Event Ajax call
function updateEvent(e) {
  let distance = document.getElementById("edit-event-distance").value
  let stroke = document.getElementById("edit-event-stroke").value
  let values = {
    distance: distance,
    stroke: stroke.toLowerCase()
  }
  e.preventDefault();
  $.ajax({
    type: 'PATCH',
    url: e.target.id,
    data: values,
    success: (response) => {
      let eventsArr = createEventArray(response);
      _showEventsHelper(eventsArr);
    }
  })
}

// Edit Event Ajax call
function editEvent(e) {
  $.ajax({
    type: 'GET',
    url: e.target.id,
    success: (response) => {
      let eventObj = new Event(
        response.data.id,
        response.data.attributes.distance,
        response.data.attributes.stroke
      )
      let newDiv = createNewDiv("event_edit_form");
      let template = Handlebars.compile(document.getElementById('event-edit-template').innerHTML); 
      let loadedEvent = {
        event: eventObj,
        name: eventObj.getName()
      }
      let event = template(loadedEvent)
      newDiv.innerHTML += event
      loadEventUpdateButton();
    }
  })
}

// Events Index Ajax call
function showEvents(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: `/events`,
    success: (response) => {
      let eventsArr = createEventArray(response);
      _showEventsHelper(eventsArr);
    }
  });
}

// Helper to clear page content and reload
function createNewDiv(id) {
  let contentDiv = document.getElementById('main_content')
  contentDiv.innerHTML = "";
  let newDiv = document.createElement('div');
  newDiv.id = id; 
  contentDiv.appendChild(newDiv)
  return newDiv;
}

// Helper function to build and fill Events index template
function _showEventsHelper(eventsArr) {
  registerIfEq();
  let newDiv = createNewDiv("events_list");
  let template = Handlebars.compile(document.getElementById('events-index-template').innerHTML); 
  let events = template(eventsArr)
  newDiv.innerHTML += events
  loadEventCardLinks(); 
}

// Helper function to fill Event Object events member
function createEventArray(response) {
  let eventsArr = [];
  for (let i of response.data) {
    let event = new Event(
      i.id,
      i.attributes.distance,
      i.attributes.stroke
    )
    let eventObj = {
      event: event,
      name: event.getName()
    }
    eventsArr.push(eventObj);
  } 
  return eventsArr;
}
