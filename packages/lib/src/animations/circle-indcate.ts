import type { Widget } from '@vue-motion/core'
import { defineAnimation } from '@vue-motion/core'
import { interpolator } from '../interpolator'
import type { Positional } from './move'

export const circleIndicate = (defineAnimation<{
  color?: string
  scale?: number
  circle?: SVGCircleElement
}, Positional & Widget>((context, progress) => {
  if (progress === 0) {
    context.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    context.circle.setAttribute('fill', 'none')
    context.circle.setAttribute('stroke', context.color || 'yellow')
    context.circle.setAttribute('stroke-width', '5')
    context.circle.setAttribute('cx', (context.target.x ?? 0).toString())
    context.circle.setAttribute('cy', (context.target.y ?? 0).toString())
    const bounds = context.target.element!.getBoundingClientRect()
    context.circle.setAttribute('r', Math.max(bounds.width / 2, bounds.height / 2).toString())
    context.target.element!.appendChild(context.circle)
  }
  if (progress >= 0 && progress <= 0.3) {
    context.circle!.style.opacity = interpolator(0, 1, 1 - progress).toString()
    context.circle!.removeAttribute('transform')
    context.circle!.setAttribute('transform', `scale(${interpolator(0.5, context.scale || 1.5, 1 - progress)})`)
    //
  }
  if (progress >= 0.7 && progress <= 1) {
    context.circle!.style.opacity = interpolator(0, 1, 1 - progress).toString()
    context.circle!.removeAttribute('transform')
    context.circle!.setAttribute('transform', `scale(${interpolator(0.5, context.scale || 1.5, progress)})`)
  }
}))
