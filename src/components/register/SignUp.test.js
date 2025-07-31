import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import SignUp from './SignUp';
import '@testing-library/jest-dom';

beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
});

function fillForm({ 
    name = 'Jose AM', 
    email = "jose@example.com", 
    password = "password123", 
    confirmPassword = "password123", 
    terms = true } = {}) {
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: name } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: email }});
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: password}});
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: confirmPassword}});
    if (terms !== undefined) {
        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i});
        if (checkbox.checked !== terms) fireEvent.click(checkbox);
    } 
}

describe('SignUp form', () => {
    test('renders all the fields and buttons', () => {
        render(<SignUp />);
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: /terms and conditions/i})).toBeInTheDocument();
        //expect(screen.getByRole('button', { name: /sign up/i})).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
    });

    test('shows error if name is empty', async () => {
        render(<SignUp />);
        fillForm({ name: ''});
        fireEvent.click(screen.getByRole('button', { name: /create account/i}));
        expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test('shows error if email is invalid', async () => {
        render(<SignUp />);
        fillForm({ email : 'not-an-email'});
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));
        expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
        expect(global.fetch).not.toHaveBeenCalled()
    })

    test('shows error for short password', async () => {
        render(<SignUp />);
        fillForm({ password: 'abc'});
        fireEvent.click(screen.getByRole('button', { name: /create account/i}));
        expect(await screen.findByText(/at least 8 characters/i)).toBeInTheDocument();        
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test('shows error for password mismatch', async () => {
        render(<SignUp />);
        fillForm({ password: 'Pass1234', confirmPassword: 'Pass1235'});
        fireEvent.click(screen.getByRole('button', { name: /create account/i}));
        expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
        expect(global.fetch).not.toHaveBeenCalled();
    })

    test('shows error if terms are not accepted', async () => {
        render(<SignUp />);
        fillForm({ terms: false});
        fireEvent.click(screen.getByRole('button', { name: /create account/i}));
        expect(await screen.findByText(/accept the terms and conditions/i)).toBeInTheDocument();
        expect(global.fetch).not.toHaveBeenCalled();
    });

    test('calls API and shows sucess on valid form ', async () =>{
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'Account created successfully. You can log in.'}),
        });
        render(<SignUp />);
        fillForm();
        fireEvent.click(screen.getByRole('button', { name: /create account/i}));

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        expect(await screen.findByText(/account created successfully/i)).toBeInTheDocument();
    });

    test('clear fields after successfull submission', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: 'Account created successfully. You can log in.'}),
        });
        render(<SignUp />);
        fillForm();
        fireEvent.click(screen.getByRole('button',  {name: /create account/i}));
        await screen.findByText(/account created successfully/i);

        expect(screen.getByLabelText(/full name/i).value).toBe('');
        expect(screen.getByLabelText(/email/i).value).toBe('');
        expect(screen.getByLabelText(/^password$/i).value).toBe('');
        expect(screen.getByLabelText(/confirm password/i).value).toBe('');
        expect(screen.getByRole('checkbox', { name: /terms and conditions/i})).not.toBeChecked();
    });

    test ('shows error from API if register fails', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'User already exists'}), // This message should match the backend response
        });
        render(<SignUp />);
        fillForm();
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));

        expect(await screen.findByText(/user already exists/i)).toBeInTheDocument();
    });

    test('shows network error if fetch fails', async () => {
        global.fetch.mockRejectedValueOnce(new Error('fail'));
        render(<SignUp />);
        fillForm();
        fireEvent.click(screen.getByRole('button', { name: /create account/i}));

        expect(await screen.findByText(/network error/i)).toBeInTheDocument(); 
    });
});
