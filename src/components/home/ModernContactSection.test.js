import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ModernContactSection from './ModernContactSection';
import '@testing-library/jest-dom';

describe('ModernContactSection', () => {
    beforeEach(() => {
        // mock fetch so that it resolves after a short delay
        global.fetch = jest.fn(() =>
            new Promise(resolve =>
                setTimeout(
                    () =>
                        resolve({
                            ok: true,
                            json: () => Promise.resolve({}),
                        }),
                    100 // delay to keep loading true
                )
                )
            );
        });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders all input fields and submit button', () => {
        render(<ModernContactSection />);
        expect(screen.getByPlaceholderText(/Nombre completo/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Teléfono/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i})).toBeInTheDocument();
    });

    it('shows validation errors for empty fields', async () => {
        render(<ModernContactSection />);
        fireEvent.click(screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i }));
        await waitFor(() => {
            expect(screen.getByText(/Introduce tu nombre/i)).toBeInTheDocument();
            expect(screen.getByText(/Introduce un teléfono válido/i)).toBeInTheDocument();
            expect(screen.getByText(/Introduce un email válido/i)).toBeInTheDocument();
        });
    });

    it('disables submit button while loading', async () => {
        render(<ModernContactSection />);
        fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });

        const button = screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i});
        fireEvent.click(button);

        // while fetch is pending, loading = true
        expect(button).toBeDisabled();

        // after fetch resolves, button re-enables
        await waitFor(() => {
            expect(button).not.toBeDisabled();
        });
    });

    it('shows success message on successful submission', async () => {
        render(<ModernContactSection />);
        fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });

        const button = screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i});
        fireEvent.click(button);

        // wait for success message to appear
        await waitFor(()=> {
            expect(screen.getByText(/¡Gracias! Te contactaremos pronto./i)).toBeInTheDocument();
        });
    });

    it('shows error message if submission fails', async () => {
    // Mock fetch to return an error response
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ error: 'Hubo un error. Inténtalo de nuevo más tarde.' }),
        })
    );

        render(<ModernContactSection />);
        fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });

        const button = screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/Hubo un error. Inténtalo de nuevo más tarde./i)).toBeInTheDocument();
        });
    });

    it('shows error when name is too long (>50 chars)', async () => {
        render(<ModernContactSection />);
        const longName = 'A'.repeat(51);
        fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: longName } });
        fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i }));
        await waitFor(() => {
            expect(screen.getByText(/El nombre es demasiado largo/i)).toBeInTheDocument();
        });
    });

    it('shows error when email is invalid format', async () => {
        render(<ModernContactSection />);
        fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i }));
        await waitFor(() => {
            expect(screen.getByText(/Introduce un email válido/i)).toBeInTheDocument();
        });
    });

    it('shows error when email is too long (>100 chars)', async () => {
        render(<ModernContactSection />);
        const longEmail = 'a'.repeat(101) + '@example.com';
        fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: longEmail } });
        fireEvent.click(screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i }));
        await waitFor(() => {
            expect(screen.getByText(/El email es demasiado largo/i)).toBeInTheDocument();
        });
    });

    it('shows error when phone is too short (<7 digits)', async () => {
        render(<ModernContactSection />);
        fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: '12345' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i }));
        await waitFor(() => {
            expect(screen.getByText(/Introduce un teléfono válido/i)).toBeInTheDocument();
        });
    });

    it('shows error when phone is too long (>15 digits)', async () => {
        render(<ModernContactSection />);
        const longPhone = '1'.repeat(16);
        fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: longPhone } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.click(screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i }));
        await waitFor(() => {
            expect(screen.getByText(/El teléfono es demasiado largo/i)).toBeInTheDocument();
        });
    });

    // honeypot behaviour
    it('skips API call and show when honeypot field is filled', async () => {
        const fetchSpy = jest.spyOn(global, 'fetch');
        render(<ModernContactSection />);
        fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });

        // Fill the honeypot field
        const honeypot = screen.getByTestId('honeypot');
        fireEvent.change(honeypot, { target: { value: 'bot' } });

        fireEvent.click(screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i }));

        await waitFor(() => {
            expect(screen.getByText(/¡Gracias! Te contactaremos pronto/i)).toBeInTheDocument();
        });

        // API call should not have be skipped
        expect(fetchSpy).not.toHaveBeenCalled();

        // Fields that should be reset
        expect(screen.getByPlaceholderText(/Nombre completo/i)).toHaveValue('');
        expect(screen.getByPlaceholderText(/Teléfono/i)).toHaveValue('');
        expect(screen.getByPlaceholderText(/Email/i)).toHaveValue('');

        fetchSpy.mockRestore();
    });

    // snackbar close event
    it('closes snackbar when close event is triggered', async () => {
        render(<ModernContactSection />);
        fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: '123456789' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });

        fireEvent.click(screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i }));

        // wait for the snackbar to appear
        await waitFor(() => {
            expect(screen.getByText(/¡Gracias! Te contactaremos pronto/i)).toBeInTheDocument();
        });

        // simulate the closing the snackbar (click the close button)
        fireEvent.click(screen.getByRole('button', { name: /close/i }));

        // wait for the snackbar to disappear
        await waitFor(() => {
            expect(screen.queryByText(/¡Gracias! Te contactaremos pronto/i)).not.toBeInTheDocument();
        });
    });

    // sanitization
    it('trims whitespace from inputs', async () => {
        render(<ModernContactSection />);
        fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: '  Jose  ' } });
        fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: '  123456789  ' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: '  test@mail.com  ' } });

        const button = screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i });
        fireEvent.click(button);

        // You can spy on fetch and check the payload if needed
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    body: JSON.stringify({
                        name: 'Jose',
                        phone: '123456789',
                        email: 'test@mail.com'
                    })
                })
            )
        })
    })
        it('submits trimmed and sanitized inputs (email lowercased, phone digits only)', async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({}),
                })
            );
            render(<ModernContactSection />);
            fireEvent.change(screen.getByPlaceholderText(/Nombre completo/i), { target: { value: '  Jose  ' } });
            fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: ' +34 123 456 ' } });
            fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: ' TEST@MAIL.COM ' } });

            fireEvent.click(screen.getByRole('button', { name: /SOLICITA TU OFICINA VIRTUAL/i }));

            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.objectContaining({
                        body: JSON.stringify({
                            name: 'Jose',
                            phone: '34123456',
                            email: 'test@mail.com'
                        })
                    })
                );
            });
        });
});

