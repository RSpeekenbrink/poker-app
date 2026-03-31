import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CreateRoomForm from '@/Pages/Rooms/Partials/CreateRoomForm';

const mockPost = vi.fn();

vi.mock('@inertiajs/react', () => ({
    useForm: () => ({
        data: { room_name: '', name: '' },
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

describe('CreateRoomForm', () => {
    it('renders room name and user name inputs', () => {
        render(<CreateRoomForm />);

        expect(screen.getByLabelText('Room Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    });

    it('renders the create button', () => {
        render(<CreateRoomForm />);

        expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    });

    it('renders the description text', () => {
        render(<CreateRoomForm />);

        expect(screen.getByText(/Create a new room, share the URL/)).toBeInTheDocument();
    });

    it('submits the form on button click', async () => {
        const user = userEvent.setup();

        render(<CreateRoomForm />);
        await user.click(screen.getByRole('button', { name: 'Create' }));

        expect(mockPost).toHaveBeenCalled();
    });
});
