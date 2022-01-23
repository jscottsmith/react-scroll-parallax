function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "core-js/modules/es.array.reduce.js";
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
const {
  document
} = global;
const DEFAULT_MAX_SEARCH_RESULTS = 50;
const options = {
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
const ScreenReaderLabel = styled.label({
  position: 'absolute',
  left: -10000,
  top: 'auto',
  width: 1,
  height: 1,
  overflow: 'hidden'
});
const SearchIcon = styled(Icons)(({
  theme
}) => ({
  width: 12,
  height: 12,
  position: 'absolute',
  top: 8,
  left: 10,
  zIndex: 1,
  pointerEvents: 'none',
  color: theme.textMutedColor
}));
const SearchField = styled.div(({
  theme
}) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  '&:focus-within svg': {
    color: theme.color.defaultText
  }
}));
const Input = styled.input(({
  theme
}) => ({
  appearance: 'none',
  height: 28,
  paddingLeft: 28,
  paddingRight: 28,
  border: `1px solid ${transparentize(0.6, theme.color.mediumdark)}`,
  background: 'transparent',
  borderRadius: 28,
  fontSize: `${theme.typography.size.s1}px`,
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
}));
const FocusKey = styled.code(({
  theme
}) => ({
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
}));
const ClearIcon = styled(Icons)(({
  theme
}) => ({
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
}));
const FocusContainer = styled.div({
  outline: 0
});
export const Search = /*#__PURE__*/React.memo(({
  children,
  dataset,
  isLoading = false,
  enableShortcuts = true,
  getLastViewed,
  clearLastViewed,
  initialQuery = ''
}) => {
  const api = useStorybookApi();
  const inputRef = useRef(null);
  const [inputPlaceholder, setPlaceholder] = useState('Find components');
  const [allComponents, showAllComponents] = useState(false);
  const selectStory = useCallback((id, refId) => {
    if (api) api.selectStory(id, undefined, {
      ref: refId !== DEFAULT_REF_ID && refId
    });
    inputRef.current.blur();
    showAllComponents(false);
  }, [api, inputRef, showAllComponents, DEFAULT_REF_ID]);
  const list = useMemo(() => {
    return dataset.entries.reduce((acc, [refId, {
      stories
    }]) => {
      if (stories) {
        acc.push(...Object.values(stories).map(item => searchItem(item, dataset.hash[refId])));
      }

      return acc;
    }, []);
  }, [dataset]);
  const fuse = useMemo(() => new Fuse(list, options), [list]);
  const getResults = useCallback(input => {
    if (!input) return [];
    let results = [];
    const resultIds = new Set();
    const distinctResults = fuse.search(input).filter(({
      item
    }) => {
      if (!(item.isComponent || item.isLeaf) || resultIds.has(item.parent)) return false;
      resultIds.add(item.id);
      return true;
    });

    if (distinctResults.length) {
      results = distinctResults.slice(0, allComponents ? 1000 : DEFAULT_MAX_SEARCH_RESULTS);

      if (distinctResults.length > DEFAULT_MAX_SEARCH_RESULTS && !allComponents) {
        results.push({
          showAll: () => showAllComponents(true),
          totalCount: distinctResults.length,
          moreCount: distinctResults.length - DEFAULT_MAX_SEARCH_RESULTS
        });
      }
    }

    return results;
  }, [allComponents, fuse]);
  const stateReducer = useCallback((state, changes) => {
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
            const {
              id,
              refId
            } = changes.selectedItem.item;
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
    itemToString: result => {
      var _result$item;

      return (result === null || result === void 0 ? void 0 : (_result$item = result.item) === null || _result$item === void 0 ? void 0 : _result$item.name) || '';
    }
  }, ({
    isOpen,
    openMenu,
    closeMenu,
    inputValue,
    clearSelection,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getRootProps,
    highlightedIndex
  }) => {
    const input = inputValue ? inputValue.trim() : '';
    let results = input ? getResults(input) : [];
    const lastViewed = !input && getLastViewed();

    if (lastViewed && lastViewed.length) {
      results = lastViewed.reduce((acc, {
        storyId,
        refId
      }) => {
        const data = dataset.hash[refId];

        if (data && data.stories && data.stories[storyId]) {
          const story = data.stories[storyId];
          const item = story.isLeaf && !story.isComponent && !story.isRoot ? data.stories[story.parent] : story; // prevent duplicates

          if (!acc.some(res => res.item.refId === refId && res.item.id === item.id)) {
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
        closeMenu
      });

      if (results.length > 0) {
        results.push({
          clearLastViewed
        });
      }
    }

    const inputProps = getInputProps({
      id: 'storybook-explorer-searchfield',
      ref: inputRef,
      required: true,
      type: 'search',
      placeholder: inputPlaceholder,
      onFocus: () => {
        openMenu();
        setPlaceholder('Type to find...');
      },
      onBlur: () => setPlaceholder('Find components')
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
      onClick: () => clearSelection()
    })), /*#__PURE__*/React.createElement(FocusContainer, {
      tabIndex: 0,
      id: "storybook-explorer-menu"
    }, children({
      query: input,
      results,
      isBrowsing: !isOpen && document.activeElement !== inputRef.current,
      closeMenu,
      getMenuProps,
      getItemProps,
      highlightedIndex
    })));
  });
});