<template>
  <el-tooltip  :content="title" placement="top">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: '',
  props:['title']
}
</script>

<style lang="less" scoped>

</style>
