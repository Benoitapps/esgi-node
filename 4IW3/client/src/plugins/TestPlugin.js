import CreditCard from './TestPlugin/CreditCard.vue';
export default{
    install(Vue, options){
        console.log(options);
        Vue.directive('test', {
            mounted(el, binding){
                console.log("Test directive", el, binding);
            }
        });
        Vue.component('CreditCard', CreditCard);
    }
}