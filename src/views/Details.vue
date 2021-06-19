<template>
  <div class="main">
    <div class="details">
      <img
        v-bind:src="'http://image.tmdb.org/t/p/original' + items.backdrop_path"
        alt=""
      />
      <img
        class="posterImage"
        v-bind:src="'http://image.tmdb.org/t/p/w500' + items.poster_path"
        alt=""
      />
      <h2>{{ items.title }}</h2>
      <p>[{{ items.original_language }}] {{ items.release_date }}</p>
      <div class="votes">
        <p1 v-if="items.vote_average != '0'">{{ items.vote_average }}</p1>
        <p1 v-if="items.vote_average == '0'">NR</p1>
      </div>
      <p class="tagline">{{ items.tagline }}</p>
      <h3>Overview</h3>
      <p class="overview">{{ items.overview }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/index.js";
import { getID } from "@/plugins/getMovieDetails.js";

export default {
  name: "Details",
  data() {
    return {
      items: "",
    };
  },
  mounted() {
    console.log(getID());
    axios
      .get(
        process.env.VUE_APP_BASE_URL +
          "/movie/" +
          getID() +
          "?api_key=" +
          process.env.VUE_APP_KEY
      )
      .then(
        (response) => ((this.items = response.data), console.log(this.items))
      );
  },
  methods: {
    goBack() {
      router.push("/");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  font-family: "Source Sans Pro", Arial, sans-serif;
  display: inline-flex;
}
.details {
  position: relative;
  img {
    margin-left: -10px;
    filter: brightness(20%);
  }
  .posterImage {
    position: absolute;
    top: 150px;
    left: 50px;
    width: 400px;
    filter: brightness(100%);
    border-radius: 10px;
  }
  h2 {
    position: absolute;
    top: 200px;
    left: 500px;
    color: white;
    font-size: 45px;
  }
  h3 {
    position: absolute;
    top: 500px;
    left: 500px;
    color: white;
    font-size: 45px;
  }
  p {
    position: absolute;
    top: 280px;
    left: 500px;
    color: white;
    font-size: 20px;
    font-weight: 100;
  }
  .overview {
    width: 1000px;
    top: 600px;
    left: 500px;
    color: white;
    font-size: 20px;
    font-weight: 100;
  }
  .tagline {
    position: absolute;
    width: 1000px;
    top: 470px;
    left: 500px;
    color: white;
    font-size: 20px;
    font-weight: 100;
    font-style: italic;
  }
  .votes {
    background: rgb(9, 28, 34);
    border: solid 1px white;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 350px;
    left: 500px;
    color: white;
    font-size: 20px;
    font-weight: 100;
    p1 {
      width: auto;
      color: white;
      font-weight: 600;
      font-size: 40px;
      top: 280px;
      left: 500px;
      color: white;
    }
  }
}
</style>
