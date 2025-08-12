// Real-time Collaboration Manager
import { EventEmitter } from 'events'

export interface CollaborationConfig {
  serverUrl?: string
  roomId?: string
  userId?: string
  userName?: string
  userColor?: string
  enablePresence?: boolean
  enableCursors?: boolean
  enableSelection?: boolean
  enableComments?: boolean
  enableVersioning?: boolean
  autoReconnect?: boolean
  reconnectInterval?: number
  maxReconnectAttempts?: number
}

export interface User {
  id: string
  name: string
  email?: string
  avatar?: string
  color: string
  isOnline: boolean
  lastSeen?: Date
  cursor?: CursorPosition
  selection?: Selection
  permissions?: UserPermissions
}

export interface CursorPosition {
  x: number
  y: number
  elementId?: string
  timestamp: number
}

export interface Selection {
  elementId: string
  type: 'chart' | 'config' | 'data'
  details?: any
}

export interface UserPermissions {
  canEdit: boolean
  canComment: boolean
  canShare: boolean
  canExport: boolean
  canDelete: boolean
  isOwner: boolean
}

export interface CollaborationEvent {
  type: CollaborationEventType
  userId: string
  timestamp: Date
  data: any
}

export type CollaborationEventType =
  | 'user:joined'
  | 'user:left'
  | 'user:updated'
  | 'cursor:moved'
  | 'selection:changed'
  | 'chart:updated'
  | 'config:updated'
  | 'data:updated'
  | 'comment:added'
  | 'comment:updated'
  | 'comment:deleted'
  | 'version:created'
  | 'version:restored'

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  timestamp: Date
  elementId?: string
  position?: { x: number; y: number }
  resolved: boolean
  replies?: Comment[]
  mentions?: string[]
  attachments?: Attachment[]
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  thumbnailUrl?: string
}

export interface Version {
  id: string
  name: string
  description?: string
  userId: string
  userName: string
  timestamp: Date
  snapshot: any
  tags?: string[]
  isAutoSave: boolean
}

export interface Conflict {
  id: string
  type: 'data' | 'config' | 'chart'
  localValue: any
  remoteValue: any
  userId: string
  userName: string
  timestamp: Date
  resolution?: 'local' | 'remote' | 'merge'
}

export class CollaborationManager extends EventEmitter {
  private ws: WebSocket | null = null
  private config: CollaborationConfig
  private users: Map<string, User> = new Map()
  private comments: Map<string, Comment> = new Map()
  private versions: Version[] = []
  private pendingChanges: any[] = []
  private isConnected: boolean = false
  private reconnectAttempts: number = 0
  private reconnectTimer: NodeJS.Timeout | null = null
  private heartbeatTimer: NodeJS.Timeout | null = null
  private conflictQueue: Conflict[] = []
  
  constructor(config: CollaborationConfig) {
    super()
    this.config = {
      serverUrl: config.serverUrl || 'wss://collaboration.example.com',
      autoReconnect: true,
      reconnectInterval: 5000,
      maxReconnectAttempts: 10,
      enablePresence: true,
      enableCursors: true,
      enableSelection: true,
      enableComments: true,
      enableVersioning: true,
      ...config
    }
  }
  
  // Connection Management
  async connect(): Promise<void> {
    if (this.isConnected) return
    
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(
          `${this.config.serverUrl}/room/${this.config.roomId}?userId=${this.config.userId}`
        )
        
        this.ws.onopen = () => {
          this.isConnected = true
          this.reconnectAttempts = 0
          this.startHeartbeat()
          this.sendPendingChanges()
          this.emit('connected')
          resolve()
        }
        
        this.ws.onmessage = (event) => {
          this.handleMessage(JSON.parse(event.data))
        }
        
        this.ws.onerror = (error) => {
          this.emit('error', error)
          reject(error)
        }
        
        this.ws.onclose = () => {
          this.isConnected = false
          this.stopHeartbeat()
          this.emit('disconnected')
          
          if (this.config.autoReconnect && this.reconnectAttempts < this.config.maxReconnectAttempts!) {
            this.scheduleReconnect()
          }
        }
      } catch (error) {
        reject(error)
      }
    })
  }
  
  disconnect(): void {
    this.config.autoReconnect = false
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.isConnected = false
    this.stopHeartbeat()
  }
  
  private scheduleReconnect(): void {
    this.reconnectAttempts++
    this.reconnectTimer = setTimeout(() => {
      this.emit('reconnecting', this.reconnectAttempts)
      this.connect().catch(() => {
        // Reconnection failed, will retry
      })
    }, this.config.reconnectInterval! * Math.pow(2, Math.min(this.reconnectAttempts - 1, 5)))
  }
  
  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: 'ping' })
    }, 30000)
  }
  
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }
  
  // Message Handling
  private handleMessage(message: any): void {
    switch (message.type) {
      case 'user:joined':
        this.handleUserJoined(message.data)
        break
      case 'user:left':
        this.handleUserLeft(message.data)
        break
      case 'user:updated':
        this.handleUserUpdated(message.data)
        break
      case 'cursor:moved':
        this.handleCursorMoved(message.data)
        break
      case 'selection:changed':
        this.handleSelectionChanged(message.data)
        break
      case 'chart:updated':
        this.handleChartUpdated(message.data)
        break
      case 'config:updated':
        this.handleConfigUpdated(message.data)
        break
      case 'data:updated':
        this.handleDataUpdated(message.data)
        break
      case 'comment:added':
        this.handleCommentAdded(message.data)
        break
      case 'comment:updated':
        this.handleCommentUpdated(message.data)
        break
      case 'comment:deleted':
        this.handleCommentDeleted(message.data)
        break
      case 'version:created':
        this.handleVersionCreated(message.data)
        break
      case 'conflict:detected':
        this.handleConflictDetected(message.data)
        break
      case 'users:list':
        this.handleUsersList(message.data)
        break
      case 'comments:list':
        this.handleCommentsList(message.data)
        break
      case 'versions:list':
        this.handleVersionsList(message.data)
        break
      case 'pong':
        // Heartbeat response
        break
    }
  }
  
  // User Management
  private handleUserJoined(user: User): void {
    this.users.set(user.id, user)
    this.emit('user:joined', user)
  }
  
  private handleUserLeft(userId: string): void {
    const user = this.users.get(userId)
    if (user) {
      user.isOnline = false
      user.lastSeen = new Date()
      this.emit('user:left', user)
    }
  }
  
  private handleUserUpdated(user: User): void {
    this.users.set(user.id, user)
    this.emit('user:updated', user)
  }
  
  private handleUsersList(users: User[]): void {
    this.users.clear()
    users.forEach(user => this.users.set(user.id, user))
    this.emit('users:updated', Array.from(this.users.values()))
  }
  
  // Cursor and Selection
  private handleCursorMoved(data: { userId: string; cursor: CursorPosition }): void {
    const user = this.users.get(data.userId)
    if (user) {
      user.cursor = data.cursor
      this.emit('cursor:moved', { user, cursor: data.cursor })
    }
  }
  
  private handleSelectionChanged(data: { userId: string; selection: Selection }): void {
    const user = this.users.get(data.userId)
    if (user) {
      user.selection = data.selection
      this.emit('selection:changed', { user, selection: data.selection })
    }
  }
  
  // Chart Updates
  private handleChartUpdated(data: any): void {
    this.emit('chart:updated', data)
  }
  
  private handleConfigUpdated(data: any): void {
    this.emit('config:updated', data)
  }
  
  private handleDataUpdated(data: any): void {
    this.emit('data:updated', data)
  }
  
  // Comments
  private handleCommentAdded(comment: Comment): void {
    this.comments.set(comment.id, comment)
    this.emit('comment:added', comment)
  }
  
  private handleCommentUpdated(comment: Comment): void {
    this.comments.set(comment.id, comment)
    this.emit('comment:updated', comment)
  }
  
  private handleCommentDeleted(commentId: string): void {
    const comment = this.comments.get(commentId)
    if (comment) {
      this.comments.delete(commentId)
      this.emit('comment:deleted', comment)
    }
  }
  
  private handleCommentsList(comments: Comment[]): void {
    this.comments.clear()
    comments.forEach(comment => this.comments.set(comment.id, comment))
    this.emit('comments:updated', Array.from(this.comments.values()))
  }
  
  // Versions
  private handleVersionCreated(version: Version): void {
    this.versions.push(version)
    this.emit('version:created', version)
  }
  
  private handleVersionsList(versions: Version[]): void {
    this.versions = versions
    this.emit('versions:updated', versions)
  }
  
  // Conflict Resolution
  private handleConflictDetected(conflict: Conflict): void {
    this.conflictQueue.push(conflict)
    this.emit('conflict:detected', conflict)
  }
  
  async resolveConflict(conflictId: string, resolution: 'local' | 'remote' | 'merge', mergedValue?: any): Promise<void> {
    const conflict = this.conflictQueue.find(c => c.id === conflictId)
    if (!conflict) return
    
    conflict.resolution = resolution
    
    let resolvedValue: any
    switch (resolution) {
      case 'local':
        resolvedValue = conflict.localValue
        break
      case 'remote':
        resolvedValue = conflict.remoteValue
        break
      case 'merge':
        resolvedValue = mergedValue || this.autoMerge(conflict.localValue, conflict.remoteValue)
        break
    }
    
    this.send({
      type: 'conflict:resolved',
      data: {
        conflictId,
        resolution,
        value: resolvedValue
      }
    })
    
    // Remove from queue
    this.conflictQueue = this.conflictQueue.filter(c => c.id !== conflictId)
    this.emit('conflict:resolved', { conflict, resolution, value: resolvedValue })
  }
  
  private autoMerge(localValue: any, remoteValue: any): any {
    // Simple merge strategy - can be enhanced
    if (typeof localValue === 'object' && typeof remoteValue === 'object') {
      return { ...remoteValue, ...localValue }
    }
    return localValue // Default to local
  }
  
  // Sending Updates
  private send(message: any): void {
    if (this.isConnected && this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else {
      this.pendingChanges.push(message)
    }
  }
  
  private sendPendingChanges(): void {
    while (this.pendingChanges.length > 0) {
      const change = this.pendingChanges.shift()
      this.send(change)
    }
  }
  
  // Public API
  updateCursor(position: CursorPosition): void {
    if (!this.config.enableCursors) return
    
    this.send({
      type: 'cursor:move',
      data: {
        userId: this.config.userId,
        cursor: position
      }
    })
  }
  
  updateSelection(selection: Selection): void {
    if (!this.config.enableSelection) return
    
    this.send({
      type: 'selection:change',
      data: {
        userId: this.config.userId,
        selection
      }
    })
  }
  
  updateChart(changes: any): void {
    this.send({
      type: 'chart:update',
      data: {
        userId: this.config.userId,
        changes,
        timestamp: new Date()
      }
    })
  }
  
  updateConfig(path: string, value: any): void {
    this.send({
      type: 'config:update',
      data: {
        userId: this.config.userId,
        path,
        value,
        timestamp: new Date()
      }
    })
  }
  
  updateData(changes: any): void {
    this.send({
      type: 'data:update',
      data: {
        userId: this.config.userId,
        changes,
        timestamp: new Date()
      }
    })
  }
  
  // Comments API
  async addComment(comment: Omit<Comment, 'id' | 'userId' | 'userName' | 'timestamp'>): Promise<Comment> {
    if (!this.config.enableComments) {
      throw new Error('Comments are disabled')
    }
    
    const newComment: Comment = {
      ...comment,
      id: this.generateId(),
      userId: this.config.userId!,
      userName: this.config.userName!,
      timestamp: new Date(),
      resolved: false,
      replies: []
    }
    
    this.send({
      type: 'comment:add',
      data: newComment
    })
    
    return newComment
  }
  
  async updateComment(commentId: string, updates: Partial<Comment>): Promise<void> {
    const comment = this.comments.get(commentId)
    if (!comment) throw new Error('Comment not found')
    
    if (comment.userId !== this.config.userId) {
      throw new Error('Cannot update comment from another user')
    }
    
    this.send({
      type: 'comment:update',
      data: {
        commentId,
        updates
      }
    })
  }
  
  async deleteComment(commentId: string): Promise<void> {
    const comment = this.comments.get(commentId)
    if (!comment) throw new Error('Comment not found')
    
    if (comment.userId !== this.config.userId) {
      throw new Error('Cannot delete comment from another user')
    }
    
    this.send({
      type: 'comment:delete',
      data: { commentId }
    })
  }
  
  async replyToComment(parentId: string, content: string): Promise<Comment> {
    const parent = this.comments.get(parentId)
    if (!parent) throw new Error('Parent comment not found')
    
    const reply: Comment = {
      id: this.generateId(),
      userId: this.config.userId!,
      userName: this.config.userName!,
      content,
      timestamp: new Date(),
      resolved: false
    }
    
    this.send({
      type: 'comment:reply',
      data: {
        parentId,
        reply
      }
    })
    
    return reply
  }
  
  resolveComment(commentId: string): void {
    this.updateComment(commentId, { resolved: true })
  }
  
  unresolveComment(commentId: string): void {
    this.updateComment(commentId, { resolved: false })
  }
  
  // Versioning API
  async createVersion(name: string, description?: string): Promise<Version> {
    if (!this.config.enableVersioning) {
      throw new Error('Versioning is disabled')
    }
    
    const version: Version = {
      id: this.generateId(),
      name,
      description,
      userId: this.config.userId!,
      userName: this.config.userName!,
      timestamp: new Date(),
      snapshot: await this.captureSnapshot(),
      isAutoSave: false
    }
    
    this.send({
      type: 'version:create',
      data: version
    })
    
    return version
  }
  
  async restoreVersion(versionId: string): Promise<void> {
    const version = this.versions.find(v => v.id === versionId)
    if (!version) throw new Error('Version not found')
    
    this.send({
      type: 'version:restore',
      data: { versionId }
    })
  }
  
  private async captureSnapshot(): Promise<any> {
    // Capture current state - this would be implemented based on your state management
    return {
      chart: {},
      config: {},
      data: []
    }
  }
  
  // Presence API
  getOnlineUsers(): User[] {
    return Array.from(this.users.values()).filter(u => u.isOnline)
  }
  
  getUser(userId: string): User | undefined {
    return this.users.get(userId)
  }
  
  getAllUsers(): User[] {
    return Array.from(this.users.values())
  }
  
  // Comments API
  getComments(elementId?: string): Comment[] {
    const comments = Array.from(this.comments.values())
    if (elementId) {
      return comments.filter(c => c.elementId === elementId)
    }
    return comments
  }
  
  getUnresolvedComments(): Comment[] {
    return Array.from(this.comments.values()).filter(c => !c.resolved)
  }
  
  // Versions API
  getVersions(): Version[] {
    return this.versions
  }
  
  getVersion(versionId: string): Version | undefined {
    return this.versions.find(v => v.id === versionId)
  }
  
  // Utility
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
  
  // Cleanup
  destroy(): void {
    this.disconnect()
    this.removeAllListeners()
    this.users.clear()
    this.comments.clear()
    this.versions = []
    this.pendingChanges = []
    this.conflictQueue = []
  }
}

// Collaboration Hooks for React
export function useCollaboration(config: CollaborationConfig) {
  const [collaboration, setCollaboration] = useState<CollaborationManager | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [versions, setVersions] = useState<Version[]>([])
  const [isConnected, setIsConnected] = useState(false)
  
  useEffect(() => {
    const manager = new CollaborationManager(config)
    
    manager.on('connected', () => setIsConnected(true))
    manager.on('disconnected', () => setIsConnected(false))
    manager.on('users:updated', setUsers)
    manager.on('comments:updated', setComments)
    manager.on('versions:updated', setVersions)
    
    manager.connect().catch(console.error)
    setCollaboration(manager)
    
    return () => {
      manager.destroy()
    }
  }, [config])
  
  return {
    collaboration,
    users,
    comments,
    versions,
    isConnected
  }
}

// Export singleton for global access
let collaborationInstance: CollaborationManager | null = null

export function initializeCollaboration(config: CollaborationConfig): CollaborationManager {
  if (collaborationInstance) {
    collaborationInstance.destroy()
  }
  collaborationInstance = new CollaborationManager(config)
  return collaborationInstance
}

export function getCollaboration(): CollaborationManager | null {
  return collaborationInstance
}

// Import React hooks
import { useState, useEffect } from 'react'