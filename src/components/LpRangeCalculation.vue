<template>
  <div>
    <v-text-field
      v-model.number="price"
      variant="underlined"
      label="Current asset price in $"
      prefix="$"
    />

    <v-text-field
        v-model.number="annualVolatilityInPercentage"
        variant="underlined"
        label="Annual volatility in %"
        suffix="%"
    />

    <v-text-field
        v-model.number="timePeriod"
        variant="underlined"
        label="Time period in days"
        suffix="days"
    />

    <v-text-field
        v-model.number="confidenceLevelInPercentage"
        variant="underlined"
        label="Confidence level in %"
        suffix="%"
    />

    <v-alert>
      <div v-html="result"></div>
    </v-alert>
  </div>
</template>

<script setup lang="ts">
import {ref, computed } from "vue";

const price = ref(1350)
const annualVolatilityInPercentage = ref(70)
const timePeriod = ref(7)
const confidenceLevelInPercentage = ref(85)

const dailyVolatility = computed(() => annualVolatilityInPercentage.value/(100*Math.sqrt(365)))
const periodVolatility = computed(() => dailyVolatility.value * Math.sqrt(timePeriod.value))
const cumulativeProbability = computed(() => (1 + confidenceLevelInPercentage.value/100)/2)
const zScore = computed(() => normSInv(cumulativeProbability.value))
const rangeInPercentage = computed(() => zScore.value * periodVolatility.value)
const dollarRange = computed(() => rangeInPercentage.value * price.value)
const lowerBound = computed(() => price.value - dollarRange.value)
const upperBound = computed(() => price.value + dollarRange.value)
const USDollar = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
const result = computed(() => `There is an <b>${confidenceLevelInPercentage.value}% chance</b> that the asset's price will stay between <b>${USDollar.format(lowerBound.value)}</b> and <b>${USDollar.format(upperBound.value)}</b> over the next <b>${timePeriod.value} days</b>.`)

const normSInv = (p) => {
  const a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
  const a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
  const b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
  const b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
  const c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
  const c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
  const d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
  const p_low = 0.02425, p_high = 1 - p_low;
  let q, r;
  let retVal;

  if ((p < 0) || (p > 1))
  {
    alert("NormSInv: Argument out of range.");
    retVal = 0;
  }
  else if (p < p_low)
  {
    q = Math.sqrt(-2 * Math.log(p));
    retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }
  else if (p <= p_high)
  {
    q = p - 0.5;
    r = q * q;
    retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
  }
  else
  {
    q = Math.sqrt(-2 * Math.log(1 - p));
    retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }

  return retVal;
}

</script>