import { useState, useEffect } from 'react';
import { loadSavedConfig, saveConfig, resetConfig } from './utils/storage';
import { SiteConfig } from './types';
import { NoticeScreen } from './components/NoticeScreen';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanel } from './components/AdminPanel';
import { IPBadge } from './components/IPBadge';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(() => loadSavedConfig());

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('pondyy_admin_auth') === 'true';
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Set dark theme as default consistent styling
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    saveConfig(newConfig);
  };

  const handleResetConfig = () => {
    const resetted = resetConfig();
    setConfig(resetted);
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('pondyy_admin_auth', 'true');
    setIsAdminPanelOpen(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('pondyy_admin_auth');
    setIsAdminPanelOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
      {/* Main Notice Screen */}
      <NoticeScreen
        config={config}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsLoginModalOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* People's IP Address Display Badge in the Corner */}
      <IPBadge />

      {/* Admin Login Modal (Triggered when user clicks Admin Login) */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Admin Customization & Management Panel */}
      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onResetConfig={handleResetConfig}
        onLogout={handleLogout}
      />
    </div>
  );
}
