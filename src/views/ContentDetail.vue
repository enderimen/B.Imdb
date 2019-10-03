<template>
  <div class="content-detail flex flex--col flex--aic">
    <div class="content-detail__top flex">
      <img class="content-detail__poster" :src="details.Poster" />
      <div class="content-detail__body flex--1">
        <h1 class="content-detail__title">{{details.Title}}</h1>
        <ul class="content-detail__info-list flex flex--aic">
          <li
            class="content-detail__info-item"
            v-for="(item, index) in visibleInfoItems"
            :key="index"
          >{{details[item]}}</li>
        </ul>
        <p class="content-detail__plot">{{details.Plot}}</p>
        <a
          class="content-detail__link"
          :href="details.Website"
          v-if="details.Website != 'N/A'"
          target="_blank"
          nofollow
        >Web Sitesine Git</a>
      </div>
    </div>
    <button class="content-detail__close-btn" @click="$router.back()"></button>
  </div>
</template>

<script>
import ContentService from "./../services/ContentService";

export default {
  name: "ContentDetail",
  data: () => {
    return {
      isLoadingDetails: false,
      details: {},
      visibleInfoItems: ["Year", "Runtime", "Country", "Language"]
    };
  },
  created() {
    this.isLoadingDetails = true;

    new ContentService()
      .getContentDetail(this.$route.params.id)
      .then(result => {
        this.isLoadingDetails = false;
        this.details = result;
      });
  }
};
</script>