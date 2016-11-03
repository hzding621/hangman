require 'test_helper'
require 'json'

class GamesControllerTest < ActionDispatch::IntegrationTest

  test 'create new game get expected result' do
    get '/api/new'
    response = JSON.parse(@response.body)

    assert response['lives'] == 7
    assert response['answer'].length == response['phrase'].length
    assert response['state'] == 'alive'
  end

  test 'correct guess should show correct letters' do
    new_game = Game.create!({
                                :answer => 'test',
                                :current => '____',
                                :lives => 10
                            })

    id = new_game[:id]
    post '/api/guess', params: {letter: 't', id: id}
    response = JSON.parse(@response.body)

    assert response['phrase'] == 't__t'
    assert response['lives'] == 10
    assert response['state'] == 'alive'
  end

  test 'wrong guess should decrement lives' do
    game = Game.create!({
                            :answer => 'test',
                            :current => '____',
                            :lives => 10
                        })

    id = game[:id]
    post '/api/guess', params: {letter: 'a', id: id}
    response = JSON.parse(@response.body)

    assert response['phrase'] == '____'
    assert response['lives'] == 9
    assert response['state'] == 'alive'
  end

  test 'last life wrong guess should set game state to lost' do
    game = Game.create!({
                            :answer => 'test',
                            :current => '____',
                            :lives => 1
                        })

    id = game[:id]
    post '/api/guess', params: {letter: 'a', id: id}
    response = JSON.parse(@response.body)

    assert response['phrase'] == '____'
    assert response['lives'] == 0
    assert response['state'] == 'lost'
  end

  test 'correctly guess all letter should set game state to won' do
    game = Game.create!({
                            :answer => 'test',
                            :current => 'te_t',
                            :lives => 6
                        })

    id = game[:id]
    post '/api/guess', params: {letter: 's', id: id}
    response = JSON.parse(@response.body)

    assert response['phrase'] == 'test'
    assert response['lives'] == 6
    assert response['state'] == 'won'
  end
end
