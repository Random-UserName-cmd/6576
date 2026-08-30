import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Type, 
  Palette, 
  FileText, 
  Sliders, 
  ExternalLink, 
  Check, 
  LogOut, 
  Sparkles,
  LayoutTemplate,
  Cloud,
  CloudCheck
} from 'lucide-react';
import { 
  SiteConfig, 
  FontFamily, 
  FontSize, 
  FontWeight, 
  TextAlignment, 
  AccentColor, 
  BackgroundStyle, 
  CardStyle, 
  BadgeStatus 
} from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  isFirebaseConnected?: boolean;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onResetConfig: () => void;
  onLogout: () => void;
}

type TabType = 'content' | 'typography' | 'appearance' | 'presets';

export function AdminPanel({
  isOpen,
  onClose,
  config,
  isFirebaseConnected = false,
  onUpdateConfig,
  onResetConfig,
  onLogout,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [localConfig, setLocalConfig] = useState<SiteConfig>(config);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state if external config changed (e.g. via real-time Firestore sync)
  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  // Sync state if external config changed
  const handleChange = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => {
    const updated = { ...localConfig, [key]: value };
    setLocalConfig(updated);
    // Live update preview immediately
    onUpdateConfig(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdateConfig(localConfig);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default values?')) {
      onResetConfig();
      setLocalConfig(config);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 2500);
    }
  };

  const applyPreset = (presetKey: string) => {
    let newSettings: Partial<SiteConfig> = {};
    if (presetKey === 'shutdown') {
      newSettings = {
        headline: 'This website has currently been shut down',
        subtext: 'Want to learn more? Go to pondyy.net',
        linkUrl: 'https://pondyy.net',
        linkLabel: 'Go to pondyy.net',
        badgeText: 'Notice • Service Offline',
        badgeStatus: 'alert',
        accentColor: 'amber',
        fontFamily: 'outfit',
        fontSize: 'standard',
      };
    } else if (presetKey === 'migration') {
      newSettings = {
        headline: 'We have migrated to our new platform',
        subtext: 'All future updates and services are hosted at pondyy.net',
        linkUrl: 'https://pondyy.net',
        linkLabel: 'Explore pondyy.net',
        badgeText: 'Permanent Redirect',
        badgeStatus: 'info',
        accentColor: 'blue',
        fontFamily: 'space',
        fontSize: 'large',
      };
    } else if (presetKey === 'maintenance') {
      newSettings = {
        headline: 'System Maintenance in Progress',
        subtext: 'Our servers are taking a scheduled break. Reach us on pondyy.net',
        linkUrl: 'https://pondyy.net',
        linkLabel: 'Check Status on pondyy.net',
        badgeText: 'Maintenance • Upgrading',
        badgeStatus: 'warning',
        accentColor: 'emerald',
        fontFamily: 'jakarta',
        fontSize: 'standard',
      };
    } else if (presetKey === 'editorial') {
      newSettings = {
        headline: 'This publication has concluded its archive',
        subtext: 'Visit pondyy.net for current releases and inquiries',
        linkUrl: 'https://pondyy.net',
        linkLabel: 'Read pondyy.net',
        badgeText: 'Archived Publication',
        badgeStatus: 'warning',
        accentColor: 'rose',
        fontFamily: 'playfair',
        fontSize: 'large',
      };
    }

    const updated = { ...localConfig, ...newSettings };
    setLocalConfig(updated);
    onUpdateConfig(updated);
  };

  const fontOptions: { id: FontFamily; label: string; preview: string; className: string }[] = [
    { id: 'outfit', label: 'Outfit', preview: 'Aa Bb 123', className: 'font-outfit' },
    { id: 'inter', label: 'Inter', preview: 'Aa Bb 123', className: 'font-inter' },
    { id: 'space', label: 'Space Grotesk', preview: 'Aa Bb 123', className: 'font-space' },
    { id: 'jakarta', label: 'Plus Jakarta Sans', preview: 'Aa Bb 123', className: 'font-jakarta' },
    { id: 'playfair', label: 'Playfair Display', preview: 'Aa Bb 123', className: 'font-playfair' },
    { id: 'mono-custom', label: 'JetBrains Mono', preview: 'Aa Bb 123', className: 'font-mono-custom' },
    { id: 'montserrat', label: 'Montserrat', preview: 'Aa Bb 123', className: 'font-montserrat' },
    { id: 'cinzel', label: 'Cinzel Serif', preview: 'Aa Bb 123', className: 'font-cinzel' },
  ];

  const accentColors: { id: AccentColor; name: string; bgClass: string; ringClass: string }[] = [
    { id: 'amber', name: 'Amber Glow', bgClass: 'bg-amber-500', ringClass: 'ring-amber-500' },
    { id: 'emerald', name: 'Emerald Wave', bgClass: 'bg-emerald-500', ringClass: 'ring-emerald-500' },
    { id: 'blue', name: 'Electric Blue', bgClass: 'bg-blue-500', ringClass: 'ring-blue-500' },
    { id: 'purple', name: 'Cosmic Purple', bgClass: 'bg-purple-500', ringClass: 'ring-purple-500' },
    { id: 'rose', name: 'Crimson Rose', bgClass: 'bg-rose-500', ringClass: 'ring-rose-500' },
    { id: 'slate', name: 'Monochrome Slate', bgClass: 'bg-neutral-800 dark:bg-neutral-200', ringClass: 'ring-neutral-500' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <motion.div
            id="admin-management-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col h-full z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                    Administrator Controls
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Live customization & site settings
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="admin-logout-btn"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  title="Logout"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
                <button
                  id="close-admin-panel-btn"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-6 bg-neutral-50/50 dark:bg-neutral-950/40">
              <button
                id="tab-content"
                onClick={() => setActiveTab('content')}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'content'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Text Content</span>
              </button>

              <button
                id="tab-typography"
                onClick={() => setActiveTab('typography')}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'typography'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
                }`}
              >
                <Type className="w-4 h-4" />
                <span>Typography</span>
              </button>

              <button
                id="tab-appearance"
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'appearance'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>Theme & Style</span>
              </button>

              <button
                id="tab-presets"
                onClick={() => setActiveTab('presets')}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'presets'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Presets</span>
              </button>
            </div>

            {/* Main scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: CONTENT */}
              {activeTab === 'content' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                      Main Headline Notice
                    </label>
                    <textarea
                      id="input-headline"
                      rows={2}
                      value={localConfig.headline}
                      onChange={(e) => handleChange('headline', e.target.value)}
                      placeholder="e.g. This website has currently been shut down"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                    <p className="text-[11px] text-neutral-400 mt-1">
                      The primary headline statement visible at the top of the card.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                      Subtext / Redirection Prompt
                    </label>
                    <textarea
                      id="input-subtext"
                      rows={2}
                      value={localConfig.subtext}
                      onChange={(e) => handleChange('subtext', e.target.value)}
                      placeholder="e.g. Want to learn more? Go to pondyy.net"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                        Target URL Link
                      </label>
                      <input
                        id="input-link-url"
                        type="url"
                        value={localConfig.linkUrl}
                        onChange={(e) => handleChange('linkUrl', e.target.value)}
                        placeholder="https://pondyy.net"
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                        Action Button Text
                      </label>
                      <input
                        id="input-link-label"
                        type="text"
                        value={localConfig.linkLabel}
                        onChange={(e) => handleChange('linkLabel', e.target.value)}
                        placeholder="Visit pondyy.net"
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                        Status Pill Badge
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localConfig.showBadge}
                          onChange={(e) => handleChange('showBadge', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>

                    {localConfig.showBadge && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          id="input-badge-text"
                          type="text"
                          value={localConfig.badgeText}
                          onChange={(e) => handleChange('badgeText', e.target.value)}
                          placeholder="e.g. Notice • Service Offline"
                          className="w-full px-3.5 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
                        />
                        <select
                          id="select-badge-status"
                          value={localConfig.badgeStatus}
                          onChange={(e) => handleChange('badgeStatus', e.target.value as BadgeStatus)}
                          className="w-full px-3.5 py-2 rounded-xl text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
                        >
                          <option value="warning">Warning / Caution</option>
                          <option value="alert">Alert / Critical</option>
                          <option value="info">Informational</option>
                          <option value="maintenance">Maintenance</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                      Additional Notice / Notes (Optional)
                    </label>
                    <textarea
                      id="input-custom-notice"
                      rows={3}
                      value={localConfig.customNotice}
                      onChange={(e) => handleChange('customNotice', e.target.value)}
                      placeholder="Extra details, maintenance window, or contact info..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: TYPOGRAPHY */}
              {activeTab === 'typography' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      Primary Font Family
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {fontOptions.map((font) => {
                        const isSelected = localConfig.fontFamily === font.id;
                        return (
                          <button
                            key={font.id}
                            id={`font-option-${font.id}`}
                            onClick={() => handleChange('fontFamily', font.id)}
                            className={`p-3 rounded-xl text-left border transition-all ${
                              isSelected
                                ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20 text-neutral-900 dark:text-white'
                                : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold">{font.label}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-amber-500" />}
                            </div>
                            <span className={`text-base block truncate ${font.className}`}>
                              {font.preview}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      Headline Font Size Scale
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['compact', 'standard', 'large', 'huge'] as FontSize[]).map((size) => (
                        <button
                          key={size}
                          onClick={() => handleChange('fontSize', size)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                            localConfig.fontSize === size
                              ? 'bg-amber-500 text-white border-amber-500'
                              : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      Font Weight
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['normal', 'medium', 'semibold', 'bold'] as FontWeight[]).map((weight) => (
                        <button
                          key={weight}
                          onClick={() => handleChange('fontWeight', weight)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                            localConfig.fontWeight === weight
                              ? 'bg-amber-500 text-white border-amber-500'
                              : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {weight}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      Text Alignment
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['center', 'left'] as TextAlignment[]).map((align) => (
                        <button
                          key={align}
                          onClick={() => handleChange('alignment', align)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                            localConfig.alignment === align
                              ? 'bg-amber-500 text-white border-amber-500'
                              : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {align === 'center' ? 'Centered Layout' : 'Left-Aligned'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: APPEARANCE */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      Theme Accent Color
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {accentColors.map((color) => {
                        const isSelected = localConfig.accentColor === color.id;
                        return (
                          <button
                            key={color.id}
                            id={`accent-color-${color.id}`}
                            onClick={() => handleChange('accentColor', color.id)}
                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                              isSelected
                                ? 'bg-neutral-100 dark:bg-neutral-800 border-neutral-900 dark:border-white ring-2 ring-neutral-400'
                                : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full ${color.bgClass} shadow-xs`} />
                            <span className="text-neutral-800 dark:text-neutral-200">{color.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      Background Ambient Effect
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'grid', label: 'Subtle Grid' },
                        { id: 'dots', label: 'Minimal Dots' },
                        { id: 'glow', label: 'Radial Spotlight' },
                        { id: 'clean', label: 'Pure Minimal' },
                      ].map((bg) => (
                        <button
                          key={bg.id}
                          onClick={() => handleChange('backgroundStyle', bg.id as BackgroundStyle)}
                          className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                            localConfig.backgroundStyle === bg.id
                              ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-300 font-semibold'
                              : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {bg.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                      Card Container Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'glass', label: 'Translucent Glass' },
                        { id: 'elevated', label: 'Elevated Shadow' },
                        { id: 'bordered', label: 'Crisp Bordered' },
                        { id: 'minimal', label: 'Ultra Minimal' },
                      ].map((card) => (
                        <button
                          key={card.id}
                          onClick={() => handleChange('cardStyle', card.id as CardStyle)}
                          className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                            localConfig.cardStyle === card.id
                              ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-300 font-semibold'
                              : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {card.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PRESETS */}
              {activeTab === 'presets' && (
                <div className="space-y-4">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Apply quick tested templates tailored for different communication scenarios:
                  </p>

                  <div className="space-y-2.5">
                    <button
                      onClick={() => applyPreset('shutdown')}
                      className="w-full text-left p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 hover:bg-amber-500/5 hover:border-amber-400 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          Shutdown Notice (Default)
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-semibold">
                          Amber / Outfit
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        "This website has currently been shut down • Want to learn more? Go to pondyy.net"
                      </p>
                    </button>

                    <button
                      onClick={() => applyPreset('migration')}
                      className="w-full text-left p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 hover:bg-blue-500/5 hover:border-blue-400 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          Platform Migration
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold">
                          Blue / Space Grotesk
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        "We have migrated to our new platform • All future updates at pondyy.net"
                      </p>
                    </button>

                    <button
                      onClick={() => applyPreset('maintenance')}
                      className="w-full text-left p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 hover:bg-emerald-500/5 hover:border-emerald-400 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          Scheduled Maintenance
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                          Emerald / Jakarta
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        "System Maintenance in Progress • Check status on pondyy.net"
                      </p>
                    </button>

                    <button
                      onClick={() => applyPreset('editorial')}
                      className="w-full text-left p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 hover:bg-rose-500/5 hover:border-rose-400 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          Editorial Archive
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold">
                          Rose / Playfair Serif
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        "This publication has concluded its archive • Read pondyy.net"
                      </p>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Save, Reset, Cloud status */}
            <div className="p-4 px-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 flex items-center justify-between gap-3">
              <button
                id="admin-reset-btn"
                onClick={handleReset}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  id="admin-save-btn"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 hover:opacity-90 transition-opacity shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Saving to Cloud...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Saved Toast Banner */}
            <AnimatePresence>
              {showSavedToast && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-18 left-6 right-6 p-3 rounded-xl bg-emerald-600 text-white shadow-xl flex items-center justify-between text-xs font-semibold z-30"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Saved & synchronized with Cloud Firestore</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
