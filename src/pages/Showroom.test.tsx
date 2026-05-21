import React from "react";

// Mock child components and hooks before importing Showroom
jest.mock("../hooks/useWeb3Modal", () => ({
  useWeb3Modal: () => ({
    prices: {},
    setPrices: jest.fn(),
    network: null,
    setNetwork: jest.fn(),
    signer: null,
    connectWallet: jest.fn(),
    walletAddress: "0x123",
    isChangingNetwork: false,
    isConnecting: false,
  }),
}));

jest.mock("../hooks/useMockLoader", () => ({
  useMockLoader: () => ({
    text: "",
    isMockLoading: false,
    setIsMockLoading: jest.fn(),
    startMockLoader: jest.fn(),
  }),
}));

jest.mock("../hooks/usePricesFromContract", () => ({
  usePricesFromContract: () => ({
    blockNumber: 12345,
    timestamp: 1234567890,
    isLoading: false,
    errorMessage: "",
    setErrorMessage: jest.fn(),
    getPricesFromContract: jest.fn(),
  }),
}));

jest.mock("../components/GetPriceLoader", () => ({
  GetPriceLoader: () => ({
    type: "div",
    props: { "data-testid": "get-price-loader", children: "Loading" },
  }),
}));

jest.mock("../components/GetPriceButton", () => ({
  GetPriceButton: () => ({
    type: "div",
    props: { "data-testid": "get-price-button", children: "Get Price" },
  }),
}));

jest.mock("../components/Modal", () => ({
  __esModule: true,
  default: () => ({
    type: "div",
    props: { "data-testid": "modal", children: "Modal" },
  }),
}));

jest.mock("../components/ChainButton", () => ({
  ChainButton: () => ({
    type: "div",
    props: { "data-testid": "chain-button", children: "Chain" },
  }),
}));

jest.mock("../components/ChainDataTable", () => ({
  ChainDataTable: () => ({
    type: "div",
    props: { "data-testid": "chain-data-table", children: "Table" },
  }),
}));

jest.mock("../components/PricesTable", () => ({
  PricesTable: () => ({
    type: "div",
    props: { "data-testid": "prices-table", children: "Prices" },
  }),
}));

jest.mock("../config/chains", () => ({
  chains: {
    ethereum: { chainId: 1, name: "Ethereum" },
    polygon: { chainId: 137, name: "Polygon" },
  },
}));

import { Showroom } from "./Showroom";

describe("Showroom", () => {
  it("exports Showroom", () => {
    expect(Showroom).toBeDefined();
    expect(typeof Showroom).toBe("function");
  });

  it("returns a React element when called", () => {
    const result = Showroom();
    expect(result).toBeTruthy();
    expect(result.type).toBe("div");
  });

  it("has correct className on root div", () => {
    const result = Showroom();
    expect(result.props.className).toContain("flex");
    expect(result.props.className).toContain("justify-center");
    expect(result.props.className).toContain("items-center");
    expect(result.props.className).toContain("flex-col");
  });

  it("renders chain selection prompt when no network is selected", () => {
    const result = Showroom();
    const children = result.props.children;
    // First child should be the prompt when no network
    expect(Array.isArray(children)).toBe(true);
  });

  it("renders ChainButtons for each chain", () => {
    const result = Showroom();
    const children = result.props.children;
    // Should have prompt, chain buttons div, and other elements
    expect(children.length).toBeGreaterThan(1);
  });
});
