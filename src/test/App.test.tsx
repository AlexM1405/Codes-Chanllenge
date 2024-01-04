

import userEvent from "@testing-library/user-event"
import { describe, test, expect} from "vitest"
import { render, screen } from "@testing-library/react"
import App from "../App"

describe("<App />", () => {
    test("should work", () => {
        render(<App />)
        screen.debug()

        expect(
            screen.getByText("My Code Challenge")
        ).toBeDefined()
    })

    test("Should add items and remove then", async () => {
        const user = userEvent.setup()

        render(<App />)

        const input = screen.getByRole("textbox")
        expect(input).toBeDefined()

        const form = screen.getByRole("form")
        expect(form).toBeDefined()

        const button = form.querySelector("button")
        expect(button).toBeDefined()

        await user.type(input, "Movies")
        await user.click(button!)

        await user.type(input, "Series")
        await user.click(button!)



        const List  =screen.getByRole("List")
        expect(List).toBeDefined()
        expect(List.childNodes.length).toBe(2)

        const item = screen.getByText("Movies")
        const removeButton = item.querySelector("button")
        expect(removeButton).toBeDefined()

        await user.click(removeButton!)

        const noResults = screen.getByText("There are no elements in the list")
        expect(noResults).toBeDefined()


    })
})