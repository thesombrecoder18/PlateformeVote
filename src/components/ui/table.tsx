export type TableColumn = {
  key: string
  header: string
}

export type TableRow = {
  id: string
} & Record<string, string>

export function DataTable({
  id = "data-table",
  caption,
  columns,
  rows,
  emptyLabel,
}: {
  id?: string
  caption: string
  columns: readonly TableColumn[]
  rows: readonly TableRow[]
  emptyLabel: string
}) {
  const captionId = `${id}-caption`

  if (rows.length === 0) {
    return (
      <div>
        <p id={captionId} className="text-sm font-medium text-brand-night">
          {caption}
        </p>
        <p className="mt-2 text-sm text-ink-muted">{emptyLabel}</p>
      </div>
    )
  }

  return (
    <div>
      <p id={captionId} className="mb-3 text-sm font-medium text-brand-night md:hidden">
        {caption}
      </p>
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="mb-3 text-left text-sm font-medium text-brand-night">{caption}</caption>
          <thead>
            <tr className="border-b border-control-border">
              {columns.map((column) => (
                <th key={column.key} scope="col" className="px-3 py-3 font-semibold text-brand-night">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-surface-border">
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-3 text-brand-night">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="flex flex-col gap-3 md:hidden" aria-labelledby={captionId}>
        {rows.map((row) => (
          <li key={row.id} className="border border-control-border bg-white p-4">
            <dl className="flex flex-col gap-2">
              {columns.map((column) => (
                <div key={column.key}>
                  <dt className="text-sm text-ink-muted">{column.header}</dt>
                  <dd className="text-base text-brand-night">{row[column.key]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )
}
