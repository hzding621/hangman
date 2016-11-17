class GamesController < ApplicationController

  # Create a new game and return metadata
  def new
    # Randomly pick one word from dictionary
    picked_word = Word.order('RANDOM()').limit(1)[0][:value]
    key = generate_unused_string
    new_game = Game.create!({
                                :key => key,
                                :answer => picked_word,
                                :current => '_' * picked_word.length,
                                :lives => 6
                            })
    render(
        status: 200,
        json: {
            :key => key,
            :phrase => new_game[:current],
            :lives => new_game[:lives],
            :state => 'alive'
        }
    )
  end

  # Create a new game with custom word and number of starting lives
  def custom
    word = params[:word]
    lives = params[:lives]
    if word.blank? or lives.blank?
      render status: 400, json: {error: 'Input parameters are missing.'}
      return
    end

    unless is_valid_input? word, lives
      render status: 400, json: {error: 'The custom inputs is invalid'}
      return
    end

    key = generate_unused_string
    new_game = Game.create!({
                              :key => key,
                              :answer => word,
                              :current => '_' * word.length,
                              :lives => Integer(lives)
                            })
    render(
        status: 200,
        json: {
            :key => key,
            :phrase => new_game[:current],
            :lives => lives,
            :state => 'alive'
        }
    )
  end

  # Get the status of any game
  def view

    # Handle missing key
    key = params[:key]
    if key.blank?
      render status: 400, json: {error: 'Game key is missing in the query parameters!'}
      return
    end

    # Handle invalid game key
    game = Game.find_by key: key
    unless game
      render status: 400, json: {error: 'Game key is invalid!'}
      return
    end

    current = game[:current]
    answer = game[:answer]
    lives = game[:lives]
    state = state_of(answer, current, lives)
    response_data = {
        :key => key,
        :phrase => current,
        :lives => lives,
        :state => state
    }
    response_data[:answer] = answer unless state == 'alive'
    render status: 200, json: response_data
  end

  # Handler for POST to `/api/guess`, perform game state transition
  def guess
    key = params[:key]
    letter = params[:letter]

    # Validate input parameters contains only single english letter
    unless check_guess?(letter)
      render status: 400, json: {error: 'Expected guessing a single english character'}
      return
    end

    # Handle missing key
    if key.blank?
      render status: 400, json: {error: 'Game key is missing in the query parameters!'}
      return
    end

    # Handle invalid game key
    game = Game.find_by key: key
    unless game
      render status: 400, json: {error: 'Game key is invalid!'}
      return
    end

    current = game[:current] # partially guessed word
    answer = game[:answer]
    lives = game[:lives]

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
        :key => key,
        :phrase => current,
        :lives => lives,
        :state => state
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
    while Game.find_by key:  key
      key = generate_random_string 8
    end
    key
  end

  private
  # Validate user supplied phrase is valid
  def is_valid_input?(word, lives)
     word.length > 0 && !/[^a-z]/.match(word) && lives > 0
  end
end
