import { types } from '@storybook/addons';
export const previewProps = {
  id: 'string',
  api: {
    on: () => {},
    emit: () => {},
    off: () => {},
    getElements: type => type === types.TAB ? [{
      id: 'notes',
      type: types.TAB,
      title: 'Notes',
      route: ({
        storyId
      }) => `/info/${storyId}`,
      match: ({
        viewMode
      }) => viewMode === 'info',
      render: () => null
    }] : []
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