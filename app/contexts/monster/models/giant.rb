class Giant < BaseMonster
  def initialize
    super(
      name: 'Giant',
      fighting_strength: 7,
      magical_power: nil,
      hostile_roll: 1..3,
      indifferent_roll: 4..5,
      friendly_roll: 6,
      points: 7,
      max_load: 150
    )
  end
end
