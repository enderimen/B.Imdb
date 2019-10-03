<template>
  <header class="main-header flex flex--aic">
    <i class="main-header__logo" />
    <div class="main-header__options flex flex--jcsb flex--1"
      v-if="showOptions">
      <app-select :options="categories" placeholder="Kategori" border v-model="selectedCategory"></app-select>
      <div class="flex flex--aic">
        <span class="main-header__sorting-label">Sıralama</span>
        <app-select :options="sortingTypes" positionRight no-bg v-model="selectedSortingType"></app-select>
      </div>
    </div>
  </header>
</template>

<script>

import ContentType from './../../enums/ContentType';
import SortingType from './../../enums/SortingType';

export default {
  name: "AppHeader",
  data: () => {
    return {
      showOptions: true,
      selectedCategory: null,
      selectedSortingType: SortingType.YearDesc,
      categories: [
        {
          label: 'Filmler',
          value: ContentType.Movies
        },
        {
          label: 'Diziler',
          value: ContentType.Series
        }
      ],
      sortingTypes: [
        {
          label: 'Yıla Göre Azalan',
          value: SortingType.YearDesc
        },
        {
          label: 'Yıla Göre Artan',
          value: SortingType.YearAsc
        }
      ]
    };
  },
  watch: {
    selectedCategory: function(newValue, oldValue) {
      this.$root.$emit('category-changed', newValue);
    },
    selectedSortingType: function(newValue, oldValue) {
      this.$root.$emit('sorting-changed', newValue);
    },
    $route(to, from) {
      console.log(to);
      if (to.name == "contentDetail") {
        this.showOptions = false;
      } else {
        this.showOptions = true;
      }
    }
  }
};
</script>