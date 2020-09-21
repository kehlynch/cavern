class Wizard < BaseMonster
  def initialize
    super(
      name: 'Wizard',
      fighting_strength: 2,
      magical_power: 5,
      hostile_roll: 1,
      indifferent_roll: 2..5,
      friendly_roll: 6,
      points: 15,
      max_load: 0
    )
  end

  def self.relative_probability
    4
  end
end
