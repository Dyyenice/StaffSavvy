<template>
<div class="form-row steps">
  <div class="card">
      <div class="card__side card__side--front" :style="{'background-image': `url(https://images.unsplash.com/photo-1574100004472-e536d3b6bacc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80)`, 'border': `0.4rem solid #fbdf7e`}" ></div>
      <div class="card__side card__side--back" :style="{'background-color': `black`, 'border': `0.4rem solid #fff`}" >
        <div>
         <h3 class="card__side__title">Manage Your Projects</h3>
          <p class="card__side__description" style="color: black;">Yousmdlkfsldsdlkmlksdmvslkmvlsmfvlfm</p>
        </div>
      </div>
    </div>
  <div class="card">
      <div class="card__side card__side--front" :style="{'background-image': `url(https://images.unsplash.com/photo-1620608968572-eb721f7851f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80)`, 'border': `0.4rem solid #fbdf7e`}" ></div>
      <div class="card__side card__side--back" :style="{'background-color': `black`, 'border': `0.4rem solid #fff`}" >
        <div>
         <h3 class="card__side__title">Follow Up Work</h3>
         <p class="card__side__description" style="color: black;">Yousmdlkfsldsdlkmlksdmvslkmvlsmfvlfm</p>
       </div>
      </div>
   </div>
  <div class="card">
    <div class="card__side card__side--front" :style="{'background-image': `url(https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80)`, 'border': `0.4rem solid #fbdf7e`}" ></div>
     <div class="card__side card__side--back" :style="{'background-color': `black`, 'border': `0.4rem solid #fff`}" >
       <div>
         <h3 class="card__side__title">Teamwork</h3>
         <p class="card__side__description" style="color: black;">Yousmdlkfsldsdlkmlksdmvslkmvlsmfvlfm</p>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card__side card__side--front" :style="{'background-image': `url(https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80)`, 'border': `0.4rem solid #fbdf7e`}" ></div>
     <div class="card__side card__side--back" :style="{'background-color': `black`, 'border': `0.4rem solid #fff`}" >
       <div>
         <h3 class="card__side__title">Efficient Work</h3>
         <p class="card__side__description" style="color: black;">Yousmdlkfsldsdlkmlksdmvslkmvlsmfvlfm</p>
      </div>
    </div>
  </div>
</div>

</template>


<style>
.card{
  background-color: #fff;
    position: relative; 
    width: auto;
    
}
.card__side {
  transition: all 0.8s ease;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  height: 25rem;
  cursor: pointer;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  position: relative;
  color: #fbdf7e;
  
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
.steps{
  margin-top: 10%;
}

</style>
