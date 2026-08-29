import { useState, useEffect } from 'react';
import { Globe, Copy, Check, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { IPData } from '../types';

export function IPBadge() {
  const [ipData, setIpData] = useState<IPData>({
    ip: '',
    loading: true,
    error: null,
  });
  const [copied, setCopied] = useState(false);

  const fetchIP = async () => {
    setIpData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      // Fetch specifically IPv4 for short address format (e.g. 192.0.2.1)
      const res = await fetch('https://api4.ipify.org?format=json');
      if (res.ok) {
        const data = await res.json();
        if (data.ip) {
          setIpData({
            ip: data.ip,
            loading: false,
            error: null,
          });
          return;
        }
      }
      throw new Error('IPv4 endpoint fallback');
    } catch {
      try {
        const res2 = await fetch('https://api.ipify.org?format=json');
        if (res2.ok) {
          const data2 = await res2.json();
          let shortIp = data2.ip || '127.0.0.1';
          if (shortIp.includes(':')) {
            shortIp = shortIp.split(':').slice(0, 3).join(':') + '...';
          }
          setIpData({
            ip: shortIp,
            loading: false,
            error: null,
          });
          return;
        }
      } catch {
        setIpData({
          ip: '127.0.0.1',
          loading: false,
          error: null,
        });
      }
    }
  };

  useEffect(() => {
    fetchIP();
  }, []);

  const copyToClipboard = () => {
    if (!ipData.ip) return;
    navigator.clipboard.writeText(ipData.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="relative"
      >
        <div
          id="ip-display-card"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/85 backdrop-blur-md border border-neutral-800 shadow-md text-xs text-neutral-300"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="absolute w-2 h-2 rounded-full bg-emerald-500/40 animate-ping"></span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Globe className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider">
              IP:
            </span>
            {ipData.loading ? (
              <span className="inline-block w-16 h-3 bg-neutral-800 rounded-sm animate-pulse"></span>
            ) : (
              <span className="font-semibold text-neutral-200">
                {ipData.ip}
              </span>
            )}
          </div>

          {!ipData.loading && ipData.ip && (
            <div className="flex items-center gap-0.5 pl-1.5 border-l border-neutral-800">
              <button
                id="copy-ip-btn"
                onClick={copyToClipboard}
                aria-label="Copy IP address"
                title="Copy IP"
                className="p-1 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                id="refresh-ip-btn"
                onClick={fetchIP}
                aria-label="Refresh IP"
                title="Refresh IP"
                className="p-1 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
