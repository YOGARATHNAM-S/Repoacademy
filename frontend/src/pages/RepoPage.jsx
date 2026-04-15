import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRepoById } from '../services/api';
import PowerScoreBar from '../components/PowerScoreBar';
import CommentList from '../components/CommentList';
import toast from 'react-hot-toast';

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
};

function StatBadge({ icon, label, value }) {
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-xl px-3 sm:px-4 md:px-5 py-2 sm:py-3 min-w-[80px] sm:min-w-[100px] transition-colors"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--border-primary)',
      }}
    >
      <span className="text-lg sm:text-2xl mb-0.5 sm:mb-1">{icon}</span>
      <span className="text-base sm:text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
        {typeof value === 'number' && value >= 1000
          ? (value / 1000).toFixed(1) + 'k'
          : value}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}

function DifficultyBadge({ difficulty }) {
  const styles = {
    Beginner: { cls: 'badge-premium-success', icon: '🌱' },
    Intermediate: { cls: 'badge-premium-warning', icon: '⚡' },
    Advanced: { cls: 'badge-premium-danger', icon: '🔥' },
  }[difficulty] || { cls: 'badge-premium-warning', icon: '⚡' };

  return (
    <span className={`${styles.cls} px-3.5 py-1 tracking-wide`}>
      <span className="text-[10px]">{styles.icon}</span> {difficulty}
    </span>
  );
}

export default function RepoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullReadme, setShowFullReadme] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchRepoById(id);
        setRepo(data);
      } catch {
        toast.error('Repository not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 flex justify-center">
        <div className="glass-card p-12 text-center flex flex-col items-center gap-4" style={{ color: 'var(--text-muted)' }}>
          <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid var(--border-primary)', borderTopColor: 'var(--primary-500)' }} />
          Loading repository data...
        </div>
      </div>
    );
  }

  if (!repo) return null;

  const languages = repo.languages ? Object.entries(repo.languages) : [];
  const totalBytes = languages.reduce((s, [, v]) => s + v, 0);

  const tabs = [
    { key: 'overview', label: '📋 Overview' },
    { key: 'readme', label: '📖 README' },
    { key: 'discussion', label: '💬 Discussion' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 pt-8 sm:pt-10 pb-20 sm:pb-24"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-xs sm:text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
        <Link to="/" className="transition-colors" style={{ color: 'var(--primary-400)' }}>Explore</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-secondary)' }}>{repo.fullName}</span>
      </div>

      {/* Repo header */}
      <div className="glass-card p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" style={{ background: 'var(--primary-glow)', opacity: 0.3 }} />
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">📦</span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {repo.fullName}
              </h1>
            </div>
            {repo.description && (
              <p className="text-base max-w-2xl leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
                {repo.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2.5">
              <DifficultyBadge difficulty={repo.difficulty} />
              {repo.license && (
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1.5"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--border-primary)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span>📜</span> {repo.license}
                </span>
              )}
              {repo.topics?.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    background: 'var(--primary-900)',
                    border: '1px solid var(--border-active)',
                    color: 'var(--primary-300)',
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex shrink-0">
            <a
              href={repo.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-premium"
            >
              <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              View on GitHub
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 mt-8 relative z-10">
          <StatBadge icon="⭐" label="Stars" value={repo.stars} />
          <StatBadge icon="🍴" label="Forks" value={repo.forks} />
          <StatBadge icon="👥" label="Contributors" value={repo.contributors} />
          <StatBadge icon="🐛" label="Issues" value={repo.openIssues} />
          {repo.pushedAt && (
            <StatBadge
              icon="🕐"
              label="Last Push"
              value={new Date(repo.pushedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            />
          )}
        </div>
      </div>

      {/* Power Score */}
      <div className="mb-8">
        <PowerScoreBar score={repo.powerScore} />
      </div>

      {/* Language bar */}
      {languages.length > 0 && (
        <div className="glass-card p-6 mb-8">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            <span className="text-lg">🔧</span> Language Breakdown
          </h3>
          <div className="flex h-2.5 rounded-full overflow-hidden mb-4 shadow-inner" style={{ background: 'var(--surface-900)' }}>
            {languages.map(([lang, bytes]) => (
              <div
                key={lang}
                style={{
                  width: `${(bytes / totalBytes) * 100}%`,
                  background: LANG_COLORS[lang] || '#94a3b8',
                }}
                className="transition-all duration-1000 ease-out"
                title={`${lang}: ${((bytes / totalBytes) * 100).toFixed(1)}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {languages.map(([lang, bytes]) => (
              <div key={lang} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                <span
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ background: LANG_COLORS[lang] || '#94a3b8' }}
                />
                {lang}
                <span style={{ color: 'var(--text-muted)' }}>
                  {((bytes / totalBytes) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 pb-px overflow-x-auto scrollbar-hide" style={{ borderBottom: '1px solid var(--border-primary)' }}>
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="relative whitespace-nowrap px-6 py-3 text-sm font-semibold transition-colors duration-300"
            style={{
              color: activeTab === key ? 'var(--primary-400)' : 'var(--text-muted)',
            }}
          >
            {label}
            {activeTab === key && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  background: 'var(--primary-500)',
                  boxShadow: '0 0 10px var(--primary-glow)',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-8"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>📋</span> Repository Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Owner', value: repo.owner },
                { label: 'Repository', value: repo.name },
                { label: 'Default Branch', value: repo.defaultBranch },
                { label: 'License', value: repo.license || 'None' },
                { label: 'Difficulty', value: repo.difficulty },
                { label: 'Power Score', value: `${repo.powerScore}/100` },
                {
                  label: 'Last Updated',
                  value: repo.pushedAt
                    ? new Date(repo.pushedAt).toLocaleDateString()
                    : 'Unknown',
                },
                {
                  label: 'Added to Repolearn',
                  value: new Date(repo.createdAt).toLocaleDateString(),
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-4 transition-colors"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--border-primary)',
                  }}
                >
                  <div className="text-xs mb-1.5 font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</div>
                  <div className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</div>
                </div>
              ))}
            </div>

            {repo.homepage && (
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border-primary)' }}>
                <a 
                  href={repo.homepage} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 font-medium transition-colors"
                  style={{ color: 'var(--primary-400)' }}
                >
                  <span className="text-xl">🌐</span> {repo.homepage} <span className="opacity-50">↗</span>
                </a>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'readme' && (
          <motion.div 
            key="readme"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-6 md:p-10"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <span>📖</span> README
            </h3>
            {repo.readme ? (
              <>
                <div className={`markdown-body relative ${!showFullReadme ? 'max-h-[600px] overflow-hidden' : ''}`}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{repo.readme}</ReactMarkdown>
                  {!showFullReadme && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                      style={{
                        background: `linear-gradient(to top, var(--bg-primary), transparent)`,
                      }}
                    />
                  )}
                </div>
                <button
                  onClick={() => setShowFullReadme(!showFullReadme)}
                  className="mt-6 w-full py-3 px-4 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  style={{
                    border: '1px solid var(--border-active)',
                    color: 'var(--primary-400)',
                    background: 'transparent',
                  }}
                >
                  {showFullReadme ? (
                    <><span>▲</span> Show Less</>
                  ) : (
                    <><span>▼</span> Show Full README</>
                  )}
                </button>
              </>
            ) : (
              <div
                className="text-center py-12 rounded-xl"
                style={{
                  color: 'var(--text-muted)',
                  background: 'var(--glass-bg)',
                  border: '1px dashed var(--border-primary)',
                }}
              >
                <span className="text-4xl block mb-4 opacity-50">📄</span>
                No README found for this repository.
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'discussion' && (
          <motion.div 
            key="discussion"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CommentList repoId={repo.id} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
