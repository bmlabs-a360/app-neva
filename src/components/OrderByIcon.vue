<template>
  <button :id="idbutton" @click="toggleSortDirection" class="btnicon">
    <i
      title="Seleccione para ordenar los valores de la columna"
      :class="currentIcon"
    ></i>
  </button>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  name: "OrderByIcon",
  props: {
    onClickOrderBy: Function,
    id: String,
    defaultDirection: String,
  },
  setup(props) {
    const state = reactive({
      sortDirection: props.defaultDirection || "minus",
      idbutton: props.id,
    });

    const toggleSortDirection = async () => {
      if (state.sortDirection === "minus") {
        state.sortDirection = "desc";
        props.defaultDirection = "desc";
      } else if (state.sortDirection === "desc") {
        state.sortDirection = "asc";
        props.defaultDirection = "asc";
      } else if (state.sortDirection === "asc") {
        state.sortDirection = "desc";
        props.defaultDirection = "desc";
      }

      await setIconByDirection();

      if (typeof props.onClickOrderBy !== "undefined")
        props.onClickOrderBy(state.sortDirection, state.idbutton);
    };

    const setIconByDirection = async () => {
      switch (state.sortDirection) {
        case "asc":
          state.currentIcon = "cil-caret-top";
          break;
        case "desc":
          state.currentIcon = "cil-caret-bottom";
          break;
        case "minus":
          state.currentIcon = "cil-minus";
          break;
      }
    };
    setIconByDirection();

    const resetDirection = () => {
      state.currentIcon = "cil-minus";
      setIconByDirection();
    };

    return {
      ...toRefs(state),
      toggleSortDirection,
      resetDirection,
    };
  },
};
</script>

<style>
.btnicon {
  border: none;
  background: none;
}
</style>
