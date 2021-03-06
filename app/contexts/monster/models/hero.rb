class Hero < BaseMonster
  def initialize
    super(
      name: 'Hero',
      fighting_strength: 5,
      magical_power: nil,
      hostile_roll: 1..3,
      indifferent_roll: nil,
      friendly_roll: 4..6,
      points: 10,
      max_load: 75
    )
  end

  def self.relative_probability
    5
  end

  def self.buy_points
    6
  end
end
