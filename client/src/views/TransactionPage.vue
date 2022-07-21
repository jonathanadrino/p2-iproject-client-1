<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
import TransactionCard from "../components/TransactionCard.vue";

export default {
    name: "TransactionPage",
    method: {
        ...mapActions(useCounterStore, ["fetchTransactions"]),
    },
    computed: {
        ...mapState(useCounterStore, ["myTransaction"]),
    },
    components: { TransactionCard }
};
</script>

<template>
<TransactionCard v-for="transaction in myTransaction" :key="transaction.id" :transaction="transaction"/>
</template>
