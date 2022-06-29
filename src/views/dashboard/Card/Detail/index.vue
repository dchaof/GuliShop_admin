<template>
  <div>
    <div class="card-header">
      <span>{{title}}</span>
      <svg t="1656493792831" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2198" width="16" height="16"><path d="M512 853.333333a341.333333 341.333333 0 1 0 0-682.666666 341.333333 341.333333 0 0 0 0 682.666666z m0 85.333334C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m-42.666667-469.333334v256h85.333334v-256h-85.333334z m0-170.666666h85.333334v85.333333h-85.333334V298.666667z" fill="#bfbfbf" p-id="2199"></path></svg>
    </div>
    <div class="card-content">{{count}}</div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props:['title','count']
}
</script>

<style scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
  }
  .card-content {
    font-size: 30px;
    padding: 10px 0;
  }
  .card-charts {
    
    height: 50px;
  }
  .card-footer {
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
</style>
