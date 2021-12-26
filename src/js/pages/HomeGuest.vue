<template>
  <b-container fluid class="main-unlogined">
    <b-row align-h="center">
        <b-col sm="9" md="7" lg="6" align-self="center">
            <img :src="main_image" />
        </b-col>
    </b-row>
    <b-row align-h="center">
        <b-col sm="12" align-self="center" class="image-container">
          <h1>程谱</h1>
          <h2>零基础起步的交互式教科书平台</h2>
        </b-col>
    </b-row>
    <b-row align-h="center">
        <b-col sm="6" md="4" lg="3" align-self="end">
          <b-form-select v-model="selected" size="lg" :options="options"></b-form-select>
        </b-col>
        <b-col sm="6" md="4" lg="3" align-self="start">
          <b-button variant="success" class="btn-green btn-start" @click="learn">
            开始学习
          </b-button>
        </b-col>
    </b-row>
  </b-container>
</template>
<style lang="scss" scoped>
@import "~sass/_variables.scss";

.main-unlogined {
  text-align:center;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  padding-top: 1%;
  margin: 0;
  h1 {
    font-size: 50px;
    color: #000000;
  }
  h2 {
    font-size: 32px;
    color: #787878;
  }
  @media (max-width: 575px) {
    h2 {
      font-size: 28px !important;
    }
  }
  img {
    box-shadow: 0 7px 7px 0 rgba(0,0,0,0.50);
    margin-bottom: 20px;
    /*@media screen and (orientation: portrait) {
      width: 100%;
    }
    @media screen and (orientation: landscape) {
      height: 100%;
    }*/
    width: 100%;
  }
  .btn {
    width: 250px;
    margin: 8px;
    border-radius: 5px;
    font-size: 22px;
  }
  .btn-green {
    background: #58B957;
    border: 1px solid #48AF46;
    color: #FFFFFF;
  }
  .btn-white {
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    color: #000000;
  }
}
</style>
<script>
  import main_image from 'images/preview.jpg';

  export default {
    data() {
      return {
        main_image: main_image,
        selected: "Programming_Beginning",
        options: [
          { value: 'Programming_Beginning', text: '编程入门教程' },

          {
            label: 'Java教程',
            options: [
              { value: 'Java_Beginning', text: 'Java入门教程' },
              { value: 'Java_Array_and_ArrayList', text: 'Java Array和ArrayList教程' },
              { value: 'Java_Algorithm_Basics', text: 'Java算法基础教程' },
              { value: 'Java_Object-oriented_Programming', text: 'Java面向对象编程教程'},
            ]
          },

          {
            label: 'Python教程',
            options: [
              { value: 'Python_Beginning', text: 'Python入门教程' },
              /* { value: 'Python_Object-oriented_Programming', text: 'Python面向对象编程教程'}, */
            ]
          },

          // { value: 'AP_Reference_Sheet', text: 'AP CS A 抱佛脚教程' },
        ]
      };
    },
    props: {
    },
    methods: {
      learn() {
        console.log(this.selected);
        location.href = `/learn#${this.selected}/0`;
      }
    },
    mounted() {
      this.$nextTick(function () {
        window.prerenderReady = true;
      });
    }
  }
</script>
