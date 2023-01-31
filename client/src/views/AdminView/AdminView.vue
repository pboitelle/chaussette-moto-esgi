<script>
import AdminUsersViewVue from './AdminUsersView.vue';
import AdminCommunicationsViewVue from './AdminComsView.vue';
import AdminSalonsViewVue from './AdminSalonsView.vue';
import AdminNotifViewVue from './AdminNotifView.vue';

export default {
  name: 'AdminView',
  components: {
    AdminUsersViewVue,
    AdminCommunicationsViewVue,
    AdminSalonsViewVue,
    AdminNotifViewVue
  }
}
</script>

<template>
    <h1 class="text-center">Administration</h1>
</template>

<style scoped>
#sidebar-wrapper {
  position: fixed; /* Fixe le menu sur place */
  left: 0; /* Place le menu à gauche de la page */
  width: 15rem; /* Définit la largeur du menu */
  height: 100%; /* Ajuste la hauteur du menu à la hauteur de la page */
  overflow-x: hidden; /* Cache tout contenu dépassant la largeur du menu */
  padding: 1.25rem 1.25rem; /* Ajoute de l'espace autour du contenu du menu */
}


#page-content-wrapper {
  width: 100%; /* Définit la largeur du contenu de la page */
  padding: 1.25rem 1.25rem; /* Ajoute de l'espace autour du contenu de la page */
}
</style>