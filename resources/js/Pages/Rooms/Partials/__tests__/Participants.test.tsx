import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Participants from '@/Pages/Rooms/Partials/Participants';

vi.mock('@dicebear/core', () => ({
    createAvatar: () => ({ toDataUri: () => 'data:image/svg+xml;base64,mock' }),
}));

vi.mock('@dicebear/collection', () => ({
    bottts: {},
}));

describe('Participants', () => {
    const participants = [
        { id: 'user-1', name: 'Alice' },
        { id: 'user-2', name: 'Bob' },
    ];

    it('renders all participants', () => {
        render(
            <Participants
                participants={participants}
                votes={{}}
                showVote={false}
            />,
        );

        expect(screen.getByText('Alice')).toBeInTheDocument();
        expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('passes correct votes to each participant', () => {
        const votes = { 'user-1': '5' as const, 'user-2': '8' as const };

        render(
            <Participants
                participants={participants}
                votes={votes}
                showVote={true}
            />,
        );

        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText('8')).toBeInTheDocument();
    });

    it('renders empty when no participants', () => {
        const { container } = render(
            <Participants participants={[]} votes={{}} showVote={false} />,
        );

        expect(container.innerHTML).toBe('');
    });
});
