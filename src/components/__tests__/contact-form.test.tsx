import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactForm from '../contact-form';

describe('ContactForm', () => {
  it('renders fields and action buttons', () => {
    render(<ContactForm />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByText('Summarize brief')).toBeInTheDocument();
    expect(screen.getByText('Submit brief')).toBeInTheDocument();
  });
});
