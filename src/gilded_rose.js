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

const QUALITY_CHANGE_RATE = 1;
const SELL_IN_CHANGE_RATE = 1;

const getNewQuality = (quality, sellIn, qualityChangeRate = QUALITY_CHANGE_RATE) => {
  const newQuality = sellIn < 0 ? 
    quality - qualityChangeRate * 2 : 
    quality - qualityChangeRate;
  return newQuality < 0 ? 0 : newQuality; 
};

// assuming Aged Brie only increases quality at regular rate
//  regardless of age, even when age is negative
const getNewAgedBrieQuality = quality => {
  const newQuality = quality + QUALITY_CHANGE_RATE;
  return newQuality > 50 ? 50 : newQuality;
};

// assuming concert occurs at sell_in = 0
// assuming quality increases at regular rate when sell_in > 10
const getNewBackstagePassQuality = (quality, sellIn) => {
  const newQuality = sellIn < 0 ? 0 :
    sellIn <= 5 ? quality + 3 :
    sellIn <= 10 ? quality + 2 :
    quality + QUALITY_CHANGE_RATE;

  return newQuality > 50 ? 50 : newQuality;
};

const getNewSellIn = sellIn => sellIn - SELL_IN_CHANGE_RATE;

const updateQuality = item => {
  // assuming items of the same type like backstage passes and conjured items
  //  will have their type name at the beginning of their names, case sensitive
  if (item.name.startsWith('Backstage passes')) {
    return Object.assign({}, item, {
      sell_in: getNewSellIn(item.sell_in),
      quality: getNewBackstagePassQuality(item.quality, item.sell_in)
    });
  }

  if (item.name.startsWith('Conjured')) {
    return Object.assign({}, item, {
      sell_in: getNewSellIn(item.sell_in),
      quality: getNewQuality(item.quality, item.sell_in, QUALITY_CHANGE_RATE * 2)
    });
  }

  switch (item.name) {
    // assuming these following special items are one-of-a-kind, with unique names
    case 'Aged Brie':
      return Object.assign({}, item, {
        sell_in: getNewSellIn(item.sell_in),
        quality: getNewAgedBrieQuality(item.quality)
      });
    case 'Sulfuras, Hand of Ragnaros':
      return item;
    default:
      return Object.assign({}, item, {
        sell_in: getNewSellIn(item.sell_in),
        quality: getNewQuality(item.quality, item.sell_in)
      });
  }
};

function update_quality() {
  return items.map(updateQuality);
}
