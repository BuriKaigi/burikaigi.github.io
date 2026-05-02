import { motion, MotionConfig, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { NewsItem } from '~/types/news';
import { resolveLink } from '~/types/news';

type Particle = {
  id: number;
  size: number;
  startX: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
};

function SnowParticles() {
  const reduceMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (reduceMotion) return;
    setParticles(
      Array.from({ length: 80 }, (_, i) => {
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 15;
        const sway = Math.random() * 10 - 5;

        return { id: i, size, startX, duration, delay, sway, opacity: Math.random() * 0.6 + 0.3 };
      }),
    );
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white rounded-full blur-[1px]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.startX}%`,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: '100vh',
            x: [`${p.sway}vw`, `${-p.sway}vw`, `${p.sway * 0.5}vw`],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

interface ComingSoonProps {
  news?: NewsItem[];
}

export default function ComingSoon({ news = [] }: ComingSoonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <div className="font-biz-udp min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden relative">
        {/* Animated gradient overlay (静止時はベース1色) */}
        {reduceMotion ? (
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 58, 138, 0.82) 50%, rgba(71, 85, 105, 0.88) 100%)',
            }}
            aria-hidden="true"
          />
        ) : (
          <motion.div
            className="absolute inset-0"
            aria-hidden="true"
            animate={{
              background: [
                'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 58, 138, 0.82) 50%, rgba(71, 85, 105, 0.88) 100%)',
                'linear-gradient(135deg, rgba(30, 58, 138, 0.88) 0%, rgba(51, 65, 85, 0.82) 50%, rgba(100, 116, 139, 0.88) 100%)',
                'linear-gradient(135deg, rgba(51, 65, 85, 0.88) 0%, rgba(71, 85, 105, 0.82) 50%, rgba(30, 58, 138, 0.88) 100%)',
                'linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 58, 138, 0.82) 50%, rgba(71, 85, 105, 0.88) 100%)',
              ],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Background blur circles (transform は MotionConfig reducedMotion で自動停止) */}
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-300/15 rounded-full blur-3xl"
          aria-hidden="true"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-200/15 rounded-full blur-3xl"
          aria-hidden="true"
          animate={{ x: [0, -30, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-8 sm:py-12 lg:py-14 xl:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-5xl w-full text-center space-y-5 sm:space-y-7 lg:space-y-8"
          >
            {/* Logo/Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              <h1 className="text-6xl sm:text-8xl font-bold tracking-wide">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                  BuriKaigi
                </span>
              </h1>
              <div className="text-4xl sm:text-6xl font-semibold text-white/90">
                2027
              </div>
            </motion.div>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-baseline justify-center gap-3 sm:gap-4 text-white/85 font-light"
            >
              <span className="text-lg sm:text-2xl text-white/75">2027.01</span>
              <span className="text-3xl sm:text-5xl">8</span>
              <span className="text-base sm:text-xl text-white/70">Fri</span>
              <span className="text-2xl sm:text-4xl">-</span>
              <span className="text-3xl sm:text-5xl">9</span>
              <span className="text-base sm:text-xl text-white/70">Sat</span>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-1 sm:space-y-2"
            >
              <div className="text-sm sm:text-base lg:text-lg text-white/70 font-light tracking-wider">
                LOCATION
              </div>
              <div className="text-base sm:text-xl lg:text-2xl text-white/85 font-light">
                富山国際会議場
              </div>
            </motion.div>

            {/* Social link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center gap-4 sm:gap-6 pt-4 sm:pt-8"
            >
              <a
                href="https://x.com/burikaigi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X で BuriKaigi をフォロー"
                className="group flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <img
                  src="/images/x.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain invert opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all"
                  aria-hidden
                />
                <span className="text-base sm:text-lg text-white/90">Follow for updates</span>
              </a>
            </motion.div>

            {/* Latest News */}
            {news.length > 0 && (
              <motion.section
                aria-labelledby="latest-news-heading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="max-w-2xl mx-auto w-full space-y-2"
              >
                <h2 id="latest-news-heading" className="sr-only">
                  最新のお知らせ
                </h2>
                <div className="flex items-baseline justify-between px-1">
                  <p
                    aria-hidden="true"
                    className="text-[10px] sm:text-xs text-white/60 font-light tracking-widest"
                  >
                    LATEST NEWS
                  </p>
                  <a
                    href="/news/"
                    className="text-[10px] sm:text-xs text-white/60 hover:text-white/90 transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                  >
                    すべて見る →
                  </a>
                </div>
                <ul className="flex flex-col divide-y divide-white/10 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm overflow-hidden">
                  {news.map((item, index) => {
                    const { href, isExternal } = resolveLink(item);
                    return (
                      <motion.li
                        key={`${item.date}-${item.title}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.75 + index * 0.06 }}
                      >
                        <a
                          href={href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="group flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-white/5 transition-colors text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan-300"
                        >
                          <time
                            dateTime={item.date}
                            className="text-[11px] sm:text-xs text-white/70 font-light tracking-wider whitespace-nowrap"
                          >
                            {item.date}
                          </time>
                          <span className="min-w-0 flex-1 text-xs sm:text-sm text-white/85 group-hover:text-white font-light transition-colors truncate">
                            {item.title}
                            {isExternal && (
                              <>
                                <span aria-hidden="true" className="ml-1 text-white/60">↗</span>
                                <span className="sr-only">（外部リンク）</span>
                              </>
                            )}
                          </span>
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.section>
            )}

            {/* Footer text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-xs sm:text-sm text-white/60 font-light"
            >
              Updates on X &amp; Website
            </motion.div>
          </motion.div>

          {/* Snow particles */}
          <SnowParticles />
        </div>

        {/* Past Events archive nav (header, top-right) */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          aria-label="過去の開催"
          className="absolute top-0 right-0 z-20 px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-2 sm:gap-3"
        >
          <span
            aria-hidden="true"
            className="hidden sm:inline text-[10px] sm:text-xs text-white/60 font-light tracking-widest mr-1"
          >
            PAST EVENTS
          </span>
          {[2024, 2025, 2026].map((year) => (
            <a
              key={year}
              href={`/${year}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-md border border-white/10 hover:border-white/30 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <span className="text-xs sm:text-sm text-white/75 group-hover:text-white font-light transition-colors">
                {year}
              </span>
              <span className="sr-only">（新しいタブで開く）</span>
            </a>
          ))}
        </motion.nav>
      </div>
    </MotionConfig>
  );
}
