import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ShopPage, { getProductsData } from "../Pages/ShopPage/ShopPage";
import userEvent from "@testing-library/user-event";
import CartPage from "../Pages/CartPage/CartPage";

global.fetch = vi.fn();

function fakeProductsData(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("Fetching products data", () => {
  it("makes a get request to the fake store api without rejects", async () => {
    const productsData = [
      {
        id: 1,
        image: "Image 1",
        title: "Product 1",
        price: 12,
        count: 1,
      },
      {
        id: 2,
        image: "Image 2",
        title: "Product 2",
        price: 15,
        count: 1,
      },
      {
        id: 3,
        image: "Image 3",
        title: "Product 3",
        price: 18,
        count: 1,
      },
    ];

    fetch.mockResolvedValue(fakeProductsData(productsData));

    const products = await getProductsData();

    expect(fetch).toHaveBeenCalledWith("https://fakestoreapi.com/products", {
      mode: "cors",
    });

    expect(products).toStrictEqual(productsData);
  });

  it("shows loading process text while API request is in progress", async () => {
    render(<ShopPage />);
    const loading = screen.getByText("Loading...");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  });
});

describe("Testing product card", () => {
  it("increase the count correctly", async () => {
    render(<ShopPage />);

    const user = userEvent.setup();

    const loading = screen.getByText("Loading...");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    const incrementButton = screen.getAllByTestId(
      "product-counter-increment"
    )[0];

    expect(
      screen.getAllByTestId("product-counter")[0].getAttribute("value")
    ).toBe("1");

    await user.click(incrementButton);

    expect(
      screen.getAllByTestId("product-counter")[0].getAttribute("value")
    ).toBe("2");
  });

  it("decrease the count correctly", async () => {
    render(<ShopPage />);

    const user = userEvent.setup();

    const loading = screen.getByText("Loading...");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    const incrementButton = screen.getAllByTestId(
      "product-counter-increment"
    )[0];

    const decrementButton = screen.getAllByTestId(
      "product-counter-decrement"
    )[0];

    expect(
      screen.getAllByTestId("product-counter")[0].getAttribute("value")
    ).toBe("1");

    await user.click(incrementButton);

    expect(
      screen.getAllByTestId("product-counter")[0].getAttribute("value")
    ).toBe("2");

    await user.click(decrementButton);

    expect(
      screen.getAllByTestId("product-counter")[0].getAttribute("value")
    ).toBe("1");
  });
});

describe("Shopping Cart", () => {
  it("Add/remove product to/from the shopping cart page", async () => {
    const shoppingCart = [];
    const addToCart = vi.fn();
    const removeFromCart = vi.fn();

    /**
     * I didn't implement add and remove from cart functionality
     * correctly here as in my actual component because it is just mock
     * implementation and I would like to keep it simple for test purposes.
     */

    addToCart.mockImplementation((product) => {
      shoppingCart.push(product);
    });

    removeFromCart.mockImplementation((product) => {
      shoppingCart.pop(product);
    });

    render(<ShopPage shoppingCart={[]} addToCart={addToCart} />);

    const user = userEvent.setup();

    const loading = screen.getByText("Loading...");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    const addToCartBtn = screen.getAllByTestId("add-to-cart")[0];

    await user.click(addToCartBtn);

    render(<CartPage removeFromCart={removeFromCart} shoppingCart={shoppingCart} />);

    expect(shoppingCart.length).toBe(1);

    const removeFromCartBtn = screen.getAllByTestId("remove-from-cart")[0];

    await user.click(removeFromCartBtn);

    expect(shoppingCart.length).toBe(0);
  });
});
