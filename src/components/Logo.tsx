export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <a href="/">
      <img src="/images/logo.png" alt="Burikaigiのロゴ" {...props} />
    </a>
  )
}
