# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
teams = Team.create([
  { name: "Dolphins", hq: "Brooklyn", image_url:"https://i.imgur.com/Vsz0NB9.jpg" }, 
  { name: "Sharks", hq: "Queens", image_url: "https://i.imgur.com/DV3vBum.jpg"}, 
  { name: "Sailfish", hq: "Manhattan", image_url: "https://i.imgur.com/HOws55P.jpg"} 
])
users = User.create([{ name: "Diane Houston", email: "dh@gmail.com", password: "password", team_id: "1"},
  { name: "Billy Bob", email: "bb@gmail.com", password: "password", team_id: "1"},
  { name: "Bobby Sue", email: "bs@gmail.com", password: "password", team_id: "2"},
  { name: "James Dean", email: "jd@gmail.com", password: "password", team_id: "2"},
  { name: "Walter Payton", email: "wp@gmail.com", password: "password", team_id: "3"},
  { name: "Jimmy Lee", email: "jl@gmail.com", password: "password", team_id: "3"},
  { name: "Alec Newell", email: "an@gmail.com", password: "password", team_id: "1"},
  { name: "Max Unruh", email: "mu@gmail.com", password: "password", team_id: "1"},
  { name: "Viswas Chitnis", email: "vc@gmail.com", password: "password", team_id: "2"},
  { name: "Russell Lacy", email: "rl@gmail.com", password: "password", team_id: "2"},
  { name: "Tony Frazier", email: "tf@gmail.com", password: "password", team_id: "3"},
  { name: "Eugene Ford", email: "ef@gmail.com", password: "password", team_id: "3"},
  { name: "Lilya Berns", email: "lb@gmail.com", password: "password", team_id: "3"},
])

events = Event.create([{  distance: "50", stroke: "freestyle"},
  {  distance: "100", stroke: "freestyle"},
  {  distance: "200", stroke: "freestyle"},
  {  distance: "500", stroke: "freestyle"},
  {  distance: "1000", stroke: "freestyle"},
  {  distance: "50", stroke: "backstroke"},
  {  distance: "100", stroke: "backstroke"},
  {  distance: "200", stroke: "backstroke"},
  {  distance: "500", stroke: "backstroke"},
  {  distance: "1000", stroke: "backstroke"},
  {  distance: "50", stroke: "breaststroke"},
  {  distance: "100", stroke: "breaststroke"},
  {  distance: "200", stroke: "breaststroke"},
  {  distance: "500", stroke: "breaststroke"},
  {  distance: "1000", stroke: "breaststroke"}
  
])

user_events = UserEvent.create([
  { user_id: "1", event_id: '1' },
  { user_id: "1", event_id: '2' },
  { user_id: "1", event_id: '3' },
  { user_id: "1", event_id: '4' },
])