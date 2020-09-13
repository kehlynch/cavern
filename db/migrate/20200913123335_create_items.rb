class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.references :game
      t.references :room, null: true
      t.references :monster, null: true
      t.string :slug
    end
  end
end
