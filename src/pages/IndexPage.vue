<template>
  <q-page class="row items-center justify-center">
    <div class="q-px-sm">
      <div class="q-mx-auto q-px-lg">
        <div class="q-mb-md">
          <h1 class="text-h4 text-primary q-mb-xs text-weight-bold">Bienvenido/a</h1>
          <p class="text-body1 text-grey-9 q-mt-none">
            Esta aplicación es un <strong>complemento de estudio</strong> para preparar el examen
            <strong>CCSE</strong>. <span class="text-weight-medium">No sustituye</span> en ningún
            caso a la aplicación oficial del <strong>Instituto Cervantes</strong>; su objetivo es
            ayudarte a practicar de forma guiada y a optimizar tu tiempo.
          </p>
        </div>

        <div class="q-mt-md">
          <h2 class="text-subtitle1 text-grey-8 q-mb-sm">¿Qué puedes hacer aquí?</h2>
          <ul class="q-pl-lg q-mt-none q-mb-md text-grey-9">
            <li class="q-mb-sm">
              Practicar con <strong>exámenes aleatorios</strong> que respetan la distribución por
              tareas del CCSE.
            </li>
            <li class="q-mb-sm">
              Revisar un <strong>panel de estadísticas</strong> que identifica en qué
              <em>tareas y preguntas</em> aciertas más y dónde puedes mejorar.
            </li>
            <li class="q-mb-sm">
              Enfocar el estudio con <strong>recomendaciones</strong> basadas en tu desempeño
              reciente.
            </li>
          </ul>
        </div>

        <div class="q-mt-lg q-pa-sm">
          <q-banner dense class="bg-orange-1">
            <template v-slot:avatar>
              <q-icon name="info" color="orange" />
            </template>
            Consejo: practica varias veces al día sesiones cortas y revisa tus errores al finalizar.
          </q-banner>
        </div>

        <div class="row items-center q-col-gutter-md q-mt-lg">
          <div class="col-12 q-mt-sm">
            <p class="text-caption text-grey-7 q-mb-none">
              Si ya estás familiarizado/a con el temario, te recomendamos comenzar con un examen
              aleatorio y luego revisar el panel para detectar tus áreas de mejora.
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar, uid } from 'quasar';

const $q = useQuasar();

const value = $q.localStorage.getItem('uidUnique');
if (!value) {
  $q.localStorage.set('uidUnique', uid());
  $q.notify({
    message: 'Hola!, vamos a crear tu sesión',
    color: 'primary',
  });
}
</script>
