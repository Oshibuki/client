<template>
    <!-- Modal -->
    <div class="modal fade in" id="basicModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-gray-dark">
                    <h5 class="modal-title  pull-left" id="modal_demo_label">
                        <slot name="header"></slot>
                    </h5>
                    <button type="button" class="btn-close pull-right bg-dark text-light" aria-label="Close" data-dismiss="modal">
                        <i class="fas fa-times" style="color:black"></i>
                    </button>
                </div>
                <div class="modal-body bg-gray-dark">
                    <slot name="body" />
                </div>
                <div class="modal-footer bg-gray-dark">
                    <button type="button" class="btn btn-secondary btn-main" data-toggle="modal" data-target="#basicModal"
                     >Close</button>
                    <slot name="footer">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#basicModal">Save
                            changes</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showModal: false
        };
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        }
    }
};
</script>
<style lang="">
  
</style>
