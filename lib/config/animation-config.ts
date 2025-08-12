// Advanced Animation Configuration System

export interface AnimationConfig {
  // Global Animation Settings
  animation?: boolean
  animationThreshold?: number
  animationDuration?: number | AnimationDurationCallback
  animationEasing?: EasingType | EasingFunction
  animationDelay?: number | AnimationDelayCallback
  
  // Update Animation
  animationDurationUpdate?: number | AnimationDurationCallback
  animationEasingUpdate?: EasingType | EasingFunction
  animationDelayUpdate?: number | AnimationDelayCallback
  
  // Progressive Rendering
  progressive?: number
  progressiveThreshold?: number
  progressiveChunkMode?: 'sequential' | 'mod'
  
  // State Transition
  stateAnimation?: {
    duration?: number
    easing?: EasingType
    delay?: number
  }
  
  // Universal Transition
  universalTransition?: {
    enabled?: boolean
    duration?: number
    easing?: EasingType
    delay?: number
    seriesKey?: string | string[]
    divideShape?: 'clone' | 'split'
  }
  
  // Blend Mode
  blendMode?: BlendModeType
  
  // Hover Layer
  hoverLayerThreshold?: number
  
  // Use UTC
  useUTC?: boolean
}

export type EasingType =
  // Basic
  | 'linear'
  // Quad
  | 'quadraticIn'
  | 'quadraticOut'
  | 'quadraticInOut'
  // Cubic
  | 'cubicIn'
  | 'cubicOut'
  | 'cubicInOut'
  // Quart
  | 'quarticIn'
  | 'quarticOut'
  | 'quarticInOut'
  // Quint
  | 'quinticIn'
  | 'quinticOut'
  | 'quinticInOut'
  // Sine
  | 'sinusoidalIn'
  | 'sinusoidalOut'
  | 'sinusoidalInOut'
  // Expo
  | 'exponentialIn'
  | 'exponentialOut'
  | 'exponentialInOut'
  // Circ
  | 'circularIn'
  | 'circularOut'
  | 'circularInOut'
  // Elastic
  | 'elasticIn'
  | 'elasticOut'
  | 'elasticInOut'
  // Back
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  // Bounce
  | 'bounceIn'
  | 'bounceOut'
  | 'bounceInOut'

export type BlendModeType =
  | 'source-over'
  | 'source-in'
  | 'source-out'
  | 'source-atop'
  | 'destination-over'
  | 'destination-in'
  | 'destination-out'
  | 'destination-atop'
  | 'lighter'
  | 'copy'
  | 'xor'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity'

export type AnimationDurationCallback = (idx: number) => number
export type AnimationDelayCallback = (idx: number, params?: any) => number
export type EasingFunction = (t: number) => number

// Series-specific Animation Configuration
export interface SeriesAnimationConfig {
  animationDuration?: number
  animationEasing?: EasingType
  animationDelay?: number | ((dataIndex: number, params: any) => number)
  
  // Enter Animation
  animationEnter?: {
    type?: 'expand' | 'scale' | 'fade' | 'slide' | 'zoom' | 'rotate'
    from?: AnimationFromConfig
    duration?: number
    easing?: EasingType
    delay?: number
  }
  
  // Leave Animation
  animationLeave?: {
    type?: 'collapse' | 'scale' | 'fade' | 'slide' | 'zoom' | 'rotate'
    to?: AnimationToConfig
    duration?: number
    easing?: EasingType
    delay?: number
  }
  
  // Update Animation
  animationUpdate?: {
    type?: 'transition' | 'morph' | 'combine' | 'separate'
    duration?: number
    easing?: EasingType
    delay?: number
  }
}

export interface AnimationFromConfig {
  opacity?: number
  scale?: number | [number, number]
  position?: [number, number]
  rotation?: number
  skew?: [number, number]
}

export interface AnimationToConfig {
  opacity?: number
  scale?: number | [number, number]
  position?: [number, number]
  rotation?: number
  skew?: [number, number]
}

// Animation Timeline
export interface AnimationTimeline {
  id: string
  name: string
  duration: number
  tracks: AnimationTrack[]
  loop?: boolean
  autoPlay?: boolean
  playbackRate?: number
}

export interface AnimationTrack {
  id: string
  target: string // Element selector or ID
  property: AnimationProperty
  keyframes: Keyframe[]
  easing?: EasingType
  delay?: number
  duration?: number
  loop?: boolean | number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
}

export type AnimationProperty =
  | 'x'
  | 'y'
  | 'scaleX'
  | 'scaleY'
  | 'rotation'
  | 'opacity'
  | 'width'
  | 'height'
  | 'radius'
  | 'color'
  | 'backgroundColor'
  | 'borderColor'
  | 'borderWidth'
  | 'shadowBlur'
  | 'shadowColor'
  | 'shadowOffsetX'
  | 'shadowOffsetY'
  | 'text'
  | 'fontSize'
  | 'lineHeight'
  | 'path'
  | 'points'

export interface Keyframe {
  time: number // 0-1 normalized time
  value: any
  easing?: EasingType
}

// Animation Controller
export class AnimationController {
  private timelines: Map<string, AnimationTimeline> = new Map()
  private activeAnimations: Map<string, Animation> = new Map()
  private rafId: number | null = null
  private startTime: number = 0
  private pausedTime: number = 0
  private isPaused: boolean = false
  private playbackRate: number = 1
  
  // Create Timeline
  createTimeline(config: Partial<AnimationTimeline>): AnimationTimeline {
    const timeline: AnimationTimeline = {
      id: this.generateId(),
      name: config.name || 'Timeline',
      duration: config.duration || 1000,
      tracks: config.tracks || [],
      loop: config.loop || false,
      autoPlay: config.autoPlay || false,
      playbackRate: config.playbackRate || 1
    }
    
    this.timelines.set(timeline.id, timeline)
    
    if (timeline.autoPlay) {
      this.playTimeline(timeline.id)
    }
    
    return timeline
  }
  
  // Add Track to Timeline
  addTrack(timelineId: string, track: AnimationTrack): void {
    const timeline = this.timelines.get(timelineId)
    if (!timeline) throw new Error('Timeline not found')
    
    timeline.tracks.push(track)
  }
  
  // Play Timeline
  playTimeline(timelineId: string): void {
    const timeline = this.timelines.get(timelineId)
    if (!timeline) throw new Error('Timeline not found')
    
    const animation = new Animation(timeline, this.playbackRate)
    this.activeAnimations.set(timelineId, animation)
    
    if (!this.rafId) {
      this.startAnimationLoop()
    }
  }
  
  // Pause Timeline
  pauseTimeline(timelineId: string): void {
    const animation = this.activeAnimations.get(timelineId)
    if (animation) {
      animation.pause()
    }
  }
  
  // Resume Timeline
  resumeTimeline(timelineId: string): void {
    const animation = this.activeAnimations.get(timelineId)
    if (animation) {
      animation.resume()
    }
  }
  
  // Stop Timeline
  stopTimeline(timelineId: string): void {
    const animation = this.activeAnimations.get(timelineId)
    if (animation) {
      animation.stop()
      this.activeAnimations.delete(timelineId)
    }
    
    if (this.activeAnimations.size === 0 && this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }
  
  // Seek Timeline
  seekTimeline(timelineId: string, time: number): void {
    const animation = this.activeAnimations.get(timelineId)
    if (animation) {
      animation.seek(time)
    }
  }
  
  // Set Playback Rate
  setPlaybackRate(rate: number): void {
    this.playbackRate = rate
    this.activeAnimations.forEach(animation => {
      animation.setPlaybackRate(rate)
    })
  }
  
  // Animation Loop
  private startAnimationLoop(): void {
    this.startTime = performance.now()
    
    const animate = (currentTime: number) => {
      if (this.isPaused) {
        this.pausedTime = currentTime - this.startTime
        return
      }
      
      const elapsed = currentTime - this.startTime - this.pausedTime
      
      this.activeAnimations.forEach((animation, id) => {
        animation.update(elapsed)
        
        if (animation.isComplete() && !animation.isLooping()) {
          this.activeAnimations.delete(id)
        }
      })
      
      if (this.activeAnimations.size > 0) {
        this.rafId = requestAnimationFrame(animate)
      } else {
        this.rafId = null
      }
    }
    
    this.rafId = requestAnimationFrame(animate)
  }
  
  // Pause All
  pauseAll(): void {
    this.isPaused = true
    this.activeAnimations.forEach(animation => animation.pause())
  }
  
  // Resume All
  resumeAll(): void {
    this.isPaused = false
    this.activeAnimations.forEach(animation => animation.resume())
    if (!this.rafId && this.activeAnimations.size > 0) {
      this.startAnimationLoop()
    }
  }
  
  // Stop All
  stopAll(): void {
    this.activeAnimations.forEach(animation => animation.stop())
    this.activeAnimations.clear()
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }
  
  // Get Timeline
  getTimeline(timelineId: string): AnimationTimeline | undefined {
    return this.timelines.get(timelineId)
  }
  
  // Get All Timelines
  getAllTimelines(): AnimationTimeline[] {
    return Array.from(this.timelines.values())
  }
  
  // Delete Timeline
  deleteTimeline(timelineId: string): void {
    this.stopTimeline(timelineId)
    this.timelines.delete(timelineId)
  }
  
  // Export Timeline
  exportTimeline(timelineId: string): string {
    const timeline = this.timelines.get(timelineId)
    if (!timeline) throw new Error('Timeline not found')
    
    return JSON.stringify(timeline, null, 2)
  }
  
  // Import Timeline
  importTimeline(json: string): AnimationTimeline {
    const config = JSON.parse(json)
    return this.createTimeline(config)
  }
  
  private generateId(): string {
    return `timeline-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// Animation Class
class Animation {
  private timeline: AnimationTimeline
  private currentTime: number = 0
  private isPlaying: boolean = true
  private isPaused: boolean = false
  private playbackRate: number = 1
  private loopCount: number = 0
  
  constructor(timeline: AnimationTimeline, playbackRate: number = 1) {
    this.timeline = timeline
    this.playbackRate = playbackRate * (timeline.playbackRate || 1)
  }
  
  update(elapsed: number): void {
    if (!this.isPlaying || this.isPaused) return
    
    this.currentTime += elapsed * this.playbackRate
    
    if (this.currentTime >= this.timeline.duration) {
      if (this.timeline.loop) {
        this.currentTime = this.currentTime % this.timeline.duration
        this.loopCount++
      } else {
        this.currentTime = this.timeline.duration
        this.isPlaying = false
      }
    }
    
    this.updateTracks()
  }
  
  private updateTracks(): void {
    const normalizedTime = this.currentTime / this.timeline.duration
    
    this.timeline.tracks.forEach(track => {
      this.updateTrack(track, normalizedTime)
    })
  }
  
  private updateTrack(track: AnimationTrack, time: number): void {
    // Find current keyframes
    let prevKeyframe: Keyframe | null = null
    let nextKeyframe: Keyframe | null = null
    
    for (let i = 0; i < track.keyframes.length; i++) {
      const keyframe = track.keyframes[i]
      if (keyframe.time <= time) {
        prevKeyframe = keyframe
      }
      if (keyframe.time >= time && !nextKeyframe) {
        nextKeyframe = keyframe
        break
      }
    }
    
    if (prevKeyframe && nextKeyframe && prevKeyframe !== nextKeyframe) {
      // Interpolate between keyframes
      const progress = (time - prevKeyframe.time) / (nextKeyframe.time - prevKeyframe.time)
      const easedProgress = this.applyEasing(progress, nextKeyframe.easing || track.easing || 'linear')
      const value = this.interpolate(prevKeyframe.value, nextKeyframe.value, easedProgress)
      
      // Apply value to target
      this.applyValue(track.target, track.property, value)
    } else if (prevKeyframe) {
      // Use previous keyframe value
      this.applyValue(track.target, track.property, prevKeyframe.value)
    }
  }
  
  private applyEasing(t: number, easing: EasingType): number {
    // Implement easing functions
    switch (easing) {
      case 'linear':
        return t
      case 'quadraticIn':
        return t * t
      case 'quadraticOut':
        return t * (2 - t)
      case 'quadraticInOut':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      case 'cubicIn':
        return t * t * t
      case 'cubicOut':
        return (--t) * t * t + 1
      case 'cubicInOut':
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      // Add more easing functions...
      default:
        return t
    }
  }
  
  private interpolate(start: any, end: any, progress: number): any {
    if (typeof start === 'number' && typeof end === 'number') {
      return start + (end - start) * progress
    }
    // Add more interpolation types (colors, arrays, etc.)
    return start
  }
  
  private applyValue(target: string, property: AnimationProperty, value: any): void {
    // Apply value to target element
    // This would integrate with the chart instance
  }
  
  pause(): void {
    this.isPaused = true
  }
  
  resume(): void {
    this.isPaused = false
  }
  
  stop(): void {
    this.isPlaying = false
    this.currentTime = 0
  }
  
  seek(time: number): void {
    this.currentTime = Math.max(0, Math.min(time, this.timeline.duration))
    this.updateTracks()
  }
  
  setPlaybackRate(rate: number): void {
    this.playbackRate = rate * (this.timeline.playbackRate || 1)
  }
  
  isComplete(): boolean {
    return !this.isPlaying && this.currentTime >= this.timeline.duration
  }
  
  isLooping(): boolean {
    return this.timeline.loop || false
  }
}

// Animation Presets
export const ANIMATION_PRESETS = {
  fadeIn: {
    duration: 1000,
    tracks: [{
      id: 'fade',
      target: '*',
      property: 'opacity' as AnimationProperty,
      keyframes: [
        { time: 0, value: 0 },
        { time: 1, value: 1 }
      ],
      easing: 'cubicOut' as EasingType
    }]
  },
  
  slideIn: {
    duration: 1000,
    tracks: [{
      id: 'slide',
      target: '*',
      property: 'x' as AnimationProperty,
      keyframes: [
        { time: 0, value: -100 },
        { time: 1, value: 0 }
      ],
      easing: 'cubicOut' as EasingType
    }]
  },
  
  zoomIn: {
    duration: 1000,
    tracks: [{
      id: 'zoom',
      target: '*',
      property: 'scaleX' as AnimationProperty,
      keyframes: [
        { time: 0, value: 0 },
        { time: 1, value: 1 }
      ],
      easing: 'elasticOut' as EasingType
    }]
  },
  
  rotate: {
    duration: 2000,
    loop: true,
    tracks: [{
      id: 'rotate',
      target: '*',
      property: 'rotation' as AnimationProperty,
      keyframes: [
        { time: 0, value: 0 },
        { time: 1, value: 360 }
      ],
      easing: 'linear' as EasingType
    }]
  },
  
  bounce: {
    duration: 1000,
    tracks: [{
      id: 'bounce',
      target: '*',
      property: 'y' as AnimationProperty,
      keyframes: [
        { time: 0, value: 0 },
        { time: 0.5, value: -30 },
        { time: 1, value: 0 }
      ],
      easing: 'bounceOut' as EasingType
    }]
  },
  
  pulse: {
    duration: 1000,
    loop: true,
    tracks: [{
      id: 'pulse',
      target: '*',
      property: 'scaleX' as AnimationProperty,
      keyframes: [
        { time: 0, value: 1 },
        { time: 0.5, value: 1.1 },
        { time: 1, value: 1 }
      ],
      easing: 'sinusoidalInOut' as EasingType
    }]
  }
}

// Export singleton
export const animationController = new AnimationController()