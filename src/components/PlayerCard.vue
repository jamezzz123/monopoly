<template>
  <div
    class="bg-white border-4 flex font-extralight rounded-md shadow my-2"
    :class="[active ? 'border-green-300' : 'border-white']"
  >
    <img class="px-1" style="width: 50px" :src="image" alt="" />
    <div class="flex flex-col w-full">
      <h6>Name: {{ name }}</h6>
      <h6>Amount: {{ amount }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
