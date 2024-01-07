import { defineStore } from "pinia";

const useCounterStore = defineStore("counter", {
    state: () => ({
        count: 100,
    }),
    getters: {
        getCount: (state) => state.count * 2,
    },
    actions: {
        increment(newCounter: number) {
            this.count = newCounter++;
        },
    },
})

export default useCounterStore;