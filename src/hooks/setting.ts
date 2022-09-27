import { useSettings } from "@/store/settings";
import { computed } from "vue";

export function useSettingsComposable() {
  const settings = useSettings();

  const toggleGrayScale = computed(() => {
    return settings.gary_board;
  });

  return {
    toggleGrayScale,
  };
}
