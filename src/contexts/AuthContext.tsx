import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { apiFetch, setTokens, clearTokens, getAccessToken, setOnAuthFailure } from '../api/client'

interface User {
  id: string
  email: string
  name: string
  avatar_url: string | null
  streak_days: number
  level: number
}

interface AuthState {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchProfile = useCallback(async () => {
    const res = await apiFetch('/users/me')
    if (!res.ok) throw new Error('Failed to fetch profile')
    return res.json()
  }, [])

  const restoreSession = useCallback(async () => {
    const stored = localStorage.getItem('refresh_token')
    if (!stored) {
      setIsLoading(false)
      return
    }
    try {
      const refreshRes = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: stored }),
      })
      if (!refreshRes.ok) throw new Error('Session expired')
      const tokens = await refreshRes.json()
      setTokens(tokens.access_token, tokens.refresh_token)
      const profile = await fetchProfile()
      setUser(profile)
    } catch {
      clearTokens()
    } finally {
      setIsLoading(false)
    }
  }, [fetchProfile])

  useEffect(() => {
    setOnAuthFailure(() => {
      setUser(null)
      clearTokens()
    })
    restoreSession()
  }, [restoreSession])

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.detail || '登录失败')
    }
    const data = await res.json()
    setTokens(data.access_token, data.refresh_token)
    setUser(data.user)
  }, [])

  const register = useCallback(async (email: string, password: string, name: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.detail || '注册失败')
    }
    const data = await res.json()
    setTokens(data.access_token, data.refresh_token)
    setUser(data.user)
  }, [])

  const logout = useCallback(() => {
    clearTokens()
    setUser(null)
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!getAccessToken()) return
    try {
      const profile = await fetchProfile()
      setUser(profile)
    } catch {
      // silently ignore
    }
  }, [fetchProfile])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
