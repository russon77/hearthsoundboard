import { browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';

/***********************
 ** Utilities
 ***********************/

const guaranteedSendKeys = (elementFinder: ElementFinder, text: string) => {
  return elementFinder
    .clear()
    .then(
      () => elementFinder.sendKeys(text)
    )
    .then(
      () => elementFinder.getAttribute('value')
    )
    .then(
      insertedValue => {
        if (insertedValue !== text) {
          // Failed, must send characters one at a time
          elementFinder.clear();
          for (let i = 0; i < text.length; i++) {
            elementFinder.sendKeys(text.charAt(i));
          }
        }
      }
    )
    .then(
      () =>
        // wait for sendKeys to propagate correctly, otherwise the text will not be
        // fully entered when dialog is closed
        browser.wait(
          ExpectedConditions.textToBePresentInElementValue(
            elementFinder,
            text
          )
        )
    );
};

/***********************
 ** App Page
 ***********************/

export class AppPage {
  static navigateTo() {
    return browser.get('/');
  }
}

export class AppHeader {
  static getBrandText() {
    return element(by.css('app-root mat-toolbar #brand')).getText();
  }
}

export class AppTable {
  static getColumnNames() {
    return element.all(by.css('app-root mat-header-cell')).map(ef => ef.getText());
  }

  static search(query: string) {
    return guaranteedSendKeys(element(by.css('app-root #search-query')), query);
  }

  static rowCount() {
    return element.all(by.css('app-root mat-row')).count();
  }

  static async getRow(index: number) {
    return {name: await element.all(by.css('app-root mat-cell.mat-column-name')).get(index).getText()};
  }

  static playSummonEffect(index: number) {
    return element.all(by.css('app-root .summon-effect')).click();
  }

  static playAttackEffect(index: number) {
    return element.all(by.css('app-root .attack-death')).click();
  }

  static playDeathEffect(index: number) {
    return element.all(by.css('app-root .death-effect')).click();
  }
}
