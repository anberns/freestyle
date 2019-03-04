document.addEventListener('DOMContentLoaded', attachTeamsListeners); 

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
      let contentDiv = document.getElementById('main_content')
      contentDiv.innerHTML = "";
      let newDiv = document.createElement('div');
      newDiv.id = "teams_list"
      contentDiv.appendChild(newDiv)
      for (let team of response.data) {
        let template = Handlebars.compile(document.getElementById('teams-index-template').innerHTML)
        let teamObj = {
          id: team.id,
          name: team.attributes.name
        }
        let newTeam = template(teamObj)
        newDiv.innerHTML += newTeam
      }
    }
  });

}

f