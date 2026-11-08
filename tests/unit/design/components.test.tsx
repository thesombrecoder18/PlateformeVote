import { fireEvent, render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it } from "vitest"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { DataTable } from "@/components/ui/table"

describe("ui components", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
      this.setAttribute("open", "")
    }
    HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
      this.removeAttribute("open")
    }
  })

  it("renders an enabled button and a disabled one", () => {
    render(
      <>
        <Button>Enregistrer</Button>
        <Button disabled>Indisponible</Button>
      </>,
    )
    expect(screen.getByRole("button", { name: "Enregistrer" })).toBeEnabled()
    expect(screen.getByRole("button", { name: "Indisponible" })).toBeDisabled()
  })

  it("associates a field error with its input", () => {
    render(<Field id="reference" label="Référence" error="Ce champ est obligatoire." />)
    const input = screen.getByLabelText("Référence")
    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input).toHaveAccessibleDescription("Ce champ est obligatoire.")
  })

  it("exposes warning as an alert", () => {
    render(
      <Alert variant="warning" title="À vérifier">
        Detail
      </Alert>,
    )
    expect(screen.getByRole("alert")).toHaveTextContent("À vérifier")
  })

  it("exposes danger as an alert and success as a status", () => {
    render(
      <>
        <Alert variant="danger" title="Action impossible">
          Detail
        </Alert>
        <Alert variant="success" title="Enregistré">
          Terminé
        </Alert>
      </>,
    )
    expect(screen.getByRole("alert")).toHaveTextContent("Action impossible")
    expect(screen.getByRole("status")).toHaveTextContent("Enregistré")
  })

  it("opens and closes a dialog", () => {
    render(
      <Dialog
        triggerLabel="Ouvrir"
        title="Confirmer"
        description="Aucune donnée n’est envoyée."
        closeLabel="Fermer"
      />,
    )
    const dialog = screen.getByRole("dialog", { hidden: true })
    expect(dialog).not.toHaveAttribute("open")
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir" }))
    expect(dialog).toHaveAttribute("open")
    fireEvent.click(screen.getByRole("button", { name: "Fermer" }))
    expect(dialog).not.toHaveAttribute("open")
  })

  it("shows an empty table state", () => {
    render(
      <DataTable
        caption="Liste vide"
        columns={[{ key: "state", header: "État" }]}
        rows={[]}
        emptyLabel="Aucune ligne à afficher."
      />,
    )
    expect(screen.getByText("Aucune ligne à afficher.")).toBeInTheDocument()
  })
})
