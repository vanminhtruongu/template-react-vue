import { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import bookService from '../services/book.service'

const Books = () => {
    const [books, setBooks] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState(0)
    const [loading, setLoading] = useState(false)

    const loadBooks = async (page = 1) => {
        try {
            const response = await bookService.getBooks(page)
            setBooks(response.data)
            setTotalRecords(response.total)
        } catch (error) {
            console.error('Error loading books:', error)
        }
    }

    const handleSearch = async () => {
        if (searchQuery.trim()) {
            try {
                const response = await bookService.searchBooks(searchQuery)
                setBooks(response.data)
                setTotalRecords(response.total)
            } catch (error) {
                console.error('Error searching books:', error)
            }
        } else {
            loadBooks()
        }
    }

    const handleDelete = async (id) => {
        try {
            await bookService.deleteBook(id)
            loadBooks(currentPage)
        } catch (error) {
            console.error('Error deleting book:', error)
        }
    }

    useEffect(() => {
        loadBooks()
    }, [])

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button 
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-success p-button-text" 
                />
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-danger p-button-text"
                    onClick={() => handleDelete(rowData.id)}
                />
            </div>
        )
    }

    return (
        <div className="card">
            <div className="flex justify-between mb-4">
                <div className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search books..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                </div>
                <Button 
                    label="Add Book" 
                    icon="pi pi-plus"
                    className="p-button-success" 
                />
            </div>

            <DataTable 
                value={books}
                paginator
                rows={10}
                totalRecords={totalRecords}
                lazy
                first={(currentPage - 1) * 10}
                onPage={(e) => {
                    setCurrentPage(e.page + 1)
                    loadBooks(e.page + 1)
                }}
                loading={loading}
            >
                <Column field="title" header="Title" sortable />
                <Column field="author" header="Author" sortable />
                <Column field="category" header="Category" sortable />
                <Column field="status" header="Status" sortable />
                <Column body={actionBodyTemplate} exportable={false} style={{ width: '8rem' }} />
            </DataTable>
        </div>
    )
}

export default Books 