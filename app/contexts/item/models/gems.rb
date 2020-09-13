class Gems < BaseItem
  def initialize
    super(
      name: 'Gems',
      weight: 25,
      points: 20
    )
  end

  def self.relative_probability
    5
  end
end
