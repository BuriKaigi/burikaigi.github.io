import { BackgroundImage } from '../BackgroundImage.tsx'
import { Button } from '../Button.tsx'
import { Container } from '../Container.tsx'
import clsx from 'clsx'

export function Hero() {
  return (
    <div className="relative py-20 sm:pb-24 sm:pt-36">
      <BackgroundImage className="-bottom-14 -top-36" position='full' />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="font-display text-5xl font-bold tracking-tighter text-black-600 sm:text-7xl">
            <a href="/">BuriKaigi 2025</a>
          </h1>
          <div className="mt-6 space-y-6 font-display text-2xl tracking-tight text-graye-900">
            <p>
              北陸ITエンジニアカンファレンス<br />
              <br />
            </p>
          </div>
          <Button href="https://toyama-eng.connpass.com/event/339471/" className="mt-10 w-full lg:hidden" blank>
            参加申し込み
          </Button>
          <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              ['Date', '2025.02.01'],
              ['Time', '10:40 - 18:00'],
              ['Location', '富山県立大学 中央棟', "max-lg:col-span-2"],
            ].map(([name, value, className]) => (
              <div key={name} className={clsx(className)}>
                <dt className="font-mono text-sm text-gray-600">{name}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-gray-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  )
}
