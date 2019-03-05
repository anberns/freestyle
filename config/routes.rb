Rails.application.routes.draw do
  root 'home#index'
  resources :events
  resources :users
  resources :teams do
    resources :users, only: [:index]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
