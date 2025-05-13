import { useState, useEffect } from "react"

const useDataFetcher = (fetchStrategy) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);
        fetchStrategy()
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [fetchStrategy])
    return { data, loading, error }
}
export default useDataFetcher