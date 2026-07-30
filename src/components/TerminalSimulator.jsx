import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, RefreshCw } from 'lucide-react';

export default function TerminalSimulator() {
  const [inputCommand, setInputCommand] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'CyberSec Student Linux Terminal v2.4 [x86_64-kali-linux]' },
    { type: 'output', text: 'Type "help" or try commands like "ip a", "man sudo", "apt update", "whoami", "pwd", "ls"' }
  ]);

  const handleRun = (cmdToRun) => {
    const targetCmd = (cmdToRun || inputCommand).trim();
    if (!targetCmd) return;

    const newHistory = [...history, { type: 'input', text: `student@cyber-lab:~$ ${targetCmd}` }];
    const cmdLower = targetCmd.toLowerCase();

    if (cmdLower === 'help') {
      newHistory.push({
        type: 'output',
        text: 'Available Commands in Interactive Demo:\n  - ip a / ifconfig / ipconfig : View IP addresses\n  - man sudo / man apt / man linux : Read manual documentation\n  - sudo apt update : Run administrative package updates\n  - whoami / pwd / ls -la / uname -a / clear'
      });
    } else if (cmdLower === 'clear') {
      setHistory([]);
      setInputCommand('');
      return;
    } else if (cmdLower.startsWith('ip a') || cmdLower.startsWith('ifconfig') || cmdLower.startsWith('ipconfig')) {
      newHistory.push({
        type: 'output',
        text: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500\n    inet 192.168.1.105/24 brd 192.168.1.255 scope global dynamic eth0\n    inet6 fe80::a00:27ff:fe4e:66a1/64 scope link\n    MAC Address: 08:00:27:4E:66:A1`
      });
    } else if (cmdLower.startsWith('man')) {
      const topic = cmdLower.split(' ')[1] || 'sudo';
      newHistory.push({
        type: 'output',
        text: `MANUAL PAGE FOR '${topic.toUpperCase()}'\n\nNAME:\n   ${topic} - execute a command with superuser / administrative rights or inspect manuals.\n\nDESCRIPTION:\n   ${topic} allows a permitted user to execute a command as the superuser or another user, as specified by the security policy.\n\nUSAGE:\n   sudo [options] <command>`
      });
    } else if (cmdLower.includes('apt')) {
      newHistory.push({
        type: 'output',
        text: `[sudo] password for student: *********\nGet:1 http://http.kali.org/kali kali-rolling InRelease [41.2 kB]\nReading package lists... Done\nBuilding dependency tree... Done\nAll packages are up to date!`
      });
    } else if (cmdLower === 'whoami') {
      newHistory.push({ type: 'output', text: 'root (ethical-hacker)' });
    } else if (cmdLower === 'pwd') {
      newHistory.push({ type: 'output', text: '/home/student/cybersecurity/lab' });
    } else if (cmdLower.startsWith('ls')) {
      newHistory.push({ type: 'output', text: 'drwxr-xr-x 2 root root 4096 Jul 30 18:30 network_recon\n-rw-r--r-- 1 root root  512 Jul 30 18:30 target_ips.txt\n-rwxr-xr-x 1 root root 2048 Jul 30 18:30 scan_script.sh' });
    } else if (cmdLower.startsWith('curl ifconfig.me')) {
      newHistory.push({ type: 'output', text: 'Public IP: 198.51.100.42 (ISP Gateway)' });
    } else {
      newHistory.push({ type: 'output', text: `bash: ${targetCmd}: command recognized for demo. Try 'ip a', 'man sudo', or 'apt update'.` });
    }

    setHistory(newHistory);
    setInputCommand('');
  };

  return (
    <div style={{
      background: '#070a10',
      border: '1px solid rgba(0, 255, 136, 0.3)',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
    }}>
      {/* Top Header */}
      <div style={{
        background: '#0d131f',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={18} color="#00ff88" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f1f5f9', fontFamily: 'var(--font-mono)' }}>
            Interactive Cyber Terminal
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            onClick={() => handleRun('clear')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
            <RefreshCw size={12} /> Clear
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div style={{
        padding: '16px',
        minHeight: '220px',
        maxHeight: '300px',
        overflowY: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.875rem',
        background: '#04060a'
      }}>
        {history.map((item, idx) => (
          <div key={idx} style={{
            marginBottom: '6px',
            color: item.type === 'input' ? '#00f0ff' : '#cbd5e1',
            whiteSpace: 'pre-wrap'
          }}>
            {item.text}
          </div>
        ))}
      </div>

      {/* Quick Buttons */}
      <div style={{
        padding: '8px 16px',
        background: '#0a0f19',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        {['ip a', 'man sudo', 'sudo apt update', 'curl ifconfig.me'].map((quickCmd) => (
          <button
            key={quickCmd}
            onClick={() => handleRun(quickCmd)}
            style={{
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              color: '#00f0ff',
              padding: '3px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
          >
            {quickCmd}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={(e) => { e.preventDefault(); handleRun(); }} style={{
        display: 'flex',
        background: '#0d131f',
        borderTop: '1px solid rgba(0, 255, 136, 0.2)'
      }}>
        <span style={{
          padding: '12px 0 12px 16px',
          color: '#00ff88',
          fontFamily: 'var(--font-mono)',
          fontWeight: 600
        }}>
          $
        </span>
        <input
          type="text"
          value={inputCommand}
          onChange={(e) => setInputCommand(e.target.value)}
          placeholder="Type linux / network command here..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#ffffff',
            padding: '12px 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem'
          }}
        />
        <button type="submit" style={{
          background: 'var(--accent-blue)',
          border: 'none',
          color: '#fff',
          padding: '0 16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontWeight: 600
        }}>
          <Play size={14} /> Run
        </button>
      </form>
    </div>
  );
}
