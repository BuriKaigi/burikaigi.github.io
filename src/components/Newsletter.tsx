import { Button } from '../components/Button'
import { Container } from '../components/Container'

function ArrowRightIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path
        d="m14 7 5 5-5 5M19 12H5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Newsletter() {
  return (
    <section id="newsletter" aria-label="Newsletter">
      <Container>
        <div className="relative -mx-4 overflow-hidden bg-gray-200 px-4 py-20 sm:-mx-6 sm:px-6 md:mx-0 md:rounded-5xl md:px-16 xl:px-24 xl:py-36">
          <div className="relative mx-auto grid max-w-2xl grid-cols-1 gap-x-32 gap-y-14 xl:max-w-none xl:grid-cols-2">
            <div>
              <p className="font-display text-4xl font-medium tracking-tighter text-gray-900 sm:text-5xl">
                Supports
              </p>
              <p className="mt-4 text-lg tracking-tight text-gray-900">
                スポンサーでご協力いただける方、スピーカー希望の方はこちらかごらご応募ください。
              </p>
            </div>
            <div>
              <div className='flex gap-5'>
                <Button href="/sponsor">
                  <span>スポンサーのご協力</span>
                </Button>
                <Button href="https://docs.google.com/forms/d/e/1FAIpQLSfbJS_gWQ5pHAnEKs6WLUs2dweYpD6vOVzgfYntg6mouCmJrw/viewform" target="_blank" rel="noopener noreferrer">
                  <span>スピーカーの応募</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
