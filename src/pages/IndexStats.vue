<template>
  <q-page class="row items-center justify-center">
    <div class="q-px-sm">
      <div class="q-mx-auto q-px-lg">
        <div class="q-mb-md">
          <h1 class="text-h4 text-primary q-mb-xs text-weight-bold">Estadísticas</h1>
        </div>

        <div class="q-mt-md">
          <h2 class="text-subtitle1 text-grey-8 q-mb-sm">Esta zona esta en construcción</h2>
        </div>

        <div class="q-mt-lg q-pa-sm">
          <q-banner dense class="bg-orange-1">
            <template v-slot:avatar>
              <q-icon name="info" color="orange" />
            </template>
            Nota: Esta plataforma se ha creado como complemento a tu programa de estudio. Si te
            resulta útil y deseas apoyar el proyecto, puedes hacer una donación.
          </q-banner>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts"></script>
