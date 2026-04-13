import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

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
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden relative">
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
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

      {/* Background blur circles */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-300/15 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-200/15 rounded-full blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl w-full text-center space-y-8 sm:space-y-12"
        >
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-wide">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                BuriKaigi
              </span>
            </h1>
            <div className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-white/90">
              2027
            </div>
          </motion.div>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-baseline justify-center gap-3 sm:gap-4 text-white/80 font-light"
          >
            <span className="text-lg sm:text-2xl lg:text-3xl opacity-70">2027.01</span>
            <span className="text-3xl sm:text-5xl lg:text-6xl">8</span>
            <span className="text-base sm:text-xl lg:text-2xl opacity-60">Fri</span>
            <span className="text-2xl sm:text-4xl lg:text-5xl">-</span>
            <span className="text-3xl sm:text-5xl lg:text-6xl">9</span>
            <span className="text-base sm:text-xl lg:text-2xl opacity-60">Sat</span>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-1 sm:space-y-2"
          >
            <div className="text-sm sm:text-base lg:text-lg text-white/50 font-light tracking-wider">
              LOCATION
            </div>
            <div className="text-base sm:text-xl lg:text-2xl text-white/80 font-light">
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
              className="group flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              <img
                src="/images/x.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 object-contain invert opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all"
                aria-hidden
              />
              <span className="text-base sm:text-lg">Follow for updates</span>
            </a>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />

          {/* Past Events */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="space-y-4 sm:space-y-6 pt-2 sm:pt-4"
          >
            <div className="text-xs sm:text-sm text-white/40 font-light tracking-widest">
              PAST EVENTS
            </div>
            <div className="flex justify-center gap-3 sm:gap-4">
              {[2024, 2025, 2026].map((year, index) => (
                <motion.a
                  key={year}
                  href={`/${year}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="group px-5 sm:px-6 py-2 sm:py-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <span className="text-sm sm:text-base text-white/70 group-hover:text-white/90 font-light transition-colors">
                    {year}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-sm sm:text-base text-white/40 font-light"
          >
            Updates on X &amp; Website
          </motion.div>
        </motion.div>

        {/* Snow particles */}
        <SnowParticles />
      </div>
    </div>
  );
}
