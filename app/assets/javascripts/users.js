document.addEventListener('DOMContentLoaded', attachEventsListeners); 

function attachEventsListeners() {
  loadProfileNavLink();
}

function loadProfileNavLink() {
  let profileLink = document.getElementById('profile_link');
  profileLink.addEventListener("click", (e) => { showProfile(e) })
}

function loadUserLinkButtons() {
  let teamButton = document.getElementsByClassName("normal_button")[0]
  teamButton.addEventListener("click", (e) => { goToTeamPage(e) })
  let updateButton = document.getElementsByClassName("edit_button")[0]
  updateButton.addEventListener("click", (e) => { updateProfile(e) })
}

function loadTeamShowLinks() {
  let rosterButton = document.getElementsByClassName("normal_button")[0];
  rosterButton.addEventListener("click", (e) => { showRoster(e) }) 
  //let addButton = document.getElementsByClassName("normal_button")[1];
  //addButton.addEventListener("click", (e) => { addMember(e) }) 
}

function goToTeamPage(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: e.target.id, 
    success: (response) => {
      let newDiv = createNewDiv("team_page");
      let template = Handlebars.compile(document.getElementById('team-show-template').innerHTML); 
      let team = template(response.data)
      newDiv.innerHTML += team
      loadTeamShowLinks();
    }
  });
}

function updateProfile(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: e.target.id, 
    success: (response) => {
      let newDiv = createNewDiv("update_user_page");
      let template = Handlebars.compile(document.getElementById('update-user-template').innerHTML); 
      let user = template(response.data)
      newDiv.innerHTML += user 
    }
  });
}

function showProfile(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: `/users/1`, //update when sessions are implemented
    success: (response) => {
      let newDiv = createNewDiv("user_profile");
      let template = Handlebars.compile(document.getElementById('profile-template').innerHTML); 
      let user = template(response.data)
      newDiv.innerHTML += user
      loadUserLinkButtons();
    }
  });
}

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