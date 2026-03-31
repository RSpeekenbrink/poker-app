import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Index from '@/Pages/Rooms/Index';

vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
    useForm: () => ({
        data: { room_name: '', name: '' },
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

describe('Index', () => {
    it('renders the create room heading', () => {
        render(<Index />);

        expect(screen.getByText('Create a room')).toBeInTheDocument();
    });

    it('renders the create room form', () => {
        render(<Index />);

        expect(screen.getByLabelText('Room Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    });

    it('displays error message when provided', () => {
        render(<Index error="The room you tried to join doesn't exist. Please create a new one." />);

        expect(screen.getByRole('alert')).toHaveTextContent("The room you tried to join doesn't exist");
    });

    it('does not display error alert when no error', () => {
        render(<Index />);

        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
});
