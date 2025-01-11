import { useEffect, useRef, useState } from 'react'
import useLoading from '../hooks/useLoading'
import { Button } from 'primereact/button'
import FormInput from '../components/common/FormInput'

const Home = () => {
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Welcome to Library App</h1>
        </div>
    )
}

export default Home 