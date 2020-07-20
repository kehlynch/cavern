class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.timestamps

      t.string :name
    end

    create_table :games do |t|
      t.timestamps

      t.references :player
    end

    create_table :rooms do |t|
      t.timestamps

      t.references :game
      t.integer :doors, array: true, default: []
    end
  end
end
