class AddSecondaryKeyGame < ActiveRecord::Migration[5.0]
  def change
    add_column :games, :view_key, :string
  end
end
