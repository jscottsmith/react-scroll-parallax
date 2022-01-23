import { types } from '@storybook/addons';
export var previewProps = {
  id: 'string',
  api: {
    on: function on() {},
    emit: function emit() {},
    off: function off() {},
    getElements: function (type) {
      return type === types.TAB ? [{
        id: 'notes',
        type: types.TAB,
        title: 'Notes',
        route: function route(_ref) {
          var storyId = _ref.storyId;
          return "/info/".concat(storyId);
        },
        match: function match(_ref2) {
          var viewMode = _ref2.viewMode;
          return viewMode === 'info';
        },
        render: function render() {
          return null;
        }
      }] : [];
    }
  },
  story: {
    id: 'story--id',
    depth: 1,
    isComponent: false,
    isLeaf: true,
    isRoot: false,
    kind: 'kind',
    name: 'story name',
    parent: 'root',
    children: [],
    parameters: {
      fileName: '',
      options: {},
      docsOnly: false
    },
    args: {}
  },
  path: 'string',
  viewMode: 'story',
  location: {},
  baseUrl: 'http://example.com',
  queryParams: {},
  options: {
    isFullscreen: false,
    isToolshown: true
  },
  withLoader: false,
  docsOnly: false,
  description: '',
  refs: {}
};