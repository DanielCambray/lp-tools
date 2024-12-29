<template>
  <v-dialog v-model="loading" max-width="320" persistent>
    <v-list class="py-2" color="primary" elevation="12" rounded="lg">
      <v-list-item
          prepend-icon="$vuetify-outline"
          title="Chargement des données..."
      >
        <template #prepend>
          <div class="pe-4">
            <v-icon color="primary" size="x-large">mdi-key-outline</v-icon>
          </div>
        </template>

        <template #append>
          <v-progress-circular
              color="primary"
              indeterminate="disable-shrink"
              size="16"
              width="2"
          ></v-progress-circular>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
</template>

<script setup lang="ts">
const loading = defineModel("loading", { type: Boolean, required: true });
</script>

<style scoped lang="sass"></style>