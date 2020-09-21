class AddPartyPickedToGames < ActiveRecord::Migration[5.2]
  def change
    change_table :games do |t|
      t.boolean :party_picked, default: false
    end
  end
end
