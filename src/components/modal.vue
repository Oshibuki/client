<template>
  <!-- Modal -->
<div class="modal fade" id="modal_demo" tabindex="-1" aria-labelledby="modal_demo_label" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal_demo_label">Modal title</h5>
        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <slot/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { reactive, onMounted } from 'vue'
import bootstrap from 'bootstrap3'

const state = reactive({
    modal_demo: null,
})

onMounted(() => {
    state.modal_demo = new bootstrap.Modal('#modal_demo', {})
})

function openModal()
{
    state.modal_demo.show()
}

function closeModal()
{
    state.modal_demo.hide()
}


</script>
<style lang="">
  
</style>
