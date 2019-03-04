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

function showTeams(e) {
  e.preventDefault();
  $.ajax({
    type: 'GET',
    url: `/teams`,
    success: (response) => {
      let newDiv = createNewDiv("teams_list")
      let template = Handlebars.compile(document.getElementById('teams-index-template').innerHTML)
      let teams = template(response.data)
      newDiv.innerHTML += teams
      }
    });

}
