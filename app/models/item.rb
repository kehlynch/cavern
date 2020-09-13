class Item < ApplicationRecord
  belongs_to :game
  belongs_to :room, optional: true
  belongs_to :monster, optional: true

  before_create :set_characteristics

  delegate :name, :points, :weight, to: :item_details

  def item_details
    @item_details ||= ItemContext.details_for(self)
  end

  private

  def set_characteristics
    p 'set_characteristics'
    item = ItemContext.random_item
    self.slug = item.slug
  end
end
