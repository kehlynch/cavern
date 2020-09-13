class Spectre < BaseMonster
  def initialize
    super(
      name: 'Spectre',
      fighting_strength: 5,
      magical_power: nil,
      hostile: 1..5,
      indifferent: 6,
      friendly: nil,
      buy_points: nil,
      points: nil,
      max_load: nil
    )
  end

  def special
    ['Can only be fought with magical power']
  end
end
