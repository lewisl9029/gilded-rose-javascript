'use strict';

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

const getNewQuality = (quality, sellIn) => {
  const newQuality = sellIn < 0 ? quality - 2 : quality - 1;
  return newQuality < 0 ? 0 : newQuality; 
};

const getNewSellIn = sellIn => sellIn - 1;

const updateQuality = item => {
  return Object.assign({}, item, {
    sell_in: getNewSellIn(item.sell_in),
    quality: getNewQuality(item.quality, item.sell_in)
  });
};

function update_quality() {
  return items.map(updateQuality);
}
