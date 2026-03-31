import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TextInput from '@/Components/TextInput';

describe('TextInput', () => {
    it('renders a text input by default', () => {
        render(<TextInput />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('accepts a custom type', () => {
        render(<TextInput type="email" />);

        expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('handles value changes', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<TextInput onChange={handleChange} />);
        await user.type(screen.getByRole('textbox'), 'hello');

        expect(handleChange).toHaveBeenCalled();
    });

    it('auto-focuses when isFocused is true', () => {
        render(<TextInput isFocused />);

        expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('does not auto-focus by default', () => {
        render(<TextInput />);

        expect(screen.getByRole('textbox')).not.toHaveFocus();
    });

    it('appends custom className', () => {
        render(<TextInput className="mt-1" />);

        expect(screen.getByRole('textbox')).toHaveClass('mt-1');
    });
});
