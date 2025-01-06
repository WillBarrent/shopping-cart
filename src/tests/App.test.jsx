import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("App component", () => {
  it("renders header", () => {
    render(<App />, { wrapper: BrowserRouter });

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("rendering pages correctly", async () => {
    render(<App />, { wrapper: BrowserRouter });

    const user = userEvent.setup();

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    await user.click(screen.getByText("Shop"));
    expect(screen.getByText("Product Page")).toBeInTheDocument();
    await user.click(screen.getByTestId("cart"));
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  });

  it("rendering a bad route with error", () => {
    const badRoute = "/bad-route";

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Maybe this page doesn't exist./i)
    ).toBeInTheDocument();
  });
});
