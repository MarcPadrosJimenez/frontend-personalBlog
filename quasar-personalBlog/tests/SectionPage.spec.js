import { shallowMount } from '@vue/test-utils';
import SectionPage from '../src/pages/SectionPage.vue';

describe('SectionPage.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SectionPage, {
      mocks: {
        $route: {
          params: {
            section: 'test-section'
          }
        }
      }
    });
  });

  it('renders section title', () => {
    expect(wrapper.find('h2').text()).toBe('test-section');
  });

});
