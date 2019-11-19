<template>
  <div>
    <div>

        <img v-bind:src="contact.avatar" /> 

        {{ contact.first_name }} {{ contact.last_name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactDetail',
  data () {
    return {
      id: 0,
      url: 'https://reqres.in/api/users/',
      contact: [],
      response: []
    }
  },
  mounted () {
    this.$http
      .get(this.url)
      .then(response => {
        this.page = response.page
        this.pages = response.total_pages
        this.response = response.data
        this.contact = response.data.data
      })
  },
  created () {
    this.id = this.$route.params.id
    this.url = 'https://reqres.in/api/users/' + this.$route.params.id
  }
}
</script>