<template>
  <div class="row">
    <span>Page: {{ response.page }} of {{ response.total_pages }}</span>
    
    <ul>
      <li class="" v-for="contact in response.data">
        <router-link :to="'/contact/' + contact.id">{{ contact.first_name }} {{ contact.last_name }} {{ contact.email }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ContactList',
  data () {
    return {
      page: 1,
      pages: 0,
      response: []
    }
  },
  mounted () {
    this.$http
      .get('https://reqres.in/api/users', {
        params: {
          page: this.page
        }
      })
      .then(response => {
        this.page = response.page
        this.pages = response.total_pages
        this.response = response.data
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
span{
  display: block;
}
ul {
  display: block;
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
}

a {
  color: #35495E;
}
</style>
