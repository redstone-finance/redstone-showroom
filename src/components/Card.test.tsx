import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(<Card>Hello World</Card>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders complex children", () => {
    render(
      <Card>
        <h1>Title</h1>
        <p>Some content</p>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Some content")).toBeInTheDocument();
  });

  it("applies correct outer container classes", () => {
    const { container } = render(<Card>Content</Card>);
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass("mt-3", "mb-3", "xl:flex", "xl:justify-center");
  });

  it("applies correct inner container classes", () => {
    const { container } = render(<Card>Content</Card>);
    const outerDiv = container.firstChild as HTMLElement;
    const innerDiv = outerDiv.firstChild as HTMLElement;
    expect(innerDiv).toHaveClass(
      "flex",
      "flex-col",
      "flex-1",
      "max-w-5xl",
      "rounded",
      "shadow-3xl",
      "p-8",
      "gap-5",
      "bg-white"
    );
  });

  it("renders as a div element", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });
});
