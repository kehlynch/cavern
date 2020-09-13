class Giant < BaseMonster
  def initialize
    super(
      name: 'Giant',
      fighting_strength: 7,
      magical_power: nil,
      hostile: 1..3,
      indifferent: 4..5,
      friendly: 6,
      buy_points: nil,
      points: 7,
      max_load: 150
    )
  end
end
