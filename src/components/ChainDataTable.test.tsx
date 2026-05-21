import React from "react";
import { ChainDataTable } from "./ChainDataTable";
import { ChainDetails } from "../config/chains";

describe("ChainDataTable", () => {
  const mockNetwork: ChainDetails = {
    chainId: "0x1",
    rpcUrls: ["https://example.rpc"],
    chainName: "Test Chain",
    label: "Test Chain",
    nativeCurrency: {
      name: "Test ETH",
      symbol: "TETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://explorer.example"],
    exampleContractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    contractExplorerUrl: "https://explorer.example/address/0x1234",
  };

  const mockWalletAddress = "0xabcdef1234567890abcdef1234567890abcdef12";

  it("exports ChainDataTable", () => {
    expect(ChainDataTable).toBeDefined();
    expect(typeof ChainDataTable).toBe("function");
  });

  it("renders a table element", () => {
    const result = ChainDataTable({
      walletAddress: mockWalletAddress,
      network: mockNetwork,
    });
    expect(result.type).toBe("table");
  });

  it("displays the wallet address", () => {
    const result = ChainDataTable({
      walletAddress: mockWalletAddress,
      network: mockNetwork,
    });
    const rows = result.props.children.props.children;
    const walletRow = rows[0];
    const addressCell = walletRow.props.children[1];
    expect(addressCell.props.children).toBe(mockWalletAddress);
  });

  it("displays the contract explorer URL", () => {
    const result = ChainDataTable({
      walletAddress: mockWalletAddress,
      network: mockNetwork,
    });
    const rows = result.props.children.props.children;
    const contractRow = rows[1];
    const linkCell = contractRow.props.children[1];
    const link = linkCell.props.children;
    expect(link.props.href).toBe(mockNetwork.contractExplorerUrl);
    expect(link.props.children).toBe(mockNetwork.exampleContractAddress);
  });

  it("has correct table structure with two rows", () => {
    const result = ChainDataTable({
      walletAddress: mockWalletAddress,
      network: mockNetwork,
    });
    const tbody = result.props.children;
    const rows = tbody.props.children;
    expect(Array.isArray(rows)).toBe(true);
    expect(rows.length).toBe(2);
  });

  it("includes wallet icon and label in first row", () => {
    const result = ChainDataTable({
      walletAddress: mockWalletAddress,
      network: mockNetwork,
    });
    const rows = result.props.children.props.children;
    const walletRow = rows[0];
    const labelCell = walletRow.props.children[0];
    expect(labelCell.props.children[1]).toContain("wallet");
  });

  it("includes contract icon and label in second row", () => {
    const result = ChainDataTable({
      walletAddress: mockWalletAddress,
      network: mockNetwork,
    });
    const rows = result.props.children.props.children;
    const contractRow = rows[1];
    const labelCell = contractRow.props.children[0];
    expect(labelCell.props.children[1]).toContain("Contract");
  });
});
