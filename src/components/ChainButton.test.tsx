import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChainButton } from "./ChainButton";
import { ChainDetails } from "../config/chains";

const mockChain: ChainDetails = {
  chainId: "0x1",
  rpcUrls: ["https://example.com/rpc"],
  chainName: "TestChain",
  label: "TestChain",
  nativeCurrency: {
    name: "TEST",
    symbol: "TEST",
    decimals: 18,
  },
  blockExplorerUrls: ["https://example.com"],
  exampleContractAddress: "0x123",
  contractExplorerUrl: "https://example.com/address/0x123",
  logo: "/test-logo.png",
};

const mockNetwork: ChainDetails = {
  chainId: "0x2",
  rpcUrls: ["https://example2.com/rpc"],
  chainName: "OtherChain",
  label: "OtherChain",
  nativeCurrency: {
    name: "OTHER",
    symbol: "OTHER",
    decimals: 18,
  },
  blockExplorerUrls: ["https://example2.com"],
  exampleContractAddress: "0x456",
  contractExplorerUrl: "https://example2.com/address/0x456",
  logo: "/other-logo.png",
};

describe("ChainButton", () => {
  it("renders with chain label and logo", () => {
    render(
      <ChainButton
        chain={mockChain}
        network={null}
        onChainClick={() => {}}
        disabled={false}
      />
    );

    expect(screen.getByText("TestChain")).toBeInTheDocument();
    const img = screen.getByAltText("TestChain logo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test-logo.png");
    expect(img).toHaveAttribute("width", "24");
    expect(img).toHaveAttribute("height", "24");
  });

  it("calls onChainClick with the correct chain when clicked", () => {
    const handleClick = jest.fn();
    render(
      <ChainButton
        chain={mockChain}
        network={null}
        onChainClick={handleClick}
        disabled={false}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockChain);
  });

  it("is disabled when disabled prop is true", () => {
    const handleClick = jest.fn();
    render(
      <ChainButton
        chain={mockChain}
        network={null}
        onChainClick={handleClick}
        disabled={true}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("is not disabled when disabled prop is false", () => {
    render(
      <ChainButton
        chain={mockChain}
        network={null}
        onChainClick={() => {}}
        disabled={false}
      />
    );

    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("applies border-redstone class when chainId matches network chainId", () => {
    const matchingNetwork: ChainDetails = {
      ...mockNetwork,
      chainId: mockChain.chainId,
    };

    render(
      <ChainButton
        chain={mockChain}
        network={matchingNetwork}
        onChainClick={() => {}}
        disabled={false}
      />
    );

    expect(screen.getByRole("button")).toHaveClass("border-redstone");
  });

  it("does not apply border-redstone class when chainId does not match network chainId", () => {
    render(
      <ChainButton
        chain={mockChain}
        network={mockNetwork}
        onChainClick={() => {}}
        disabled={false}
      />
    );

    expect(screen.getByRole("button")).not.toHaveClass("border-redstone");
  });

  it("does not apply border-redstone class when network is null", () => {
    render(
      <ChainButton
        chain={mockChain}
        network={null}
        onChainClick={() => {}}
        disabled={false}
      />
    );

    expect(screen.getByRole("button")).not.toHaveClass("border-redstone");
  });

  it("applies disabled:opacity-30 class regardless of disabled state", () => {
    const { rerender } = render(
      <ChainButton
        chain={mockChain}
        network={null}
        onChainClick={() => {}}
        disabled={false}
      />
    );

    expect(screen.getByRole("button")).toHaveClass("disabled:opacity-30");

    rerender(
      <ChainButton
        chain={mockChain}
        network={null}
        onChainClick={() => {}}
        disabled={true}
      />
    );

    expect(screen.getByRole("button")).toHaveClass("disabled:opacity-30");
  });

  it("applies hover:scale-110, ease-in-out, and duration-300 classes", () => {
    render(
      <ChainButton
        chain={mockChain}
        network={null}
        onChainClick={() => {}}
        disabled={false}
      />
    );

    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:scale-110");
    expect(button).toHaveClass("ease-in-out");
    expect(button).toHaveClass("duration-300");
  });
});
