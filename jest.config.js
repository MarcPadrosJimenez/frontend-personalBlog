export const preset = '@vue/cli-plugin-unit-jest';
export const transform = {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
};
export const moduleFileExtensions = ['js', 'json', 'vue'];
export const testMatch = ['**/tests/**/*.spec.js'];