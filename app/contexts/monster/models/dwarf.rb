class Dwarf < BaseMonster
  def initialize
    super(
      name: 'Dwarf',
      fighting_strength: 1,
      magical_power: nil,
      hostile_roll: nil,
      indifferent_roll: 1..4,
      friendly_roll: 5..6,
      points: 2,
      max_load: 25
    )
  end

  def special
    'Guides past traps'
  end

  def self.relative_probability
    50
  end

  def self.buy_points
    1
  end
end
