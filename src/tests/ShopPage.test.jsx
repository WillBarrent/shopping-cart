import { describe, it, expect, vi } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import ShopPage, { getProductsData } from "../Pages/ShopPage/ShopPage";

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

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  });

  
});
