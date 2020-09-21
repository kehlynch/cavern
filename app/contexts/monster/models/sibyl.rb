class Sibyl < BaseMonster
  def initialize
    super(
      name: 'Sibyl',
      fighting_strength: nil,
      magical_power: nil,
      hostile_roll: nil,
      indifferent_roll: 1..4,
      friendly_roll: 5..6,
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
