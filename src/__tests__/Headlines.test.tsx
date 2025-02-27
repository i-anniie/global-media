/**
 * @jest-environment node
 */

import React from "react";
import TopArticles from "@/components/TopArticles";
import { render, screen } from "@testing-library/react";

describe("Headlines Component", () => {
  test("renders headlines title correctly", () => {
    render(<TopArticles />);

    const titleElement = screen.getByText(/top headlines/i);
    expect(titleElement).toBeInTheDocument();
  });
});
