Rails.application.routes.draw do
  get '/api/newGame' => 'games#new'
  get '/api/viewGame' => 'games#view'
  post '/api/guess' => 'games#guess'
  post '/api/customGame' => 'games#custom'

  get '/api/hint' => 'hint#hint'
end
