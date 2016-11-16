class ChangeColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :games, :view_key, :key
  end
end
