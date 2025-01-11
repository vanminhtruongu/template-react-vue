<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait FileUploadTrait
{
    /**
     * Generate unique filename
     *
     * @param UploadedFile $file
     * @return string
     */
    protected function generateFileName(UploadedFile $file): string
    {
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $timestamp = now()->timestamp;
        $random = Str::random(8);
        
        return Str::slug($originalName) . '-' . $timestamp . '-' . $random . '.' . $extension;
    }

    /**
     * Get mime type validation rules
     *
     * @param string $type
     * @return array
     */
    protected function getMimeTypeRules(string $type = 'all'): array
    {
        $mimeTypes = [
            'image' => ['jpeg', 'png', 'jpg', 'gif', 'webp'],
            'document' => ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'],
            'video' => ['mp4', 'avi', 'mov', 'wmv'],
            'audio' => ['mp3', 'wav', 'ogg'],
        ];

        return $type === 'all' ? array_merge(...array_values($mimeTypes)) : ($mimeTypes[$type] ?? []);
    }

    /**
     * Validate file size
     *
     * @param UploadedFile $file
     * @param int $maxSize Size in MB
     * @return bool
     */
    protected function validateFileSize(UploadedFile $file, int $maxSize = 10): bool
    {
        return $file->getSize() <= ($maxSize * 1024 * 1024);
    }

    /**
     * Get storage disk
     *
     * @param string|null $disk
     * @return \Illuminate\Contracts\Filesystem\Filesystem
     */
    protected function getDisk(?string $disk = null)
    {
        return Storage::disk($disk ?? config('filesystems.default'));
    }
} 