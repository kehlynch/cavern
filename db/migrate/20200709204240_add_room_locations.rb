class AddRoomLocations < ActiveRecord::Migration[5.2]
  def change
    change_table :rooms do |t|
      t.integer :x_location
      t.integer :y_location
      t.integer :level
      t.boolean :stairs_up, default: false
      t.boolean :stairs_down, default: false
      t.boolean :current, default: false
    end
  end
end
