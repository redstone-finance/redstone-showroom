import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Loader, Spinner } from "./Loader";

describe("Spinner", () => {
  it("renders an SVG element", () => {
    render(<Spinner />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("has role='status' for accessibility", () => {
    render(<Spinner />);
    const svg = document.querySelector("svg[role='status']");
    expect(svg).toBeInTheDocument();
  });

  it("uses the default size of 10 when no size prop is provided", () => {
    render(<Spinner />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveClass("w-10");
    expect(svg).toHaveClass("h-10");
  });

  it("applies the provided size prop to width and height classes", () => {
    render(<Spinner size={20} />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveClass("w-20");
    expect(svg).toHaveClass("h-20");
  });

  it("has the animate-spin class", () => {
    render(<Spinner />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveClass("animate-spin");
  });

  it("contains two path elements", () => {
    render(<Spinner />);
    const paths = document.querySelectorAll("path");
    expect(paths).toHaveLength(2);
  });

  it("has the correct viewBox", () => {
    render(<Spinner />);
    const svg = document.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 100 101");
  });
});

describe("Loader", () => {
  it("renders a container div", () => {
    render(<Loader />);
    const container = document.querySelector(".flex.items-center.justify-center");
    expect(container).toBeInTheDocument();
  });

  it("renders the Spinner component", () => {
    render(<Loader />);
    const svg = document.querySelector("svg[role='status']");
    expect(svg).toBeInTheDocument();
  });

  it("wraps the Spinner in a div with w-[45px]", () => {
    render(<Loader />);
    const wrapper = document.querySelector(".w-\\[45px\\]");
    expect(wrapper).toBeInTheDocument();
  });
});
