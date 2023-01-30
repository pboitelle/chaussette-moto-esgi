<template>
    <main class="main">

        <div class="admin">
          <div class="bg-light border-right" id="sidebar-wrapper">
              <div class="sidebar-heading">Mon tableau de bord</div>
              <div class="list-group list-group-flush">
                  <router-link class="list-group-item list-group-item-action bg-light" to="/admin">Dashboard</router-link>
                  <router-link class="list-group-item list-group-item-action bg-light" to="/admin/users">Users</router-link>
                  <router-link class="list-group-item list-group-item-action bg-light" to="/admin/communications">Communications</router-link>
                  <router-link class="list-group-item list-group-item-action bg-light" to="/admin/salons">Salons</router-link>
                  <router-link class="list-group-item list-group-item-action bg-light" to="/admin/notifs">Notifications</router-link>
              </div>
          </div>

          <!-- Page content -->
            <div id="page-content-wrapper">

                <div class="container mt-5">
                    <router-view />
                </div>
            </div>
        </div>

    </main>
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

#sidebar-wrapper .list-group-item {
  border-radius: 0;
}

#sidebar-wrapper .list-group-item:hover {
  background-color: #f7f7f7;
}

#sidebar-wrapper .list-group-item.active {
  background-color: #f7f7f7;
  border-color: #f7f7f7;
}

#sidebar-wrapper .list-group-item.active:hover {
  background-color: #f7f7f7;
  border-color: #f7f7f7;
}
</style>