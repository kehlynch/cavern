class Wanderer < BaseMonster
  def initialize
    super(
      name: 'Wanderer',
      fighting_strength: 2,
      magical_power: nil,
      hostile: 1..2,
      indifferent: 3..4,
      friendly: 5..6,
      points: 5,
      max_load: 25
    )
  end

  def special
    ['befriends unicorns']
  end

  def self.buy_points
    2
  end
end
