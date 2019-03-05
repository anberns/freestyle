document.addEventListener('DOMContentLoaded', attachEventsListeners); 

function attachEventsListeners() {
  loadProfileNavLink();
}

function loadProfileNavLink() {
  let profileLink = document.getElementById('profile_link');
  profileLink.addEventListener("click", (e) => { showProfile(e) })
}

function loadTeamLinkButton() {
  let teamButton = document.getElementsByClassName("normal_button")[0]
  console.log(teamButton)
  teamButton.addEventListener("click", (e) => { goToTeamPage(e) })
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
      loadTeamLinkButton();
    }
  });
}

