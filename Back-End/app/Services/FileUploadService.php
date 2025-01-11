<?php

namespace App\Services;

use App\Traits\FileUploadTrait;
use Illuminate\Http\UploadedFile;
use App\Services\Interfaces\FileUploadServiceInterface;
use Illuminate\Support\Facades\Log;

class FileUploadService implements FileUploadServiceInterface
{
    use FileUploadTrait;

    /**
     * Upload a single file
     *
     * @param UploadedFile $file
     * @param string $path
     * @param array $options
     * @return string|false
     */
    public function upload(UploadedFile $file, string $path, array $options = [])
    {
        try {
            $fileName = $options['fileName'] ?? $this->generateFileName($file);
            $disk = $options['disk'] ?? null;
            
            // Validate file size if maxSize is provided
            if (isset($options['maxSize']) && !$this->validateFileSize($file, $options['maxSize'])) {
                throw new \Exception('File size exceeds maximum limit');
            }

            // Validate mime type if type is provided
            if (isset($options['type']) && !in_array($file->extension(), $this->getMimeTypeRules($options['type']))) {
                throw new \Exception('Invalid file type');
            }

            $fullPath = trim($path, '/') . '/' . $fileName;
            
            // Store the file
            $this->getDisk($disk)->put($fullPath, file_get_contents($file));
            
            return $fullPath;
        } catch (\Exception $e) {
            Log::error('File upload failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Upload multiple files
     *
     * @param array $files
     * @param string $path
     * @param array $options
     * @return array
     */
    public function uploadMultiple(array $files, string $path, array $options = []): array
    {
        $uploadedFiles = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $result = $this->upload($file, $path, $options);
                if ($result) {
                    $uploadedFiles[] = $result;
                }
            }
        }

        return $uploadedFiles;
    }

    /**
     * Delete a file
     *
     * @param string $path
     * @return bool
     */
    public function delete(string $path): bool
    {
        try {
            return $this->getDisk()->delete($path);
        } catch (\Exception $e) {
            Log::error('File deletion failed: ' . $e->getMessage());
            return false;
        }
    }
} 