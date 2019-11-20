<template>
  <div class="col-md-12">
    
  </div>
</template>

<script>
export default {
  name: 'ContactDetail',
  data () {
    return {
      id: 1,
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
    this.url = 'https://reqres.in/api/users/' + this.id
  }
}
</script>
<style type="text/css">
  .contact-card{
    margin:20px auto;
    width: 280px;
    overflow: hidden;
    padding: 10px;
    border-top: solid 10px #25aae1;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.2);
  }

  .contact-card img{
    border-radius: 100%;
  }
  .contact-card h2{
    font-weight: bold;
    font-size: 1.8em;
    margin: 10px;
  }
  .contact-card h2 small{
    font-size: 0.5em;
    color: #25aae1;
    display: block;
  }
</style>