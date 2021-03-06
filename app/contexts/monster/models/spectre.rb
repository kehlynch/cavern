class Spectre < BaseMonster
  def initialize
    super(
      name: 'Spectre',
      fighting_strength: 5,
      magical_power: nil,
      hostile_roll: 1..5,
      indifferent_roll: 6,
      friendly_roll: nil,
      points: nil,
      max_load: nil
    )
  end

  def special
    ['Can only be fought with magical power']
  end

  def self.relative_probability
    2
  end
end
