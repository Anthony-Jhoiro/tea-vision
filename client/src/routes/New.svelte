<script lang="ts">
  import { NewTeaForm, defaultNewTeaFormValues } from 'client-content-forms';
  import { useReadFile } from '../api';
  import { type Tea } from 'domains';
  import { navigate } from 'svelte-routing';
  import { useCreateTea } from '../services/storage';

  let newTeaForm = defaultNewTeaFormValues;

  const readFileMutation = useReadFile({
    onSuccess(data) {
      newTeaForm = data;
    },
  });

  const createTeaMutation = useCreateTea({
    onSuccess() {
      navigate('/');
    },
    onError(error) {
      console.log(error);
    },
  });

  function onReadFile(e: CustomEvent<File>) {
    $readFileMutation.mutate(e.detail);
  }

  async function onSubmit(e: CustomEvent<Omit<Tea, 'id'>>) {
    $createTeaMutation.mutate(e.detail);
  }
</script>

<div class="container mx-auto">
  <h1 class="pb-8 text-xl">Ajouter un thé</h1>

  <NewTeaForm
    on:readFile={onReadFile}
    bind:values={newTeaForm}
    on:formSubmit={onSubmit}
  />
</div>
