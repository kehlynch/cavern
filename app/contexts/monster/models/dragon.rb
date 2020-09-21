class Dragon < BaseMonster
  def initialize
    super(
      name: 'Dragon',
      fighting_strength: 6,
      magical_power: nil,
      hostile_roll: 1..4,
      indifferent_roll: 5..6,
      friendly_roll: nil,
      points: nil,
      max_load: nil
    )
  end

  def special
    'Dragon slayers add 1 to their fighting strength'
  end

  def self.relative_probability
    3
  end
end
