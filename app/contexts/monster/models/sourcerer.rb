class Sourcerer < BaseMonster
  def initialize
    super(
      name: 'Sourcerer',
      fighting_strength: 4,
      magical_power: 9,
      hostile_roll: 1..6,
      indifferent_roll: nil,
      friendly_roll: nil,
      points: nil,
      max_load: nil
    )
  end

  def special
    'Lotus dust, Eye of God each reduce his strength by only 2'
  end

  def self.relative_probability
    1
  end
end
