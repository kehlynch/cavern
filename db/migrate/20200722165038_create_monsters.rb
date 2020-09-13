class CreateMonsters < ActiveRecord::Migration[5.2]
  def change
    create_table :monsters do |t|
      t.references :game
      t.references :room, null: true
      t.string :slug
      t.boolean :in_party
    end
  end
end
