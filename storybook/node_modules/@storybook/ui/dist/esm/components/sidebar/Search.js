function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.values.js";
import "core-js/modules/es.set.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.string.search.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.object.assign.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.string.trim.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.from.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useStorybookApi } from '@storybook/api';
import { styled } from '@storybook/theming';
import { Icons } from '@storybook/components';
import Downshift from 'downshift';
import Fuse from 'fuse.js';
import global from 'global';
import { transparentize } from 'polished';
import React, { useMemo, useRef, useState, useCallback } from 'react';
import { DEFAULT_REF_ID } from './data';
import { isSearchResult, isExpandType, isClearType, isCloseType } from './types';
import { searchItem } from './utils';
var document = global.document;
var DEFAULT_MAX_SEARCH_RESULTS = 50;
var options = {
  shouldSort: true,
  tokenize: true,
  findAllMatches: true,
  includeScore: true,
  includeMatches: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [{
    name: 'name',
    weight: 0.7
  }, {
    name: 'path',
    weight: 0.3
  }]
};
var ScreenReaderLabel = styled.label({
  position: 'absolute',
  left: -10000,
  top: 'auto',
  width: 1,
  height: 1,
  overflow: 'hidden'
});
var SearchIcon = styled(Icons)(function (_ref) {
  var theme = _ref.theme;
  return {
    width: 12,
    height: 12,
    position: 'absolute',
    top: 8,
    left: 10,
    zIndex: 1,
    pointerEvents: 'none',
    color: theme.textMutedColor
  };
});
var SearchField = styled.div(function (_ref2) {
  var theme = _ref2.theme;
  return {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '&:focus-within svg': {
      color: theme.color.defaultText
    }
  };
});
var Input = styled.input(function (_ref3) {
  var theme = _ref3.theme;
  return {
    appearance: 'none',
    height: 28,
    paddingLeft: 28,
    paddingRight: 28,
    border: "1px solid ".concat(transparentize(0.6, theme.color.mediumdark)),
    background: 'transparent',
    borderRadius: 28,
    fontSize: "".concat(theme.typography.size.s1, "px"),
    fontFamily: 'inherit',
    transition: 'all 150ms',
    color: theme.color.defaultText,
    '&:focus, &:active': {
      outline: 0,
      borderColor: theme.color.secondary,
      background: theme.background.app
    },
    '&::placeholder': {
      color: theme.textMutedColor
    },
    '&:valid ~ code, &:focus ~ code': {
      display: 'none'
    },
    '&:invalid ~ svg': {
      display: 'none'
    },
    '&:valid ~ svg': {
      display: 'block'
    },
    '&::-ms-clear': {
      display: 'none'
    },
    '&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration': {
      display: 'none'
    }
  };
});
var FocusKey = styled.code(function (_ref4) {
  var theme = _ref4.theme;
  return {
    position: 'absolute',
    top: 6,
    right: 12,
    width: 16,
    height: 16,
    zIndex: 1,
    lineHeight: '17px',
    textAlign: 'center',
    fontSize: '11px',
    background: 'rgba(0,0,0,0.1)',
    color: theme.textMutedColor,
    borderRadius: 2,
    userSelect: 'none',
    pointerEvents: 'none'
  };
});
var ClearIcon = styled(Icons)(function (_ref5) {
  var theme = _ref5.theme;
  return {
    width: 16,
    height: 16,
    padding: 4,
    position: 'absolute',
    top: 6,
    right: 8,
    zIndex: 1,
    background: 'rgba(0,0,0,0.1)',
    borderRadius: 16,
    color: theme.color.defaultText,
    cursor: 'pointer'
  };
});
var FocusContainer = styled.div({
  outline: 0
});
export var Search = /*#__PURE__*/React.memo(function (_ref6) {
  var children = _ref6.children,
      dataset = _ref6.dataset,
      _ref6$isLoading = _ref6.isLoading,
      isLoading = _ref6$isLoading === void 0 ? false : _ref6$isLoading,
      _ref6$enableShortcuts = _ref6.enableShortcuts,
      enableShortcuts = _ref6$enableShortcuts === void 0 ? true : _ref6$enableShortcuts,
      getLastViewed = _ref6.getLastViewed,
      clearLastViewed = _ref6.clearLastViewed,
      _ref6$initialQuery = _ref6.initialQuery,
      initialQuery = _ref6$initialQuery === void 0 ? '' : _ref6$initialQuery;
  var api = useStorybookApi();
  var inputRef = useRef(null);

  var _useState = useState('Find components'),
      _useState2 = _slicedToArray(_useState, 2),
      inputPlaceholder = _useState2[0],
      setPlaceholder = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      allComponents = _useState4[0],
      showAllComponents = _useState4[1];

  var selectStory = useCallback(function (id, refId) {
    if (api) api.selectStory(id, undefined, {
      ref: refId !== DEFAULT_REF_ID && refId
    });
    inputRef.current.blur();
    showAllComponents(false);
  }, [api, inputRef, showAllComponents, DEFAULT_REF_ID]);
  var list = useMemo(function () {
    return dataset.entries.reduce(function (acc, _ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          refId = _ref8[0],
          stories = _ref8[1].stories;

      if (stories) {
        acc.push.apply(acc, _toConsumableArray(Object.values(stories).map(function (item) {
          return searchItem(item, dataset.hash[refId]);
        })));
      }

      return acc;
    }, []);
  }, [dataset]);
  var fuse = useMemo(function () {
    return new Fuse(list, options);
  }, [list]);
  var getResults = useCallback(function (input) {
    if (!input) return [];
    var results = [];
    var resultIds = new Set();
    var distinctResults = fuse.search(input).filter(function (_ref9) {
      var item = _ref9.item;
      if (!(item.isComponent || item.isLeaf) || resultIds.has(item.parent)) return false;
      resultIds.add(item.id);
      return true;
    });

    if (distinctResults.length) {
      results = distinctResults.slice(0, allComponents ? 1000 : DEFAULT_MAX_SEARCH_RESULTS);

      if (distinctResults.length > DEFAULT_MAX_SEARCH_RESULTS && !allComponents) {
        results.push({
          showAll: function showAll() {
            return showAllComponents(true);
          },
          totalCount: distinctResults.length,
          moreCount: distinctResults.length - DEFAULT_MAX_SEARCH_RESULTS
        });
      }
    }

    return results;
  }, [allComponents, fuse]);
  var stateReducer = useCallback(function (state, changes) {
    switch (changes.type) {
      case Downshift.stateChangeTypes.blurInput:
        {
          return Object.assign({}, changes, {
            // Prevent clearing the input on blur
            inputValue: state.inputValue,
            // Return to the tree view after selecting an item
            isOpen: state.inputValue && !state.selectedItem,
            selectedItem: null
          });
        }

      case Downshift.stateChangeTypes.mouseUp:
        {
          // Prevent clearing the input on refocus
          return {};
        }

      case Downshift.stateChangeTypes.keyDownEscape:
        {
          if (state.inputValue) {
            // Clear the inputValue, but don't return to the tree view
            return Object.assign({}, changes, {
              inputValue: '',
              isOpen: true,
              selectedItem: null
            });
          } // When pressing escape a second time, blur the input and return to the tree view


          inputRef.current.blur();
          return Object.assign({}, changes, {
            isOpen: false,
            selectedItem: null
          });
        }

      case Downshift.stateChangeTypes.clickItem:
      case Downshift.stateChangeTypes.keyDownEnter:
        {
          if (isSearchResult(changes.selectedItem)) {
            var _changes$selectedItem = changes.selectedItem.item,
                id = _changes$selectedItem.id,
                refId = _changes$selectedItem.refId;
            selectStory(id, refId); // Return to the tree view, but keep the input value

            return Object.assign({}, changes, {
              inputValue: state.inputValue,
              isOpen: false
            });
          }

          if (isExpandType(changes.selectedItem)) {
            changes.selectedItem.showAll(); // Downshift should completely ignore this

            return {};
          }

          if (isClearType(changes.selectedItem)) {
            changes.selectedItem.clearLastViewed();
            inputRef.current.blur(); // Nothing to see anymore, so return to the tree view

            return {
              isOpen: false
            };
          }

          if (isCloseType(changes.selectedItem)) {
            inputRef.current.blur(); // Return to the tree view

            return {
              isOpen: false
            };
          }

          return changes;
        }

      case Downshift.stateChangeTypes.changeInput:
        {
          // Reset the "show more" state whenever the input changes
          showAllComponents(false);
          return changes;
        }

      default:
        return changes;
    }
  }, [inputRef, selectStory, showAllComponents]);
  return /*#__PURE__*/React.createElement(Downshift, {
    initialInputValue: initialQuery,
    stateReducer: stateReducer // @ts-ignore
    ,
    itemToString: function itemToString(result) {
      var _result$item;

      return (result === null || result === void 0 ? void 0 : (_result$item = result.item) === null || _result$item === void 0 ? void 0 : _result$item.name) || '';
    }
  }, function (_ref10) {
    var isOpen = _ref10.isOpen,
        openMenu = _ref10.openMenu,
        closeMenu = _ref10.closeMenu,
        inputValue = _ref10.inputValue,
        clearSelection = _ref10.clearSelection,
        getInputProps = _ref10.getInputProps,
        getItemProps = _ref10.getItemProps,
        getLabelProps = _ref10.getLabelProps,
        getMenuProps = _ref10.getMenuProps,
        getRootProps = _ref10.getRootProps,
        highlightedIndex = _ref10.highlightedIndex;
    var input = inputValue ? inputValue.trim() : '';
    var results = input ? getResults(input) : [];
    var lastViewed = !input && getLastViewed();

    if (lastViewed && lastViewed.length) {
      results = lastViewed.reduce(function (acc, _ref11) {
        var storyId = _ref11.storyId,
            refId = _ref11.refId;
        var data = dataset.hash[refId];

        if (data && data.stories && data.stories[storyId]) {
          var story = data.stories[storyId];
          var item = story.isLeaf && !story.isComponent && !story.isRoot ? data.stories[story.parent] : story; // prevent duplicates

          if (!acc.some(function (res) {
            return res.item.refId === refId && res.item.id === item.id;
          })) {
            acc.push({
              item: searchItem(item, dataset.hash[refId]),
              matches: [],
              score: 0
            });
          }
        }

        return acc;
      }, []);
      results.push({
        closeMenu: closeMenu
      });

      if (results.length > 0) {
        results.push({
          clearLastViewed: clearLastViewed
        });
      }
    }

    var inputProps = getInputProps({
      id: 'storybook-explorer-searchfield',
      ref: inputRef,
      required: true,
      type: 'search',
      placeholder: inputPlaceholder,
      onFocus: function onFocus() {
        openMenu();
        setPlaceholder('Type to find...');
      },
      onBlur: function onBlur() {
        return setPlaceholder('Find components');
      }
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScreenReaderLabel, getLabelProps(), "Search for components"), /*#__PURE__*/React.createElement(SearchField, _extends({}, getRootProps({
      refKey: ''
    }, {
      suppressRefError: true
    }), {
      className: "search-field"
    }), /*#__PURE__*/React.createElement(SearchIcon, {
      icon: "search"
    }), /*#__PURE__*/React.createElement(Input, inputProps), enableShortcuts && /*#__PURE__*/React.createElement(FocusKey, null, "/"), /*#__PURE__*/React.createElement(ClearIcon, {
      icon: "cross",
      onClick: function onClick() {
        return clearSelection();
      }
    })), /*#__PURE__*/React.createElement(FocusContainer, {
      tabIndex: 0,
      id: "storybook-explorer-menu"
    }, children({
      query: input,
      results: results,
      isBrowsing: !isOpen && document.activeElement !== inputRef.current,
      closeMenu: closeMenu,
      getMenuProps: getMenuProps,
      getItemProps: getItemProps,
      highlightedIndex: highlightedIndex
    })));
  });
});