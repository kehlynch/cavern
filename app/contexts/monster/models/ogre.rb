class Ogre < BaseMonster
  def initialize
    super(
      name: 'Ogre',
      fighting_strength: 5,
      magical_power: nil,
      hostile_roll: 1..4,
      indifferent_roll: 5,
      friendly_roll: 6,
      points: 5,
      max_load: 100
    )
  end
end
