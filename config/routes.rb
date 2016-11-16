Rails.application.routes.draw do
  get '/api/newGame' => 'games#new'
  get '/api/viewGame' => 'games#view'
  post '/api/guess' => 'games#guess'
  post '/api/custom' => 'games#custom'
end
