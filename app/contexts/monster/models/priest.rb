class Priest < BaseMonster
  def initialize
    super(
      name: 'Priest',
      fighting_strength: 2,
      magical_power: 2,
      hostile: 1,
      indifferent: 2..4,
      friendly: 4..6,
      buy_points: 4,
      points: 8,
      max_load: 25
    )
  end

  def special
    'Lotus dust, Eye of God each reduce his strength by only 2'
  end
end
