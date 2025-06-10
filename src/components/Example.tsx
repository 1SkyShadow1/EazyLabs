import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Example() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('your_table_name')
          .select('*')
        
        if (error) {
          throw error
        }
        
        if (data) {
          setData(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Your Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
} 