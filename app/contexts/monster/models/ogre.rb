class Ogre < BaseMonster
  def initialize
    super(
      name: 'Ogre',
      fighting_strength: 5,
      magical_power: nil,
      hostile: 1..4,
      indifferent: 5,
      friendly: 6,
      points: 5,
      max_load: 100
    )
  end
end
