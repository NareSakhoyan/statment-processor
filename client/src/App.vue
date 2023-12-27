<template>
  <v-container>
    <v-card class="px-4">
      <v-card-title class="text-h2 text-md-h5 text-lg-h4 px-0"
        >Here you can validate your transaction files</v-card-title
      >
      <v-file-input
        label="File input type:xml/csv"
        v-model="files"
        multiple
      ></v-file-input>
      <TransactionsTable v-if="jsonResult?.length" :data="jsonResult" />
    </v-card>
    <Snackbar :info="snackbar" @closeSnackBar="() => (snackbar.show = false)" />
  </v-container>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import TransactionsTable from './components/TransactionsTable.vue'
import Snackbar from './components/SnackBar.vue'
import { uploadFiles } from './services'

const files = ref([])
const jsonResult = ref([])
const snackbar = reactive({
  show: false,
  text: '',
  type: '',
})

const setSnackbarMessage = (text, type) => {
  snackbar.show = true
  snackbar.text = text
  snackbar.type = type
}

watch(files, async () => {
  if (!files.value.length) {
    jsonResult.value = []
  } else {
    try {
      jsonResult.value = await uploadFiles(files.value)
      setSnackbarMessage('Successfully added the file', 'success')
    } catch (error) {
      setSnackbarMessage(error.response?.data?.error || error.message, 'error')
    }
  }
})
</script>
