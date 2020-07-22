class Monsters::Hero < Monsters::BaseMonster
  def initialize
    super(
      slug: 'hero',
      fighting_strength: 5,
      magical_power: nil,
      hostile: 1..2,
      indifferent: 3..4,
      friendly: 5..6,
      points: 6,
      max_load: 75
    )
  end
end
