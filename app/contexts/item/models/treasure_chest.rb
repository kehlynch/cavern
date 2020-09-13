class TreasureChest < BaseItem
  def initialize
    super(
      name: 'Treasure Chest',
      weight: 100,
      points: nil
    )
  end

  def self.relative_probability
    1
  end
end
