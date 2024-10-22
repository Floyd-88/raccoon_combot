import { ref } from "vue";

export function clickImage() {
  const tiltDirection = ref({ x: 0, y: 0 });

  const handleImageClick = (event: MouseEvent) => {
    
    const image = event.currentTarget as HTMLElement;
    const rect = image.getBoundingClientRect();

    // Рассчитываем положение клика относительно центра изображения
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const DEG = 30;

    // Правильное направление наклона
    const tiltX = y * DEG;  // Наклон вверх/вниз
    const tiltY = -x * DEG; // Наклон влево/вправо (инвертируем для интуитивного поведения)

    tiltDirection.value = { x: tiltX, y: tiltY };

    // Возвращаем картинку в исходное положение через 300 мс
    setTimeout(() => {
      tiltDirection.value = { x: 0, y: 0 };
    }, 300);
  };

  return {
    tiltDirection,
    handleImageClick,
  };
}
