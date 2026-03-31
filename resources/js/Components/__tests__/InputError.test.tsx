import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InputError from '@/Components/InputError';

describe('InputError', () => {
    it('renders the error message', () => {
        render(<InputError message="Name is required" />);

        expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    it('renders nothing when no message is provided', () => {
        const { container } = render(<InputError />);

        expect(container.innerHTML).toBe('');
    });

    it('renders nothing when message is empty string', () => {
        const { container } = render(<InputError message="" />);

        expect(container.innerHTML).toBe('');
    });

    it('applies error styling', () => {
        render(<InputError message="Error" />);

        const element = screen.getByText('Error');
        expect(element).toHaveClass('text-sm', 'text-red-600');
    });

    it('appends custom className', () => {
        render(<InputError message="Error" className="mt-4" />);

        const element = screen.getByText('Error');
        expect(element).toHaveClass('mt-4');
    });
});
