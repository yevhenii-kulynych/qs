import { useCallback } from 'react'

export const useHttp = () => {

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        
        try {

            const response = await fetch(url, {method, headers, body})

            const data = await response.json()

            return data

        } catch (e) {

            throw e
        }

        

    }, [])
    
    return { request }
}