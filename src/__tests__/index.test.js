import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

it('renders WhatsApp button with correct link and aria-label', () => {
	render(<Home />);
	const whatsappButton = screen.getByLabelText(/WhatsApp/i);
	expect(whatsappButton).toBeInTheDocument();
	expect(whatsappButton).toHaveAttribute('href', 'https://wa.me/34640369759');
	expect(whatsappButton).toHaveAttribute('target', '_blank');
	expect(whatsappButton).toHaveAttribute('rel', 'noopener noreferrer');
});
// ...existing code from index.test.js...
