class Sourcerer < BaseMonster
  def initialize
    super(
      name: 'Sourcerer',
      fighting_strength: 4,
      magical_power: 9,
      hostile: 1..6,
      indifferent: nil,
      friendly: nil,
      buy_points: nil,
      points: nil,
      max_load: nil
    )
  end

  def special
    'Lotus dust, Eye of God each reduce his strength by only 2'
  end
end
