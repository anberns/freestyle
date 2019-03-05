class ApplicationController < ActionController::Base
  def current_swimmer
    current_swimmer ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  helper_method :current_swimmer
end
