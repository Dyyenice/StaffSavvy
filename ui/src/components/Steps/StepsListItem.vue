<template>
  <div class="card">
  <div class="card__side card__side--front" :style="{'background-image': `url(https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80)`, 'border': `0.4rem solid #065F9F`}" ></div>
  <div class="card__side card__side--back" :style="{'background-color': `#fff`, 'border': `0.4rem solid #065F9F`}" >
    <div>
      <h3 class="card__side__title">For Steps</h3>
      <p class="card__side__description">Yousmdlkfsldsdlkmlksdmvslkmvlsmfvlfm</p>
      
    </div>
  </div>
</div>
</template>

<script setup>


// const categoryItemLayerClass = reactive({
//   'category-style':
// })
</script>
<style>
.card {
    background-color: #fff; 
    position: relative; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 35px;
 
}

.card__side {
  transition: all 0.8s ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  height: 27rem;
  cursor: pointer;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  position: relative;
}

.card__side--front {
  position: absolute;
  top: 0;
  left: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  width: 100%;
}

.card__side--front:hover {
  transform: rotateY(-180deg);
}

.card__side--back {
  transform: rotateY(180deg);
}

.card__side--back:hover {
  transform: rotateY(0);
}

.card__side--back > div {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  max-width: 50%;
  margin: 0;
  padding: 0;
}

.card__side--back h3 {
  font-size: 1.6rem;
  text-align: center;
}

.card__side--back p {
  text-align: center;
  width: 100%;
}

.card:hover .card__side--front {
  transform: rotateY(-180deg);
}

.card:hover .card__side--back {
  transform: rotateY(0);
}

</style>
