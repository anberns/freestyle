class EventsController < ApplicationController

  def index
    events = Event.sort 
    render json: events
  end

  

end
