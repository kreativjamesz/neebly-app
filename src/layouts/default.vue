<template>
  <v-app>
    <v-system-bar color="red">
      <marquee
        >[ANNOUNCEMENT]. Please read it carefully. Please contact your
        administrator or I.T.S.M. if you have any questions regarding this application. Thank You.</marquee
      >
      <v-icon>mdi-close</v-icon>
    </v-system-bar>
    <v-main-navigation-drawer />
    <v-main-navigation-bar />
    <v-main>
      <router-view />
    </v-main>
    <!-- Dialog -->
    <v-main-dialog />
    <!-- Toast -->
    <v-main-toast />
    <!-- Confirm -->
    <v-main-confirmation />
    <!-- Footer -->
    <v-app-footer />
  </v-app>
</template>

<script lang="ts" setup>
//
</script>
