Rails.application.routes.draw do
  get '/api/new' => 'games#new'
  post '/api/guess' => 'games#guess'
end
