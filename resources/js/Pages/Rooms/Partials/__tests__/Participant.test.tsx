import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Participant from '@/Pages/Rooms/Partials/Participant';

vi.mock('@dicebear/core', () => ({
    createAvatar: () => ({ toDataUri: () => 'data:image/svg+xml;base64,mock' }),
}));

vi.mock('@dicebear/collection', () => ({
    bottts: {},
}));

describe('Participant', () => {
    const participant = { id: 'user-1', name: 'Alice' };

    it('renders participant name', () => {
        render(<Participant participant={participant} showVote={false} />);

        expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    it('renders avatar image', () => {
        render(<Participant participant={participant} showVote={false} />);

        expect(screen.getByRole('presentation')).toHaveAttribute('src', expect.stringContaining('data:image'));
    });

    it('renders voter card with vote value', () => {
        render(<Participant participant={participant} vote="5" showVote={true} />);

        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders voter card with dash when no vote', () => {
        render(<Participant participant={participant} showVote={true} />);

        expect(screen.getByText('-')).toBeInTheDocument();
    });
});
