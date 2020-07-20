class Level
  # for info
  DIRECTIONS = {
    0 => :north,
    1 => :east,
    2 => :south,
    3 => :west
  }

  SIZE = 5

  def self.generate_level(game, level)
    stairs_up = [rand(5), rand(5)]
    stairs_down = [rand(5), rand(5)]
    p stairs_up
    p stairs_down
    SIZE.times.map do |x|
      SIZE.times.map do |y|
        Room.create(
          game: game,
          level: level,
          x_location: x,
          y_location: y,
          stairs_up: stairs_up == [x, y],
          stairs_down: stairs_down == [x, y]
        )
      end
    end.flatten

    game.rooms.reload

    DoorBuilder.add_doors_for(game.rooms)
  end
end
