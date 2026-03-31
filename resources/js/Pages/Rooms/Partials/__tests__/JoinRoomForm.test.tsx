import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import JoinRoomForm from '@/Pages/Rooms/Partials/JoinRoomForm';

const mockPost = vi.fn();

vi.mock('@inertiajs/react', () => ({
    useForm: () => ({
        data: { name: '' },
        setData: vi.fn(),
        errors: {},
        post: mockPost,
        reset: vi.fn(),
        processing: false,
        recentlySuccessful: false,
    }),
}));

vi.mock('@headlessui/react', () => ({
    Transition: ({ children, show }: any) => (show ? children : null),
}));

describe('JoinRoomForm', () => {
    const room = { slug: 'abc-123', name: 'Sprint Planning', votes: {}, show: false };

    it('renders name input', () => {
        render(<JoinRoomForm room={room} />);

        expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    });

    it('renders the join button', () => {
        render(<JoinRoomForm room={room} />);

        expect(screen.getByRole('button', { name: 'Join' })).toBeInTheDocument();
    });

    it('renders the description text', () => {
        render(<JoinRoomForm room={room} />);

        expect(screen.getByText(/Join a room and start voting/)).toBeInTheDocument();
    });

    it('submits the form on button click', async () => {
        const user = userEvent.setup();

        render(<JoinRoomForm room={room} />);
        await user.click(screen.getByRole('button', { name: 'Join' }));

        expect(mockPost).toHaveBeenCalled();
    });
});
