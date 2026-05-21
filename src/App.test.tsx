import React from "react";

// Mock child components before importing App
jest.mock("./components/Header", () => ({
  Header: () => ({
    type: "div",
    props: { "data-testid": "header", children: "Header" },
  }),
}));

jest.mock("./components/Footer", () => ({
  Footer: () => ({
    type: "div",
    props: { "data-testid": "footer", children: "Footer" },
  }),
}));

jest.mock("./pages/Showroom", () => ({
  Showroom: () => ({
    type: "div",
    props: { "data-testid": "showroom", children: "Showroom" },
  }),
}));

import App from "./App";

describe("App", () => {
  it("exports App as default", () => {
    expect(App).toBeDefined();
    expect(typeof App).toBe("function");
  });

  it("returns a React element when called", () => {
    const result = App({});
    expect(result).toBeTruthy();
    expect(result.type).toBe("div");
  });

  it("has correct className on root div", () => {
    const result = App({});
    expect(result.props.className).toContain("flex");
    expect(result.props.className).toContain("flex-col");
    expect(result.props.className).toContain("h-full");
    expect(result.props.className).toContain("overflow-auto");
  });

  it("renders Header, Showroom, and Footer as children", () => {
    const result = App({});
    const children = result.props.children;
    // children is an array: [Header, div(Showroom wrapper), Footer]
    expect(Array.isArray(children)).toBe(true);
    expect(children.length).toBe(3);
  });

  it("renders Header as the first child", () => {
    const result = App({});
    const children = result.props.children;
    const header = children[0];
    expect(header.type.name).toBe("Header");
  });

  it("renders Showroom wrapped in a div as the second child", () => {
    const result = App({});
    const children = result.props.children;
    const wrapper = children[1];
    expect(wrapper.type).toBe("div");
    expect(wrapper.props.className).toBe("mb-5");
    expect(wrapper.props.children.type.name).toBe("Showroom");
  });

  it("renders Footer as the third child", () => {
    const result = App({});
    const children = result.props.children;
    const footer = children[2];
    expect(footer.type.name).toBe("Footer");
  });

  it("renders components in correct order: Header -> Showroom -> Footer", () => {
    const result = App({});
    const children = result.props.children;
    expect(children[0].type.name).toBe("Header");
    expect(children[1].type).toBe("div");
    expect(children[1].props.children.type.name).toBe("Showroom");
    expect(children[2].type.name).toBe("Footer");
  });
});
