import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the navigation element", () => {
    render(<Header />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders the logo image with correct alt text", () => {
    render(<Header />);
    const logo = screen.getByAltText("RedStone logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the logo with correct width", () => {
    render(<Header />);
    const logo = screen.getByAltText("RedStone logo") as HTMLImageElement;
    expect(logo).toHaveAttribute("width", "180");
  });

  it("renders the contact us link", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: /contact us/i });
    expect(link).toBeInTheDocument();
  });

  it("renders the contact us link with correct href", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: /contact us/i }) as HTMLAnchorElement;
    expect(link).toHaveAttribute("href", "https://discord.com/invite/PVxBZKFr46");
  });

  it("renders the contact us link with target blank", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: /contact us/i }) as HTMLAnchorElement;
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("applies correct nav classes", () => {
    const { container } = render(<Header />);
    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("flex", "items-center", "justify-between", "p-3");
  });
});
