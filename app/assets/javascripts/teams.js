function loadTeamsLink() {
  let eventsLink = document.getElementById('events_link');

  eventsLink.addEventListener("click", (e) => { showEvents(e) })

}

function showEvents(e) {
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
        let newLi = document.createElement('li');
        newLi.id = `team-${team.id}`;
        newLi.innerHTML = team.attributes.name;
        newUl.appendChild(newLi)
      }
    }
  });

}