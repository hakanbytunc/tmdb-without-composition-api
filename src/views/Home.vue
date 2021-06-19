<template>
  <v-app id="body">
    <v-container v-if="!isLoading">
      <v-container class="heroSection">
        <v-col align="center" justify="center">
          <v-row>
            <v-col>
              <h2 class="heroMainTitle">
                Welcome.
              </h2>
              <h2 class="heroSubTitle">
                Millions of movies, TV shows and people to discover. Explore
                now.
              </h2>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <div class="hero-search">
            <form>
              <input
                type="text"
                placeholder="Search your favorite movie :)"
                v-model="query"
                @keyup="getResult(query)"
              />
            </form>
          </div>
        </v-col>
      </v-container>
      <div>
        <h2 v-if="query != ''">Results for "{{ query }}"</h2>
        <v-btn
          v-if="query == ''"
          elevation="4"
          outlined
          :disabled="currentLetter == '97'"
          :loading="isLoading"
          @click="previousPage"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <v-btn
          v-if="query == ''"
          elevation="4"
          outlined
          :disabled="currentLetter == '123'"
          :loading="isLoading"
          @click="nextPage"
          style="float:right"
          ><v-icon>mdi-arrow-right</v-icon></v-btn
        >
      </div>
      <br />
      <v-row>
        <v-col v-for="item in items" :key="item.id" cols="3">
          <v-hover v-slot="{ hover }">
            <v-lazy>
              <v-card
                :loading="isLoading"
                class="mx-auto"
                dark
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                @click="goToDetails(item.id)"
              >
                <v-img
                  v-if="item.poster_path != null"
                  v-bind:src="
                    'http://image.tmdb.org/t/p/w500' + item.poster_path
                  "
                >
                  <v-overlay
                    v-if="hover"
                    absolute
                    :opacity="0.9"
                    color="#000000"
                  >
                    <v-list-item-content v-if="hover">
                      <v-card-title>
                        <span
                          class="font-weight-bold overline font-weight-light"
                          >{{ item.title }}</span
                        >
                      </v-card-title>
                      <v-card-text>
                        <span class="overline font-weight-light">{{
                          item.release_date
                        }}</span>
                      </v-card-text>
                      <v-card-text>
                        <span class="font-weight-light">{{
                          item.overview
                        }}</span>
                      </v-card-text>
                      <v-card-text v-if="item.vote_average">
                        <span class="font-weight-light">{{
                          item.vote_average
                        }}</span>
                      </v-card-text>
                    </v-list-item-content>
                  </v-overlay>
                </v-img>
                <v-img
                  v-if="item.poster_path == null"
                  src="http://underscoremusic.co.uk/site/wp-content/uploads/2014/05/no-poster.jpg"
                >
                  <v-overlay
                    v-if="hover"
                    absolute
                    :opacity="0.9"
                    color="#000000"
                  >
                    <v-list-item-content v-if="hover">
                      <v-card-title>
                        <span
                          class="font-weight-bold overline font-weight-light"
                          >{{ item.title }}</span
                        >
                      </v-card-title>
                      <v-card-text>
                        <span class="overline font-weight-light">{{
                          item.release_date
                        }}</span>
                      </v-card-text>
                      <v-card-text>
                        <span class="font-weight-light">{{
                          item.overview
                        }}</span>
                      </v-card-text>
                      <v-card-text>
                        <span class="font-weight-light">{{
                          item.vote_average
                        }}</span>
                      </v-card-text>
                    </v-list-item-content>
                  </v-overlay>
                </v-img>
              </v-card>
            </v-lazy>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import router from "@/router/index.js";
import { saveID, getID } from "@/plugins/getMovieDetails.js";

export default {
  name: "App",

  data: () => ({
    transparent: "rgba(255, 255, 255, 0)",
    query: "",
    items: "",
    isLoading: true,
    autocompleteData: "",
    year: 2020,
    alert: false,
    currentLetter: 97,
  }),
  methods: {
    getResult(query) {
      this.isLoading = true;
      if (localStorage.query == "") {
        axios
          .get(
            process.env.VUE_APP_BASE_URL +
              "/search/movie?api_key=" +
              process.env.VUE_APP_KEY +
              "&query=a&year=" +
              this.year +
              "&primary_release_year=" +
              this.year
          )
          .then((response) => (this.items = response.data.results));
      }
      axios
        .get(
          process.env.VUE_APP_BASE_URL +
            "/search/movie?api_key=" +
            process.env.VUE_APP_KEY +
            "&query=" +
            query
        )
        .then((response) => {
          this.items = response.data.results;
        });
      this.isLoading = false;
    },
    getYear(n) {
      this.year = n;
      console.log(this.year);
    },
    previousPage() {
      console.log(String.fromCharCode(this.currentLetter));
      this.currentLetter--;
      axios
        .get(
          process.env.VUE_APP_BASE_URL +
            "/search/movie?api_key=" +
            process.env.VUE_APP_KEY +
            "&query=" +
            String.fromCharCode(this.currentLetter) +
            "&year=" +
            this.year +
            "&primary_release_year=" +
            this.year
        )
        .then((response) => (this.items = response.data.results));
    },
    nextPage() {
      this.currentLetter++;
      axios
        .get(
          process.env.VUE_APP_BASE_URL +
            "/search/movie?api_key=" +
            process.env.VUE_APP_KEY +
            "&query=" +
            String.fromCharCode(this.currentLetter) +
            "&year=" +
            this.year +
            "&primary_release_year=" +
            this.year
        )
        .then(
          (response) => (
            (this.items = response.data.results), console.log(this.items)
          )
        );
    },
    goToDetails(selected) {
      saveID(selected);
      console.log(getID());
      router.push("details");
    },
  },
  mounted() {
    this.isLoading = true;
    if (localStorage.query) {
      this.query = localStorage.query;
      axios
        .get(
          process.env.VUE_APP_BASE_URL +
            "/search/movie?api_key=" +
            process.env.VUE_APP_KEY +
            "&query=" +
            localStorage.query
        )
        .then((response) => {
          this.items = response.data.results;
        });
    } else {
      axios
        .get(
          process.env.VUE_APP_BASE_URL +
            "/search/movie?api_key=" +
            process.env.VUE_APP_KEY +
            "&query=" +
            String.fromCharCode(this.currentLetter) +
            "&year=" +
            this.year +
            "&primary_release_year=" +
            this.year
        )
        .then((response) => (this.items = response.data.results));
    }
    this.isLoading = false;
  },
  watch: {
    query(newQuery) {
      localStorage.query = newQuery;
    },
  },
};
</script>

<style scoped>
#body {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  background-color: #ffffff;
}
.hero-search form {
  font-size: 17px;
  background: transparent;
}
.hero-search form input {
  border-radius: 30px;
  border: solid 0.5px;
  width: 100%;
  height: 20px;
  padding: 20px;
}
.hero-search form input::placeholder {
  font-size: 17px;
}
.hero-search form input[type="text"] {
  font-size: 25px;
}

.heroSection {
  padding: 40px;
}
.heroMainTitle {
  font-size: 60px;
  font-weight: 100;
}
.heroSubTitle {
  padding: 10px;
  font-weight: 100;
}
.on-hover-img {
  filter: brightness(20%);
}
</style>

