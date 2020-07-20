class Game < ApplicationRecord
  belongs_to :player
  has_many :rooms
  has_one :current_room, -> { where(current: true) }, class_name: 'Room'

  after_create :generate_starting_room

  def move!(direction)
    next_room = rooms.next_from(current_room, direction)
    current_room.update(current: false)
    next_room.update(current: true)
    reload
  end

  private

  def generate_starting_room
    Level.generate_level(self, 0)

    self.rooms.reload

    self.rooms.find_by(stairs_up: true).update(current: true)
  end
end
