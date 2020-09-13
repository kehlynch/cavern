class Sibyl < BaseMonster
  def initialize
    super(
      name: 'Sibyl',
      fighting_strength: nil,
      magical_power: nil,
      hostile: nil,
      indifferent: 1..4,
      friendly: 5..6,
      buy_points: nil,
      points: nil,
      max_load: nil
    )
  end

  def special
    ['Test once', 'Does not fight', 'Reveals path']
  end

  def self.relative_probability
    1
  end
end
