<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
export default {
    name: 'PaymentPage',
    computed: {
        ...mapState(useCounterStore,['paymentUrl'])
    }
}
</script>

<template>
<center>
    <div class="pt-5 mt-5">
        <p>please open payment link in a new tab</p>
         <a :href="paymentUrl" @click="navigate">{{ paymentUrl }}</a>
    </div>
</center>
</template>