export interface ICard {
  readonly name: string;
  readonly cardClass: 'MAGE';
  readonly rarity: 'COMMON';

  readonly audio?: {
    readonly attack: string;
    readonly death: string;
    readonly summon: string;
  };
}


