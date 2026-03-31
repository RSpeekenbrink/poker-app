import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Show from '@/Pages/Rooms/Show';

const mockVisit = vi.fn();

vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
    router: { visit: (...args: any[]) => mockVisit(...args), reload: vi.fn() },
}));

vi.mock('@dicebear/core', () => ({
    createAvatar: () => ({ toDataUri: () => 'data:image/svg+xml;base64,mock' }),
}));

vi.mock('@dicebear/collection', () => ({
    bottts: {},
}));

describe('Show', () => {
    const room = {
        slug: 'abc-123',
        name: 'Sprint Planning',
        votes: {},
        show: false,
    };
    const user = { id: 'user-1', name: 'Alice' };

    beforeEach(() => {
        vi.clearAllMocks();

        // Make Echo.join return chainable mock with listen
        const channelMock = {
            here: vi.fn().mockReturnThis(),
            joining: vi.fn().mockReturnThis(),
            leaving: vi.fn().mockReturnThis(),
            error: vi.fn().mockReturnThis(),
            listen: vi.fn().mockReturnThis(),
        };
        (window.Echo.join as ReturnType<typeof vi.fn>).mockReturnValue(
            channelMock,
        );
    });

    it('renders the room name', () => {
        render(<Show room={room} user={user} />);

        expect(screen.getByText('Sprint Planning')).toBeInTheDocument();
    });

    it('renders voting cards for all options', () => {
        render(<Show room={room} user={user} />);

        // Should have voter cards for each voting option
        window.VotingOptions.forEach((option) => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });
    });

    it('renders the Leave button', () => {
        render(<Show room={room} user={user} />);

        expect(
            screen.getByRole('button', { name: 'Leave' }),
        ).toBeInTheDocument();
    });

    it('renders the Reset Votes button', () => {
        render(<Show room={room} user={user} />);

        expect(
            screen.getByRole('button', { name: 'Reset Votes' }),
        ).toBeInTheDocument();
    });

    it('renders Show votes button when votes are hidden', () => {
        render(<Show room={room} user={user} />);

        expect(
            screen.getByRole('button', { name: 'Show votes' }),
        ).toBeInTheDocument();
    });

    it('renders Hide votes button when votes are shown', () => {
        render(<Show room={{ ...room, show: true }} user={user} />);

        expect(
            screen.getByRole('button', { name: 'Hide votes' }),
        ).toBeInTheDocument();
    });

    it('joins the Echo presence channel on mount', () => {
        render(<Show room={room} user={user} />);

        expect(window.Echo.join).toHaveBeenCalledWith('room.abc-123');
    });

    it('renders nothing when room is not provided', () => {
        const { container } = render(<Show user={user} />);

        expect(container.innerHTML).toBe('');
    });

    it('posts vote when a voting card is clicked', async () => {
        const user_ = userEvent.setup();
        (window.axios.post as ReturnType<typeof vi.fn>).mockResolvedValue({
            data: {},
        });

        render(<Show room={room} user={user} />);

        await user_.click(screen.getByText('5'));

        expect(window.axios.post).toHaveBeenCalledWith(
            expect.stringContaining('room.vote'),
            { vote: '5' },
        );
    });

    it('toggles votes when Show votes button is clicked', async () => {
        const user_ = userEvent.setup();
        (window.axios.post as ReturnType<typeof vi.fn>).mockResolvedValue({
            data: {},
        });

        render(<Show room={room} user={user} />);

        await user_.click(screen.getByRole('button', { name: 'Show votes' }));

        expect(window.axios.post).toHaveBeenCalledWith(
            expect.stringContaining('room.showVotes'),
            { show: true },
        );
    });

    it('resets votes after confirmation', async () => {
        const user_ = userEvent.setup();
        vi.spyOn(window, 'confirm').mockReturnValue(true);
        (window.axios.post as ReturnType<typeof vi.fn>).mockResolvedValue({
            data: {},
        });

        render(<Show room={room} user={user} />);

        await user_.click(screen.getByRole('button', { name: 'Reset Votes' }));

        expect(window.confirm).toHaveBeenCalled();
        expect(window.axios.post).toHaveBeenCalledWith(
            expect.stringContaining('room.reset'),
        );
    });

    it('does not reset votes when confirmation is cancelled', async () => {
        const user_ = userEvent.setup();
        vi.spyOn(window, 'confirm').mockReturnValue(false);

        render(<Show room={room} user={user} />);

        await user_.click(screen.getByRole('button', { name: 'Reset Votes' }));

        expect(window.axios.post).not.toHaveBeenCalled();
    });
});
