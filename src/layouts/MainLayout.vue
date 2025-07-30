<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-blue-1 text-primary shadow-up-1">
      <div class="row full-width">
        <div class="col text-center">
          <q-btn flat no-caps class="text-center" to="/">
            <q-icon size="3em" name="home" />
            <div class="text-center">Inicio</div>
          </q-btn>
        </div>
        <div class="col text-center">
          <q-btn flat no-caps class="text-center" to="/stats">
            <q-icon size="3em" name="query_stats" />
            <div class="text-center">Estadísticas</div>
          </q-btn>
        </div>
        <div class="col text-center">
          <q-btn flat no-caps class="text-center" to="/task">
            <q-icon size="3.1em" name="menu_book" />
            <div class="text-center">Estudiar</div>
          </q-btn>
        </div>
        <div class="col text-center">
          <q-btn flat no-caps class="text-center" to="/exam">
            <q-icon size="3em" name="assignment" />
            <div class="text-center">Examen</div>
          </q-btn>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);

    const closeSession = () => {
      leftDrawerOpen.value = false;
    };

    return {
      closeSession,

      step: ref(1),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style>
.q-stepper--vertical .q-stepper__tab {
  padding: 12px;
}
.q-stepper--vertical .q-stepper__step-inner {
  padding: 0 18px 20px 30px;
}
</style>
