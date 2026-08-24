// directives/viewport.ts
import type { Directive, DirectiveBinding } from 'vue'
import { nextTick } from 'vue'

// ========== 类型定义 ==========
export interface ViewportOptions {
  rootMargin?: string
  threshold?: number
  once?: boolean
  placeholderHeight?: string
  root?: HTMLElement | null
  placeholder?: string | (() => string)
  unmountOnLeave?: boolean
  [key: string]: any
}

interface ViewportInstance {
  el: HTMLElement
  observer: IntersectionObserver | null
  isVisible: { value: boolean }
  isRendered: { value: boolean }
  isDestroyed: { value: boolean }
  renderContent: () => void
  wrapper: HTMLDivElement
  config: Required<ViewportOptions>
}

interface ViewportEl extends HTMLElement {
  _viewportInstance?: {
    cleanup: () => void
    isVisible: { value: boolean }
    isRendered: { value: boolean }
    renderContent: () => void
    config: ViewportOptions
  }
  _viewportCleanup?: () => void
  _visibilityHandler?: () => void
  _resizeHandler?: () => void
}

// ========== 安全工具函数 ==========
const isBrowser = typeof window !== 'undefined'
const hasIntersectionObserver = isBrowser && 'IntersectionObserver' in window

// 全局实例池，用于内存管理
const instancePool = new Set<ViewportInstance>()

// ========== 默认占位HTML ==========
function getDefaultPlaceholder(height: string): string {
  const style = height !== 'auto' ? `height: ${height};` : ''
  return `
    <div class="viewport-placeholder" style="${style}">
      <div class="placeholder-content">
        <div class="placeholder-pulse" style="
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: placeholderPulse 1.5s ease-in-out infinite;
          width: 100%;
          height: ${height !== 'auto' ? height : '200px'};
          border-radius: 8px;
        "></div>
      </div>
    </div>
  `
}

// ========== 全局样式（只注入一次） ==========
if (isBrowser) {
  const styleId = 'viewport-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes placeholderPulse {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .viewport-container {
        position: relative;
      }
      .viewport-wrapper {
        transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
    `
    document.head.appendChild(style)
  }
}

// ========== Vue 自定义指令 ==========
export const viewport: Directive<ViewportEl, ViewportOptions> = {
  mounted(el: ViewportEl, binding: DirectiveBinding<ViewportOptions>) {
    // 安全防护：服务端渲染环境直接渲染
    if (!isBrowser) {
      el.style.opacity = '1'
      el.style.visibility = 'visible'
      return
    }

    const options = binding.value || {}
    const isVisible = { value: false }
    const isRendered = { value: false }
    const isDestroyed = { value: false }

    // 配置参数（带安全默认值）
    const config: Required<ViewportOptions> = {
      rootMargin: options.rootMargin || '50px',
      threshold: options.threshold || 0.1,
      once: options.once !== undefined ? options.once : true,
      placeholderHeight: options.placeholderHeight || 'auto',
      root: options.root || null,
      placeholder: options.placeholder ?? '',
      unmountOnLeave: options.unmountOnLeave ?? false,
      ...options,
    }

    // 创建占位容器
    const wrapper = document.createElement('div')
    wrapper.className = 'viewport-wrapper'
    wrapper.style.cssText = `
      min-height: ${config.placeholderHeight};
      transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      visibility: hidden;
      will-change: opacity;
      position: relative;
    `

    // 保存原始内容
    const originalContent = el.innerHTML
    const originalClasses = el.className

    // 清空元素并添加包装器
    el.innerHTML = ''
    el.className = `${originalClasses} viewport-container`
    el.appendChild(wrapper)

    // 缓存占位内容
    let placeholderHTML = ''

    // 安全获取占位内容
    if (options.placeholder) {
      if (typeof options.placeholder === 'function') {
        try {
          placeholderHTML = options.placeholder()
        } catch (error) {
          console.warn('[Viewport] 占位函数执行失败:', error)
          placeholderHTML = getDefaultPlaceholder(config.placeholderHeight)
        }
      } else if (typeof options.placeholder === 'string') {
        placeholderHTML = options.placeholder
      } else {
        placeholderHTML = getDefaultPlaceholder(config.placeholderHeight)
      }
    } else {
      placeholderHTML = getDefaultPlaceholder(config.placeholderHeight)
    }

    // 设置初始占位
    wrapper.innerHTML = placeholderHTML

    // 渲染函数
    const renderContent = () => {
      if (isDestroyed.value) return

      if (isVisible.value && !isRendered.value) {
        wrapper.innerHTML = originalContent
        wrapper.style.opacity = '1'
        wrapper.style.visibility = 'visible'
        isRendered.value = true

        // 触发自定义事件
        el.dispatchEvent(new CustomEvent('viewport-render', {
          detail: {
            visible: true,
            timestamp: Date.now(),
          },
        }))

        // 如果只渲染一次，停止观察
        if (config.once && observer) {
          observer.disconnect()
          observer = null
        }
      } else if (!isVisible.value && !config.once) {
        wrapper.style.opacity = '0'
        wrapper.style.visibility = 'hidden'

        // 如果配置了离开时移除内容
        if (options.unmountOnLeave) {
          wrapper.innerHTML = placeholderHTML
          isRendered.value = false
        }

        el.dispatchEvent(new CustomEvent('viewport-hide', {
          detail: {
            visible: false,
            timestamp: Date.now(),
          },
        }))
      }
    }

    // 观察器回调
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isDestroyed.value) return

      try {
        const [entry] = entries
        const newVisible = entry.isIntersecting

        // 只在状态变化时更新
        if (newVisible !== isVisible.value) {
          isVisible.value = newVisible
          void nextTick(renderContent)
        }
      } catch (error) {
        console.warn('[Viewport] 观察器回调错误:', error)
        // 降级方案：直接渲染
        isVisible.value = true
        void nextTick(renderContent)
      }
    }

    // 创建观察器（带降级方案）
    let observer: IntersectionObserver | null = null

    if (hasIntersectionObserver) {
      try {
        observer = new IntersectionObserver(handleIntersection, {
          root: config.root,
          rootMargin: config.rootMargin,
          threshold: config.threshold,
        })
        observer.observe(el)
      } catch (error) {
        console.warn('[Viewport] 创建观察器失败，使用降级方案:', error)
        // 降级：直接渲染
        isVisible.value = true
        void nextTick(renderContent)
      }
    } else {
      // 不支持观察器的降级方案
      console.warn('[Viewport] 浏览器不支持IntersectionObserver，降级为立即渲染')
      isVisible.value = true
      void nextTick(renderContent)
    }

    // 保存实例引用
    const instance: ViewportInstance = {
      el,
      observer,
      isVisible,
      isRendered,
      isDestroyed,
      renderContent,
      wrapper,
      config,
    }
    instancePool.add(instance)

    // 清理函数
    const cleanup = () => {
      if (isDestroyed.value) return
      isDestroyed.value = true

      if (observer) {
        try {
          observer.disconnect()
        } catch (error) {
          // 忽略断开连接错误
        }
        observer = null
      }

      // 从池中移除
      instancePool.delete(instance)

      // 清理DOM引用
      if (el) {
        el._viewportInstance = undefined
      }
    }

    // 在元素上存储实例引用，用于调试
    el._viewportInstance = {
      cleanup,
      isVisible,
      isRendered,
      renderContent,
      config,
    }

    // 监听元素移除（Vue自动调用unmounted）
    el._viewportCleanup = cleanup

    // 安全处理：页面可见性变化时重新检查
    if (isBrowser) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible' && !isDestroyed.value) {
          // 重新检查可见性
        }
      }
      document.addEventListener('visibilitychange', handleVisibilityChange)
      el._visibilityHandler = handleVisibilityChange
    }

    // 安全处理：窗口大小变化时重新检查
    if (isBrowser && !config.once) {
      const handleResize = () => {
        if (!isDestroyed.value && observer) {
          // 触发重新检查
          observer.disconnect()
          observer.observe(el)
        }
      }
      window.addEventListener('resize', handleResize)
      el._resizeHandler = handleResize
    }
  },

  unmounted(el: ViewportEl) {
    // 安全清理
    try {
      if (el._viewportCleanup) {
        el._viewportCleanup()
      }
      if (el._visibilityHandler) {
        document.removeEventListener('visibilitychange', el._visibilityHandler)
      }
      if (el._resizeHandler) {
        window.removeEventListener('resize', el._resizeHandler)
      }
      // 清理元素引用
      el._viewportInstance = undefined
      el._viewportCleanup = undefined
      el._visibilityHandler = undefined
      el._resizeHandler = undefined
    } catch (error) {
      console.warn('[Viewport] 清理时发生错误:', error)
    }
  },
}

// ========== 工具函数：手动触发渲染 ==========
export function forceRenderViewport(el: HTMLElement): void {
  const vEl = el as ViewportEl
  if (vEl && vEl._viewportInstance) {
    vEl._viewportInstance.isVisible.value = true
    vEl._viewportInstance.renderContent()
  }
}

// ========== 工具函数：批量渲染 ==========
export function renderAllViewports(): void {
  instancePool.forEach((instance) => {
    if (!instance.isDestroyed.value) {
      instance.isVisible.value = true
      instance.renderContent()
    }
  })
}

// ========== 工具函数：获取统计信息 ==========
export function getViewportStats() {
  let total = 0
  let rendered = 0
  let visible = 0

  instancePool.forEach((instance) => {
    total++
    if (instance.isRendered.value) rendered++
    if (instance.isVisible.value) visible++
  })

  return {
    total,
    rendered,
    visible,
    pending: total - rendered,
  }
}
