import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App settings form', () => {
  it('shows required validation messages when required fields are empty', async () => {
    const saveHandler = vi.fn();
    render(<App onSave={saveHandler} />);

    await userEvent.click(screen.getByRole('button', { name: /save settings/i }));

    expect(await screen.findByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(saveHandler).not.toHaveBeenCalled();
  });

  it('rejects a malformed email with no real domain', async () => {
    const saveHandler = vi.fn();
    render(<App onSave={saveHandler} />);

    await userEvent.type(screen.getByLabelText(/full name/i), 'Alicia Hart');
    await userEvent.type(screen.getByLabelText(/email/i), 'hello@gmail');
    await userEvent.type(screen.getByLabelText(/username/i), 'alicia1');
    await userEvent.click(screen.getByRole('button', { name: /save settings/i }));

    expect(await screen.findByText('Email must be a valid email address')).toBeInTheDocument();
    expect(saveHandler).not.toHaveBeenCalled();
  });

  it('submits successfully with valid form data', async () => {
    const saveHandler = vi.fn();
    render(<App onSave={saveHandler} />);

    await userEvent.type(screen.getByLabelText(/full name/i), 'Alicia Hart');
    await userEvent.type(screen.getByLabelText(/email/i), 'alicia.hart@example.com');
    await userEvent.type(screen.getByLabelText(/username/i), 'alicia1');
    await userEvent.selectOptions(screen.getByLabelText(/timezone/i), 'UTC');
    await userEvent.selectOptions(screen.getByLabelText(/language/i), 'Spanish (ES)');
    await userEvent.click(screen.getByLabelText(/dark theme/i));
    await userEvent.click(screen.getByLabelText(/product updates/i));
    await userEvent.click(screen.getByLabelText(/weekly digest/i));

    await userEvent.click(screen.getByRole('button', { name: /save settings/i }));

    expect(await screen.findByText('Settings saved successfully!')).toBeInTheDocument();
    expect(saveHandler).toHaveBeenCalledTimes(1);
  });

  it('changes the theme attribute when the toggle is used', async () => {
    render(<App />);

    const page = screen.getByTestId('settings-shell');
    expect(page).toHaveAttribute('data-theme', 'light');

    await userEvent.click(screen.getByLabelText(/dark theme/i));

    await waitFor(() => {
      expect(page).toHaveAttribute('data-theme', 'dark');
    });
  });

  it('shows the selected language in the UI when it changes', async () => {
    render(<App />);

    const languageSelect = screen.getByLabelText(/language/i);
    await userEvent.selectOptions(languageSelect, 'French (FR)');

    await waitFor(() => {
      expect(screen.getAllByText('French (FR)').length).toBeGreaterThan(0);
    });
  });
});
