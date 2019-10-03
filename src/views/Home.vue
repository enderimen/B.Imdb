<template>
  <div class="flex flex--col flex--aic">
    <div class="content-list flex flex--wrap">
      <content-box
        v-for="(content, index) in contents"
        :key="index"
        :posterUrl="content.Poster"
        :title="content.Title"
        :year="content.Year"
        :imdbId="content.imdbID"
      ></content-box>
    </div>

    <app-button
      large
      light
      class="load-more-btn"
      @click.native="page += 1"
      v-if="page < 2"
    >Daha fazla içerik</app-button>

    <img src="/assets/images/loading.svg" v-if="isLoadingContents" />
  </div>
</template>

<script>
import ContentService from "./../services/ContentService";
import SortingType from "./../enums/SortingType";

export default {
  name: "Home",
  data: () => {
    return {
      contents: [],
      page: 1,
      contentType: null,
      isLoadingContents: false
    };
  },
  created() {
    window.onscroll = () => {
      if (this.page < 2) {
        return;
      }

      const triggerLoad =
        document.documentElement.scrollTop + window.innerHeight >
        document.documentElement.offsetHeight - 100;

      if (!this.isLoadingContents && triggerLoad) {
        this.page += 1;
      }
    };

    this.loadContents();

    this.$root.$on("category-changed", contentType => {
      this.page = 1;
      this.contentType = contentType;

      setTimeout(this.loadContents, 100);
    });

    this.$root.$on("sorting-changed", sortingType => {
      this.contents.sort((a, b) => {
        if (sortingType == SortingType.YearAsc) {
          return a.Year < b.Year ? -1 : 1;
        } else if (sortingType == SortingType.YearDesc) {
          return a.Year > b.Year ? -1 : 1;
        }
      });
    });
  },
  watch: {
    page: function(newValue, oldValue) {
      this.$router.replace({ path: "/", query: { p: this.page } });
      this.loadContents(true);
    },
    $route(to, from) {
      console.log(to);
    }
  },
  methods: {
    loadContents: function(push = false) {
      this.isLoadingContents = true;

      new ContentService()
        .getContents(this.page, this.contentType)
        .then(result => {
          setTimeout(() => { this.isLoadingContents = false; }, 200);

          const contents = result.map(content => {
            content.Year = parseInt(content.Year);
            return content;
          });

          if (push) {
            this.contents = Array.of(...this.contents, ...contents);
          } else {
            this.contents = contents;
          }
        });
    }
  }
};
</script>