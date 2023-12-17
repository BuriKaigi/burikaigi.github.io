import { Button } from './Button'
import { Container } from './Container'
import { DiamondIcon } from './DiamondIcon'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="relative z-50 flex-none lg:pt-11 max-lg:hidden">
      <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
        <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
          <Logo className="h-12 w-auto text-slate-900" />
        </div>
        <div className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-black-600/10 py-4 font-mono text-sm text-black-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
          <div className="mx-auto flex items-center gap-4 px-4">
            <p>
              <time dateTime="2024-01-20">2024/1/20 11:50 - 18:30</time>
            </p>
            <DiamondIcon className="h-1.5 w-1.5 overflow-visible fill-current stroke-current" />
            <p>Toyama Prefectural University</p>
          </div>
        </div>
        <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
          <Button href="https://toyama-eng.connpass.com/event/303732/" blank>参加申し込み</Button>
        </div>
      </Container>
    </header>
  )
}
