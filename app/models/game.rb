class Game < ApplicationRecord
  belongs_to :player
  has_many :rooms, -> { order(:y_location, :x_location) }
  has_many :friends, -> { where(in_party: true) }, class_name: 'Monster'
  has_one :current_room, -> { where(current: true) }, class_name: 'Room'

  after_create :generate_starting_room

  accepts_nested_attributes_for :friends

  def move!(direction)
    next_room = rooms.next_from(current_room, direction)
    current_room.update(current: false)
    next_room.update(current: true)
    reload
  end

  def choices
    [
      (:fight if current_room.monsters.present?)
    ].compact
  end

  private

  def generate_starting_room
    Level.generate_level(self, 0)

    rooms.reload

    rooms.find_by(stairs_up: true).update(current: true)

    rooms.reload
  end
end
