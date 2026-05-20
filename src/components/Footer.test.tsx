import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the footer element", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the copyright text", () => {
    render(<Footer />);
    expect(screen.getByText("© RedStone 2022")).toBeInTheDocument();
  });

  it("renders the Discord link with correct href", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /discord logo/i }) as HTMLAnchorElement;
    expect(link).toHaveAttribute("href", "https://discord.com/invite/PVxBZKFr46");
  });

  it("renders the Twitter link with correct href", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /twitter logo/i }) as HTMLAnchorElement;
    expect(link).toHaveAttribute("href", "https://twitter.com/redstone_defi");
  });

  it("renders the Mail link with correct href", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /mail logo/i }) as HTMLAnchorElement;
    expect(link).toHaveAttribute("href", "mailto:hello@redstone.finance");
  });

  it("renders the GitHub link with correct href", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /github logo/i }) as HTMLAnchorElement;
    expect(link).toHaveAttribute("href", "https://github.com/redstone-finance");
  });

  it("renders external links with target blank", () => {
    render(<Footer />);
    const discordLink = screen.getByRole("link", { name: /discord logo/i }) as HTMLAnchorElement;
    const twitterLink = screen.getByRole("link", { name: /twitter logo/i }) as HTMLAnchorElement;
    const githubLink = screen.getByRole("link", { name: /github logo/i }) as HTMLAnchorElement;
    expect(discordLink).toHaveAttribute("target", "_blank");
    expect(twitterLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("renders all four social links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);
  });

  it("renders all images with correct alt texts", () => {
    render(<Footer />);
    expect(screen.getByAltText("Discord logo")).toBeInTheDocument();
    expect(screen.getByAltText("Twitter logo")).toBeInTheDocument();
    expect(screen.getByAltText("Mail logo")).toBeInTheDocument();
    expect(screen.getByAltText("Github logo")).toBeInTheDocument();
  });
});
