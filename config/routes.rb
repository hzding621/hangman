Rails.application.routes.draw do
  scope '/api' do
    get :new, to: 'games#new'
  end
end
