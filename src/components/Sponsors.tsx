
// import Image from 'next/image'
import clsx from "clsx";
import { Container } from './Container'

export function Sponsors({ titleClassName, title, className, sponsors }: { titleClassName: string, title: string, className: string, sponsors: any[] }) {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-20 sm:py-32">
      <Container>
        <h2 className={titleClassName}>
          {title}
        </h2>
        <div className={className}>
          {sponsors.length == 0 && (
            <div className="text-center col-span-3">調整中</div>
          )}
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              className={clsx("flex items-center justify-center p-8 md:p-4", sponsor.className)}
              href={sponsor.url}
            >
              <img src={sponsor.image} alt={sponsor.name} />
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}
