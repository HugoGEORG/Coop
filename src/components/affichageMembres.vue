<template>
  <div class="box columns is-vcentered p-0 my-6">

    <router-link :to="{name: 'FicheMembre', params: { id: membre.id }}" class="column ml-4">      
      <p id="name" class="mb-2 is-size-5"><img id="avatar" :src="`https://eu.ui-avatars.com/api/background=random&background=random&rounded=true&name=` + this.membre.fullname" alt="Avatar"/>{{ membre.fullname }} <span id="email" class="is-size-6 ml-3 is-info">{{ membre.email }}</span></p>
    </router-link>
    
    <div class="column is-1 has-text-centered " v-if="membre.id !== $store.state.member.id">
      <button id="supp" @click="funcDelete(membre.id, membre.fullname)" class="delete is-medium"></button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "affichageMembres",
  props: ["membre", "funcDelete"]
}
</script>

<style scoped>
#avatar{
  margin-right: 20px;
  vertical-align: middle;
}
#name{
  color:#3488CE;
}
#supp:hover{
  background-color: red;
}
#email{
  color:black;
}
</style>