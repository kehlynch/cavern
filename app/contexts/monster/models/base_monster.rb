class BaseMonster
  attr_reader :slug, :name, :fighting_strength, :magical_power, :hostile_roll, :indifferent_roll, :friendly_roll, :points, :max_load

  delegate :buy_points, to: :class

  def self.slug
    name.underscore
  end

  def self.relative_probability
    10
  end

  def self.buy_points
    nil
  end

  def initialize(name:, fighting_strength:, magical_power:, hostile_roll:, indifferent_roll:, friendly_roll:, points:, max_load:)
    @slug = self.class.slug
    @name = name
    @fighting_strength = fighting_strength
    @magical_power = magical_power
    @hostile_roll = hostile_roll.is_a?(Range) ? hostile_roll.to_a : [hostile_roll]
    @indifferent_roll = indifferent_roll.is_a?(Range) ? indifferent_roll.to_a : [indifferent_roll]
    @friendly_roll = friendly_roll.is_a?(Range) ? friendly_roll.to_a : [friendly_roll]
    @points = points
    @max_load = max_load
  end
end
