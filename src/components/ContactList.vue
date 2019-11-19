<template>
    <div class="col-md-12">
      <input class="form-control" type="text" v-model="search" placeholder="Search contact.."/>
      <ul class="list-group">
        <li class="list-group-item" v-for="contact in filtered">
          <router-link :to="'/contact/' + contact.id">
            
            <div class="contact">
              <img class="profile-pick" v-bind:src="contact.avatar" />
              {{ contact.first_name }} {{ contact.last_name }} 
              <small>{{ contact.email }}</small>
            </div>
          </router-link>
        </li>
      </ul>
      <span> Search: {{ search }}</span>
      <span>Page: {{ response.page }} of {{ response.total_pages }}</span>
    </div>
</template>

<script>
export default {
  name: 'ContactList',
  data () {
    return {
      search: '',
      page: 1,
      pages: 0,
      response: [],
      contacts: []
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
        this.contacts = response.data.data
      })
  },
  computed: {
    filtered () {
      return this.contacts.filter(contact => {
        return contact.first_name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>
<style type="text/css">
  body{
    margin:0;
    padding:0;
  }
  .list-group-item{
    margin:0;
    padding:0;
    border:none;
  }
  .list-group-item:hover{
  }
  .list-group-item:nth-child(even) {
    background: #f7f9fb;
  }
  .list-group-item:nth-child(odd) {
    background: #fff;
  }
  .list-group-item a{
    padding:10px;
    display: block;
    color: #333;
    font-weight: bold;
    border-left: solid 3px #f7f9fb;

  }
  .list-group-item a:hover{
    text-decoration: none;
    background: #f5fafe;
    border-left: solid 3px #25aae1;

  }
  .list-group-item img{
    float: left;
    margin-right: 10px;
  }
  .list-group-item a small{
    display: block;
    margin:0;
    padding: 0;
  }
  .profile-pick{
    width: 42px;
    border-radius: 100%;
  }
  .contact-list{
    list-style: none;
    margin:0;
    padding:0;
  }
  .contact-list li{
    background: #efefef;
  }
  .contact-list li a{
    background: #efefef;
    display:inline-block;
    padding: 10px;
  }
</style>