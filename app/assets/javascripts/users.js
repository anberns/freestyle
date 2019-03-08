document.addEventListener('DOMContentLoaded', attachEventsListeners); 

// Attach initial listener
function attachEventsListeners() {
  loadProfileNavLink();
}

// Attach listener to Profile nav link
function loadProfileNavLink() {
  let profileLink = document.getElementById('profile_link');
  profileLink.addEventListener("click", (e) => { showProfile(e) })
}

// Attach listeners to User show page buttons
function loadUserLinkButtons() {
  let teamButton = document.getElementsByClassName("normal_button")[0]
  teamButton.addEventListener("click", (e) => { goToTeamPage(e) })
  let updateButton = document.getElementsByClassName("edit_button")[0]
  updateButton.addEventListener("click", (e) => { updateProfile(e) })
}

// Attach listener to User / Team link
function loadTeamShowLinks() {
  let rosterButton = document.getElementsByClassName("normal_button")[0];
  rosterButton.addEventListener("click", (e) => { showRoster(e) }) 
}

// Attach listener to User Update button on edit page
function loadUserUpdateButton() {
  let updateButton = document.getElementsByClassName('normal_button')[0];
  updateButton.addEventListener("click", (e) => { sendUpdate(e) })
}

// User JS class definition
class User {
  constructor(id, email, name, team, events) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.team = team;
    this.events = events;
  }
}

// User update Ajax call
function sendUpdate(e) {
  e.preventDefault();
  let name = document.getElementById("updatedName").value
  let email = document.getElementById("updatedEmail").value
  let events = Array.from(document.getElementsByClassName("eventCheckbox"));
  let eventsArr = [];
  events.forEach( (event) => {
    if (event.checked) {
      eventsArr.push(event.value)
    }
  })
  let values = {
    name: name,
    email: email,
    event_ids: eventsArr
  }
  
  $.ajax({
    type: 'PATCH',
    url: e.target.id,
    data: values,
    success: (response) => {
      _showProfileHelper(response);
    }
  });
}

// User's Team's show Ajax call
function goToTeamPage(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: e.target.id, 
    success: (response) => {
      let teamObj = new Team(
        response.data.id,
        response.data.attributes.name,
        response.data.attributes.hq,
        response.data.attributes['image-url']
      )
      let newDiv = createNewDiv("team_page")
      let template = Handlebars.compile(document.getElementById('team-show-template').innerHTML)
      let team = template(teamObj)
      newDiv.innerHTML += team
      loadTeamShowLinks();
      }
    });
}

// User edit Ajax call
function updateProfile(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: e.target.id, 
    success: (response) => {
      let userObj = new User(
        response.data.id,
        response.data.attributes.email,
        response.data.attributes.name,
        response.data.attributes.team,
        response.data.attributes.events
      )
      // nested call to get all events for checkboxes
      $.ajax({
        type: 'GET',
        url: 'events',
        success: (response) => {
          let events= [];
          for (let i of response.data) {
            let name = i.attributes.distance.toString() + " " + i.attributes.stroke
            let eventObj = {
              id: i.id,
              name: name
            }
            events.push(eventObj)
          }
          let newDiv = createNewDiv("update_user_page");
          let template = Handlebars.compile(document.getElementById('update-user-template').innerHTML); 
          let pageData = {
            user: userObj,
            events: events
          }
          let user = template(pageData)
          newDiv.innerHTML += user 
          loadUserUpdateButton();
        }
      })
    
    }
  });
}

// User show Ajax call
function showProfile(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: `/users/1`, //update when sessions are implemented
    success: (response) => {
      _showProfileHelper(response);
    }
  });
}

// User's Team's Users nested route Ajax call
function showRoster(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: e.target.id,
    success: (response) => {
      let newDiv = createNewDiv("users_list")
      let template = Handlebars.compile(document.getElementById('users-index-template').innerHTML)
      let users = template(response.data)
      newDiv.innerHTML += users 
    }
  });
}

// Helper to create User object and feed to user profile template
function _showProfileHelper(response) {
  let userObj = new User(
    response.data.id,
    response.data.attributes.email,
    response.data.attributes.name,
    response.data.attributes.team,
    response.data.attributes.events
  )
  let newDiv = createNewDiv("user_profile");
  let template = Handlebars.compile(document.getElementById('profile-template').innerHTML); 
  let user = template(userObj)
  newDiv.innerHTML += user
  loadUserLinkButtons();
}