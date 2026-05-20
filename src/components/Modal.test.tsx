import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

describe("Modal", () => {
  const mockCloseModal = jest.fn();
  const defaultProps = {
    closeModal: mockCloseModal,
    title: "Test Title",
    text: "Test body text",
  };

  beforeEach(() => {
    mockCloseModal.mockClear();
  });

  it("renders with the provided title and text", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test body text")).toBeInTheDocument();
  });

  it("renders the close button with an SVG icon", () => {
    render(<Modal {...defaultProps} />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("calls closeModal when the close (X) button is clicked", () => {
    render(<Modal {...defaultProps} />);
    const closeButton = screen.getByRole("button", { name: "" });
    fireEvent.click(closeButton);
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("calls closeModal when the 'Close' button is clicked", () => {
    render(<Modal {...defaultProps} />);
    const closeBtn = screen.getByText("Close");
    fireEvent.click(closeBtn);
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("renders with a fixed overlay background", () => {
    render(<Modal {...defaultProps} />);
    const overlay = document.querySelector(".fixed.top-0.left-0");
    expect(overlay).toHaveClass("bg-gray-400");
    expect(overlay).toHaveClass("bg-opacity-60");
  });

  it("displays the title inside an h3 element", () => {
    render(<Modal {...defaultProps} />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Test Title");
  });

  it("renders the body text inside a paragraph", () => {
    render(<Modal {...defaultProps} />);
    const paragraph = screen.getByText("Test body text");
    expect(paragraph.tagName.toLowerCase()).toBe("p");
    expect(paragraph).toHaveClass("leading-relaxed");
  });
});
