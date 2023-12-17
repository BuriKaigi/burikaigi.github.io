
// import Image from 'next/image'
import { Container } from './Container'

const sponsors = [
  // { name: 'dummy', logo: "/images/logo.png" },
]

export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-20 sm:py-32">
      <Container>
        <h2 className="mx-auto max-w-2xl text-center font-display text-4xl font-medium tracking-tighter text-gray-900 sm:text-5xl">
          Sponsors
        </h2>
        <div className="mx-auto mt-20 grid max-w-max grid-cols-1 place-content-center gap-x-32 gap-y-12 sm:grid-cols-3 md:gap-x-16 lg:gap-x-32">
          {sponsors.length == 0 && (
            <div className="text-center col-span-3">調整中</div>
          )}
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center"
            >
              <img src={sponsor.logo} alt={sponsor.name} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
