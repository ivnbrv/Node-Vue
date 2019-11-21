<template>
  <div class="row">
    <div class="contact-list" :class="opened">
      <input class="form-control search" type="text" v-model="search" placeholder="Buscar contacto.."/>
      <ul class="list-group">
        <li class="list-group-item" v-for="contact in filtered">
          <a v-on:click="load(contact)">
            
            <div class="contact" >
              <img class="profile-pick" v-bind:src="contact.avatar" />
              {{ contact.first_name }} {{ contact.last_name }} 
              <small>{{ contact.email }}</small>
            </div>


          </a>
        </li>
      </ul>
      
      <div style="padding:10px;">
        <b-button v-b-modal.contact-form variant="primary">Agregar Contacto</b-button>
        
        <b-modal id="contact-form" ref="modal" title="Agregar Contacto"  @show="reset" @hidden="reset" @ok="ok">
          <form ref="form" @submit.stop.prevent="submit">
            <b-form-group :state="nameState" label="Nombre" label-for="first_name" invalid-feedback="Nombre Requerido">
              <b-form-input id="first_name" v-model="first_name" :state="nameState" required ></b-form-input>
            </b-form-group>

            <b-form-group :state="nameState" label="Apellido" label-for="last_name" invalid-feedback="Apellido Requerido">
              <b-form-input id="last_name" v-model="last_name" :state="nameState" required ></b-form-input>
            </b-form-group>
            
            <b-form-group :state="nameState" label="Email" label-for="email" invalid-feedback="Email Requerido">
              <b-form-input id="email" v-model="email" :state="nameState" required ></b-form-input>
            </b-form-group>

            <vue-base64-file-upload 
              id="avatar"
              accept="image/png,image/jpeg"
              image-class="circled"
              input-class="form-control"
              input-name="avatar"
              @file="file"
              @load="image" />
          

          </form>
        </b-modal>
      </div>
    </div>
    <div class="contact-card" :class="opened">
      <div class="row">
        <a href="#" class="close" v-on:click="close()">
                x
              </a>
        <div class="col-md-2">
          <img v-bind:src="contact.avatar" class="img-c" /> 
        </div>
        <div class="col-md-6">
          <h2>
            {{ contact.first_name }} {{ contact.last_name }}
            <small> {{ contact.email }}</small>
          </h2>       
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ContactDetail from '@/components/ContactDetail'
import VueBase64FileUpload from 'vue-base64-file-upload'

export default {
  name: 'ContactList',
  components: {
    ContactDetail,
    VueBase64FileUpload
  },
  data () {
    return {
      search: '',
      page: 1,
      pages: 0,
      first_name: '',
      last_name: '',
      email: '',
      avatar: [],
      nameState: null,
      formdata: [],
      opened: 'col-md-12',
      response: [],
      contacts: [],
      contact: [],
      new_contact: []
    }
  },
  methods: {
    load: function (contact) {
      this.contact = contact
      this.opened = 'col-md-6'
    },
    close: function () {
      this.opened = 'col-md-12'
    },
    validate_form () {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid ? 'valid' : 'invalid'
      return valid
    },
    reset () {
      this.first_name = ''
      this.last_name = ''
      this.email = ''
      this.nameState = null
    },
    ok (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.submit()
    },
    submit () {
      if (!this.validate_form()) {
        return
      }

      this.new_contact.first_name = this.first_name
      this.new_contact.last_name = this.last_name
      this.new_contact.email = this.email
      this.new_contact.avatar = this.avatar

      /**
       * Logica para guardar
       * Dato, se omite por ahora y solo se agrega
       * el contacto
       */
      this.contacts.push(this.new_contact)

      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    },
    file (file) {
      console.log(file)
    },
    image (dataUri) {
      this.avatar = dataUri
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
  
  .search{
    font-size: 1.4em;
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

  }
  .contact-list.opened{
  }
  
  .contact-card.col-md-12{
    display: none;
  }
  .contact-card.col-md-6{
    display: block;
  }
  .contact-card{
    padding: 20px;
    position: relative;
  }
  .contact-card .close{
    background: #fefefe;
    position: absolute;
    top:10px;
    right: 40px;
  }
  .contact-card.opened{
    padding: 20px 40px !important;

  }
  .contact-card img{
    border-radius: 100%;
    width: 120%;
  }
  .contact-card h2{
    font-weight: bold;
  }
  .contact-card small{
    display: block;
  }
  .padding-0{
    /*padding-right:0;
    padding-left:0;*/
  }
  .modal img{
    width: 100px;
    border:100%;
  }
</style>