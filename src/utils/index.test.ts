import { timeout, emptyPrices, formatPrice } from "./index";

describe("utils", () => {
  describe("timeout", () => {
    jest.useFakeTimers();

    it("should resolve after the specified time", async () => {
      const p = timeout(1000);
      jest.advanceTimersByTime(1000);
      await expect(p).resolves.toBeUndefined();
    });

    it("should not resolve before the specified time", async () => {
      const p = timeout(1000);
      jest.advanceTimersByTime(999);
      let resolved = false;
      p.then(() => {
        resolved = true;
      });
      expect(resolved).toBe(false);
    });
  });

  describe("emptyPrices", () => {
    it("should have keys for btc, eth, bnb, ar, avax, celo", () => {
      expect(emptyPrices).toHaveProperty("btc");
      expect(emptyPrices).toHaveProperty("eth");
      expect(emptyPrices).toHaveProperty("bnb");
      expect(emptyPrices).toHaveProperty("ar");
      expect(emptyPrices).toHaveProperty("avax");
      expect(emptyPrices).toHaveProperty("celo");
    });

    it("should have empty string values for all keys", () => {
      for (const key of Object.keys(emptyPrices)) {
        expect(emptyPrices[key as keyof typeof emptyPrices]).toBe("");
      }
    });
  });

  describe("formatPrice", () => {
    it("should format a number as USD currency string", () => {
      expect(formatPrice(1234.56)).toBe("$1,234.56");
    });

    it("should format an integer as USD currency string", () => {
      expect(formatPrice(100)).toBe("$100.00");
    });

    it("should format zero as USD currency string", () => {
      expect(formatPrice(0)).toBe("$0.00");
    });

    it("should format large numbers correctly", () => {
      expect(formatPrice(1000000)).toBe("$1,000,000.00");
    });
  });
});
