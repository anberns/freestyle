class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    render json: user
  end

  def edit
    user = User.find(params[:id])
    render json: user
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
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

  private

    def user_params
      params.permit(:id, :name, :email, :password, event_ids:[])
    end
end