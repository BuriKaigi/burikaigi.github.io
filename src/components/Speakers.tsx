'use client'

import { useEffect, useId, useState } from 'react'
import clsx from 'clsx'

import { Container } from './Container'

function ImageClipPaths({
  id,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & { id: string }) {
  return (
    <svg aria-hidden="true" width={0} height={0} {...props}>
      <defs>
        <clipPath id={`${id}-0`} clipPathUnits="objectBoundingBox">
          <path d="M0,0 h0.729 v0.129 h0.121 l-0.016,0.032 C0.815,0.198,0.843,0.243,0.885,0.243 H1 v0.757 H0.271 v-0.086 l-0.121,0.057 v-0.214 c0,-0.032,-0.026,-0.057,-0.057,-0.057 H0 V0" />
        </clipPath>
        <clipPath id={`${id}-1`} clipPathUnits="objectBoundingBox">
          <path d="M1,1 H0.271 v-0.129 H0.15 l0.016,-0.032 C0.185,0.802,0.157,0.757,0.115,0.757 H0 V0 h0.729 v0.086 l0.121,-0.057 v0.214 c0,0.032,0.026,0.057,0.057,0.057 h0.093 v0.7" />
        </clipPath>
        <clipPath id={`${id}-2`} clipPathUnits="objectBoundingBox">
          <path d="M1,0 H0.271 v0.129 H0.15 l0.016,0.032 C0.185,0.198,0.157,0.243,0.115,0.243 H0 v0.757 h0.729 v-0.086 l0.121,0.057 v-0.214 c0,-0.032,0.026,-0.057,0.057,-0.057 h0.093 V0" />
        </clipPath>
      </defs>
    </svg>
  )
}

type SpeakersProps = {
  speakers: {
    url: string;
    name: string;
    belong?: string;
    role?: string;
    image?: string;  
  }[]
}

export function Speakers({ speakers = [] }: SpeakersProps) {
  let id = useId()
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="py-20 sm:py-32"
    >
      <ImageClipPaths id={id} />
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="speakers-title"
            className="font-display text-4xl font-medium tracking-tighter text-gray-600 sm:text-5xl"
          >
            Speakers
          </h2>
        </div>
        <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24 lg:grid-cols-4">
          {speakers.map((speaker, speakerIndex) => (
            <div key={speaker.name}>
              <div className="group relative h-[17.5rem] transform overflow-hidden rounded-4xl">
                <div
                  className={clsx(
                    'absolute bottom-6 left-0 right-4 top-0 rounded-4xl border transition duration-300 group-hover:scale-95 xl:right-6',
                    [
                      'border-blue-300',
                      'border-indigo-300',
                      'border-sky-300',
                    ][speakerIndex % 3],
                  )}
                />
                <a
                  href={speaker.url}
                  className="absolute inset-0 bg-indigo-50"
                  style={{ clipPath: `url(#${id}-${speakerIndex % 3})` }}
                >
                  <img
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                    src={speaker.image}
                    alt=""
                  />
                </a>
              </div>
              <h3 className="mt-8 font-display text-xl font-bold tracking-tight text-slate-900">
                <a href={speaker.url}>
                  {speaker.name}
                </a>
              </h3>
              <div className="my-2 flex gap-2 items-center">
                { speaker.twitter && (
                  <a href={`https://twitter.com/${speaker.twitter}`}>
                    <figure className="w-5 h-5">
                      <img src="/images/x.svg" className="w-full h-full" />
                    </figure>
                  </a>
                )}
                { speaker.github && (
                  <a href={`https://github.com/${speaker.github}`}>
                    <figure className="w-5 h-5">
                      <img src="/images/github.svg" className="w-full h-full" />
                    </figure>
                  </a>
                )}
                { speaker.facebook && (
                  <a href={`https://facebook.com/${speaker.facebook}`}>
                    <figure className="w-5 h-5">
                      <img src="/images/facebook.svg" className="w-full h-full" />
                    </figure>
                  </a>
                )}
                { speaker.linkedIn && (
                  <a href={`https://www.linkedin.com/in/${speaker.linkedIn}`}>
                    <figure className="w-5 h-5">
                      <img src="/images/linkedIn.svg" className="w-full h-full" />
                    </figure>
                  </a>
                )}
              </div>

              <p className="mt-1 text-base tracking-tight text-slate-500">
                {speaker.belong}
              </p>
              <p className="mt-1 text-base tracking-tight text-slate-500 text-sm">
                {speaker.role}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
