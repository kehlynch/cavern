class Ranger < BaseMonster
  def initialize
    super(
      name: 'Ranger',
      fighting_strength: 4,
      magical_power: nil,
      hostile: 1..3,
      indifferent: nil,
      friendly: 4..6,
      points: 10,
      max_load: 50
    )
  end

  def special
    ['befriends unicorns', 'add 1 to die rolls when testing']
  end

  def self.relative_probability
    5
  end

  def self.buy_points
    4
  end
end
