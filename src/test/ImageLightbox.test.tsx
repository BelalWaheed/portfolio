import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ImageLightbox } from '@/components/ui/ImageLightbox';

const MOCK_IMAGES = [
  '/projects/tivaq/1.webp',
  '/projects/tivaq/2.webp',
  '/projects/tivaq/3.webp',
];

describe('ImageLightbox Component Tests', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <ImageLightbox
        isOpen={false}
        images={MOCK_IMAGES}
        activeIndex={0}
        title="Tivaq Platform"
        onClose={vi.fn()}
        onIndexChange={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders active image and controls when isOpen is true', () => {
    const handleClose = vi.fn();
    const handleIndexChange = vi.fn();
    render(
      <ImageLightbox
        isOpen={true}
        images={MOCK_IMAGES}
        activeIndex={1}
        title="Tivaq Platform"
        onClose={handleClose}
        onIndexChange={handleIndexChange}
      />
    );

    expect(screen.getByText(/Tivaq Platform/i)).toBeInTheDocument();
    expect(screen.getByText(/Capture 2 of 3/i)).toBeInTheDocument();

    const closeBtn = screen.getByLabelText(/close lightbox/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('supports thumbnail click to switch images', () => {
    const handleIndexChange = vi.fn();
    render(
      <ImageLightbox
        isOpen={true}
        images={MOCK_IMAGES}
        activeIndex={0}
        title="Tivaq Platform"
        onClose={vi.fn()}
        onIndexChange={handleIndexChange}
      />
    );

    const thumbnailBtn = screen.getByLabelText('Jump to screenshot 3');
    expect(thumbnailBtn).toBeInTheDocument();

    fireEvent.click(thumbnailBtn);
    expect(handleIndexChange).toHaveBeenCalledWith(2);
  });
});
