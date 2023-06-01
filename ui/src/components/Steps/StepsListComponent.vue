<template>
    <div class="category__list">
    <StepsListItem >İzlenecek Adımlar</StepsListItem>
    </div>

</template>

<script setup>
import StepsListItem from './StepsListItem.vue';


// const categoryList = inject("CategoryListData");
</script>
<style>
.category__list {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2.4rem;
}
.category__title {
    font-size: 3.2rem;
    font-weight: 500;
    font-style: italic;
    text-align: center;
    margin-bottom: 3.6rem;
  }

  .category__title span {
    color: #fff;
    font-weight: 800;
  }

</style>