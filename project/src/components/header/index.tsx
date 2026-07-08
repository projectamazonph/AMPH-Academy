'use client';

import Link from 'next/link';
import Image from 'next/image';

export function PapHeader() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 24px',
      borderBottom: '1px solid rgba(255,107,53,0.2)',
      background: 'rgba(10,10,15,0.98)',
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
          <Image
            src="/project-amazon-ph-logo.svg"
            alt="ProjectAmazonPH logo"
            fill
            style={{ objectFit: 'contain' }}
            sizes="32px"
          />
        </div>
        <span style={{
          color: '#FF6B35',
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: '-0.3px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          ProjectAmazonPH
        </span>
      </Link>
      <nav style={{ display: 'flex', gap: 4 }}>
        <Link href="/"
          style={{ color: '#aaa', textDecoration: 'none', fontSize: 14, padding: '4px 12px', borderRadius: 6, fontFamily: 'Inter, system-ui, sans-serif' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
        >Home</Link>
        <Link href="/dashboard"
          style={{ color: '#aaa', textDecoration: 'none', fontSize: 14, padding: '4px 12px', borderRadius: 6, fontFamily: 'Inter, system-ui, sans-serif' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
        >Dashboard</Link>
        <Link href="/courses"
          style={{ color: '#aaa', textDecoration: 'none', fontSize: 14, padding: '4px 12px', borderRadius: 6, fontFamily: 'Inter, system-ui, sans-serif' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#aaa')}
        >Courses</Link>
      </nav>
    </header>
  );
}
