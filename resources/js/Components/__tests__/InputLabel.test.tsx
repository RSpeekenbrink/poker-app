import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InputLabel from '@/Components/InputLabel';

describe('InputLabel', () => {
    it('renders the value prop as label text', () => {
        render(<InputLabel value="Room Name" />);

        expect(screen.getByText('Room Name')).toBeInTheDocument();
    });

    it('renders children when no value prop', () => {
        render(<InputLabel>Your Name</InputLabel>);

        expect(screen.getByText('Your Name')).toBeInTheDocument();
    });

    it('prefers value over children', () => {
        render(<InputLabel value="Value Text">Children Text</InputLabel>);

        expect(screen.getByText('Value Text')).toBeInTheDocument();
        expect(screen.queryByText('Children Text')).not.toBeInTheDocument();
    });

    it('renders as a label element', () => {
        render(<InputLabel value="Test" />);

        expect(screen.getByText('Test').tagName).toBe('LABEL');
    });

    it('passes htmlFor to the label', () => {
        render(<InputLabel htmlFor="name" value="Name" />);

        expect(screen.getByText('Name')).toHaveAttribute('for', 'name');
    });

    it('appends custom className', () => {
        render(<InputLabel value="Test" className="mt-2" />);

        expect(screen.getByText('Test')).toHaveClass('mt-2');
    });
});
