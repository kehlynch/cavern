class Troll < BaseMonster
  def initialize
    super(
      name: 'Troll',
      fighting_strength: 4,
      magical_power: nil,
      hostile_roll: 1..3,
      indifferent_roll: 4,
      friendly_roll: 5..6,
      points: 4,
      max_load: 75
    )
  end

  def self.buy_points
    3
  end
end
