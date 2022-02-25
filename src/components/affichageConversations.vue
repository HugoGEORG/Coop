<template>
  <div class="box columns is-vcentered p-0 my-6">
    <router-link :to="{name: 'UneConversation', params: { id: conv.id }}" class="column ml-4">
      <p><span class="is-size-3 has-text-info">{{ conv.label }}</span> <span class="mx-2 has-text-dark	">|</span> <span class="is-size-5 has-text-dark	">{{ conv.topic }}</span></p>
      <p class="has-text-dark">Créé le {{ this.created_at }} <span v-if="this.created_at !== this.modified_at"><span class="mx-2">|</span><span class="has-text-danger">Modifié le {{ this.modified_at }}</span></span></p>
    </router-link>
    <div class="column is-1 has-text-centered">
      <button @click="funcDelete(conv.id, conv.label)" class="delete is-medium "></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "affichageConversation",
  props: ["conv", "funcDelete"],
  computed: {
    created_at(){
      if (this.conv){
        let d = new Date(this.conv.created_at)
        return (
            d.toLocaleDateString("fr-FR") + " à " + d.toLocaleTimeString("fr-FR")
        )
      }
    },
    modified_at(){
      if (this.conv){
        let d = new Date(this.conv.modified_at)
        return (
            d.toLocaleDateString("fr-FR") + " à " + d.toLocaleTimeString("fr-FR")
        )
      }
    }
  }
}
</script>

<style scoped>
.delete:hover{
  background-color: red;
}
</style>