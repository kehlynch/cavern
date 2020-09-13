class Ranger < BaseMonster
  def initialize
    super(
      name: 'Ranger',
      fighting_strength: 5,
      magical_power: nil,
      hostile: 1..3,
      indifferent: nil,
      friendly: 4..6,
      buy_points: 5,
      points: 10,
      max_load: 50
    )
  end
end
