import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, RenderResult, screen } from "@testing-library/react";
import { CartSection } from "../CartSection/CartSection";
import { act } from "react";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderComponent = async (): Promise<RenderResult> => {
  const component = await act(async () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<CartSection />} />
        </Routes>
      </MemoryRouter>,
    ),
  );
  return component;
};

describe("Marketplace section", () => {
  it("render component", async () => {
    await renderComponent();
    expect(screen.getByText("Resumen de carrito")).toBeInTheDocument();
  });
});
