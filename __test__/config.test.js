import {mount, createLocalVue} from '@vue/test-utils'

import Component from '../src/component.vue';

describe('Cleave configs', () => {

  let localVue = createLocalVue();
  let onValueChangedStub = jest.fn();

  let app = {
    template: `<div id="app">
                  <cleave :options="options" :raw="raw" v-model="model"></cleave>
                 </div>`,
    data() {
      return {
        model: '12122012',
        raw: true,
        options: {
          date: true,
          onValueChanged: onValueChangedStub
        },
      }
    },
    components: {
      cleave: Component
    }
  };

  let wrapper = null;


  beforeEach(() => {
    wrapper = mount(app, {
      localVue
    })
  });

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
    jest.resetAllMocks();
  });

  test('calls original onValueChanged method on v-model change', () => {
    wrapper.setData({
      raw: false,
      model: '11/11/2011'
    });
    expect(onValueChangedStub).toHaveBeenCalled();
  });


});
