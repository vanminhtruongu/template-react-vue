<?php

namespace App\Repositories;

use App\Repositories\Interfaces\BaseRepositoryInterface;
use App\Traits\RepositoryFileUploadTrait;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements BaseRepositoryInterface
{
    use RepositoryFileUploadTrait;

    protected $model;
    protected $fileFields = [];
    protected $multipleFileFields = [];

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        $data = $this->handleFileUploads($data, $this->fileFields);
        $data = $this->handleMultipleFileUploads($data, $this->multipleFileFields);
        
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $data['id'] = $id; // Add id for old file deletion reference
        $data = $this->handleFileUploads($data, $this->fileFields);
        $data = $this->handleMultipleFileUploads($data, $this->multipleFileFields);
        unset($data['id']); // Remove id after file handling
        
        $record = $this->find($id);
        return $record->update($data);
    }

    public function delete($id)
    {
        $record = $this->find($id);
        
        // Delete associated files
        if ($record) {
            foreach ($this->fileFields as $field => $config) {
                if ($record->{$field}) {
                    $this->fileUploadService?->delete($record->{$field});
                }
            }
            
            foreach ($this->multipleFileFields as $field => $config) {
                if ($record->{$field}) {
                    $files = is_string($record->{$field}) 
                        ? json_decode($record->{$field}, true) 
                        : $record->{$field};
                        
                    if (is_array($files)) {
                        foreach ($files as $file) {
                            $this->fileUploadService?->delete($file);
                        }
                    }
                }
            }
        }
        
        return $this->model->destroy($id);
    }
} 