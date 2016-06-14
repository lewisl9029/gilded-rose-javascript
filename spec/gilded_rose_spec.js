describe('Gilded Rose', function() {

  it('should do something', function() {
    console.log(update_quality());
  });

  it('should lower both values', () => {
    const testItem = new Item('test', 10, 20);
    const updatedTestItem = updateQuality(testItem);

    expect(updatedTestItem.sell_in).toBe(9);
    expect(updatedTestItem.quality).toBe(19);
  });

  it('should never set negative quality', () => {
    const quality = 0;
    const sellIn = 1;

    expect(getNewQuality(quality, sellIn)).toBe(0);
  });

  it('should degrade quality twice as fast when sell_in is less than 0', () => {
    const quality = 3;
    const sellIn = -1;

    expect(getNewQuality(quality, sellIn)).toBe(1);
  });

  it('should increase "Aged Brie" quality', () => {
    const testItem = new Item('Aged Brie', 2, 0);
    const updatedTestItem = updateQuality(testItem);

    expect(updatedTestItem.quality).toBe(1);
  });

  it('should never increase quality past 50', () => {
    const testItem = new Item('Aged Brie', 2, 50);
    const updatedTestItem = updateQuality(testItem);

    expect(updatedTestItem.quality).toBe(50);

    const testItem2 = new Item('Backstage passes to a LW#*$S(!) concert', 5, 49);
    const updatedTestItem2 = updateQuality(testItem);

    expect(updatedTestItem2.quality).toBe(50);
  });

  it('should never change "Sulfuras"', () => {
    const testItem = new Item('Sulfuras, Hand of Ragnaros', 1, 2);
    const updatedTestItem = updateQuality(testItem);

    expect(updatedTestItem.sell_in).toBe(1);
    expect(updatedTestItem.quality).toBe(2);
  });

  it('should increase "Backstage passes" quality', () => {
    const testItem = new Item('Backstage passes to a LW#*$S(!) concert', 20, 10);
    const updatedTestItem = updateQuality(testItem);

    expect(updatedTestItem.quality).toBe(11);
  });

  it('should increase "Backstage passes" quality by 2 when sell_in is 10 or less', () => {
    const testItem = new Item('Backstage passes to a LW#*$S(!) concert', 10, 10);
    const updatedTestItem = updateQuality(testItem);

    expect(updatedTestItem.quality).toBe(12);
  });

  it('should increase "Backstage passes" quality by 3 when sell_in is 5 or less', () => {
    const testItem = new Item('Backstage passes to a LW#*$S(!) concert', 5, 10);
    const updatedTestItem = updateQuality(testItem);

    expect(updatedTestItem.quality).toBe(13);
  });

  it('should reset "Backstage passes" quality to 0 after concert', () => {
    const testItem = new Item('Backstage passes to a LW#*$S(!) concert', -1, 10);
    const updatedTestItem = updateQuality(testItem);

    expect(updatedTestItem.quality).toBe(0);
  });
});
