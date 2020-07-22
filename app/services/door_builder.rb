class DoorBuilder
  def self.test
    rooms = Game.create(player: Player.create).rooms
    new(rooms).add_doors!
  end

  def self.add_doors_for(rooms)
    new(rooms).add_doors!
  end

  def initialize(rooms)
    @rooms = rooms
    @resets = 0
  end

  def add_doors!
    room = @rooms.first
    exit_door = nil
    @open_paths = 1
    @processed_rooms = []
    @total_room_visits = 0
    p "*** adding doors!***\n\n"
    @rooms.reload
    until acceptable_path? || @total_room_visits > 200
      p({ processed_rooms: @processed_rooms.count, open_paths: @open_paths, loc: "#{room.x_location}-#{room.y_location}" }, doors: room.doors, exit_door: exit_door)
      entry_door = entry_door(exit_door)
      unless room.doors.present? # new room
        new_doors = new_doors_for(room, entry_door)
        doors = entry_door.present? ? new_doors + [entry_door] : new_doors
        room.update!(doors: doors)

        exit_door = choose_exit_door(room, exit_door)

        p 'adding processed room'
        @processed_rooms << room
        @open_paths += new_doors.count - 1
      end

      exit_door = choose_exit_door(room, entry_door)
      room = next_room(room, exit_door)

      @total_room_visits += 1

    end

    if acceptable_path? || (acceptable_path?(0.5) && @resets > 5)
      remove_deadends!
      p "GOT #{fraction_complete * 100}% OF THE ROOMS after #{@total_room_visits} visits and #{@resets} resets. Done!"
    else
      @rooms.update_all(doors: [])

      p "GOT #{fraction_complete * 100}% OF THE ROOMS after #{@total_room_visits} visits on try #{@resets}. Resetting"

      @resets += 1
      add_doors!
    end
  end

  private

  def remove_deadends!
    @rooms.each do |room|
      room.doors.each do |door|
        connected_room = next_room(room, door)
        connected_door = entry_door(door)
        unless connected_room.doors.include?(connected_door)
          room.update(doors: room.doors.reject { |d| d == door })
        end
      end
    end
  end

  def choose_exit_door(room, entry_door)
    # pick a random new door to go through, avoid the one we just came from if possible
    exit_door = room.doors.reject { |d| d == entry_door }.sample
    exit_door || entry_door
  end

  def fraction_complete
    @processed_rooms.size.to_f / @rooms.size
  end

  def acceptable_path?(threshold = 0.7)
    if @total_room_visits > 100
      return false unless fraction_complete > threshold

      return false unless stairs_accessible?

      p "GOT #{fraction_complete * 100}% OF THE ROOMS after #{@total_room_visits} visits and #{@resets} resets"

      return true
    else
      return false unless fraction_complete == 1
      p "GOT 100% OF THE ROOMS after #{@total_room_visits} visits and #{@resets} resets"

      return true
    end
  end

  def stairs_accessible?
    @processed_rooms.find { |r| r.stairs_up }.present? && @processed_rooms.find { |r| r.stairs_down }.present?
  end

  def new_doors_for(room, entry_door)
    possible_doors = room.legal_doors
    possible_new_doors = possible_doors - [entry_door]
    min_new_door_count = @open_paths == 1 ? 1 : 0
    new_door_count = rand(min_new_door_count..possible_new_doors.count)
    possible_new_doors.sample(new_door_count)
  end

  def entry_door(entered_from)
    case entered_from
    when nil
      nil
    when 0 # north
      2 # south
    when 1 # east
      3  # west
    when 2 #  south
      0 # north
    when 3 # west
      1 # east
    end
  end

  def next_room(current_room, direction)
    new_x = x_from(current_room.x_location, direction)
    new_y = y_from(current_room.y_location, direction)
    room = @rooms.find { |r| r.x_location == new_x && r.y_location == new_y }

    unless room
      require 'pry'
      binding.pry()
    end

    room
  end

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
