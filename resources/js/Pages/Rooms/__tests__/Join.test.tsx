import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Join from '@/Pages/Rooms/Join';

vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
    useForm: () => ({
        data: { name: '' },
        setData: vi.fn(),
        errors: {},
        post: vi.fn(),
        reset: vi.fn(),
        processing: false,
        recentlySuccessful: false,
    }),
}));

vi.mock('@headlessui/react', () => ({
    Transition: ({ children, show }: any) => (show ? children : null),
}));

describe('Join', () => {
    const room = {
        slug: 'abc-123',
        name: 'Sprint Planning',
        votes: {},
        show: false,
    };

    it('renders the room name in the heading', () => {
        render(<Join room={room} />);

        expect(screen.getByText('Join Sprint Planning')).toBeInTheDocument();
    });

    it('renders the join form with name input', () => {
        render(<Join room={room} />);

        expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    });

    it('renders the join button', () => {
        render(<Join room={room} />);

        expect(
            screen.getByRole('button', { name: 'Join' }),
        ).toBeInTheDocument();
    });

    it('renders nothing when room is not provided', () => {
        const { container } = render(<Join />);

        expect(container.innerHTML).toBe('');
    });
});
