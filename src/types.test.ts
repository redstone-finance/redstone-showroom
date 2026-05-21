import { Prices } from './types';

describe('Prices interface', () => {
  it('should allow creating an object with all required fields', () => {
    const prices: Prices = {
      btc: '50000',
      eth: '3000',
      bnb: '400',
      ar: '20',
      avax: '80',
      celo: '1.5',
    };

    expect(prices).toBeDefined();
    expect(prices.btc).toBe('50000');
    expect(prices.eth).toBe('3000');
    expect(prices.bnb).toBe('400');
    expect(prices.ar).toBe('20');
    expect(prices.avax).toBe('80');
    expect(prices.celo).toBe('1.5');
  });

  it('should require all fields to be present', () => {
    // This test verifies at runtime that all keys exist
    const prices: Prices = {
      btc: '1',
      eth: '2',
      bnb: '3',
      ar: '4',
      avax: '5',
      celo: '6',
    };

    const keys: (keyof Prices)[] = ['btc', 'eth', 'bnb', 'ar', 'avax', 'celo'];
    keys.forEach((key) => {
      expect(prices).toHaveProperty(key);
    });
  });

  it('should only accept string values for all fields', () => {
    const prices: Prices = {
      btc: '50000.50',
      eth: '3000.00',
      bnb: '400.00',
      ar: '20.00',
      avax: '80.00',
      celo: '1.50',
    };

    const keys: (keyof Prices)[] = ['btc', 'eth', 'bnb', 'ar', 'avax', 'celo'];
    keys.forEach((key) => {
      expect(typeof prices[key]).toBe('string');
    });
  });

  it('should allow updating field values', () => {
    const prices: Prices = {
      btc: '50000',
      eth: '3000',
      bnb: '400',
      ar: '20',
      avax: '80',
      celo: '1.5',
    };

    prices.btc = '60000';
    expect(prices.btc).toBe('60000');
  });

  it('should have exactly 6 keys', () => {
    const prices: Prices = {
      btc: '1',
      eth: '2',
      bnb: '3',
      ar: '4',
      avax: '5',
      celo: '6',
    };

    expect(Object.keys(prices).length).toBe(6);
  });
});
