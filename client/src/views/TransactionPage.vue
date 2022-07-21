<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "../stores/counter";
import TransactionCard from "../components/TransactionCard.vue";

export default {
    name: "TransactionPage",
    methods: {
        ...mapActions(useCounterStore, ["fetchTransactions"]),
    },
    computed: {
        ...mapState(useCounterStore, ["myTransaction"]),
    },
    components: { TransactionCard },
    created() {
        this.fetchTransactions()
    }
};
</script>

<template>
<TransactionCard v-for="transaction in myTransaction" :key="transaction.id" :transaction="transaction"/>
</template>
