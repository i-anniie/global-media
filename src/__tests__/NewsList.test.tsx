/**
 * @jest-environment node
 */

import React from "react";
import AllArticles from "@/components/AllArticles";
import { render, screen } from "@testing-library/react";

const mockNews = [
  { title: "News 1", description: "Description 1", url: "#" },
  { title: "News 2", description: "Description 2", url: "#" },
];

describe("NewsList Component", () => {
  test("renders list of news articles", () => {
    render(<AllArticles articles={mockNews} />);

    const newsItems = screen.getAllByRole("article");
    expect(newsItems.length).toBe(2);
  });

  test("displays correct news titles", () => {
    render(<AllArticles articles={mockNews} />);

    expect(screen.getByText(/news 1/i)).toBeInTheDocument();
    expect(screen.getByText(/news 2/i)).toBeInTheDocument();
  });
});
