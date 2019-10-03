<template>
  <article class="content">
    <router-link class="content__link" :to="'/content/' + imdbId">
      <picture>
        <source media="(min-width: 768px)" :srcset="getResponsivePoster(400)" />
        <source media="(min-width: 600px)" :srcset="getResponsivePoster(300)" />
        <source media="(min-width: 450px)" :srcset="getResponsivePoster(200)" />
        <source media="(min-width: 300px)" :srcset="getResponsivePoster(200)" />
        <source media="(max-width: 300px)" :srcset="getResponsivePoster(100)" />
        <img
          class="content__poster"
          :src="posterUrl"
          v-on:load="onPosterLoad"
          :class="{'content__poster--visible': imageLoaded}"
        />
      </picture>
      <div class="content__placeholder" :class="{'content__placeholder--hidden': imageLoaded}"></div>
      <span class="content__info flex">
        <div class="content__info-rating flex flex--aic" v-if="!isLoadingDetails">
          <i class="content__info-rating-icon"></i>
          <span class="content__info-rating-value">{{details.imdbRating}}</span>
        </div>
        <img class="content__info-rating-loading" src="/assets/images/loading.svg" v-else />
        <h4 class="content__info-title">{{title}}</h4>
        <span class="content__info-label">Keşfet</span>
      </span>
    </router-link>
  </article>
</template>

<script>
import ContentService from "./../services/ContentService";

export default {
  name: "ContentBox",
  data: () => {
    return {
      details: {},
      isLoadingDetails: false,
      imageLoaded: false
    };
  },
  computed: {
    srcSet: function() {
      let set = [];

      for (const size of [400, 300, 200, 100]) {
        set.push(
          this.posterUrl.replace("X300.jpg", `X${size}.jpg`) + " " + size + "w"
        );
      }

      return set.join(",");
    }
  },
  props: {
    posterUrl: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    year: {
      type: Number
    },
    imdbId: {
      type: String,
      default: ""
    }
  },
  created() {
    this.isLoadingDetails = true;

    new ContentService().getContentDetail(this.imdbId).then(result => {
      this.isLoadingDetails = false;
      this.details = result;
    });
  },
  methods: {
    onPosterLoad: function() {
      this.imageLoaded = true;
    },
    getResponsivePoster: function(size) {
      return this.posterUrl.replace("X300.jpg", `X${size}.jpg`);
    }
  }
};
</script>