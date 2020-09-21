class Adventurer < BaseMonster
  def initialize
    super(
      name: 'Adventurer',
      fighting_strength: 3,
      magical_power: nil,
      hostile_roll: 1..2,
      indifferent_roll: 3..4,
      friendly_roll: 5..6,
      points: 5,
      max_load: 50
    )
  end

  def self.relative_probability
    100
  end

  def self.buy_points
    3
  end
end
