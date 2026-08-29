export type FontFamily = 
  | 'inter' 
  | 'outfit' 
  | 'space' 
  | 'playfair' 
  | 'mono-custom' 
  | 'montserrat' 
  | 'cinzel' 
  | 'jakarta';

export type FontSize = 'compact' | 'standard' | 'large' | 'huge';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextAlignment = 'center' | 'left';
export type AccentColor = 'amber' | 'emerald' | 'blue' | 'purple' | 'rose' | 'slate';
export type BackgroundStyle = 'grid' | 'dots' | 'clean' | 'glow';
export type CardStyle = 'elevated' | 'glass' | 'bordered' | 'minimal';
export type BadgeStatus = 'warning' | 'alert' | 'info' | 'maintenance';

export interface SiteConfig {
  headline: string;
  subtext: string;
  linkUrl: string;
  linkLabel: string;
  showBadge: boolean;
  badgeText: string;
  badgeStatus: BadgeStatus;
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  alignment: TextAlignment;
  accentColor: AccentColor;
  backgroundStyle: BackgroundStyle;
  cardStyle: CardStyle;
  customNotice: string;
  supportEmail: string;
  showCountdown: boolean;
  estimatedReturnTime: string;
}

export interface IPData {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string;
  org?: string;
  timezone?: string;
  loading: boolean;
  error: string | null;
}
