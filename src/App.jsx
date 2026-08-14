import { useState } from 'react';
import './App.css';

const initialForm = {
  fullName: 'Jordan Lee',
  email: 'jordan.lee@example.com',
  username: 'jordanlee',
  timezone: 'UTC-05:00',
  language: 'English (US)',
  theme: 'dark',
  emailUpdates: true,
  productTips: true,
  securityAlerts: true,
  weeklyDigest: false,
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setIsSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSaved(true);
  };

  return (
    <main className="page-shell">
      <section className="settings-card" aria-label="User settings form">
        <aside className="profile-panel">
          <div className="avatar" aria-hidden="true">JL</div>
          <div className="profile-copy">
            <p className="eyebrow">Workspace</p>
            <h1>{formData.fullName}</h1>
            <p className="muted">{formData.email}</p>
          </div>
          <ul className="meta-list">
            <li>
              <span>Plan</span>
              <strong>Pro</strong>
            </li>
            <li>
              <span>Region</span>
              <strong>{formData.timezone}</strong>
            </li>
            <li>
              <span>Theme</span>
              <strong>{formData.theme === 'dark' ? 'Dark' : 'Light'}</strong>
            </li>
          </ul>
        </aside>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <div>
              <p className="eyebrow">Preferences</p>
              <h2>Account settings</h2>
            </div>
            <button type="submit" className="primary-button">
              Save changes
            </button>
          </div>

          {isSaved && (
            <p className="success-message" role="status" aria-live="polite">
              Settings saved successfully.
            </p>
          )}

          <div className="field-grid">
            <label className="field">
              <span>Full name</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span>Email address</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span>Username</span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>

            <label className="field">
              <span>Time zone</span>
              <select name="timezone" value={formData.timezone} onChange={handleChange}>
                <option value="UTC-08:00">Pacific Time (UTC-08:00)</option>
                <option value="UTC-05:00">Eastern Time (UTC-05:00)</option>
                <option value="UTC+00:00">London (UTC+00:00)</option>
                <option value="UTC+01:00">Berlin (UTC+01:00)</option>
                <option value="UTC+05:30">India (UTC+05:30)</option>
              </select>
            </label>

            <label className="field">
              <span>Language</span>
              <select name="language" value={formData.language} onChange={handleChange}>
                <option value="English (US)">English (US)</option>
                <option value="English (UK)">English (UK)</option>
                <option value="Deutsch">Deutsch</option>
                <option value="Français">Français</option>
                <option value="Español">Español</option>
              </select>
            </label>
          </div>

          <fieldset className="choice-group">
            <legend>Appearance</legend>
            <div className="choice-options">
              <label className="choice-pill">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={formData.theme === 'dark'}
                  onChange={handleChange}
                />
                <span>Dark</span>
              </label>
              <label className="choice-pill">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={formData.theme === 'light'}
                  onChange={handleChange}
                />
                <span>Light</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="toggle-group">
            <legend>Notifications</legend>
            <label className="toggle-row">
              <span>Email updates</span>
              <input
                type="checkbox"
                name="emailUpdates"
                checked={formData.emailUpdates}
                onChange={handleChange}
              />
            </label>
            <label className="toggle-row">
              <span>Product tips</span>
              <input
                type="checkbox"
                name="productTips"
                checked={formData.productTips}
                onChange={handleChange}
              />
            </label>
            <label className="toggle-row">
              <span>Security alerts</span>
              <input
                type="checkbox"
                name="securityAlerts"
                checked={formData.securityAlerts}
                onChange={handleChange}
              />
            </label>
            <label className="toggle-row">
              <span>Weekly digest</span>
              <input
                type="checkbox"
                name="weeklyDigest"
                checked={formData.weeklyDigest}
                onChange={handleChange}
              />
            </label>
          </fieldset>
        </form>
      </section>
    </main>
  );
}

export default App;
