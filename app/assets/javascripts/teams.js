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
      let newUl = document.createElement('ul');
      newUl.id = "teams_list"
      contentDiv.appendChild(newUl)
      for (let team of response.data) {
        console.log(team)
        let newLi = document.createElement('li');
        newLi.id = `team-${team.id}`;
        newLi.innerHTML = team.attributes.name;
        newUl.appendChild(newLi)
      }
    }
  });

}