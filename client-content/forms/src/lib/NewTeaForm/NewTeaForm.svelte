<script lang="ts">
  import { type TeaType, teaTypes } from 'domains';
  import {
    Label,
    Input,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    Button,
    Textarea,
    Select,
    SelectTrigger,
    SelectItem,
    SelectContent,
    SelectValue,
  } from 'common-svelte';
  import { createEventDispatcher } from 'svelte';
  import { Camera, Clock, Thermometer } from 'lucide-svelte';
  import type { NewTeaFormSchema } from './newTeaForm';
  import { newTeaFormSchema } from 'client-content-forms';

  const dispatch = createEventDispatcher();

  let fileAnalyzerDialogOpened = false;
  let picture: File | null = null;

  export let values: {
    [key in keyof NewTeaFormSchema]: NewTeaFormSchema[key] | null;
  } = {
    name: '',
    brand: '',
    description: '',
    minimumBrewingTimeInMinutes: 4,
    maximumBrewingTimeInMinutes: 4,
    brewingTemperature: 90,
    type: null,
    imageUrl: null,
  };

  function onPictureUploaded(event: any): void {
    const file = event.target?.files?.[0];

    if (!file) {
      return;
    }

    picture = file;
    fileAnalyzerDialogOpened = true;
  }

  function onReadFile(file: File | null) {
    if (!file) {
      return;
    }
    dispatch('readFile', file);

    picture = file;
    fileAnalyzerDialogOpened = false;
  }

  function onMinimumBrewingTimeInput(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    if (!value) return;

    const valueAsInt = parseInt(value);

    //@ts-ignore
    if (valueAsInt > parseInt(values.maximumBrewingTimeInMinutes ?? '0')) {
      values.maximumBrewingTimeInMinutes = valueAsInt;
    }
  }

  function onSubmit() {
    dispatch('formSubmit', values);
  }

  function onTypeSelected(newType: { value: TeaType }) {
    values.type = newType.value;
  }

  $: formIsValid = newTeaFormSchema.safeParse(values).success;
  $: errors = newTeaFormSchema.safeParse(values).error;
  $: selectedType = { value: values.type, label: values.type ?? undefined };
</script>

<form on:submit|preventDefault={onSubmit} class="grid gap-5">
  {JSON.stringify(errors)}
  <!-- Picture -->
  <div class="flex justify-center">
    <Label>
      <div
        class="flex h-32 w-64 items-center justify-center rounded-lg border-4 border-dashed border-white"
      >
        <Camera size={60} />
      </div>

      <Input
        type="file"
        accept="image/*"
        id="picture"
        on:change={(e) => onPictureUploaded(e)}
        class="hidden"
      />
    </Label>
  </div>

  <div id="new-tea-form_name">
    <Label>
      <span>Nom</span>
      <Input
        type="text"
        placeholder="Fleurs Bleu"
        id="new-tea-form_name_input"
        bind:value={values.name}
      />
      <p class="text-muted-foreground text-sm">Entrer le nom du thé</p>
    </Label>
  </div>

  <div id="new-tea-form_brand">
    <Label>
      <span>Fabriquant</span>
      <Input
        type="text"
        placeholder="Dammann"
        id="new-tea-form_brand_input"
        bind:value={values.brand}
      />
      <p class="text-muted-foreground text-sm">Entrer le fabriquant du thé</p>
    </Label>
  </div>

  <div id="new-tea-form_type">
    <Label class="text-sm">
      <span>Type de thé</span>
      <Select bind:selected={selectedType} onSelectedChange={onTypeSelected}>
        <SelectTrigger>
          <SelectValue placeholder="Selectioner" />
        </SelectTrigger>
        <SelectContent>
          {#each teaTypes as teaType}
            <SelectItem value={teaType}>{teaType}</SelectItem>
          {/each}
        </SelectContent>
        <!--        <SelectInput on:input={console.log} bind:value={values.type} />-->
      </Select>
    </Label>
  </div>

  <div class="grid gap-3">
    <h3>Infusion</h3>
    <div class="flex items-center gap-3">
      <Clock />

      <div id="new-tea-form_minimumBrewingTimeInMinutes" class="grow">
        <Label>
          <span>Temps Minimum</span>
          <Input
            type="number"
            min={0}
            max={60}
            id="new-tea-form_minimumBrewingTimeInMinutes_input"
            bind:value={values.minimumBrewingTimeInMinutes}
            on:input={onMinimumBrewingTimeInput}
          />
        </Label>
      </div>

      <div id="new-tea-form_maximumBrewingTimeInMinutes" class="grow">
        <Label>
          <span>Temps Maximum</span>
          <Input
            type="number"
            min={0}
            max={60}
            id="new-tea-form_maximumBrewingTimeInMinutes_input"
            bind:value={values.maximumBrewingTimeInMinutes}
          />
        </Label>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <Thermometer />

      <div id="new-tea-form_brewingTemperature" class="grow">
        <Label>
          <span>Temperature</span>
          <Input
            type="number"
            min={40}
            max={100}
            id="new-tea-form_brewingTemperature_input"
            bind:value={values.brewingTemperature}
          />
        </Label>
      </div>
    </div>
  </div>

  <div id="new-tea-form_description">
    <Label>
      <span>Autres informations</span>
      <Textarea
        id="new-tea-form_description_input"
        bind:value={values.description}
      />
      <p class="text-muted-foreground text-sm">
        Informations additionnelles (provenance, ingrédients, ...)
      </p>
    </Label>
  </div>

  <Button type="submit" disabled={!formIsValid.valueOf()}>Ajouter</Button>
</form>

<Dialog bind:open={fileAnalyzerDialogOpened}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Commencer une analyse de l'image</DialogTitle>
    </DialogHeader>

    <DialogDescription>
      <div class="relative h-64 w-64 overflow-hidden rounded-lg">
        <img
          class="h-64 w-64 object-cover"
          src={picture ? URL.createObjectURL(picture) : null}
          alt={picture ? picture.name : 'no picture'}
        />
      </div>
    </DialogDescription>

    <DialogFooter>
      <Button on:click={() => onReadFile(picture)}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
