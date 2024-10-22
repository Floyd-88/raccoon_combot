import { ref } from "vue";

export function useFloatingText() {
  const floatingText = ref<{ x: number; y: number; visible: boolean }[]>([]);

  function showFloatingText(event: MouseEvent) {
    const { clientX, clientY } = event;
    floatingText.value.push({ x: clientX, y: clientY, visible: true });

    setTimeout(() => {
      floatingText.value.shift();
    }, 1000);
  }

  return { floatingText, showFloatingText };
}