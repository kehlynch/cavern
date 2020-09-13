module ItemContext
  ITEM_CLASSES = [
    CharmedFlute,
    Gems,
    Gold,
    Silver,
    TreasureChest
  ].freeze

  def self.random_item
    ITEM_CLASSES.map do |c|
      c.relative_probability.times.collect { c }
    end.flatten.sample.new
  end

  def self.details_for(item)
    ITEM_CLASSES.find { |m| item.slug == m.slug }.new
  end
end
