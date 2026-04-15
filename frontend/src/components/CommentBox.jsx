import { useState } from 'react';
import toast from 'react-hot-toast';
import { addComment } from '../services/api';

export default function CommentBox({ repoId, parentId = null, onCommentAdded, onCancel }) {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const isReply = !!parentId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return toast.error('Please enter your username');
    if (!comment.trim()) return toast.error('Please enter a comment');
    if (comment.trim().length < 3) return toast.error('Comment is too short');

    setLoading(true);
    try {
      const { data } = await addComment(repoId, {
        username: username.trim(),
        comment: comment.trim(),
        parentId,
      });
      toast.success(isReply ? '↩️ Reply posted!' : '💬 Comment posted!');
      setComment('');
      if (!isReply) setUsername('');
      if (onCommentAdded) onCommentAdded(data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-light"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: isReply ? '12px' : '16px',
      }}
    >
      {/* Username row */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            flexShrink: 0,
          }}
        >
          👤
        </div>
        <input
          type="text"
          className="input-dark"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username"
          maxLength={50}
          style={{ height: '32px', fontSize: '12px' }}
          disabled={loading}
        />
      </div>

      {/* Comment textarea */}
      <textarea
        className="input-dark"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={isReply ? 'Write a reply...' : 'Write a comment... (supports Markdown)'}
        rows={isReply ? 2 : 3}
        maxLength={2000}
        disabled={loading}
        style={{
          resize: 'vertical',
          minHeight: isReply ? '56px' : '72px',
          lineHeight: 1.6,
          fontSize: '13px',
        }}
      />

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', alignItems: 'center' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-faint)', marginRight: 'auto' }}>
          {comment.length}/2000
        </span>
        {isReply && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-muted)',
              borderRadius: '8px',
              padding: '7px 14px',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        )}
        <button type="submit" className="btn-primary" disabled={loading} style={{ fontSize: '13px' }}>
          {loading ? '⏳ Posting...' : isReply ? '↩️ Reply' : '💬 Post Comment'}
        </button>
      </div>
    </form>
  );
}
