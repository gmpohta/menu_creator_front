<template>

<div class="row">
  <div class="col-lg-6 col-sx-12 col-sm-12 card">
  <h2 style="margin-bottom:5%">Создание блюда</h2>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Название блюда:"
        label-for="input-1"
      >
      <b-form-input
          id="input-1"
          v-model="form.name"
          placeholder="Название"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Вес:"
        label-for="input-1"
      >
      <b-form-input
          id="input-1"
          v-model="form.weight"
          placeholder="Вес блюда"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Цена:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.price"
          placeholder="Цена"
          required
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Описание:" label-for="textarea">
        <b-form-textarea
          id="textarea"
          v-model="form.description"
          placeholder="Описание"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Изображение блюда:"
        label-for="file-input"
      ></b-form-group>
      <b-form-file
        id="file-input"
        v-model="file"
        :state="Boolean(form.file)"
      ></b-form-file>
      <div style="margin-top:8%">
        <b-button type="submit" variant="outline-secondary" style="margin-right:5%">Создать</b-button>
        <b-button variant="outline-warning" @click="onCancel">Отмена</b-button>
      </div>
    </b-form>
  </div>
 
</div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          weight:null,
          name:'',
          price:null,
          description:'',
        },
        file:null
      }
    },
    methods: {
      onSubmit(event) {
        this.form.price=Number(this.form.price)
        this.form.weight=Number(this.form.weight)
        this.$emit('create-dish',{dish:this.form,image:this.file})
      },
      onCancel(){
        this.$emit('cancel')
      }
    }
  }
</script>

<style>
.card{
    background: #fff;
}
</style>