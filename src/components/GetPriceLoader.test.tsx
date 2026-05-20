import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GetPriceLoader } from "./GetPriceLoader";

describe("GetPriceLoader", () => {
  it("renders without crashing", () => {
    render(<GetPriceLoader text="Loading price..." />);
    expect(screen.getByText("Loading price...")).toBeInTheDocument();
  });

  it("displays the provided text", () => {
    render(<GetPriceLoader text="Fetching..." />);
    expect(screen.getByText("Fetching...")).toBeInTheDocument();
  });

  it("renders the Loader component", () => {
    const { container } = render(<GetPriceLoader text="Loading..." />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("wraps content in a flex container with correct classes", () => {
    const { container } = render(<GetPriceLoader text="Test" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("flex", "justify-center", "items-center", "flex-col");
  });

  it("renders the text with correct styling classes", () => {
    render(<GetPriceLoader text="Styled text" />);
    const paragraph = screen.getByText("Styled text");
    expect(paragraph).toHaveClass("text-md", "font-semibold", "mt-4");
  });
});
