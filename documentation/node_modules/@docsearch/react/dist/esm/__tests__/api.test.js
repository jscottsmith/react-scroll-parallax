function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { DocSearch as DocSearchComponent } from '../DocSearch';

function DocSearch(props) {
  return /*#__PURE__*/React.createElement(DocSearchComponent, _extends({
    apiKey: "foo",
    indexName: "bar"
  }, props));
}

describe('api', function () {
  beforeEach(function () {
    document.body.innerHTML = '';
  });
  it('renders with minimal parameters', function () {
    render( /*#__PURE__*/React.createElement(DocSearch, null));
    expect(document.querySelector('.DocSearch')).toBeInTheDocument();
  });
  describe('translations', function () {
    it('overrides the default DocSearchButton text', function () {
      render( /*#__PURE__*/React.createElement(DocSearch, {
        translations: {
          button: {
            buttonText: 'Recherche',
            buttonAriaLabel: 'Recherche'
          }
        }
      }));
      expect(document.querySelector('.DocSearch-Button-Placeholder').innerHTML).toBe('Recherche');
      expect(document.querySelector('.DocSearch-Button').getAttribute('aria-label')).toBe('Recherche');
    });
    it('overrides the default DocSearchModal startScreen text', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              render( /*#__PURE__*/React.createElement(DocSearch, {
                translations: {
                  modal: {
                    startScreen: {
                      noRecentSearchesText: 'Pas de recherche récentes'
                    }
                  }
                }
              }));
              _context.next = 3;
              return waitFor(function () {
                fireEvent.click(document.querySelector('.DocSearch-Button'));
              });

            case 3:
              expect(screen.getByText('Pas de recherche récentes')).toBeInTheDocument();

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('overrides the default DocSearchModal noResultsScreen text', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              render( /*#__PURE__*/React.createElement(DocSearch // mock empty response
              , {
                transformSearchClient: function transformSearchClient(searchClient) {
                  return _objectSpread(_objectSpread({}, searchClient), {}, {
                    search: function search() {
                      return new Promise(function (resolve) {
                        resolve({
                          results: [{
                            hits: [],
                            hitsPerPage: 0,
                            nbHits: 0,
                            nbPages: 0,
                            page: 0,
                            processingTimeMS: 0,
                            exhaustiveNbHits: true,
                            params: '',
                            query: ''
                          }]
                        });
                      });
                    }
                  });
                },
                translations: {
                  modal: {
                    noResultsScreen: {
                      noResultsText: 'Pas de résultats pour',
                      openIssueText: 'Ouvrez une issue sur docsearch-configs',
                      openIssueLinkText: 'Lien du repo'
                    }
                  }
                }
              }));
              _context3.next = 3;
              return act( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return waitFor(function () {
                          fireEvent.click(document.querySelector('.DocSearch-Button'));
                        });

                      case 2:
                        fireEvent.input(document.querySelector('.DocSearch-Input'), {
                          target: {
                            value: 'q'
                          }
                        });

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              })));

            case 3:
              expect(screen.getByText(/Pas de résultats pour/)).toBeInTheDocument();
              expect(screen.getByText(/Ouvrez une issue sur docsearch-configs/)).toBeInTheDocument();
              expect(screen.getByRole('link', {
                name: 'Lien du repo'
              })).toBeInTheDocument();

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('overrides the default DocSearchModal searchbox text', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              render( /*#__PURE__*/React.createElement(DocSearch, {
                translations: {
                  modal: {
                    searchBox: {
                      resetButtonTitle: 'Effacer',
                      resetButtonAriaLabel: 'Effacer',
                      cancelButtonText: 'Annuler',
                      cancelButtonAriaLabel: 'Annuler'
                    }
                  }
                }
              }));
              _context4.next = 3;
              return waitFor(function () {
                fireEvent.click(document.querySelector('.DocSearch-Button'));
              });

            case 3:
              expect(document.querySelector('.DocSearch-Cancel').innerHTML).toBe('Annuler');
              expect(document.querySelector('.DocSearch-Cancel').getAttribute('aria-label')).toBe('Annuler');
              expect(document.querySelector('.DocSearch-Reset').getAttribute('title')).toBe('Effacer');
              expect(document.querySelector('.DocSearch-Reset').getAttribute('aria-label')).toBe('Effacer');

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('overrides the default DocSearchModal footer text', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              render( /*#__PURE__*/React.createElement(DocSearch, {
                translations: {
                  modal: {
                    footer: {
                      closeText: 'Fermer',
                      navigateText: 'Naviguer',
                      searchByText: 'Recherche par',
                      selectText: 'Selectionner'
                    }
                  }
                }
              }));
              _context5.next = 3;
              return waitFor(function () {
                fireEvent.click(document.querySelector('.DocSearch-Button'));
              });

            case 3:
              expect(screen.getByText('Recherche par')).toBeInTheDocument();
              expect(screen.getByText('Fermer')).toBeInTheDocument();
              expect(screen.getByText('Naviguer')).toBeInTheDocument();
              expect(screen.getByText('Selectionner')).toBeInTheDocument();

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
});