import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PrimaryButton from '@/Components/PrimaryButton';

describe('PrimaryButton', () => {
    it('renders children', () => {
        render(<PrimaryButton>Create</PrimaryButton>);

        expect(
            screen.getByRole('button', { name: 'Create' }),
        ).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<PrimaryButton onClick={handleClick}>Click me</PrimaryButton>);
        await user.click(screen.getByRole('button'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be disabled', () => {
        render(<PrimaryButton disabled>Create</PrimaryButton>);

        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies opacity when disabled', () => {
        render(<PrimaryButton disabled>Create</PrimaryButton>);

        expect(screen.getByRole('button')).toHaveClass('opacity-25');
    });

    it('appends custom className', () => {
        render(<PrimaryButton className="w-full">Create</PrimaryButton>);

        expect(screen.getByRole('button')).toHaveClass('w-full');
    });
});
