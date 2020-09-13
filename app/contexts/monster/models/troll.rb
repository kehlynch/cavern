class Troll < BaseMonster
  def initialize
    super(
      name: 'Troll',
      fighting_strength: 4,
      magical_power: nil,
      hostile: 1..3,
      indifferent: 4,
      friendly: 5..6,
      buy_points: 3,
      points: 4,
      max_load: 75
    )
  end
end
