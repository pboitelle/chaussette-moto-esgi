<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand"><img src="../assets/logo.png" ></RouterLink>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link active">Accueil</RouterLink>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/about" class="nav-link">A propos</RouterLink>
                    </li>
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Tous nos modèles
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <RouterLink to="/contact" class="nav-link">Contacter un conseiller</RouterLink>
                    </li>
                 
                </ul>

                <button class="btn btn-success" type="submit">Se connecter</button>
                <button class="btn btn-outline-success" type="submit">S'inscrire</button>

            </div>
        </div>
    </nav>
</template>

<style scoped>
    .navbar-brand img{
        width: 50px;
    }
</style>