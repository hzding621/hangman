class GamesController < ApplicationController

  # Create a new game and return metadata
  def new
    # Randomly pick one word from dictionary
    picked_word = Word.order('RANDOM()').limit(1)[0][:value]
    view_key = generate_unused_string
    new_game = Game.create!({
                                :answer => picked_word,
                                :current => '_' * picked_word.length,
                                :lives => 6,
                                :view_key => view_key
                            })
    render(
        status: 200,
        json: {
            :id => new_game[:id],
            :phrase => new_game[:current],
            :lives => new_game[:lives],
            :state => 'alive',
            :view_key => view_key
        }
    )
  end

  # Get the status of any game
  def view

    # Handle missing view_key
    view_key = params[:id]
    if view_key.blank?
      render status: 400, json: {error: 'Game id is missing in the query parameters!'}
      return
    end

    # Handle invalid game view_key
    game = Game.find_by view_key: view_key
    unless game
      render status: 400, json: {error: 'Game id is invalid!'}
      return
    end


    id = game[:id]
    current = game[:current]
    answer = game[:answer]
    lives = game[:lives]
    state = state_of(answer, current, lives)
    response_data = {
        :id => id,
        :phrase => current,
        :lives => lives,
        :state => state,
        :view_key => view_key
    }
    response_data[:answer] = answer unless state == 'alive'
    render status: 200, json: response_data
  end

  # Handler for POST to `/api/guess`, perform game state transition
  def guess
    letter = params[:letter]
    id = params[:id]

    # Validate input parameters contains only single english letter
    unless check_guess?(letter) && !id.blank?
      render status: 400, json: {error: 'Expected guessing a single english character'}
      return
    end

    game = Game.find(id)
    current = game[:current] # partially guessed word
    answer = game[:answer]
    lives = game[:lives]
    view_key = game[:view_key]

    # Safe check requesting to a finished game
    if lives == 0
      render status: 400, json: {error: 'Game has already ended!'}
      return
    end

    # Loop through the word and find matched letters
    matched = false
    current.each_char.with_index { |_, index|
      if current[index] == '_' && answer[index] == letter
        current[index] = letter
        matched = true
      end
    }
    lives -= 1 unless matched

    state = state_of(answer, current, lives)
    game.update(lives: lives, current: current)
    response_data = {
        :id => id,
        :phrase => current,
        :lives => lives,
        :state => state,
        :view_key => view_key
    }
    response_data[:answer] = answer unless state == 'alive'
    render status: 200, json: response_data
  end

  private
  # Validate guess is a single English letter
  def check_guess?(guess)
    guess = guess.downcase
    guess.length == 1 && !!guess.match(/^[[:alpha:]]+$/)
  end

  private
  # Compute the state string based on answer, current and number of lives left
  def state_of(answer, current, lives)
    if answer == current then 'won' else lives > 0 ? 'alive' : 'lost' end
  end

  private
  # Generate a random string of alphabets
  def generate_random_string(len)
    (0...len).map do
      j = rand(52)
      if j >= 26 then (65 + j - 26).chr else (97 + j).chr end
    end.join
  end

  private
  # Repeatedly generate a random string until an unused is found
  def generate_unused_string
    key = generate_random_string 8
    while Game.find_by view_key:  key
      key = generate_random_string 8
    end
    key
  end
end
