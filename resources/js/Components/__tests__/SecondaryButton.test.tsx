import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SecondaryButton from '@/Components/SecondaryButton';

describe('SecondaryButton', () => {
    it('renders children', () => {
        render(<SecondaryButton>Cancel</SecondaryButton>);

        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('has type="button" by default', () => {
        render(<SecondaryButton>Cancel</SecondaryButton>);

        expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('calls onClick handler when clicked', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<SecondaryButton onClick={handleClick}>Click</SecondaryButton>);
        await user.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be disabled', () => {
        render(<SecondaryButton disabled>Cancel</SecondaryButton>);

        expect(screen.getByRole('button')).toBeDisabled();
    });
});
