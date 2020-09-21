class AddHostileToMonsters < ActiveRecord::Migration[5.2]
  def change
    change_table :monsters do |t|
      t.boolean :hostile, default: false
    end
  end
end
