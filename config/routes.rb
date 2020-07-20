Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :games, only: [:index, :create, :update, :destroy]
    end
  end
  root 'homepage#index'
  get '/*path', to: 'homepage#index', as: :home

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
