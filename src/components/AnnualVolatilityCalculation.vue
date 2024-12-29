<template>
  <div>
    <LoaderDialog :loading="loading"/>

    <h2 class="mb-4 text">Calculate historical volatility with data from CoinMarketCap.com</h2>


    <v-autocomplete
        label="Crypto asset"
        v-model="cryptoId"
        :items="cryptoOptions"
        variant="underlined"
        auto-select-first
        clearable
    />

    <v-autocomplete
        label="Period to consider"
        v-model="nbDaysToConsider"
        :items="periodOptions"
        variant="underlined"
        auto-select-first
        clearable
    />

    <v-alert v-if="historicalVolatility" class="mb-4">
      <div v-html="result"></div>
    </v-alert>

    <v-btn
        class=""
        @click="getData"
        color="primary"
    >Calculate Annual Volatility</v-btn>
  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import LoaderDialog from "./LoaderDialog.vue";
import {CoinMarkerCapServices} from "../services/CoinMarkerCapServices.ts";

const loading = ref(false)
const result = computed(() => `The historical volatility is <b>${Math.ceil(historicalVolatility.value * 100)} %</b>.`)
const cryptoOptions = ref([])
const periodOptions = ref([
  {
    title: '1 year',
    value : 365
  },
  {
    title: '6 months',
    value: 180
  },
  {
    title: '3 months',
    value: 90
  },
  {
    title: '1 month',
    value: 30
  }
])

onMounted(async () => {
  loading.value = true
  const res = await CoinMarkerCapServices.getCoinsData()
  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`);
  }
  cryptoOptions.value =  (await res.json()).values.map(item => ({title: `${item[1]} (${item[2]})`, value: item[0]}))
  loading.value = false
})

const quotes = ref([])
const dailyReturns = computed(() => quotes.value.map(item=> Math.log(item.quote.close/item.quote.open)))
const dailyReturnsMean = computed(() => {
  let sum = 0;
  for(const dailyReturn of dailyReturns.value) {
    sum += dailyReturn
  }
  return sum / dailyReturns.value.length
})
const varianceReturns = computed(() => {
  let sum = 0;
  for(const dailyReturn of dailyReturns.value) {
    sum += Math.pow(dailyReturn - dailyReturnsMean.value, 2)
  }
  return sum / (dailyReturns.value.length -1)
})

const historicalVolatility = computed(() => Math.sqrt(varianceReturns.value) * Math.sqrt(365))
const cryptoId = ref(1)
const nbDaysToConsider = ref(365)

const timeEnd = computed(() => {
  const now = new Date();
  const midnightGMT = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return midnightGMT.getTime() / 1000;
})

const timeStart = computed(() => {
  const date = new Date(timeEnd.value * 1000 - nbDaysToConsider.value * 24 * 60 * 60 * 1000)
  return Math.floor(date.getTime()/1000)
})

const getData = async () => {
  loading.value = true
  const res = await CoinMarkerCapServices.getHistoricalPrices(cryptoId.value, timeStart.value, timeEnd.value)
  loading.value = false

  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`);
  }

  quotes.value =  (await res.json()).data.quotes
  console.debug(quotes.value)
}

</script>

<style scoped>

</style>