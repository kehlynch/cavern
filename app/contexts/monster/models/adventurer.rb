class Adventurer < BaseMonster
  def initialize
    super(
      name: 'Adventurer',
      fighting_strength: 3,
      magical_power: nil,
      hostile: 1..2,
      indifferent: 3..4,
      friendly: 5..6,
      buy_points: 3,
      points: 5,
      max_load: 50
    )
  end

  def self.relative_probability
    100
  end
end
