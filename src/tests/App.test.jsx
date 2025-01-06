import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
  it("renders header", () => {
    render(
        <App />,
        {wrapper: BrowserRouter}
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
