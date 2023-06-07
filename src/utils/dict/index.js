import Dict from "@/utils/dict/Dict";

//options Vue.use 的第二个参数
export default function (Vue, options) {
    Vue.mixin({
        data() {
            const dict=new Dict()

            return {
                //这里返回的是 dict:{type:{}}
                dict
            }
        },
        created() {
            //dict 在上面实例了，然后可以拿到这个属性

            //this.$options 可以拿到不同组件中，data里面的初始属性
            this.dict.init(this.$options.dicts)
        },
    })
}