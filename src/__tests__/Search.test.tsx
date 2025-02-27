/**
 * @jest-environment node
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useRouter } from "next/router";
import Navbar from "@/layout/Navbar";

// Mock the Next.js Router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("updates search input value and triggers search", () => {
  const pushMock = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

  render(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );

  const searchInput = screen.getByPlaceholderText("Search News...");
  
  // Simulate typing "technology"
  fireEvent.change(searchInput, { target: { value: "technology" } });
  expect(searchInput).toHaveValue("technology");

  // Simulate pressing Enter
  fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

  // Ensure that the router pushes to the articles page
  expect(pushMock).toHaveBeenCalledWith("/articles");
});
