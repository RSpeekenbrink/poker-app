import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '@/Components/Checkbox';

describe('Checkbox', () => {
    it('renders a checkbox input', () => {
        render(<Checkbox />);

        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('has type="checkbox"', () => {
        render(<Checkbox />);

        expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox');
    });

    it('can be toggled', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<Checkbox onChange={handleChange} />);
        await user.click(screen.getByRole('checkbox'));

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('appends custom className', () => {
        render(<Checkbox className="mt-2" />);

        expect(screen.getByRole('checkbox')).toHaveClass('mt-2');
    });
});
