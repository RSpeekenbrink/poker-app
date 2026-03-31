import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import DangerButton from '@/Components/DangerButton';

describe('DangerButton', () => {
    it('renders children', () => {
        render(<DangerButton>Delete</DangerButton>);

        expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<DangerButton onClick={handleClick}>Delete</DangerButton>);
        await user.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be disabled', () => {
        render(<DangerButton disabled>Delete</DangerButton>);

        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies opacity when disabled', () => {
        render(<DangerButton disabled>Delete</DangerButton>);

        expect(screen.getByRole('button')).toHaveClass('opacity-25');
    });
});
