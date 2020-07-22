class CreateMonsters < ActiveRecord::Migration[5.2]
  def change
    create_table :monsters do |t|
      t.references :game
      t.references :room, null: true
      t.string :slug
      t.boolean :in_party
      t.integer :magical_power
      t.integer :fighting_strength
      t.numrange :hostile
      t.numrange :indifferent
      t.numrange :friendly

      t.integer :points
      t.integer :max_load
    end
  end
end
