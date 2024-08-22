import { inject, defineProps, Reactive, watch } from "vue";

export function useOptions<T>(props: ReturnType<typeof defineProps>) {
  const controller = inject('controller') as Reactive<T>

  for (const key in props) {
    if ((props as Record<string, any>)[key] !== undefined) {
      (controller as Record<string, any>)[key] = (props as Record<string, any>)[key]
    }
  }

  return controller as T
}
