/**
 * ImageSearchUpload Component Tests
 *
 * Tests for the image upload component including file validation logic.
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageSearchUpload, validateImageFile } from '../ImageSearchUpload';

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('validateImageFile', () => {
  const createMockFile = (name: string, size: number, type: string): File => {
    const file = new File([''], name, { type });
    Object.defineProperty(file, 'size', { value: size });
    return file;
  };

  describe('file type validation', () => {
    it('should accept JPEG files', () => {
      const file = createMockFile('test.jpg', 1024, 'image/jpeg');
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should accept PNG files', () => {
      const file = createMockFile('test.png', 1024, 'image/png');
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
    });

    it('should accept WebP files', () => {
      const file = createMockFile('test.webp', 1024, 'image/webp');
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
    });

    it('should reject GIF files', () => {
      const file = createMockFile('test.gif', 1024, 'image/gif');
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid file type');
    });

    it('should reject BMP files', () => {
      const file = createMockFile('test.bmp', 1024, 'image/bmp');
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
    });

    it('should reject SVG files', () => {
      const file = createMockFile('test.svg', 1024, 'image/svg+xml');
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
    });

    it('should reject non-image files', () => {
      const file = createMockFile('test.pdf', 1024, 'application/pdf');
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
    });

    it('should accept custom allowed types', () => {
      const file = createMockFile('test.gif', 1024, 'image/gif');
      const result = validateImageFile(file, 5 * 1024 * 1024, ['image/gif']);
      expect(result.valid).toBe(true);
    });
  });

  describe('file size validation', () => {
    const MB = 1024 * 1024;

    it('should accept files under 5MB', () => {
      const file = createMockFile('test.jpg', 4 * MB, 'image/jpeg');
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
    });

    it('should accept files exactly at 5MB', () => {
      const file = createMockFile('test.jpg', 5 * MB, 'image/jpeg');
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
    });

    it('should reject files over 5MB', () => {
      const file = createMockFile('test.jpg', 5 * MB + 1, 'image/jpeg');
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('exceeds');
    });

    it('should reject very large files', () => {
      const file = createMockFile('test.jpg', 100 * MB, 'image/jpeg');
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
    });

    it('should accept custom max size', () => {
      const file = createMockFile('test.jpg', 15 * MB, 'image/jpeg');
      const result = validateImageFile(file, 20 * MB);
      expect(result.valid).toBe(true);
    });

    it('should reject files over custom max size', () => {
      const file = createMockFile('test.jpg', 3 * MB, 'image/jpeg');
      const result = validateImageFile(file, 2 * MB);
      expect(result.valid).toBe(false);
    });
  });

  describe('combined validation', () => {
    it('should reject invalid type even if size is valid', () => {
      const file = createMockFile('test.gif', 1024, 'image/gif');
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid file type');
    });

    it('should reject oversized file even if type is valid', () => {
      const file = createMockFile('test.jpg', 10 * 1024 * 1024, 'image/jpeg');
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('exceeds');
    });
  });
});

describe('ImageSearchUpload Component', () => {
  const mockOnImageSelect = jest.fn();
  const mockOnClear = jest.fn();

  const createMockFile = (name: string, size: number, type: string): File => {
    const file = new File(['test'], name, { type });
    Object.defineProperty(file, 'size', { value: size });
    return file;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render upload area when no preview', () => {
    render(<ImageSearchUpload onImageSelect={mockOnImageSelect} onClear={mockOnClear} />);

    expect(screen.getByText(/Click to upload/)).toBeInTheDocument();
    expect(screen.getByText(/drag and drop/)).toBeInTheDocument();
  });

  it('should render preview when previewUrl is provided', () => {
    render(
      <ImageSearchUpload
        onImageSelect={mockOnImageSelect}
        onClear={mockOnClear}
        previewUrl="https://example.com/image.jpg"
      />,
    );

    expect(screen.getByAltText('Search image preview')).toBeInTheDocument();
    expect(screen.queryByText(/Click to upload/)).not.toBeInTheDocument();
  });

  it('should show loading state', () => {
    render(
      <ImageSearchUpload
        onImageSelect={mockOnImageSelect}
        onClear={mockOnClear}
        previewUrl="https://example.com/image.jpg"
        isLoading={true}
      />,
    );

    expect(screen.getByText(/Searching for similar products/)).toBeInTheDocument();
  });

  it('should call onClear when clear button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ImageSearchUpload
        onImageSelect={mockOnImageSelect}
        onClear={mockOnClear}
        previewUrl="https://example.com/image.jpg"
      />,
    );

    const clearButton = screen.getByLabelText('Clear image');
    await user.click(clearButton);

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it('should display validation error for invalid file type', async () => {
    const user = userEvent.setup();

    render(<ImageSearchUpload onImageSelect={mockOnImageSelect} onClear={mockOnClear} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const invalidFile = createMockFile('test.gif', 1024, 'image/gif');

    await user.upload(input, invalidFile);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Invalid file type/);
    });
    expect(mockOnImageSelect).not.toHaveBeenCalled();
  });

  it('should display validation error for oversized file', async () => {
    const user = userEvent.setup();

    render(<ImageSearchUpload onImageSelect={mockOnImageSelect} onClear={mockOnClear} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const oversizedFile = createMockFile('test.jpg', 10 * 1024 * 1024, 'image/jpeg');

    await user.upload(input, oversizedFile);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/exceeds/);
    });
    expect(mockOnImageSelect).not.toHaveBeenCalled();
  });

  it('should call onImageSelect for valid file', async () => {
    const user = userEvent.setup();

    render(<ImageSearchUpload onImageSelect={mockOnImageSelect} onClear={mockOnClear} />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const validFile = createMockFile('test.jpg', 1024, 'image/jpeg');

    await user.upload(input, validFile);

    await waitFor(() => {
      expect(mockOnImageSelect).toHaveBeenCalledWith(validFile);
    });
  });

  it('should display external error prop', () => {
    render(
      <ImageSearchUpload onImageSelect={mockOnImageSelect} onClear={mockOnClear} error="External error message" />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('External error message');
  });

  it('should show custom max size in help text', () => {
    render(<ImageSearchUpload onImageSelect={mockOnImageSelect} onClear={mockOnClear} maxSizeMB={10} />);

    expect(screen.getByText(/max 10MB/)).toBeInTheDocument();
  });

  it('should handle drag and drop', async () => {
    render(<ImageSearchUpload onImageSelect={mockOnImageSelect} onClear={mockOnClear} />);

    const dropZone = screen.getByRole('button', { name: /Upload image for search/ });
    const validFile = createMockFile('test.jpg', 1024, 'image/jpeg');

    const dataTransfer = {
      files: [validFile],
      items: [{ kind: 'file', type: 'image/jpeg', getAsFile: () => validFile }],
      types: ['Files'],
    };

    fireEvent.dragOver(dropZone, { dataTransfer });
    fireEvent.drop(dropZone, { dataTransfer });

    await waitFor(() => {
      expect(mockOnImageSelect).toHaveBeenCalledWith(validFile);
    });
  });
});
