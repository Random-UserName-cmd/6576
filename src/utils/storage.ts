import { SiteConfig } from '../types';

export const DEFAULT_CONFIG: SiteConfig = {
  headline: 'This website has currently been shut down',
  subtext: 'Want to learn more? Go to pondyy.net',
  linkUrl: 'https://pondyy.net',
  linkLabel: 'Visit pondyy.net',
  showBadge: true,
  badgeText: 'Notice • Service Offline',
  badgeStatus: 'warning',
  fontFamily: 'outfit',
  fontSize: 'standard',
  fontWeight: 'bold',
  alignment: 'center',
  accentColor: 'amber',
  backgroundStyle: 'grid',
  cardStyle: 'glass',
  customNotice: 'For urgent inquiries or status updates, please direct all questions to our official hub at pondyy.net.',
  supportEmail: 'contact@pondyy.net',
  showCountdown: false,
  estimatedReturnTime: '',
};

const STORAGE_KEY = 'pondyy_site_config_v1';

export function loadSavedConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: SiteConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save config to localStorage', err);
  }
}

export function resetConfig(): SiteConfig {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset config in localStorage', err);
  }
  return DEFAULT_CONFIG;
}
