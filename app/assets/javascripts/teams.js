document.addEventListener('DOMContentLoaded', attachTeamsListeners); 

function createNewDiv(id) {
  let contentDiv = document.getElementById('main_content')
  contentDiv.innerHTML = "";
  let newDiv = document.createElement('div');
  newDiv.id = id; 
  contentDiv.appendChild(newDiv)
  return newDiv;
}

function attachTeamsListeners() {
  loadTeamsLink();
}

function loadTeamsLink() {
  let teamsLink = document.getElementById('teams_link');
  teamsLink.addEventListener("click", (e) => { showTeams(e) })
}

function loadTeamCardLinks() {
  cards = document.getElementsByClassName("img_link");
  for (let i of cards) {
    i.addEventListener("click", (e) => { showTeam(e) });
  }
}

function loadTeamShowLinks() {
  let rosterButton = document.getElementsByClassName("normal_button")[0];
  rosterButton.addEventListener("click", (e) => { showRoster(e) }) 
  //let addButton = document.getElementsByClassName("normal_button")[1];
  //addButton.addEventListener("click", (e) => { addMember(e) }) 
}

class Team {
  constructor(id, name, hq, image_url) {
    this.id = id;
    this.name = name;
    this.hq = hq;
    this.image_url = image_url;
  }
}

function showTeam(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: e.target.id,
    success: (response) => {
      console.log(response)
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