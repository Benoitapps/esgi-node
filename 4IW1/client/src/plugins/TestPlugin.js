import MyTest from './MyTest.vue';

export default {
  install(VueInstance, options) {
    console.log(options);
    VueInstance.directive('test', {
      mounted(el, binding) {
        if (binding.modifiers.click) {
          el.addEventListener('click', () => {
            console.log('click', binding.value, binding.arg);
          });
        }
        console.log('bind', el, binding);
      }
    });
    VueInstance.component('MyTest', MyTest);
    VueInstance.provide('coucou', 'coucou');
  }
};
