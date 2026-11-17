import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        gap: '20px',
      }}
    >
      <h1 style={{ fontSize: '48px', margin: 0, color: 'var(--color-primary)' }}>404</h1>
      <h2 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>Page Not Found</h2>
      <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', maxWidth: '400px', margin: 0, lineHeight: 1.5 }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/app/home')}
        style={{
          minHeight: 'var(--btn-height)',
          padding: '0 24px',
          background: 'var(--color-primary)',
          color: '#fff',
          borderRadius: 'var(--radius)',
          fontSize: 'var(--text-body)',
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Go to Home
      </button>
    </div>
  );
}
