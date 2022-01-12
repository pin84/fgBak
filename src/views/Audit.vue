<template>
  <div id="audit">

      这是审核页面
  </div>
</template>

<script>
export default {
  created() {
    this.init();
  },

  methods: {
    init() {
      console.log("audit");
    },
  },
};
</script>

<style lang="scss" scoped>
#audit {
//   border: 1px solid red;
padding: 20px;
}
</style>