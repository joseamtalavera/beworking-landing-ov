jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        prefetch: jest.fn(),
    }),
}));

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInCard from './SigninCard';
import '@testing-library/jest-dom';

beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
    localStorage.clear();
});

function fillForm({
    email = 'jose@example.com',
    password = 'password123', } = {}){
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email }});
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: password}});
    }
describe('SingInCard', () => {
    test('renders all the fields and buttons', () => {
        render(<SignInCard />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /acceder/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /forgot your password/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    });

    test('shows error if email is empty', async () => {
        render(<SignInCard />);
        fillForm({ email: '' });
        fireEvent.click(screen.getByRole('button', { name: /acceder/i}));
        expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test('shows error if password is invalid', async () => {
        render(<SignInCard />);
        fillForm({ email: 'not-an-eamil'});
        fireEvent.click(screen.getByRole('button', { name: /acceder/i}));
        expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test('shows error if password is empty', async () => { 
        render(<SignInCard />);
        fillForm({ password: '' });
        fireEvent.click(screen.getByRole('button', { name: /acceder/i }));
        expect(await screen.findByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test('shows error if password is too short', async () => {
        render(<SignInCard />);
        fillForm({ password: 'abc'});
        fireEvent.click(screen.getByRole('button', { name: /acceder/i }));
        expect(await screen.findByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test('calls API and stores token on valid form', async () => {
        const push = jest.fn();
        jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({push});
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ token: 'test-token', role: 'USER'}),
        });
        render(<SignInCard />);
        fillForm();
        fireEvent.click(screen.getByRole('button', { name: /acceder/i}));
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        expect(localStorage.getItem('token')).toBe('test-token');
        expect(push).toHaveBeenCalledWith('/dashboard/user');
    });

    test('redirects admin to admin dashboard', async () => {
        const push = jest.fn();
        jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({ push});
        global.fetch.mockResolvedValueOnce({
            ok: true, 
            json: async () => ({ token: 'test-token', role: 'ADMIN'}),
        });
        render(<SignInCard />);
        fillForm();
        fireEvent.click(screen.getByRole('button', { name: /acceder/i}));
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        expect(localStorage.getItem('token')).toBe('test-token');
        expect(push).toHaveBeenCalledWith('/dashboard/admin');
    });

    test('shows error from API if login fails', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false, 
            json: async () => ({ message: 'Invalid credentials'}),
        });
        render(<SignInCard />);
        fillForm();
        fireEvent.click(screen.getByRole('button', { name: /acceder/i}));
        expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
    });

    test('shows network error if fetch fails', async () => { 
        global.fetch.mockRejectedValueOnce(new Error('fail'));
        render(<SignInCard />);
        fillForm();
        fireEvent.click(screen.getByRole('button', { name: /acceder/i}));
        expect(await screen.findByText(/fail/i)).toBeInTheDocument();
    });

    test('disables submit button while loading', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true, 
            json: async () => ({ token: 'test-token', role: 'USER'}),
        });
        render(<SignInCard />);
        fillForm();
        fireEvent.click(screen.getByRole('button', { name: /acceder/i}));
        expect(screen.getByRole('button', { name: /loading/i})).toBeDisabled();
        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    });

    test('forgot password link opens dialog', () => {
        render(<SignInCard /> );
        fireEvent.click(screen.getByRole('link', { name: /forgot your password/i}));
        expect(screen.getByText(/reset your password/i)).toBeInTheDocument();
    });
});
