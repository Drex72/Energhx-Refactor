import React, { useState } from 'react'


export function useForm(initialState) {
    const [data, setData] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    return { data, setData, handleChange }
}

