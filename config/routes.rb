Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :games, only: [:show, :index, :create, :update, :destroy] do
      end
      get '/pickable', to: 'games#pickable'
    end
  end
  root 'homepage#index'
  get '/', to: 'homepage#index', as: :home

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
