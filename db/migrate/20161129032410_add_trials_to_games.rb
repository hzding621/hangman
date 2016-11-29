class AddTrialsToGames < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :trials, :string
  end
end
