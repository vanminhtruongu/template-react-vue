<?php

namespace App\Services\Interfaces;

use Illuminate\Http\UploadedFile;

interface FileUploadServiceInterface
{
    /**
     * Upload a single file
     *
     * @param UploadedFile $file
     * @param string $path
     * @param array $options
     * @return string|false
     */
    public function upload(UploadedFile $file, string $path, array $options = []);

    /**
     * Upload multiple files
     *
     * @param array $files
     * @param string $path
     * @param array $options
     * @return array
     */
    public function uploadMultiple(array $files, string $path, array $options = []);

    /**
     * Delete a file
     *
     * @param string $path
     * @return bool
     */
    public function delete(string $path): bool;
} 