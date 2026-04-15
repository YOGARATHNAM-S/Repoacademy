import { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

function getScoreColor(score) {
  if (score >= 70) return { bar: 'score-high', text: '#4ade80', shadow: 'rgba(74,222,128,0.4)', textClass: 'text-emerald-400' };
  if (score >= 40) return { bar: 'score-mid', text: '#facc15', shadow: 'rgba(250,204,21,0.4)', textClass: 'text-amber-400' };
  return { bar: 'score-low', text: '#f87171', shadow: 'rgba(248,113,113,0.4)', textClass: 'text-rose-400' };
}

function getScoreLabel(score) {
  if (score >= 85) return 'Exceptional';
  if (score >= 70) return 'Strong';
  if (score >= 55) return 'Good';
  if (score >= 40) return 'Moderate';
  if (score >= 25) return 'Basic';
  return 'Minimal';
}

export default function PowerScoreBar({ score = 0, compact = false }) {
  const barRef = useRef(null);
  const { bar, shadow, textClass } = getScoreColor(score);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.width = `${score}%`;
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  if (compact) {
    return (
      <div className="w-full">
        <div className="flex justify-between mb-1.5 text-xs">
          <span className="font-semibold tracking-wide uppercase text-[10px]" style={{ color: 'var(--text-muted)' }}>Power Score</span>
          <span className={`${textClass} font-bold`}>{score}/100</span>
        </div>
        <div className="h-1.5 rounded-full shadow-inner overflow-hidden" style={{ background: 'var(--surface-950)' }}>
          <div
            ref={barRef}
            className={`${bar} h-full w-0 rounded-full transition-all duration-1000 ease-out`}
            style={{ boxShadow: `0 0 10px ${shadow}` }}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 md:p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 -z-10 translate-x-1/2 -translate-y-1/2" style={{ background: shadow }} />
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-xs mb-1 font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
            ⚡ Power Score
          </div>
          <div className={`text-4xl md:text-5xl font-black ${textClass} leading-none tracking-tighter drop-shadow-lg`}>
            {score}
            <span className="text-xl font-normal tracking-normal" style={{ color: 'var(--text-faint)' }}>/100</span>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-xl md:text-2xl font-bold ${textClass} mb-1 drop-shadow-md`}>
            {getScoreLabel(score)}
          </div>
          <div className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Repository Quality</div>
        </div>
      </div>

      {/* Main bar */}
      <div className="h-3 rounded-full shadow-inner overflow-hidden mb-6 relative" style={{ background: 'var(--surface-950)', border: '1px solid var(--border-primary)' }}>
        <div
          ref={barRef}
          className={`${bar} h-full w-0 rounded-full transition-all duration-1000 ease-out relative`}
        >
          <div className="absolute inset-0 bg-white/20 w-full h-full mix-blend-overlay" />
        </div>
      </div>

      {/* Score breakdown segments */}
      <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide text-[10px] md:text-xs text-center pt-4 mt-2" style={{ borderTop: '1px solid var(--border-primary)' }}>
        {[
          { label: 'Stars', weight: '40%' },
          { label: 'Forks', weight: '20%' },
          { label: 'Contribs', weight: '15%' },
          { label: 'Activity', weight: '10%' },
          { label: 'README', weight: '10%' },
          { label: 'Beginner', weight: '5%' },
        ].map(({ label, weight }) => (
          <div key={label} className="flex-1 min-w-[50px]">
            <div className="mb-0.5 uppercase tracking-wide font-medium" style={{ color: 'var(--text-muted)' }}>{label}</div>
            <div className="font-bold" style={{ color: 'var(--text-secondary)' }}>{weight}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
