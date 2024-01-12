'use client'

import { useEffect, useMemo, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { BackgroundImage } from './BackgroundImage'
import { Container } from './Container'

interface Day {
  about: React.ReactNode
  prefix: string
  dateTime: string
  location: string
  timeSlots: Array<{
    name: string
    description: string | null
    size?: number
    start: string
    end: string
    id?: number
  } | {
    speakerRef: string
    start: string
    end: string
    id?: number
  }>
}

const scheduleTop: Day = {
  about: '共通',
  prefix: "",
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
      speakerRef: "岩本健嗣",
      start: '12:00',
      end: '12:15',
    },
  ]
}

const scheduleBottom: Day = {
  about: 'スペシャルイベント',
  prefix: "",
  dateTime: '2022-04-04',
  location: 'DXセンター1F',
  timeSlots: [
    {
      name: 'クロージング',
      description: '',
      start: '16:40',
      end: '16:50',
    },
    {
      name: '小島 富治雄・石野 光仁・鈴木 孝明',
      description: 'BuriKaigi 名物！C# ドキドキ Live Coding 対決!!',
      start: '16:50',
      end: '17:40',
    },
    {
      speakerRef: "関根 優作",
      description: '株式会社Relic',
      start: '17:40',
      end: '17:55',
    },
    {
      speakerRef: "水上 達也",
      description: '北日本新聞社',
      start: '17:55',
      end: '18:10',
    },
    {
      name: 'クラスメソッド株式会社',
      description: 'スポンサーセッション',
      start: '18:10',
      end: '18:20',
    },
    {
      name: 'サイボウズ株式会社',
      description: 'スポンサーセッション',
      start: '18:20',
      end: '18:30',
    },
    {
      name: '撤収',
      description: '',
      start: '18:30',
      end: '18:45',
    },
  ]
}

const schedule: Array<Day> = [
  {
    about: 'Room-Buri',
    prefix: "A",
    dateTime: '2024-01-20',
    location:
      'DXセンター1F',
    timeSlots: [
      {
        speakerRef: '井上 章',
        size: 3,
        start: '12:30',
        end: '13:30',
        id: 1,
      },
      {
        name: '休憩',
        description: "",
        start: '13:30',
        end: '13:40',
      },
      {
        speakerRef: "櫻庭 祐一",
        size: 3,
        start: '13:40',
        end: '14:40',
        id: 2,
      },
      {
        name: '休憩',
        description: "",
        start: '14:40',
        end: '14:50',
      },
      {
        speakerRef: 'Cloudflare 亀田',
        size: 3,
        start: '14:50',
        end: '15:50',
        id: 3,
      },
    ],
  },
  {
    about: 'Room-Shiroebi',
    prefix: "B",
    dateTime: '2024-01-20',
    location:
      '中央棟2F 教室',
    timeSlots: [
      {
        name: '調整枠',
        description: "",
        start: '12:30',
        end: '12:50',
        id: 1,
      },
      {
        speakerRef: '北原　憲',
        start: '12:50',
        end: '13:10',
        id: 2,
      },
      {
        speakerRef: '澤田　賢也',
        description: '',
        start: '13:10',
        end: '13:30',
        id: 3,
      },
      {
        name: '休憩',
        description: "",
        start: '13:30',
        end: '13:40',
      },
      {
        speakerRef: "りなたむ (中村 亮太)",
        start: '13:40',
        end: '14:00',
        id: 4,
      },
      {
        speakerRef: "室長",
        start: '14:00',
        end: '14:20',
        id: 5,
      },
      {
        speakerRef: "坂本 純一",
        start: '14:20',
        end: '14:40',
        id: 6,
      },
      {
        name: '休憩',
        description: "",
        start: '14:40',
        end: '14:50',
      },
      {
        speakerRef: '石川達也',
        description: "",
        start: '14:50',
        end: '15:10',
        id: 7,
      },
      {
        speakerRef: 'ariaki',
        description: "",
        start: '15:10',
        end: '15:30',
        id: 8,
      },
      {
        speakerRef: 'おやかた@oyakata2438',
        description: "",
        start: '15:30',
        end: '15:50',
        id: 9,
      },
      {
        name: '休憩',
        description: "",
        start: '15:50',
        end: '16:00',
      },
      {
        speakerRef: "オーニシ",
        description: "",
        start: '16:00',
        end: '16:15',
        id: 10,
      },
      {
        speakerRef: 'うーたん',
        description: "",
        start: '16:15',
        end: '16:30',
        id: 11,
      },
    ],
  },
  {
    about: 'Room-Hotaruika',
    prefix: "C",
    dateTime: '2024-01-20',
    location:
      '中央棟2F 教室',
    timeSlots: [
      {
        speakerRef: '相生ゆら',
        start: '12:30',
        end: '12:50',
        id: 1,
      },
      {
        speakerRef: '大倉雅史',
        start: '12:50',
        end: '13:10',
        id: 2,
      },
      {
        speakerRef: "井上周/INOUE Amane",
        description: '',
        start: '13:10',
        end: '13:30',
        id: 3,
      },
      {
        name: '休憩',
        description: "",
        start: '13:30',
        end: '13:40',
      },
      {
        speakerRef: "金子 雄一郎",
        start: '13:40',
        end: '14:00',
        id: 4,
      },
      {
        speakerRef: "池原大然",
        start: '14:00',
        end: '14:20',
        id: 5,
      },
      {
        speakerRef: "杉本 和也",
        description: "",
        start: '14:20',
        end: '14:40',
        id: 6,
      },
      {
        name: '休憩',
        description: "",
        start: '14:40',
        end: '14:50',
      },
      {
        speakerRef: '森　博之',
        description: "",
        start: '14:50',
        end: '15:10',
        id: 7,
      },
      {
        speakerRef: 'こえて',
        description: "",
        start: '15:10',
        end: '15:30',
        id: 8,
      },
      {
        speakerRef: 'きしだ なおき',
        description: "",
        start: '15:30',
        end: '15:50',
        id: 9,
      },
      {
        name: '休憩',
        description: "",
        start: '15:50',
        end: '16:00',
      },
      {
        speakerRef: "中西 孝之",
        description: "",
        start: '16:00',
        end: '16:15',
        id: 10,
      },
      {
        name: '調整枠',
        description: "",
        start: '16:15',
        end: '16:30',
        id: 11,
      },
    ],
  },
  {
    about: 'Room-Masu',
    prefix: "D",
    dateTime: '2024-01-20',
    location:
      '中央棟2F 教室',
    timeSlots: [
      {
        speakerRef: 'もやし丸',
        start: '12:30',
        end: '12:50',
        id: 1,
      },
      {
        speakerRef: 'もっと',
        start: '12:50',
        end: '13:10',
        id: 2,
      },
      {
        speakerRef: "sakito",
        description: '',
        start: '13:10',
        end: '13:30',
        id: 3,
      },
      {
        name: '休憩',
        description: "",
        start: '13:30',
        end: '13:40',
      },
      {
        speakerRef: "長尾准誠",
        start: '13:40',
        end: '14:00',
        id: 4,
      },
      {
        speakerRef: "おぐえもん（小倉 且也）",
        start: '14:00',
        end: '14:20',
        id: 5,
      },
      {
        speakerRef: "tasshi",
        description: "",
        start: '14:20',
        end: '14:40',
        id: 6,
      },
      {
        name: '休憩',
        description: "",
        start: '14:40',
        end: '14:50',
      },
      {
        speakerRef: 'takanorip',
        description: "",
        start: '14:50',
        end: '15:10',
        id: 7,
      },
      {
        speakerRef: 'unvalley',
        description: "",
        start: '15:10',
        end: '15:30',
        id: 8,
      },
      {
        speakerRef: 'どうけ',
        description: "",
        start: '15:30',
        end: '15:50',
        id: 9,
      },
      {
        name: '休憩',
        description: "",
        start: '15:50',
        end: '16:00',
      },
      {
        speakerRef: "青山 修平",
        description: "",
        start: '16:00',
        end: '16:15',
        id: 10,
      },
      {
        speakerRef: "nus3",
        description: "",
        start: '16:15',
        end: '16:30',
        id: 11,
      },
    ],
  },
]

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

function TimeSlots({ day, className, speakers }: { day: Day; className?: string, speakers: Map<string, Speaker> }) {

  const itemResolver = (timeSlot: any) => {
    return {
      ...timeSlot,
      ...(speakers?.get(timeSlot.speakerRef) || {})
    }
  }

  return (
    <ol
      role="list"
      className={clsx(
        className,
        'space-y-4 bg-white/60 px-10 py-14 text-center shadow-xl shadow-gray-900/5 backdrop-blur',
      )}
    >
      {day.timeSlots.map((timeSlot, timeSlotIndex) => (
        <TimeSlot key={timeSlot.start} prefix={day.prefix} item={itemResolver(timeSlot)} index={timeSlotIndex} day={day} />
      ))}
    </ol>
  )
}

function TimeSlot({ item, prefix, index, day }: any) {
  return (
    <li aria-label={`${item.name} talking about ${item.title} at ${item.start} - ${item.end}`}>
      {index > 0 && (
        <div className="mx-auto mb-8 h-px w-48 bg-indigo-500/10" />
      )}
      { prefix && item.id && (
        <div>[{prefix}-{item.id}]</div>
      )}      
      <h4 className={clsx("text-lg font-semibold tracking-tight text-gray-900", { "text-xs": item.name === "休憩" })} >
        {item.name}
      </h4>
      {item.title && (
        <a className="mt-1 tracking-tight text-gray-900 underline hover:opacity-50" href={item.url}>
          {item.title}
        </a>
      )}
      {item.description && (
        <p className="mt-1 tracking-tight text-gray-900">
          {item.description}
        </p>
      )}
      <p className={clsx("mt-1 font-mono text-sm text-slate-500", { "text-xs": item.name === "休憩" })}>
        <time dateTime={`${day.dateTime}T${item.start}-08:00`}>
          {item.start}
        </time>{' '}
        -{' '}
        <time dateTime={`${day.dateTime}T${item.end}-08:00`}>
          {item.end}
        </time>{' '}
      </p>
    </li>

  )
}

function ScheduleStatic({ speakers }: { speakers: Map<string, Speaker> }) {
  return (
    <div className="lg:grid lg:grid-cols-1 lg:gap-x-8 mt-10 grid-cols-3">
      {schedule.map((day) => (
        <section key={day.dateTime} className="mt-10">
          <DaySummary day={day} />
          <TimeSlots day={day} className="mt-10" speakers={speakers} />
        </section>
      ))}
    </div>
  )
}

type Speaker = {
  url: string;
  name: string;
  belong?: string;
  role?: string;
  image?: string;
}

type ScheduleProps = {
  speakers: Speaker[]
}

export function Schedule({ speakers = [] }: ScheduleProps) {
  const speakerMap = useMemo(() => 
    speakers.reduce<Map<string, Speaker>>((p, c) => p.set(c.name, c), new Map()),
    [speakers]
  )

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
          <TimeSlots day={scheduleTop} className="mt-10" speakers={speakerMap} />

          <ScheduleStatic speakers={speakerMap} />

          <DaySummary day={scheduleBottom} className="mt-10" />
          <TimeSlots day={scheduleBottom} className="mt-10" speakers={speakerMap} />
          <div className="text-center my-16 text-red-700">
            ※鰤しゃぶ体験はスペシャルイベントと併せて実施します
          </div>
        </Container>
      </div>
    </section>
  )
}
