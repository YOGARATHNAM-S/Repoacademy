import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import toast from 'react-hot-toast';
import { fetchComments, likeComment, deleteComment } from '../services/api';
import CommentBox from './CommentBox';

function CommentItem({ comment, repoId, depth = 0, onRefresh }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 0);
  const [replying, setReplying] = useState(false);

  const handleLike = async () => {
    if (liked) return;
    try {
      const { data } = await likeComment(comment.id);
      setLikes(data.likes);
      setLiked(true);
    } catch {
      toast.error('Failed to like comment');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await deleteComment(comment.id);
      toast.success('Comment deleted');
      onRefresh();
    } catch {
      toast.error('Failed to delete comment');
    }
  };

  const avatarLetter = comment.username?.[0]?.toUpperCase() || '?';
  const avatarColor = stringToColor(comment.username || 'user');

  return (
    <div
      style={{
        marginLeft: depth > 0 ? '12px' : '0',
        borderLeft: depth > 0 ? '2px solid var(--border-active)' : 'none',
        paddingLeft: depth > 0 ? '12px' : '0',
      }}
    >
      <div
        className="glass-light animate-fade-in"
        style={{ padding: '12px', marginBottom: '8px' }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
            }}
          >
            {avatarLetter}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {comment.username}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-faint)' }}>
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </div>
          </div>
        </div>

        {/* Comment body — markdown rendered */}
        <div className="markdown-body" style={{ fontSize: '13px', marginBottom: '8px' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{comment.comment}</ReactMarkdown>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={handleLike}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: liked ? 'var(--primary-900)' : 'transparent',
              border: `1px solid ${liked ? 'var(--border-active)' : 'var(--border-primary)'}`,
              borderRadius: '6px',
              padding: '4px 10px',
              cursor: liked ? 'default' : 'pointer',
              color: liked ? 'var(--primary-300)' : 'var(--text-muted)',
              fontSize: '12px',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            👍 {likes}
          </button>

          {depth === 0 && (
            <button
              onClick={() => setReplying(!replying)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-primary)',
                borderRadius: '6px',
                padding: '4px 10px',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                fontSize: '12px',
                transition: 'all 0.2s',
              }}
            >
              ↩️ Reply
            </button>
          )}

          <button
            onClick={handleDelete}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-faint)',
              fontSize: '12px',
              marginLeft: 'auto',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#f87171')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-faint)')}
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Reply box */}
      {replying && (
        <div style={{ marginBottom: '10px', marginLeft: '24px' }}>
          <CommentBox
            repoId={repoId}
            parentId={comment.id}
            onCommentAdded={() => { setReplying(false); onRefresh(); }}
            onCancel={() => setReplying(false)}
          />
        </div>
      )}

      {/* Nested replies */}
      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          repoId={repoId}
          depth={depth + 1}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}

// Generate avatar color from username string
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 55%, 40%)`;
}

export default function CommentList({ repoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('newest');
  const [count, setCount] = useState(0);

  const loadComments = async () => {
    setLoading(true);
    try {
      const { data } = await fetchComments(repoId, sort);
      setComments(data.comments);
      setCount(data.count);
    } catch {
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadComments(); }, [repoId, sort]);

  return (
    <div style={{ marginTop: '32px' }}>
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          💬 Discussion
          <span
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-muted)',
              background: 'var(--glass-bg)',
              borderRadius: '20px',
              padding: '2px 10px',
            }}
          >
            {count}
          </span>
        </h2>

        {/* Sort selector */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input-dark"
          style={{
            width: 'auto',
            padding: '6px 12px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          <option value="newest">🕐 Newest First</option>
          <option value="liked">❤️ Most Liked</option>
        </select>
      </div>

      {/* New comment box */}
      <div style={{ marginBottom: '24px' }}>
        <CommentBox repoId={repoId} onCommentAdded={loadComments} />
      </div>

      {/* Comment list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-faint)', fontSize: '14px' }}>
          ⏳ Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <div
          className="glass-light"
          style={{ padding: '40px', textAlign: 'center' }}
        >
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            No comments yet. Be the first to start the discussion!
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              repoId={repoId}
              depth={0}
              onRefresh={loadComments}
            />
          ))}
        </div>
      )}
    </div>
  );
}
