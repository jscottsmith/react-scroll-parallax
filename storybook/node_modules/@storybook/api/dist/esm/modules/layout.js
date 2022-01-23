function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import global from 'global';
import pick from 'lodash/pick';
import deepEqual from 'fast-deep-equal';
import { themes } from '@storybook/theming';
import merge from '../lib/merge';
var DOCS_MODE = global.DOCS_MODE,
    document = global.document;
export var ActiveTabs = {
  SIDEBAR: 'sidebar',
  CANVAS: 'canvas',
  ADDONS: 'addons'
};
var defaultState = {
  ui: {
    enableShortcuts: true,
    docsMode: false
  },
  layout: {
    initialActive: ActiveTabs.CANVAS,
    isToolshown: !DOCS_MODE,
    isFullscreen: false,
    showPanel: true,
    showNav: true,
    panelPosition: 'bottom'
  },
  selectedPanel: undefined,
  theme: themes.light
};
export var focusableUIElements = {
  storySearchField: 'storybook-explorer-searchfield',
  storyListMenu: 'storybook-explorer-menu',
  storyPanelRoot: 'storybook-panel-root'
};
export var init = function init(_ref) {
  var store = _ref.store,
      provider = _ref.provider,
      singleStory = _ref.singleStory;
  var api = {
    toggleFullscreen: function toggleFullscreen(toggled) {
      return store.setState(function (state) {
        var showNav = state.layout.showNav;
        var value = typeof toggled === 'boolean' ? toggled : !state.layout.isFullscreen;
        var shouldShowNav = showNav === false && value === false;
        return {
          layout: Object.assign({}, state.layout, {
            isFullscreen: value,
            showNav: !singleStory && shouldShowNav ? true : showNav
          })
        };
      }, {
        persistence: 'session'
      });
    },
    togglePanel: function togglePanel(toggled) {
      return store.setState(function (state) {
        var _state$layout = state.layout,
            showNav = _state$layout.showNav,
            isFullscreen = _state$layout.isFullscreen;
        var value = typeof toggled !== 'undefined' ? toggled : !state.layout.showPanel;
        var shouldToggleFullScreen = showNav === false && value === false;
        return {
          layout: Object.assign({}, state.layout, {
            showPanel: value,
            isFullscreen: shouldToggleFullScreen ? true : isFullscreen
          })
        };
      }, {
        persistence: 'session'
      });
    },
    togglePanelPosition: function togglePanelPosition(position) {
      if (typeof position !== 'undefined') {
        return store.setState(function (state) {
          return {
            layout: Object.assign({}, state.layout, {
              panelPosition: position
            })
          };
        }, {
          persistence: 'session'
        });
      }

      return store.setState(function (state) {
        return {
          layout: Object.assign({}, state.layout, {
            panelPosition: state.layout.panelPosition === 'right' ? 'bottom' : 'right'
          })
        };
      }, {
        persistence: 'session'
      });
    },
    toggleNav: function toggleNav(toggled) {
      return store.setState(function (state) {
        if (singleStory) return {
          layout: state.layout
        };
        var _state$layout2 = state.layout,
            showPanel = _state$layout2.showPanel,
            isFullscreen = _state$layout2.isFullscreen;
        var showNav = typeof toggled !== 'undefined' ? toggled : !state.layout.showNav;
        var shouldToggleFullScreen = showPanel === false && showNav === false;
        return {
          layout: Object.assign({}, state.layout, {
            showNav: showNav,
            isFullscreen: shouldToggleFullScreen ? true : !showNav && isFullscreen
          })
        };
      }, {
        persistence: 'session'
      });
    },
    toggleToolbar: function toggleToolbar(toggled) {
      return store.setState(function (state) {
        var value = typeof toggled !== 'undefined' ? toggled : !state.layout.isToolshown;
        return {
          layout: Object.assign({}, state.layout, {
            isToolshown: value
          })
        };
      }, {
        persistence: 'session'
      });
    },
    resetLayout: function resetLayout() {
      return store.setState(function (state) {
        return {
          layout: Object.assign({}, state.layout, {
            showNav: false,
            showPanel: false,
            isFullscreen: false
          })
        };
      }, {
        persistence: 'session'
      });
    },
    focusOnUIElement: function focusOnUIElement(elementId, select) {
      if (!elementId) {
        return;
      }

      var element = document.getElementById(elementId);

      if (element) {
        element.focus();
        if (select) element.select();
      }
    },
    getInitialOptions: function getInitialOptions() {
      var _provider$getConfig = provider.getConfig(),
          theme = _provider$getConfig.theme,
          selectedPanel = _provider$getConfig.selectedPanel,
          options = _objectWithoutProperties(_provider$getConfig, ["theme", "selectedPanel"]);

      return Object.assign({}, defaultState, {
        layout: Object.assign({}, defaultState.layout, pick(options, Object.keys(defaultState.layout)), singleStory && {
          showNav: false
        }),
        ui: Object.assign({}, defaultState.ui, pick(options, Object.keys(defaultState.ui))),
        selectedPanel: selectedPanel || defaultState.selectedPanel,
        theme: theme || defaultState.theme
      });
    },
    setOptions: function setOptions(options) {
      var _store$getState = store.getState(),
          layout = _store$getState.layout,
          ui = _store$getState.ui,
          selectedPanel = _store$getState.selectedPanel,
          theme = _store$getState.theme;

      if (options) {
        var updatedLayout = Object.assign({}, layout, pick(options, Object.keys(layout)), singleStory && {
          showNav: false
        });
        var updatedUi = Object.assign({}, ui, pick(options, Object.keys(ui)));
        var updatedTheme = Object.assign({}, theme, options.theme);
        var modification = {};

        if (!deepEqual(ui, updatedUi)) {
          modification.ui = updatedUi;
        }

        if (!deepEqual(layout, updatedLayout)) {
          modification.layout = updatedLayout;
        }

        if (options.selectedPanel && !deepEqual(selectedPanel, options.selectedPanel)) {
          modification.selectedPanel = options.selectedPanel;
        }

        if (Object.keys(modification).length) {
          store.setState(modification, {
            persistence: 'permanent'
          });
        }

        if (!deepEqual(theme, updatedTheme)) {
          store.setState({
            theme: updatedTheme
          });
        }
      }
    }
  };
  var persisted = pick(store.getState(), 'layout', 'ui', 'selectedPanel');
  return {
    api: api,
    state: merge(api.getInitialOptions(), persisted)
  };
};