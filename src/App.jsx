import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const settingsSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .refine((value) => emailPattern.test(value), {
      message: 'Email must be a valid email address',
    }),
  username: z
    .string()
    .trim()
    .min(1, 'Username is required')
    .regex(/^[A-Za-z0-9]+$/, 'Username must be alphanumeric with no spaces'),
  timezone: z.string().optional().or(z.literal('')),
  language: z.string().default('English (US)'),
  theme: z.enum(['light', 'dark']).default('light'),
  notifications: z.object({
    productUpdates: z.boolean().default(false),
    securityAlerts: z.boolean().default(false),
    weeklyDigest: z.boolean().default(false),
    accountTips: z.boolean().default(false),
  }),
});

const defaultValues = {
  fullName: '',
  email: '',
  username: '',
  timezone: '',
  language: 'English (US)',
  theme: 'light',
  notifications: {
    productUpdates: false,
    securityAlerts: false,
    weeklyDigest: false,
    accountTips: false,
  },
};

export default function App({ onSave = () => {} }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const theme = watch('theme') || 'light';
  const selectedLanguage = watch('language') || 'English (US)';
  const profileName = watch('fullName')?.trim() || 'Your Name';
  const profileEmail = watch('email')?.trim() || 'your@email.com';
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = (values) => {
    onSave(values);
    setSuccessMessage('Settings saved successfully!');
  };

  return (
    <div className="app-shell" data-theme={theme} data-testid="settings-shell">
      <aside className="sidebar" aria-label="Profile summary">
        <div className="sidebar-card">
          <div className="profile-avatar">{profileName.charAt(0).toUpperCase()}</div>
          <p className="eyebrow">Profile</p>
          <h2>{profileName}</h2>
          <p className="profile-email">{profileEmail}</p>

          <div className="summary-row">
            <span>Theme</span>
            <strong>{theme === 'dark' ? 'Dark' : 'Light'}</strong>
          </div>
          <div className="summary-row">
            <span>Language</span>
            <strong>{selectedLanguage}</strong>
          </div>
        </div>
      </aside>

      <main className="settings-panel">
        <h1>Preferences</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="field-grid">
            <div className="field-group">
              <label htmlFor="fullName">Full name</label>
              <input id="fullName" type="text" {...register('fullName')} />
              {errors.fullName && <p className="field-error">{errors.fullName.message}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" {...register('email')} />
              {errors.email && <p className="field-error">{errors.email.message}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" {...register('username')} />
              {errors.username && <p className="field-error">{errors.username.message}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="timezone">Timezone</label>
              <select id="timezone" {...register('timezone')} defaultValue="">
                <option value="">Select timezone</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
              {errors.timezone && <p className="field-error">{errors.timezone.message}</p>}
            </div>

            <div className="field-group">
              <label htmlFor="language">Language</label>
              <select id="language" {...register('language')}>
                <option value="English (US)">English (US)</option>
                <option value="Spanish (ES)">Spanish (ES)</option>
                <option value="French (FR)">French (FR)</option>
                <option value="German (DE)">German (DE)</option>
              </select>
              {errors.language && <p className="field-error">{errors.language.message}</p>}
            </div>

            <div className="field-group">
              <span className="theme-label">Theme</span>
              <div className="theme-options" role="radiogroup" aria-label="Theme selection">
                <label className={`theme-pill ${theme === 'light' ? 'active' : ''}`}>
                  <input type="radio" value="light" aria-label="Light theme" {...register('theme')} checked={theme === 'light'} />
                  <span>Light theme</span>
                </label>
                <label className={`theme-pill ${theme === 'dark' ? 'active' : ''}`}>
                  <input type="radio" value="dark" aria-label="Dark theme" {...register('theme')} checked={theme === 'dark'} />
                  <span>Dark theme</span>
                </label>
              </div>
              {errors.theme && <p className="field-error">{errors.theme.message}</p>}
            </div>
          </div>

          <fieldset className="notification-group">
            <legend>Notifications</legend>
            <label className="toggle-row">
              <span>Product updates</span>
              <input type="checkbox" {...register('notifications.productUpdates')} />
              <span className="toggle-track" aria-hidden="true" />
            </label>
            <label className="toggle-row">
              <span>Security alerts</span>
              <input type="checkbox" {...register('notifications.securityAlerts')} />
              <span className="toggle-track" aria-hidden="true" />
            </label>
            <label className="toggle-row">
              <span>Weekly digest</span>
              <input type="checkbox" {...register('notifications.weeklyDigest')} />
              <span className="toggle-track" aria-hidden="true" />
            </label>
            <label className="toggle-row">
              <span>Account tips</span>
              <input type="checkbox" {...register('notifications.accountTips')} />
              <span className="toggle-track" aria-hidden="true" />
            </label>
          </fieldset>

          <div className="action-row">
            <button type="submit">Save settings</button>
          </div>

          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </main>
    </div>
  );
}
