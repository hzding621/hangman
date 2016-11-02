class AddColumnNameToGame < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :lives, :integer
  end
end
