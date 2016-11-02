class GamesController < ApplicationController
  def new
    picked_word = Word.all.sample[:value]
    new_game = Game.create!({
        :answer => picked_word,
        :current => '_' * picked_word.length,
        :lives => 7
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

  def guess
    letter = params[:letter]
    id = params[:id]

    unless check_guess?(letter) && !id.blank?
      render status: 400, json: {error: 'Expected guessing a single english character'}
    end

    game = Game.find(id)
    current = game[:current]
    answer = game[:answer]
    lives = game[:lives] - 1
    current.each_char.with_index { |_, index|
      if current[index] == '_' && answer[index] == letter
        current[index] = letter
      end
    }
    state = if lives > 0
              'alive'
            else answer == current ? 'won' : 'lost' end
    game.update(lives: lives, current: current)
    render(
        status: 200,
        json: {
            :id => id,
            :phrase => current,
            :lives => lives,
            :state => state
        }
    )
  end

  private
  def check_guess?(guess)
    guess = guess.downcase
    guess.length == 1 && !!guess.match(/^[[:alpha:]]+$/)
  end
end
