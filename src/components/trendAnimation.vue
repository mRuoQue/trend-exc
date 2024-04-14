<script setup lang="ts">

</script>

<template>
  <div class="container">
<div v-slide class="item">0</div>
<div v-slide class="item">1</div>
<div v-slide class="item">2</div>
<div v-slide class="item">3</div>
<div v-slide class="item">4</div>
<div v-slide class="item">5</div>
<div v-slide class="item">6</div>
<div v-slide class="item">7</div>
<div v-slide class="item">8</div>
<div v-slide class="item">9</div>   
</div>
</template>

<style scoped>

.container{
    display: flex;
    align-items: center;
    flex-direction: column;
}
    .item{
        width: 800px;
        height: 400px;
        background-color: #ccc;
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
