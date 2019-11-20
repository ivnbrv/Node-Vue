<template>
  <div class="row">
    <div class="contact-list" :class="opened">
      <input class="form-control" type="text" v-model="search" placeholder="Search contact.."/>
      <ul class="list-group">
        <li class="list-group-item" v-for="contact in filtered">
          <a v-on:click="load(contact)">
            
            <div class="contact">
              <img class="profile-pick" v-bind:src="contact.avatar" />
              {{ contact.first_name }} {{ contact.last_name }} 
              <small>{{ contact.email }}</small>
            </div>
          </a>
        </li>
      </ul>
      <span>Page: {{ response.page }} of {{ response.total_pages }}</span>
    </div>
    <div class="contact-card" :class="opened">
      <img v-bind:src="contact.avatar" /> 

      <h2>
          {{ contact.first_name }} {{ contact.last_name }}
          <small> {{ contact.email }}</small>
      </h2>

    </div>
  </div>
</template>

<script>

import ContactDetail from '@/components/ContactDetail'

export default {
  name: 'ContactList',
  components: {
    ContactDetail
  },
  data () {
    return {
      search: '',
      page: 1,
      pages: 0,
      response: [],
      contacts: [],
      contact: []
    }
  },
  methods: {
    load: function (contact) {
      // `this` inside methods points to the Vue instance
      this.contact = contact
      this.opened = 'opened'
      // `event` is the native DOM event
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
    width: 100%;
    border-left: solid 2px red;
    display: inline;
  }
  .contact-list.opened{
    width: 50%;
  }
  .contact-card{
    width: 0%;
    display: inline;
    background: #efefef;
  }
  .contact-card.opened{
    width: 50%;
        padding: 20px 40px !important;

  }
  .padding-0{
    padding-right:0;
    padding-left:0;
  }
</style>