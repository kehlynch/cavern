class Room < ApplicationRecord
  belongs_to :game
  has_many :monsters
  has_many :items
  after_create :generate_contents

  # for info
  DIRECTIONS = {
    0 => :north,
    1 => :east,
    2 => :south,
    3 => :west
  }.freeze

  class << self
    def random_doors
      possible_doors = (0..3).to_a
      count = rand((1..possible_doors.count))
      possible_doors.sample(count)
    end

    def next_from(current_room, direction)
      new_x = x_from(current_room.x_location, direction)
      new_y = y_from(current_room.y_location, direction)
      room = find_by(
        level: current_room.level,
        x_location: new_x,
        y_location: new_y
      )
      unless room
        require 'pry'
        binding.pry
      end

      room
    end

    private

    def x_from(current_x, direction)
      case direction
      when 0
        current_x
      when 1
        current_x + 1
      when 2
        current_x
      when 3
        current_x - 1
      end
    end

    def y_from(current_y, direction)
      case direction
      when 0
        current_y - 1
      when 1
        current_y
      when 2
        current_y + 1
      when 3
        current_y
      end
    end
  end

  def legal_doors
    legal_doors = (0..3).to_a

    legal_doors.delete(3) if x_location == 0 # can't have a west door if on west edge
    legal_doors.delete(1) if x_location == Level::SIZE - 1 # can't have an east door if on east edge
    legal_doors.delete(0) if y_location == 0 # can't have a north door if on north edge
    legal_doors.delete(2) if y_location == Level::SIZE - 1 # can't hav a south door if on south edge

    legal_doors
  end

  private

  def generate_contents
    contents_count = (1..3).to_a.sample
    contents_count = 5
    monster_count = (0..contents_count).to_a.sample
    item_count = contents_count - monster_count
    monster_count.times { Monster.create(room: self, game: game) }
    item_count.times { Item.create(room: self, game: game) }
  end
end
