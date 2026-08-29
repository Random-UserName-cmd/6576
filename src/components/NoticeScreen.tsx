import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  ExternalLink, 
  ShieldAlert, 
  AlertCircle, 
  Info, 
  Wrench, 
  Copy, 
  Check, 
  Sparkles,
  Settings,
  Shield
} from 'lucide-react';
import { SiteConfig, FontFamily, FontSize, FontWeight, AccentColor, BackgroundStyle, CardStyle, BadgeStatus } from '../types';

interface NoticeScreenProps {
  config: SiteConfig;
  isAdminLoggedIn: boolean;
  onOpenAdminLogin: () => void;
  onOpenAdminPanel: () => void;
}

export function NoticeScreen({
  config,
  isAdminLoggedIn,
  onOpenAdminLogin,
  onOpenAdminPanel,
}: NoticeScreenProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const getFontClass = (font: FontFamily) => {
    switch (font) {
      case 'inter': return 'font-inter';
      case 'outfit': return 'font-outfit';
      case 'space': return 'font-space';
      case 'playfair': return 'font-playfair';
      case 'mono-custom': return 'font-mono-custom';
      case 'montserrat': return 'font-montserrat';
      case 'cinzel': return 'font-cinzel';
      case 'jakarta': return 'font-jakarta';
      default: return 'font-outfit';
    }
  };

  const getHeadlineSizeClass = (size: FontSize) => {
    switch (size) {
      case 'compact': return 'text-2xl sm:text-3xl md:text-4xl';
      case 'standard': return 'text-3xl sm:text-4xl md:text-5xl';
      case 'large': return 'text-4xl sm:text-5xl md:text-6xl';
      case 'huge': return 'text-5xl sm:text-6xl md:text-7xl';
      default: return 'text-3xl sm:text-4xl md:text-5xl';
    }
  };

  const getFontWeightClass = (weight: FontWeight) => {
    switch (weight) {
      case 'normal': return 'font-normal';
      case 'medium': return 'font-medium';
      case 'semibold': return 'font-semibold';
      case 'bold': return 'font-bold';
      default: return 'font-bold';
    }
  };

  const getAccentStyles = (accent: AccentColor) => {
    switch (accent) {
      case 'amber':
        return {
          badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
          badgeDot: 'bg-amber-500',
          btn: 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/25',
          btnGhost: 'hover:bg-amber-500/10 text-amber-600 dark:text-amber-400',
          glow: 'from-amber-500/15 via-transparent to-transparent',
          link: 'text-amber-600 dark:text-amber-400 hover:underline',
          border: 'border-amber-500/30',
        };
      case 'emerald':
        return {
          badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          badgeDot: 'bg-emerald-500',
          btn: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25',
          btnGhost: 'hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
          glow: 'from-emerald-500/15 via-transparent to-transparent',
          link: 'text-emerald-600 dark:text-emerald-400 hover:underline',
          border: 'border-emerald-500/30',
        };
      case 'blue':
        return {
          badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
          badgeDot: 'bg-blue-500',
          btn: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/25',
          btnGhost: 'hover:bg-blue-500/10 text-blue-600 dark:text-blue-400',
          glow: 'from-blue-500/15 via-transparent to-transparent',
          link: 'text-blue-600 dark:text-blue-400 hover:underline',
          border: 'border-blue-500/30',
        };
      case 'purple':
        return {
          badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
          badgeDot: 'bg-purple-500',
          btn: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/25',
          btnGhost: 'hover:bg-purple-500/10 text-purple-600 dark:text-purple-400',
          glow: 'from-purple-500/15 via-transparent to-transparent',
          link: 'text-purple-600 dark:text-purple-400 hover:underline',
          border: 'border-purple-500/30',
        };
      case 'rose':
        return {
          badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
          badgeDot: 'bg-rose-500',
          btn: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/25',
          btnGhost: 'hover:bg-rose-500/10 text-rose-600 dark:text-rose-400',
          glow: 'from-rose-500/15 via-transparent to-transparent',
          link: 'text-rose-600 dark:text-rose-400 hover:underline',
          border: 'border-rose-500/30',
        };
      case 'slate':
      default:
        return {
          badge: 'bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 border-neutral-500/30',
          badgeDot: 'bg-neutral-600 dark:bg-neutral-400',
          btn: 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-neutral-900/20',
          btnGhost: 'hover:bg-neutral-500/10 text-neutral-800 dark:text-neutral-200',
          glow: 'from-neutral-500/10 via-transparent to-transparent',
          link: 'text-neutral-900 dark:text-white underline underline-offset-4',
          border: 'border-neutral-300 dark:border-neutral-700',
        };
    }
  };

  const getCardStyleClass = (style: CardStyle) => {
    switch (style) {
      case 'glass':
        return 'bg-white/75 dark:bg-neutral-900/75 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-2xl';
      case 'elevated':
        return 'bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-2xl';
      case 'bordered':
        return 'bg-white/90 dark:bg-neutral-950/90 border-2 border-neutral-300 dark:border-neutral-700 shadow-lg';
      case 'minimal':
        return 'bg-transparent border-0 shadow-none';
      default:
        return 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 shadow-xl';
    }
  };

  const getBadgeIcon = (status: BadgeStatus) => {
    switch (status) {
      case 'alert':
        return <ShieldAlert className="w-3.5 h-3.5 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-3.5 h-3.5 shrink-0" />;
      case 'maintenance':
        return <Wrench className="w-3.5 h-3.5 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(config.linkUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const accentStyles = getAccentStyles(config.accentColor);
  const fontClass = getFontClass(config.fontFamily);
  const sizeClass = getHeadlineSizeClass(config.fontSize);
  const weightClass = getFontWeightClass(config.fontWeight);
  const cardClass = getCardStyleClass(config.cardStyle);

  return (
    <div className={`relative min-h-screen flex flex-col justify-between overflow-hidden p-4 sm:p-6 md:p-8 ${fontClass}`}>
      {/* Background patterns */}
      {config.backgroundStyle === 'grid' && (
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-80" />
      )}
      {config.backgroundStyle === 'dots' && (
        <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-80" />
      )}
      {config.backgroundStyle === 'glow' && (
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr ${accentStyles.glow} blur-3xl pointer-events-none`}
        />
      )}

      {/* Top Bar with Admin Portal Trigger */}
      <header className="relative z-30 flex items-center justify-end w-full max-w-6xl mx-auto">
        {/* Top Right Controls */}
        <div className="flex items-center gap-2.5">
          {isAdminLoggedIn ? (
            <button
              id="open-admin-controls-btn"
              onClick={onOpenAdminPanel}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              <span>Admin Panel</span>
              <span className="w-2 h-2 rounded-full bg-neutral-950 animate-pulse" />
            </button>
          ) : (
            <button
              id="admin-login-trigger-btn"
              onClick={onOpenAdminLogin}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-neutral-400" />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </header>

      {/* Central Notice Presentation */}
      <main className="relative z-20 flex-1 flex items-center justify-center my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`w-full max-w-3xl rounded-3xl p-7 sm:p-10 md:p-14 ${cardClass} relative overflow-hidden`}
        >
          {/* Subtle top light bar */}
          <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent" />

          <div
            className={`space-y-6 ${
              config.alignment === 'center' ? 'text-center mx-auto' : 'text-left'
            }`}
          >
            {/* Status pill badge */}
            {config.showBadge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${accentStyles.badge}`}
              >
                <span className={`w-2 h-2 rounded-full ${accentStyles.badgeDot} animate-ping relative`}>
                  <span className={`absolute inset-0 rounded-full ${accentStyles.badgeDot}`} />
                </span>
                {getBadgeIcon(config.badgeStatus)}
                <span className="tracking-wide uppercase text-[11px] font-bold">
                  {config.badgeText || 'Notice • Service Offline'}
                </span>
              </motion.div>
            )}

            {/* Main Headline */}
            <h1
              id="notice-headline"
              className={`${sizeClass} ${weightClass} tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.15] text-balance`}
            >
              {config.headline}
            </h1>

            {/* Subtext with prominent link prompt */}
            <p
              id="notice-subtext"
              className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal max-w-2xl text-balance"
            >
              {config.subtext}
            </p>

            {/* Primary Action Button taking visitor to pondyy.net */}
            <div
              className={`pt-3 flex flex-wrap items-center gap-3.5 ${
                config.alignment === 'center' ? 'justify-center' : 'justify-start'
              }`}
            >
              <a
                id="visit-pondyy-link"
                href={config.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${accentStyles.btn}`}
              >
                <span>{config.linkLabel || 'Visit pondyy.net'}</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </a>

              <button
                id="copy-destination-url-btn"
                onClick={copyLink}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700 transition-colors cursor-pointer"
                title="Copy website link"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-neutral-400" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>

            {/* Optional Additional Custom Notice / Alert */}
            {config.customNotice && (
              <div
                id="custom-notice-container"
                className={`mt-6 pt-6 border-t border-neutral-200/70 dark:border-neutral-800/70 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed ${
                  config.alignment === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                <div className="flex items-start gap-2 max-w-xl mx-auto">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p>{config.customNotice}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer information */}
      <footer className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 dark:text-neutral-500 w-full max-w-6xl mx-auto pt-4">
        <div className="flex items-center gap-2">
          <span>Target Destination:</span>
          <a
            href={config.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-neutral-600 dark:text-neutral-300 hover:underline flex items-center gap-1"
          >
            <span>{config.linkUrl.replace(/^https?:\/\//, '')}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          {isAdminLoggedIn && (
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Admin Session Active
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
