import { screen } from "@testing-library/react"
import Layout from "./Layout"
import { render } from "@testing-library/react"

test("App should have correct initial render", () => {
    render(<Layout />)

  // The Layout should be rendered correctly
  expect(screen.getByText(/CODERAMA/i)).toBeInTheDocument()
})