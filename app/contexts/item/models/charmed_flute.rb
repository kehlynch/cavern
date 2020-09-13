class CharmedFlute < BaseItem
  def initialize
    super(
      name: 'Charmed Flute',
      weight: 0,
      points: 10
    )
  end

  def special
    ['lulls dragons and vipers to sleep', 'opens secret doors']
  end

  def self.relative_probability
    1
  end
end
