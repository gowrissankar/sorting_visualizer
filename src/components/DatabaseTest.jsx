import { useEffect, useState } from 'react'
import { testConnection } from '../services/supabaseClient'

export default function DatabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState('Testing connection...')

  useEffect(() => {
    const testDB = async () => {
      try {
        console.log('Environment check:')
        console.log('- Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
        console.log('- API Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
        
        const result = await testConnection()
        setConnectionStatus(result.success ? `✅ ${result.message}` : `❌ ${result.message}`)
      } catch (error) {
        setConnectionStatus(`❌ Error: ${error.message}`)
        console.error('Connection test failed:', error)
      }
    }
    
    testDB()
  }, [])

  return (
    <div className="mb-8 p-6 bg-visualizer-bg-secondary rounded-lg border border-visualizer-bg-dark">
      <h2 className="text-xl font-semibold text-visualizer-text-primary mb-4">
        🔗 Database Connection Test
      </h2>
      <div className="space-y-2">
        <p className="text-visualizer-text-primary font-medium">{connectionStatus}</p>
        <div className="text-sm text-visualizer-text-secondary space-y-1">
          <p>URL: {import.meta.env.VITE_SUPABASE_URL || 'Not loaded'}</p>
          <p>Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Loaded ✅' : 'Not loaded ❌'}</p>
        </div>
      </div>
      <div className="mt-3 text-xs text-visualizer-text-secondary">
        <p>This test will be removed after database integration is complete.</p>
      </div>
    </div>
  )
}
