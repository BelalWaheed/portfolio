import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

describe('Input & Textarea Clean Code & RTL Support', () => {
  it('renders Input with dir="auto" for dynamic Arabic/RTL text detection', () => {
    render(<Input placeholder="Enter your name" label="Full Name" id="test-name" />);
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toHaveAttribute('dir', 'auto');
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
  });

  it('renders Textarea with dir="auto" for dynamic Arabic/RTL message detection', () => {
    render(<Textarea placeholder="Write a message" label="Message" id="test-msg" />);
    const textarea = screen.getByPlaceholderText('Write a message');
    expect(textarea).toHaveAttribute('dir', 'auto');
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('displays accessible error message on invalid input', () => {
    render(<Input placeholder="Email" error="Please enter a valid email" id="test-email" />);
    const errorMsg = screen.getByText('Please enter a valid email');
    expect(errorMsg).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
