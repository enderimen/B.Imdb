<template>
  <div class="select" :class="{'select--expanded': expanded, 'select--pos-right': positionRight}">
    <app-button
      @click.native="expanded = !expanded"
      :class="{'btn--border': border, 'btn--active': expanded, 'btn--no-bg': noBg}"
    >
      <div>
        {{placeholder}}
        <strong>{{selectedLabel}}</strong>
      </div>
      <i class="select__icon material-icons">keyboard_arrow_down</i>
    </app-button>
    <ul class="select__option-list">
      <li
        class="select__option flex flex--aic"
        v-for="(option, index) in options"
        :key="index"
        @click="onSelect(option.value)"
        :class="{'select__option--selected': option.value == selectedValue}"
      >
        <span class="select__option-checkbox"></span>
        <span class="select__option-label">{{option.label}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppSelect",
  data: () => {
    return {
      expanded: false,
      selectedValue: null
    };
  },
  computed: {
    selectedLabel: function() {
      const selectedOption = this.options.find(x => x.value == this.selectedValue);

      if (!selectedOption) {
        return '';
      }

      return selectedOption.label;
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: String,
    options: {
      type: Array,
      default: []
    },
    placeholder: String,
    border: Boolean,
    noBg: Boolean,
    positionRight: Boolean
  },
  created() {
    this.selectedValue = this.value;
  },
  methods: {
    onSelect: function(value) {
      this.expanded = false;
      this.selectedValue = value;
      this.$emit("change", value);
    }
  }
};
</script>