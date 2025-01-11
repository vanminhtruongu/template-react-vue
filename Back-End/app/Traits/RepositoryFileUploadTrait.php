<?php

namespace App\Traits;

use App\Services\Interfaces\FileUploadServiceInterface;
use Illuminate\Http\UploadedFile;

trait RepositoryFileUploadTrait
{
    protected $fileUploadService;

    /**
     * Set the file upload service
     *
     * @param FileUploadServiceInterface $fileUploadService
     * @return void
     */
    public function setFileUploadService(FileUploadServiceInterface $fileUploadService)
    {
        $this->fileUploadService = $fileUploadService;
    }

    /**
     * Handle file upload in data array
     *
     * @param array $data
     * @param array $fileFields Configuration for file fields
     * @return array
     */
    protected function handleFileUploads(array $data, array $fileFields): array
    {
        if (!$this->fileUploadService) {
            throw new \RuntimeException('FileUploadService not set. Call setFileUploadService first.');
        }

        foreach ($fileFields as $field => $config) {
            if (!isset($data[$field]) || !$data[$field] instanceof UploadedFile) {
                continue;
            }

            $path = $config['path'] ?? 'uploads/' . strtolower(class_basename($this->model));
            $options = $config['options'] ?? [];

            $uploadedPath = $this->fileUploadService->upload($data[$field], $path, $options);
            
            if ($uploadedPath) {
                // Delete old file if exists
                if (isset($config['deleteOld']) && $config['deleteOld'] && isset($data['id'])) {
                    $oldRecord = $this->find($data['id']);
                    if ($oldRecord && $oldRecord->{$field}) {
                        $this->fileUploadService->delete($oldRecord->{$field});
                    }
                }
                
                $data[$field] = $uploadedPath;
            }
        }

        return $data;
    }

    /**
     * Handle multiple file uploads in data array
     *
     * @param array $data
     * @param array $fileFields Configuration for file fields
     * @return array
     */
    protected function handleMultipleFileUploads(array $data, array $fileFields): array
    {
        if (!$this->fileUploadService) {
            throw new \RuntimeException('FileUploadService not set. Call setFileUploadService first.');
        }

        foreach ($fileFields as $field => $config) {
            if (!isset($data[$field]) || !is_array($data[$field])) {
                continue;
            }

            $files = array_filter($data[$field], function ($file) {
                return $file instanceof UploadedFile;
            });

            if (empty($files)) {
                continue;
            }

            $path = $config['path'] ?? 'uploads/' . strtolower(class_basename($this->model));
            $options = $config['options'] ?? [];

            $uploadedPaths = $this->fileUploadService->uploadMultiple($files, $path, $options);
            
            if (!empty($uploadedPaths)) {
                // Delete old files if needed
                if (isset($config['deleteOld']) && $config['deleteOld'] && isset($data['id'])) {
                    $oldRecord = $this->find($data['id']);
                    if ($oldRecord && $oldRecord->{$field}) {
                        $oldFiles = is_string($oldRecord->{$field}) 
                            ? json_decode($oldRecord->{$field}, true) 
                            : $oldRecord->{$field};
                            
                        if (is_array($oldFiles)) {
                            foreach ($oldFiles as $oldFile) {
                                $this->fileUploadService->delete($oldFile);
                            }
                        }
                    }
                }
                
                $data[$field] = json_encode($uploadedPaths);
            }
        }

        return $data;
    }
} 