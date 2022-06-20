<template>
  <a  href="javascript:;" :content="title" >
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
  <!-- <el-tooltip  :content="title" placement="top">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </el-tooltip> -->
</template>

<script>
export default {
  name: '',
  props:['title']
}
</script>

<style>
  a {
    margin: 0 20px;
  }
</style>
