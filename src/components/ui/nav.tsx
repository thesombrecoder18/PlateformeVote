export type NavItem = {
  href: string
  label: string
  current?: boolean
}

export function Nav({ label, items }: { label: string; items: readonly NavItem[] }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className="inline-flex min-h-11 items-center text-sm font-medium text-brand-night underline underline-offset-4"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
