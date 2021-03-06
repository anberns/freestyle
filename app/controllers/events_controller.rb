class EventsController < ApplicationController

  def index
    events = Event.sort 
    render json: events
  end

  def create
    event = Event.create(event_params)
    events = Event.sort 
    render json: events
  end

  def edit
    event = Event.find(params[:id])
    render json: event
  end

  def update
    event = Event.find(params[:id])
    event.update(event_params)
    events = Event.sort
    render json: events
  end

  def destroy
    Event.find(params[:id]).destroy 
    events = Event.sort
    render json: events
  end

  private

  def event_params
    params.permit(:id, :name, :distance, :stroke)
  end


end
