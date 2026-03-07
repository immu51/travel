/**
 * GSAP + ScrollTrigger registration. Import once (e.g. in App or main) so scroll animations work.
 * Uses only transform + opacity for performance.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
