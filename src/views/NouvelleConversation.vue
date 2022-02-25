<template>
<div  class="columns is-multiline">
  <form  @submit.prevent="creerConversation" class="box column is-half is-offset-one-quarter mt-6">
    <h1 class="title is-4 has-text-centered">Créer une conversation</h1>
    <b-field label="Titre">
      <b-input type="text" v-model="label" required>
      </b-input>
    </b-field>

    <b-field label="Topic">
      <b-input type="text" v-model="topic" required>
      </b-input>
    </b-field>

    <div class="has-text-centered mt-5 mb-3">
      <button id="Valider" class="button">Valider</button>
    </div>
  </form>

  <div class="column is-half is-offset-one-quarter">
    <b-message auto-close type="is-danger" class="has-text-centered" v-if="this.state" v-model="errorIsActive" :duration="errorDuration">
      {{ this.state }}
    </b-message>
  </div>
</div>
</template>

<script>
export default {
  name: "NouvelleConversation",
  data() {
    return {
      label: "",
      topic: "",
      state: "",
      errorIsActive: false,
      errorDuration: 3500
    }
  },
  methods: {
    creerConversation(){
      let donnees = {
        label: this.label,
        topic: this.topic
      }
      this.$api.post('channels', donnees)
      .then(response => {
        this.$router.push('/')
      })
      .catch(error => {
        this.state = error.response.data.message
        this.errorIsActive = true
      })
    }
  }
}
</script>

<style scoped>
#container{
  margin-top: 40vh; /* poussé de la moitié de hauteur de viewport */
  transform: translateY(-50%);
}

#Valider{
  border: 1px solid #3488CE;
  background-color: #3488CE ;
  color: white;
}
#Valider:hover{
  background-color: white;
  color: black;  
}
</style>