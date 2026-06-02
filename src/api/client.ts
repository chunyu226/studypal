const BASE_URL = '/api'

let accessToken: string | null = null
let refreshToken: string | null = localStorage.getItem('refresh_token')
let onAuthFailure: (() => void) | null = null

export function setTokens(access: string, refresh: string) {
  accessToken = access
  refreshToken = refresh
  localStorage.setItem('refresh_token', refresh)
}

export function clearTokens() {
  accessToken = null
  refreshToken = null
  localStorage.removeItem('refresh_token')
}

export function getAccessToken() {
  return accessToken
}

export function setOnAuthFailure(cb: () => void) {
  onAuthFailure = cb
}

async function refreshAccessToken(): Promise<string> {
  if (!refreshToken) throw new Error('No refresh token')
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })
  if (!res.ok) throw new Error('Refresh failed')
  const data = await res.json()
  accessToken = data.access_token
  refreshToken = data.refresh_token
  localStorage.setItem('refresh_token', data.refresh_token)
  return accessToken!
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  let res = await fetch(`${BASE_URL}${path}`, { ...options, headers })

  if (res.status === 401 && refreshToken) {
    try {
      await refreshAccessToken()
      headers['Authorization'] = `Bearer ${accessToken}`
      res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
    } catch {
      clearTokens()
      onAuthFailure?.()
    }
  }

  return res
}
