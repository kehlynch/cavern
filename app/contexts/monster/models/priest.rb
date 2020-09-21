class Priest < BaseMonster
  def initialize
    super(
      name: 'Priest',
      fighting_strength: 2,
      magical_power: 2,
      hostile_roll: 1,
      indifferent_roll: 2..4,
      friendly_roll: 4..6,
      points: 8,
      max_load: 25
    )
  end

  def special
    'Lotus dust, Eye of God each reduce his strength by only 2'
  end

  def self.buy_points
    4
  end
end
