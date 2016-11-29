class ChangeDefaultTrialsOfGame < ActiveRecord::Migration[5.0]
  def change
    change_column :games, :trials, :string, :default => ''
  end
end
