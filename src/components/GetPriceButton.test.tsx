import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GetPriceButton } from "./GetPriceButton";

describe("GetPriceButton", () => {
  const mockGetPriceFromContract = jest.fn();

  beforeEach(() => {
    mockGetPriceFromContract.mockClear();
  });

  it("renders with the correct text", () => {
    render(<GetPriceButton getPriceFromContract={mockGetPriceFromContract} />);
    expect(screen.getByRole("button", { name: /get prices/i })).toBeInTheDocument();
  });

  it("has the correct CSS classes", () => {
    render(<GetPriceButton getPriceFromContract={mockGetPriceFromContract} />);
    const button = screen.getByRole("button", { name: /get prices/i });
    expect(button).toHaveClass("bg-redstone");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("rounded-full");
    expect(button).toHaveClass("py-3");
    expect(button).toHaveClass("px-8");
    expect(button).toHaveClass("text-xl");
  });

  it("calls getPriceFromContract when clicked", () => {
    render(<GetPriceButton getPriceFromContract={mockGetPriceFromContract} />);
    const button = screen.getByRole("button", { name: /get prices/i });
    fireEvent.click(button);
    expect(mockGetPriceFromContract).toHaveBeenCalledTimes(1);
  });
});
