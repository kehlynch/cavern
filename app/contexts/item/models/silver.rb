class Silver < BaseItem
  def initialize
    super(
      name: 'Silver',
      weight: 25,
      points: 5
    )
  end

  def self.relative_probability
    20
  end
end
