<template>
  <div>
    <h2 class="mb-4 text">Trading position calculator</h2>

    <v-text-field
      v-model.number="risk"
      variant="underlined"
      label="Risk in $"
      prefix="$"
    />

    <v-text-field
        v-model.number="entryPrice"
        variant="underlined"
        label="Entry price in $"
        prefix="$"
    />

    <v-text-field
        v-model.number="takeProfitPrice"
        variant="underlined"
        label="Take profit price in $"
        prefix="$"
    />

    <v-text-field
        v-model.number="stopLossPrice"
        variant="underlined"
        label="Stop loss price in $"
        prefix="$"
    />

    <div class="d-flex">
      <v-text-field
          v-model.number="reward"
          variant="underlined"
          label="Reward"
          prefix="$"
          readonly
      />

      <v-text-field
          v-model.number="riskReward"
          variant="underlined"
          label="Risk/Reward"
          readonly
      />

      <v-text-field
          v-model.number="quantity"
          variant="underlined"
          label="Quantity"
          readonly
      />

      <v-text-field
          v-model.number="amount"
          variant="underlined"
          label="Amount"
          prefix="$"
          readonly
      />
    </div>


  </div>
</template>

<script setup lang="ts">
import {ref, computed } from "vue";

const risk = ref(500)
const entryPrice = ref(2.23)
const takeProfitPrice = ref(2.28)
const stopLossPrice = ref(2.22)

const riskReward = computed(() => ((takeProfitPrice.value - entryPrice.value)/(entryPrice.value - stopLossPrice.value)).toFixed(2))
const quantity = computed(() => (risk.value/(entryPrice.value - stopLossPrice.value)).toFixed(2))
const reward = computed(() => (riskReward.value * risk.value).toFixed(2))
const amount = computed(() => (quantity.value * entryPrice.value).toFixed(2))

</script>