import React, { useState } from 'react';
import { subjects } from './data/subjectsData';
import TerminalSimulator from './components/TerminalSimulator';
import { 
  Terminal, Globe, ShieldAlert, Code, Key, Search, Copy, Check, 
  Cloud, Bug, Cpu, FileCode, Monitor, Code2, HardDrive, Shield, Wifi, 
  Smartphone, Box, GitBranch, AlertTriangle, Crosshair, ShieldCheck, 
  Eye, UserCheck, FileCheck, Radio, Layers, Database, Scale, Award
} from 'lucide-react';

const iconMap = {
  Terminal, Globe, ShieldAlert, Code, Key, Search, Cloud, Bug, Cpu, 
  FileCode, Monitor, Code2, HardDrive, Shield, Wifi, Smartphone, Box, 
  GitBranch, AlertTriangle, Crosshair, ShieldCheck, Eye, UserCheck, 
  FileCheck, Radio, Layers, Database, Scale, Award
};

export default function App() {
  const [activeSubjectId, setActiveSubjectId] = useState('linux');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCmd, setCopiedCmd] = useState(null);

  const activeSubject = subjects.find(s => s.id === activeSubjectId) || subjects[0];
  const IconComponent = iconMap[activeSubject.icon] || Terminal;

  const copyToClipboard = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  // Filter subjects by search
  const filteredSubjects = subjects.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter commands by search
  const filteredCommands = activeSubject.commands.filter(c => 
    c.cmd.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: 'relative', minHeight: '100vh', zIndex: 1 }}>
      {/* Background Cyber Grid */}
      <div className="cyber-bg" />

      {/* Top Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(6, 8, 13, 0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
        padding: '16px 24px'
      }}>
        <div style={{
          maxWidth: '1380px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #2563eb, #00ff88)',
              padding: '10px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--glow-cyan)'
            }}>
              <ShieldAlert size={26} color="#000" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.35rem', lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: '8px' }}>
                CYBER<span style={{ color: 'var(--accent-cyan)' }}>HUB</span>
                <span style={{
                  fontSize: '0.65rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: 'rgba(0, 255, 136, 0.15)',
                  color: 'var(--accent-neon-green)',
                  border: '1px solid rgba(0, 255, 136, 0.3)'
                }}>30 SUBJECT MASTER ACADEMY</span>
              </h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Complete Cybersecurity Roadmap • 30 Professional Domains
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search all 30 subjects & commands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: '#090d16',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                color: '#fff',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1380px', margin: '32px auto', padding: '0 24px' }}>
        
        {/* Subject Grid */}
        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              CYBER SECURITY ACADEMY SUBJECTS ({filteredSubjects.length} / 30 DOMAINS):
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '14px',
            maxHeight: '380px',
            overflowY: 'auto',
            paddingRight: '6px'
          }}>
            {filteredSubjects.map(s => {
              const SIcon = iconMap[s.icon] || Terminal;
              const isSelected = s.id === activeSubjectId;
              return (
                <div
                  key={s.id}
                  onClick={() => setActiveSubjectId(s.id)}
                  className="glass-panel"
                  style={{
                    padding: '14px',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--accent-cyan)' : 'var(--border-color)',
                    background: isSelected ? 'rgba(0, 240, 255, 0.12)' : 'var(--bg-glass)',
                    boxShadow: isSelected ? 'var(--glow-cyan)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{
                      padding: '6px',
                      borderRadius: '6px',
                      background: s.badgeColor === 'green' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                      border: `1px solid ${s.badgeColor === 'green' ? 'rgba(0, 255, 136, 0.3)' : 'rgba(37, 99, 235, 0.3)'}`
                    }}>
                      <SIcon size={16} color={s.badgeColor === 'green' ? 'var(--accent-neon-green)' : 'var(--accent-cyan)'} />
                    </div>
                    <span className={s.badgeColor === 'green' ? 'bg-badge-green' : 'bg-badge-blue'} style={{
                      fontSize: '0.6rem',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {s.tag}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '0.9rem', marginBottom: '4px', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {s.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Selected Subject Detail Banner */}
        <section className="glass-panel" style={{ padding: '32px', marginBottom: '32px', borderLeft: '4px solid var(--accent-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <IconComponent size={32} color="var(--accent-cyan)" />
            <div>
              <h2 style={{ fontSize: '1.8rem', color: '#ffffff' }}>{activeSubject.title}</h2>
              <span className={activeSubject.badgeColor === 'green' ? 'bg-badge-green' : 'bg-badge-blue'} style={{
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 600
              }}>
                {activeSubject.tag}
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '20px' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <h4 style={{ color: 'var(--accent-neon-green)', marginBottom: '8px', fontSize: '0.95rem' }}>WHAT IS IT?</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>{activeSubject.overview.definition}</p>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <h4 style={{ color: '#60a5fa', marginBottom: '8px', fontSize: '0.95rem' }}>WHY IS IT IMPORTANT FOR CYBER SECURITY?</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>{activeSubject.overview.whyImportant}</p>
            </div>
          </div>
        </section>

        {/* Key Concepts Breakdown */}
        <section style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '16px', background: 'var(--accent-neon-green)', borderRadius: '2px', display: 'inline-block' }} />
            KEY TOPICS & DETAILED EXPLANATIONS
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {activeSubject.keyConcepts.map((kc, i) => (
              <div key={i} className="glass-panel" style={{ padding: '24px' }}>
                <h4 style={{ color: 'var(--accent-cyan)', fontSize: '1.1rem', marginBottom: '12px' }}>{kc.concept}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', whiteSpace: 'pre-line', marginBottom: '16px' }}>{kc.details}</p>
                {kc.example && (
                  <div className="command-box">
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>EXAMPLE / SYNTAX:</span>
                    <code>{kc.example}</code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Terminal Simulator for Linux & Networking */}
        {(activeSubject.id === 'linux' || activeSubject.id === 'networking') && (
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '16px', background: 'var(--accent-cyan)', borderRadius: '2px', display: 'inline-block' }} />
              INTERACTIVE CLI TERMINAL PRACTICE
            </h3>
            <TerminalSimulator />
          </section>
        )}

        {/* Command Reference Table */}
        <section className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>{activeSubject.title} Practical Command & Tool Directory</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click copy button to grab commands directly for your security lab environment.</p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px 16px' }}>COMMAND / SYNTAX</th>
                  <th style={{ padding: '12px 16px' }}>CATEGORY</th>
                  <th style={{ padding: '12px 16px' }}>DESCRIPTION & USAGE</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((c, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)' }}>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)' }}>
                        <span className="code-inline">{c.cmd}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--accent-cyan)' }}>
                          {c.category}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-main)' }}>{c.description}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <button
                          onClick={() => copyToClipboard(c.cmd)}
                          style={{
                            background: copiedCmd === c.cmd ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: copiedCmd === c.cmd ? 'var(--accent-neon-green)' : 'var(--text-muted)',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.75rem'
                          }}
                        >
                          {copiedCmd === c.cmd ? <Check size={14} /> : <Copy size={14} />}
                          {copiedCmd === c.cmd ? 'Copied' : 'Copy'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No commands found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{
        marginTop: '64px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '32px 24px',
        background: '#04060a',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        <p>Built for Cyber Security Students • 30 Complete Subject Domains • Dark Cyberpunk Theme</p>
        <p style={{ marginTop: '8px', fontSize: '0.75rem', color: '#64748b' }}>
          Linux • Active Directory • DevSecOps • Red Team • Blue Team • Cloud • Malware • AI Security • GRC • CTFs
        </p>
      </footer>
    </div>
  );
}
