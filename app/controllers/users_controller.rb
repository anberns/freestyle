class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user
  end

  def index
    if params[:team_id]
      users = Team.find(params[:team_id]).users
    else
      users = Users.all 
    end
    render json: users
  end

end