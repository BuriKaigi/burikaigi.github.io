'use client'

import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { BackgroundImage } from './BackgroundImage'
import { Container } from './Container'

interface Day {
  about: React.ReactNode
  dateTime: string
  location: string
  timeSlots: Array<{
    name: string
    description: string | null
    size?: number
    start: string
    end: string
  }>
}

const scheduleTop: Day = {
  about: '共通',
  dateTime: '2022-04-04',
  location:
    'DXセンター1F',
  timeSlots: [
    {
      name: '受付開始',
      description: '',
      start: '11:00',
      end: '',
    },
    {
      name: 'オープニング',
      description: '',
      start: '11:50',
      end: '12:00',
    },
    {
      name: '岩本健嗣',
      description: '富山県立大学の情報工学部・DX教育研究センターのご紹介',
      start: '12:00',
      end: '12:15',
    },
  ]
}

const scheduleBottom: Day = {
  about: 'スペシャルイベント',
  dateTime: '2022-04-04',
  location: 'DXセンター1F',
  timeSlots: [
    {
      name: 'クロージング',
      description: '',
      start: '16:20',
      end: '16:30',
    },
    {
      name: '小島 富治雄・石野 光仁・鈴木 孝明',
      description: 'BuriKaigi 名物！C# ドキドキ Live Coding 対決!!',
      start: '16:30',
      end: '17:30',
    },
    {
      name: 'ライトニングトーク',
      description: '',
      start: '17:30',
      end: '18:30',
    },
  ]
}

const schedule: Array<Day> = [
  {
    about: 'Room-Buri',
    dateTime: '2022-04-04',
    location:
      'DXセンター1F',
    timeSlots: [
      {
        name: '調整中',
        description: '',
        size: 2,
        start: '12:30',
        end: '13:40',
      },
      {
        name: '調整中',
        description: '',
        size: 2,
        start: '13:50',
        end: '15:00',
      },
      {
        name: '調整中',
        description: '',
        size: 2,
        start: '15:10',
        end: '16:20',
      },
    ],
  },
  {
    about: 'Room-Hotaruika',
    dateTime: '2022-04-04',
    location:
      '中央棟2F 教室',
    timeSlots: [
      {
        name: '調整中',
        description: 'A-01.セッションタイトル',
        start: '12:30',
        end: '13:00',
      },
      {
        name: '調整中',
        description: 'A-02. セッションタイトル',
        start: '13:10',
        end: '13:40',
      },
      {
        name: '調整中',
        description: 'A-03. セッションタイトル',
        start: '13:50',
        end: '14:20',
      },
      {
        name: '調整中',
        description: 'A-04. セッションタイトル',
        start: '14:30',
        end: '15:00',
      },
      {
        name: '調整中',
        description: 'A-05. セッションタイトル',
        start: '15:10',
        end: '15:40',
      },
      {
        name: '調整中',
        description: 'A-06. セッションタイトル',
        start: '15:50',
        end: '16:20',
      },
    ],
  },
  {
    about: 'Room-Shiroebi',
    dateTime: '2022-04-04',
    location:
      '中央棟2F 教室',
    timeSlots: [
      {
        name: '調整中',
        description: 'A-01.セッションタイトル',
        start: '12:30',
        end: '13:00',
      },
      {
        name: '調整中',
        description: 'A-02. セッションタイトル',
        start: '13:10',
        end: '13:40',
      },
      {
        name: '調整中',
        description: 'A-03. セッションタイトル',
        start: '13:50',
        end: '14:20',
      },
      {
        name: '調整中',
        description: 'A-04. セッションタイトル',
        start: '14:30',
        end: '15:00',
      },
      {
        name: '調整中',
        description: 'A-05. セッションタイトル',
        start: '15:10',
        end: '15:40',
      },
      {
        name: '調整中',
        description: 'A-06. セッションタイトル',
        start: '15:50',
        end: '16:20',
      },
    ],
  },
  {
    about: 'Room-Tara',
    dateTime: '2022-04-04',
    location:
      '中央棟2F 教室',
    timeSlots: [
      {
        name: '調整中',
        description: 'A-01.セッションタイトル',
        start: '12:30',
        end: '13:00',
      },
      {
        name: '調整中',
        description: 'A-02. セッションタイトル',
        start: '13:10',
        end: '13:40',
      },
      {
        name: '調整中',
        description: 'A-03. セッションタイトル',
        start: '13:50',
        end: '14:20',
      },
      {
        name: '調整中',
        description: 'A-04. セッションタイトル',
        start: '14:30',
        end: '15:00',
      },
      {
        name: '調整中',
        description: 'A-05. セッションタイトル',
        start: '15:10',
        end: '15:40',
      },
      {
        name: '調整中',
        description: 'A-06. セッションタイトル',
        start: '15:50',
        end: '16:20',
      },
    ],
  },
  {
    about: 'Room-Masu',
    dateTime: '2022-04-04',
    location:
      '中央棟2F 教室',
    timeSlots: [
      {
        name: '調整中',
        description: 'A-01.セッションタイトル',
        start: '12:30',
        end: '13:00',
      },
      {
        name: '調整中',
        description: 'A-02. セッションタイトル',
        start: '13:10',
        end: '13:40',
      },
      {
        name: '調整中',
        description: 'A-03. セッションタイトル',
        start: '13:50',
        end: '14:20',
      },
      {
        name: '調整中',
        description: 'A-04. セッションタイトル',
        start: '14:30',
        end: '15:00',
      },
      {
        name: '調整中',
        description: 'A-05. セッションタイトル',
        start: '15:10',
        end: '15:40',
      },
      {
        name: '調整中',
        description: 'A-06. セッションタイトル',
        start: '15:50',
        end: '16:20',
      },
    ],
  },
  {
    about: 'Room-Gennge',
    dateTime: '2022-04-04',
    location:
      '中央棟2F 教室',
    timeSlots: [
      {
        name: '調整中',
        description: 'A-01.セッションタイトル',
        start: '12:30',
        end: '13:00',
      },
      {
        name: '調整中',
        description: 'A-02. セッションタイトル',
        start: '13:10',
        end: '13:40',
      },
      {
        name: '調整中',
        description: 'A-03. セッションタイトル',
        start: '13:50',
        end: '14:20',
      },
      {
        name: '調整中',
        description: 'A-04. セッションタイトル',
        start: '14:30',
        end: '15:00',
      },
      {
        name: '調整中',
        description: 'A-05. セッションタイトル',
        start: '15:10',
        end: '15:40',
      },
      {
        name: '調整中',
        description: 'A-06. セッションタイトル',
        start: '15:50',
        end: '16:20',
      },
    ],
  },
]

function ScheduleTabbed() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let smMediaQuery = window.matchMedia('(min-width: 640px)')

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(smMediaQuery)
    smMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      smMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <Tab.Group
      as="div"
      className="mx-auto grid max-w-2xl grid-cols-1 gap-y-6 sm:grid-cols-2 lg:hidden"
      vertical={tabOrientation === 'vertical'}
    >
      <Tab.List className="-mx-4 flex gap-x-4 gap-y-10 overflow-x-auto pb-4 pl-4 sm:mx-0 sm:flex-col sm:pb-0 sm:pl-0 sm:pr-8">
        {({ selectedIndex }) => (
          <>
            {schedule.map((day, dayIndex) => (
              <div
                key={day.dateTime}
                className={clsx(
                  'relative w-3/4 flex-none pr-4 sm:w-auto sm:pr-0',
                  dayIndex !== selectedIndex && 'opacity-70',
                )}
              >
                <DaySummary
                  day={{
                    ...day,
                    about: (
                      <Tab className="ui-not-focus-visible:outline-none">
                        <span className="absolute inset-0" />
                        {day.about}
                      </Tab>
                    ),
                  }}
                />
              </div>
            ))}
          </>
        )}
      </Tab.List>
      <Tab.Panels>
        {schedule.map((day) => (
          <Tab.Panel
            key={day.dateTime}
            className="ui-not-focus-visible:outline-none"
          >
            <TimeSlots day={day} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

function DaySummary({ day, className }: { day: Day; className?: string }) {
  return (
    <div className={className}>
      <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
        <time dateTime={day.dateTime}>{day.about}</time>
      </h3>
      <p className="mt-1.5 text-base tracking-tight text-gray-900">
        {day.location}
      </p>
    </div>
  )
}

function TimeSlots({ day, className }: { day: Day; className?: string }) {
  return (
    <ol
      role="list"
      className={clsx(
        className,
        'space-y-4 bg-white/60 px-10 py-14 text-center shadow-xl shadow-gray-900/5 backdrop-blur',
      )}
    >
      {day.timeSlots.map((timeSlot, timeSlotIndex) => (
        <li
          key={timeSlot.start}
          aria-label={`${timeSlot.name} talking about ${timeSlot.description} at ${timeSlot.start} - ${timeSlot.end}`}
        >
          {timeSlotIndex > 0 && (
            <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10" />
          )}
          <h4 className="text-lg font-semibold tracking-tight text-gray-900">
            {timeSlot.name}
          </h4>
          {timeSlot.description && (
            <p className="mt-1 tracking-tight text-gray-900">
              {timeSlot.description}
            </p>
          )}
          <p className="mt-1 font-mono text-sm text-slate-500">
            <time dateTime={`${day.dateTime}T${timeSlot.start}-08:00`}>
              {timeSlot.start}
            </time>{' '}
            -{' '}
            <time dateTime={`${day.dateTime}T${timeSlot.end}-08:00`}>
              {timeSlot.end}
            </time>{' '}
          </p>
        </li>
      ))}
    </ol>
  )
}

function ScheduleStatic() {
  return (
    <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 mt-10 grid-cols-3">
      {schedule.map((day) => (
        <section key={day.dateTime} className="mt-10">
          <DaySummary day={day} />
          <TimeSlots day={day} className="mt-10" />
        </section>
      ))}
    </div>
  )
}

export function Schedule() {
  return (
    <section id="schedule" aria-label="Schedule" className="py-20 sm:py-32">
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-4xl lg:pr-24">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-gray-600 sm:text-5xl">
            Sessions
          </h2>
        </div>
      </Container>
      <div className="relative mt-14 sm:mt-24">
        <BackgroundImage position="hidden" className="-bottom-32 -top-40" />
        <Container className="relative">
          <DaySummary day={scheduleTop} />
          <TimeSlots day={scheduleTop} className="mt-10" />

          {/* <ScheduleStatic /> */}
          <div className="text-center my-32">
            メインセッションのスケジュールは調整中です<br />
            4トラックになります。
          </div>

          <DaySummary day={scheduleBottom} className="mt-10" />
          <TimeSlots day={scheduleBottom} className="mt-10" />
        </Container>
      </div>
    </section>
  )
}
