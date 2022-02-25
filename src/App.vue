<template>
  <div id="app">
    <b-navbar class="is-light">
      <template #brand > 
        <b-navbar-item >
            <img
                src="https://etapes.com/app/uploads/2016/05/1464094938.png"
                alt="Coop VueJs"
            >
        </b-navbar-item>
      </template>
      <template #start v-if="$store.state.connexionToken">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Conversations
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/membres' }">
          Membres
        </b-navbar-item>
      </template>

      <template #end >
        <b-navbar-item tag="div">
        <p v-if="$store.state.connexionToken">Connecté en tant que <strong>{{ $store.state.member.fullname }}</strong></p>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons" v-if="!$store.state.connexionToken">
            <router-link to="/creation-compte" >
            <b-button id="CreationCompte" type="is-success">Créer un compte</b-button>
              
            </router-link>
            <router-link to="/connexion" >
                        <b-button type="is-info is-light">Se connecter</b-button>
            </router-link>
          </div>

          <div v-else>
            <b-button type="is-danger is-light" @click="deconnexion" class="button is-primary is-black">Deconnexion</b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <router-view />
    <footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Coop</strong> par Hugo GEORG et Théo Antolini réalisé pour l'apprentissage de VueJs
      | 2022
    </p>
  </div>
</footer>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setReady', false)

    if (!this.$store.state.connexionToken) {
      this.seConnecter()
    } else {
      this.$api.get(`members/${this.$store.state.member.id}/signedin`)
      .then(this.demarrer)
      .catch(this.seConnecter)
    }
  },
  methods: {
    ready(){
      this.$store.commit('setReady', true);
    },
    demarrer(){
      this.$api.get('members').then(response => {
        this.$store.commit('setMembers', response.data)
      })
      this.ready();
    },
    seConnecter(){
      this.$store.commit('setToken', false)
      this.$router.push('/connexion')
      this.ready();
    },
    deconnexion(){
      this.$api.delete('members/signout')
        .then(response => {
          this.$store.commit('setToken', false)
          this.$store.commit('setMember', false)
          this.$router.push('/connexion')
        })
    }
  }
}
</script>

<style>
#CreationCompte{
  margin-right: 30px;
}

.is-black{
  margin-right: 10px;
}

.footer{
  bottom: 0;
  width:100%;
  padding-top:50px;
  height:50px;
}
.footer::after{
height: 142px; 
}
</style>
