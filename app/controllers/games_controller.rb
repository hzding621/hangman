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
        json: {:id => new_game[:id], :phrase => new_game[:current], :lives => new_game[:lives]}
    )
  end
end
