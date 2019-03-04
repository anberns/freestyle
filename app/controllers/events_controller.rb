class EventsController < ApplicationController

  def index
    events = Event.sort 
    render json: events
  end

  def edit
    event = Event.find(params[:id])
    render json: event
  end

end
