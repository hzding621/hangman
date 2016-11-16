require 'test_helper'
require 'json'

class GamesControllerTest < ActionDispatch::IntegrationTest

  def setup
    @test_key = 'WjJqGalg'
  end

  test 'create new game get expected result' do
    get '/api/newGame'
    response = JSON.parse(@response.body)

    assert response['lives'] == 6
    assert response['state'] == 'alive'
  end

  test 'correct guess should show correct letters' do
    Game.create!({
                     :answer => 'test',
                     :current => '____',
                     :lives => 10,
                     :key => @test_key
                 })

    post '/api/guess', params: {letter: 't', key: @test_key}
    response = JSON.parse(@response.body)

    assert response['phrase'] == 't__t'
    assert response['lives'] == 10
    assert response['state'] == 'alive'
  end

  test 'wrong guess should decrement lives' do
    Game.create!({
                     :answer => 'test',
                     :current => '____',
                     :lives => 10,
                     :key => @test_key
                 })

    post '/api/guess', params: {letter: 'a', key: @test_key}
    response = JSON.parse(@response.body)

    assert response['phrase'] == '____'
    assert response['lives'] == 9
    assert response['state'] == 'alive'
  end

  test 'last life wrong guess should set game state to lost' do
    Game.create!({
                     :answer => 'test',
                     :current => '____',
                     :lives => 1,
                     :key => @test_key
                 })

    post '/api/guess', params: {letter: 'a', key: @test_key}
    response = JSON.parse(@response.body)

    assert response['phrase'] == '____'
    assert response['lives'] == 0
    assert response['state'] == 'lost'
  end

  test 'correctly guess all letter should set game state to won' do
    Game.create!({
                     :answer => 'test',
                     :current => 'te_t',
                     :lives => 6,
                     :key => @test_key
                 })

    post '/api/guess', params: {letter: 's', key: @test_key}
    response = JSON.parse(@response.body)

    assert response['phrase'] == 'test'
    assert response['lives'] == 6
    assert response['state'] == 'won'
  end

  test 'when new request send to finished game return error' do
    Game.create!({
                     :answer => 'test',
                     :current => '____',
                     :lives => 0,
                     :key => @test_key
                 })

    post '/api/guess', params: {letter: 'a', key: @test_key}
    response = JSON.parse(@response.body)

    assert response.key?('error')
  end

  test 'view an ongoing game' do
    Game.create!({
                     :answer => 'test',
                     :current => '____',
                     :lives => 10,
                     :key => @test_key
                 })
    get '/api/viewGame', params: {key: @test_key}
    response = JSON.parse(@response.body)

    assert_equal '____', response['phrase']
    assert_equal 10, Integer(response['lives'])
    assert_equal 'alive', response['state']
  end

  test 'view a finished game' do
    Game.create!({
                     :answer => 'test',
                     :current => 'test',
                     :lives => 6,
                     :key => @test_key
                 })
    get '/api/viewGame', params: {key: @test_key}
    response = JSON.parse(@response.body)

    assert_equal 'test', response['phrase']
    assert_equal 'won', response['state']

    # A finished should contain answer
    assert_equal 'test', response['answer']
  end

  test 'view game with invalid or missing key' do
    get '/api/viewGame', params: {key: 'notfound'}
    response = JSON.parse(@response.body)

    assert response.key?('error')

    get '/api/viewGame'
    response = JSON.parse(@response.body)

    assert response.key?('error')
  end

  test 'create a cutsom game with valid parameters' do
    post '/api/customGame', params: {word: 'react', lives: 2}
    response = JSON.parse(@response.body)

    assert_equal '_____', response['phrase']
    assert_equal 2, Integer(response['lives'])
    assert_equal 'alive', response['state']

    key = response['key']

    post '/api/guess', params: {key: key, letter: 'a'}
    response = JSON.parse(@response.body)

    assert_equal '__a__', response['phrase']
  end

  test 'create a custom with invalid parameters' do
    post '/api/customGame', params: {word: 'abc', lives: -123}
    response = JSON.parse(@response.body)
    assert response.key?('error')

    post '/api/customGame', params: {word: '123', lives: 2}
    response = JSON.parse(@response.body)
    assert response.key?('error')

    post '/api/customGame', params: {}
    response = JSON.parse(@response.body)
    assert response.key?('error')
  end
end
