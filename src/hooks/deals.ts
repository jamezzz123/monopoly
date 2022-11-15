import { ref, onMounted, onUnmounted } from "vue";

// by convention, composable function names start with "use"
export function useDeals() {
  const deals = ref<null | { show: (agr: any) => null }>(null);

  function showDealsModal() {
    deals.value?.show("kdfkflkf");
  }

  return {
    deals,
    showDealsModal,
  };
}
