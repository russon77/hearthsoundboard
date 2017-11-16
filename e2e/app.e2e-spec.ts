import { AppHeader, AppPage, AppTable } from './app.po';

describe('hearthsoundboard App', () => {
  it('should display the app title', async () => {
    await AppPage.navigateTo();

    return await expect(AppHeader.getBrandText()).toEqual('HearthSoundboard');
  });

  it('should display a table of cards', async () => {
    await AppPage.navigateTo();

    const expectedHeaders = ['Name', 'Class', 'Media'].sort();
    let actualHeaders = await AppTable.getColumnNames();
    actualHeaders = actualHeaders.sort();

    return await expect(actualHeaders).toEqual(expectedHeaders);
  });

  it('should filter by the card name', async () => {
    await AppPage.navigateTo();

    const expectedCard = {name: 'Tirion Fordring'};

    await AppTable.search('tirion fordring');

    await expect(AppTable.rowCount()).toEqual(1);

    const actualCard = await AppTable.getRow(0);
    return await expect(actualCard).toEqual(expectedCard);
  });

  it('should play card audio: summon, attack and death', async () => {
    await AppPage.navigateTo();

    await AppTable.search('tirion fordring');

    await AppTable.playSummonEffect(0);
    await AppTable.playAttackEffect(0);
    return await AppTable.playDeathEffect(0);
  });
});
