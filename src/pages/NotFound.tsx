import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', gap: '16px' }}>
      <h1 style={{ fontSize: 'var(--text-2xl)' }}>Page Not Found</h1>
      <p style={{ color: 'var(--color-text-muted)' }}>The page you are looking for does not exist.</p>
      <Link to="/" style={{ background: 'var(--color-primary)', color: '#fff', padding: '16px 32px', borderRadius: 'var(--radius)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', minHeight: 'var(--btn-height)' }}>
        Go Home
      </Link>
    </main>
  );
}
