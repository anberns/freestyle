document.addEventListener('DOMContentLoaded', attachTeamsListeners); 

// Attach initial listeners
function attachTeamsListeners() {
  loadTeamsLink();
}

// Add listener to Team nav link
function loadTeamsLink() {
  let teamsLink = document.getElementById('teams_link');
  teamsLink.addEventListener("click", (e) => { showTeams(e) })
}

// Add listeners to Team index cards
function loadTeamCardLinks() {
  cards = document.getElementsByClassName("img_link");
  for (let i of cards) {
    i.addEventListener("click", (e) => { showTeam(e) });
  }
}

// Add listener to Team show card button
function loadTeamShowLinks() {
  let rosterButton = document.getElementsByClassName("normal_button")[0];
  rosterButton.addEventListener("click", (e) => { showRoster(e) }) 
}

// Team JS class definition
class Team {
  constructor(id, name, hq, image_url) {
    this.id = id;
    this.name = name;
    this.hq = hq;
    this.image_url = image_url;
  }
}

// Team show Ajax call
function showTeam(e) {
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

// Team index Ajax call
function showTeams(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: `/teams`,
    success: (response) => {
      let teamsArr = [];
      for (let i of response.data) {
        let teamObj = new Team(
          i.id,
          i.attributes.name,
          i.attributes.hq,
          i.attributes['image-url']
        )
        teamsArr.push(teamObj);
      }
      let newDiv = createNewDiv("teams_list")
      let template = Handlebars.compile(document.getElementById('teams-index-template').innerHTML)
      let teams = template(teamsArr)
      newDiv.innerHTML += teams
      loadTeamCardLinks();
    }
  });
}

// Team has many Users nested route Ajax call
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