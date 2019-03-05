document.addEventListener('DOMContentLoaded', attachEventsListeners); 

function attachEventsListeners() {
  loadProfileNavLink();
}

function loadProfileNavLink() {
  let profileLink = document.getElementById('profile_link');
  profileLink.addEventListener("click", (e) => { showProfile(e) })
}

function showProfile(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: `/users/1`, //update when sessions are implemented
    success: (response) => {
      registerIfEq();
      let newDiv = createNewDiv("events_list");
      let template = Handlebars.compile(document.getElementById('events-index-template').innerHTML); 
      let events = template(response.data)
      newDiv.innerHTML += events
      loadEventCardLinks();
    }
  });