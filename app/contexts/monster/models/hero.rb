class Hero < BaseMonster
  def initialize
    super(
      name: 'Hero',
      fighting_strength: 5,
      magical_power: nil,
      hostile: 1..3,
      indifferent: nil,
      friendly: 4..6,
      buy_points: 6,
      points: 6,
      max_load: 75
    )
  end
end
