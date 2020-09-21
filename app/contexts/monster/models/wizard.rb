class Wizard < BaseMonster
  def initialize
    super(
      name: 'Wizard',
      fighting_strength: 2,
      magical_power: 5,
      hostile: 1,
      indifferent: 2..5,
      friendly: 6,
      points: 15,
      max_load: 0
    )
  end

  def self.relative_probability
    4
  end
end
