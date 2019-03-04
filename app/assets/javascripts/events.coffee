# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
document.addEventListener('DOMContentLoaded', attachListeners); 

function attachListeners() {
  loadNav();
}

function loadNav() {
  let eventsLink = document.getElementById('events_link');
  eventsLink.addEventListener("click", showEvents)
}

function showEvents() {
  $.ajax({
    type: 'GET',
    url: `/events`,
    success: (response) => {
      let contentDiv = document.getElementById('main_content')
      contentDiv.innerHTML = "";
      let newUl = document.createElement('ul');
      for (let event of response.data) {
        let newLi = document.createElement('li');
        gameButton.id = gameObject.id;
        gameButton.innerHTML = gameObject.id;
        gameButton.addEventListener("click", () => { loadGame(gameObject) })
        gamesDiv.appendChild(gameButton)
      }
    }
  });
}