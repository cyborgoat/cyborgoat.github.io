---
title: Real-time Web Applications with Next.js and WebSockets
date: '2025-05-08'
author: Cyborgoat
authorImage: /images/authors/cyborgoat-avatar.png
tags:
  - Web Development
excerpt: Building real-time web applications using Next.js and WebSocket technology.
video: 'https://www.youtube.com/watch?v=J0ZM8QzgYwA'
thumbnail: >-
  https://images.unsplash.com/photo-1525338078858-d762b5e32f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDg4MDd8MHwxfHNlYXJjaHwyfHxhaXxlbnwwfHx8fDE3NDY4MDQwNDN8MA&ixlib=rb-4.1.0&q=80&w=1080
---

Real-time features like chat, notifications, and live updates require persistent connections. Here's how to implement
them:

## WebSocket Server Setup

```typescript
// app/api/ws/route.ts
import { WebSocketServer } from 'ws'

export const dynamic = 'force-dynamic'

const wss = new WebSocketServer({ noServer: true })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    broadcast(message.toString())
  })
})

function broadcast(data: string) {
  wss.clients.forEach(client => {
    client.send(data)
  })
}
```

## Client-side Connection

```typescript
// components/RealTimeClient.tsx
'use client'
import { useEffect } from 'react'

export default function RealTimeClient() {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/api/ws')
    
    ws.onmessage = (event) => {
      console.log('Received:', event.data)
    }
    
    return () => ws.close()
  }, [])

  return <div>Real-time connection established</div>
}
```

**Key Considerations**:

1. Production-grade scaling with Redis Pub/Sub
2. Connection health monitoring
3. Security with JWT authentication
