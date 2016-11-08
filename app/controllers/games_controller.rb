class GamesController < ApplicationController

  # Create a new game and return metadata
  def new
    # Randomly pick one word from dictionary
    picked_word = Word.order('RANDOM()').limit(1)[0][:value]
    new_game = Game.create!({
                                :answer => picked_word,
                                :current => '_' * picked_word.length,
                                :lives => 6
                            })
    render(
        status: 200,
        json: {
            :id => new_game[:id],
            :phrase => new_game[:current],
            :lives => new_game[:lives],
            :state => 'alive'
        }
    )
  end

  # Get the status of any game
  def view
    id = params[:id]
    if id.blank?
      render status: 400, json: {error: 'Game id is missing in the query parameters!'}
      return
    end

    game = Game.find(id)
    current = game[:current]
    answer = game[:answer]
    lives = game[:lives]
    state = state_of(answer, current, lives)
    response_data = {
        :id => id,
        :phrase => current,
        :lives => lives,
        :state => state
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
end
