import { shallowMount } from '@vue/test-utils';
import SectionPage from '@/pages/SectionPage.vue';

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

  it('shows create button initially', () => {
    expect(wrapper.find('q-btn[label="Create"]').exists()).toBe(true);
  });

  it('shows text editor when create button is clicked', async () => {
    await wrapper.find('q-btn[label="Create"]').trigger('click');
    expect(wrapper.find('#newPost').exists()).toBe(true);
  });

  it('makes post editable when edit button is clicked', async () => {
    wrapper.setData({
      posts: [{ id: 1, content: 'Test post' }],
      editablePostId: null
    });
    await wrapper.vm.$nextTick();
    await wrapper.find('#editBtn-1').trigger('click');
    expect(wrapper.vm.editablePostId).toBe(1);
  });

  it('deletes post when delete button is clicked', async () => {
    wrapper.setData({
      posts: [{ id: 1, content: 'Test post' }]
    });
    await wrapper.vm.$nextTick();
    await wrapper.find('#deleteBtn-1').trigger('click');
    expect(wrapper.vm.posts.length).toBe(0);
  });
});
