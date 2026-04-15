import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import PowerScoreBar from './PowerScoreBar';

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Vue: '#41b883',
  default: '#94a3b8',
};

function getLangColor(lang) {
  return LANG_COLORS[lang] || LANG_COLORS.default;
}

function DifficultyBadge({ difficulty }) {
  const cls = {
    Beginner: 'badge-premium-success',
    Intermediate: 'badge-premium-warning',
    Advanced: 'badge-premium-danger',
  }[difficulty] || 'badge-premium-warning';

  const icons = { Beginner: '🌱', Intermediate: '⚡', Advanced: '🔥' };

  return (
    <span className={cls}>
      <span className="text-[10px]">{icons[difficulty]}</span> {difficulty}
    </span>
  );
}

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const CATEGORY_ICONS = {
  'DevOps': '🔧',
  'AIML': '🤖',
  'GenAI': '✨',
  'Software Development': '💻',
  'Cloud': '☁️',
  'Data Science': '📊',
  'Cyber Security': '🔒',
  'Other': '📁',
};

export default function RepoCard({ repo }) {
  const langs = repo.languages ? Object.entries(repo.languages).slice(0, 3) : [];

  return (
    <motion.div variants={itemVariants}>
      <Link to={`/repo/${repo.id}`} className="block h-full outline-none">
        <div className="glass-card h-full p-6 flex flex-col gap-5 group relative overflow-hidden">
          
          {/* Subtle gradient background effect on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(var(--primary-500),0.05), rgba(var(--accent-500),0.05))',
            }}
          />
          
          {/* Header */}
          <div className="flex justify-between items-start gap-2 sm:gap-4 z-10">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-2.5 mb-1 sm:mb-1.5">
                <div
                  className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300 flex-shrink-0"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--border-primary)',
                  }}
                >
                  <span className="text-base sm:text-lg leading-none">📦</span>
                </div>
                <h3
                  className="text-sm sm:text-base font-bold truncate transition-colors duration-300"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>{repo.owner}/</span>
                  {repo.name}
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed line-clamp-2 pr-2" style={{ color: 'var(--text-muted)' }}>
                {repo.description || 'No description provided.'}
              </p>
            </div>
            <div className="pt-0.5 sm:pt-1 flex-shrink-0">
              <DifficultyBadge difficulty={repo.difficulty} />
            </div>
          </div>

          {/* Power Score */}
          <div
            className="z-10 p-3 rounded-xl"
            style={{
              background: 'var(--surface-950)',
              border: '1px solid var(--border-primary)',
              opacity: 0.9,
            }}
          >
            <PowerScoreBar score={repo.powerScore} compact />
          </div>

          {/* Stats Bar */}
          <div className="flex gap-2 sm:gap-4 z-10 pt-3 sm:pt-4 mt-auto flex-wrap" style={{ borderTop: '1px solid var(--border-primary)' }}>
            {[
              { icon: '⭐', label: formatCount(repo.stars) },
              { icon: '🍴', label: formatCount(repo.forks) },
              { icon: '👥', label: formatCount(repo.contributors || 0) },
              { icon: '🐛', label: formatCount(repo.openIssues || 0) },
            ].map(({ icon, label }, i) => (
              <div key={i} className="flex items-center gap-1 sm:gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-xs sm:text-sm opacity-90">{icon}</span>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex justify-between items-end gap-2 z-10 flex-wrap">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {langs.length > 0 ? (
                langs.map(([lang]) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1"
                    style={{
                      color: 'var(--text-secondary)',
                      background: 'var(--surface-800)',
                      border: '1px solid var(--border-primary)',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: getLangColor(lang), boxShadow: `0 0 8px ${getLangColor(lang)}` }}
                    />
                    {lang}
                  </span>
                ))
              ) : repo.topics?.length > 0 && (
                repo.topics.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium rounded-full px-2.5 py-1"
                    style={{
                      color: 'var(--primary-300)',
                      background: 'var(--primary-900)',
                      border: '1px solid var(--border-active)',
                    }}
                  >
                    #{t}
                  </span>
                ))
              )}
            </div>
            
            {repo.category && (
              <span
                className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md"
                style={{
                  color: 'var(--accent-300)',
                  background: 'var(--primary-900)',
                  border: '1px solid var(--border-active)',
                }}
                title={repo.subcategory}
              >
                {CATEGORY_ICONS[repo.category] || '📁'} {repo.category}
              </span>
            )}
          </div>
          
        </div>
      </Link>
    </motion.div>
  );
}
