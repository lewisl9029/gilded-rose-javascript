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
  });
});
