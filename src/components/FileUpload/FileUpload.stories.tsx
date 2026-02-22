import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { UploadedFile } from './FileUpload';
import { FileUpload } from './FileUpload';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFilesChange: (files) => console.log('Files:', files),
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024,
  },
};

export const SingleFile: Story = {
  args: {
    onFilesChange: (files) => console.log('Files:', files),
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  },
};

export const ImagesOnly: Story = {
  args: {
    onFilesChange: (files) => console.log('Files:', files),
    maxFiles: 5,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
  },
};

export const Interactive: Story = {
  args: {
    onFilesChange: (files) => console.log('Files:', files),
    maxFiles: 5,
  },
  render: (args) => {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div>
        <FileUpload onFilesChange={setFiles} maxFiles={args.maxFiles} />
        {files.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <p>Uploaded {files.length} file(s)</p>
            <ul>
              {files.map((file) => (
                <li key={file.id}>
                  {file.file.name} - {(file.file.size / 1024).toFixed(1)} KB
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const SmallLimit: Story = {
  args: {
    onFilesChange: (files) => console.log('Files:', files),
    maxFiles: 3,
    maxSize: 1 * 1024 * 1024, // 1MB
  },
};
