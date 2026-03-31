import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import VoterCard from '@/Components/VoterCard';

describe('VoterCard', () => {
    it('renders with voter-card class', () => {
        const { container } = render(<VoterCard />);

        expect(container.firstChild).toHaveClass('voter-card');
    });

    it('shows the value on the back face when show is true', () => {
        render(<VoterCard value="5" show />);

        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('shows dash when no value and show is true', () => {
        render(<VoterCard show />);

        expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('applies flip class when show is true', () => {
        const { container } = render(<VoterCard show />);

        const inner = container.querySelector('.inner');
        expect(inner).toHaveClass('flip');
    });

    it('does not apply flip class when show is false', () => {
        const { container } = render(<VoterCard show={false} />);

        const inner = container.querySelector('.inner');
        expect(inner).not.toHaveClass('flip');
    });

    it('applies active styling when active', () => {
        const { container } = render(<VoterCard active value="5" />);

        const inner = container.querySelector('.inner');
        expect(inner?.className).toContain('bg-gradient-to-br');
    });

    it('applies clickable styling when clickable', () => {
        const { container } = render(<VoterCard clickable value="5" />);

        const inner = container.querySelector('.inner');
        expect(inner?.className).toContain('cursor-pointer');
    });

    it('fires onClick when clicked', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<VoterCard value="8" clickable onClick={handleClick} />);
        await user.click(screen.getByText('8'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
